/* One-shot transform: inline all single-use intermediate `let`s in getCoeffs,
   keeping the 20 final result vars (v0..v9, v0_..v9_). Verifies equivalence by
   executing original vs transformed bodies with deterministic stub ops. */
const fs = require('fs');
const PATH = 'demo/src/get-coeffs.ts';
const src = fs.readFileSync(PATH, 'utf8');
const lines = src.split(/\r?\n/);

const fnIdx  = lines.findIndex(l => l.includes('function getCoeffs('));
const xyIdx  = lines.findIndex((l, i) => i > fnIdx && l.includes('= getXY('));
const retIdx = lines.findIndex((l, i) => i > xyIdx && /^\s*return\s*\{/.test(l));
const retCloseIdx = lines.findIndex((l, i) => i >= retIdx && /^\s*\};\s*$/.test(l));

const bodyStart = xyIdx + 1;
const bodyEnd   = retIdx - 1;            // inclusive
const bodyLines = lines.slice(bodyStart, bodyEnd + 1);

// token = maximal run of non-operator/non-punctuation chars (incl. $ _ unicode subscripts, digits)
const tokenRe = /[^\s()\[\]{}+\-*/,;=%:]+/g;
const isNumber = t => /^[0-9.]+$/.test(t);
const identRe = /^[^\s=()\[\]{},]+$/;
const candRe  = /^(\s*)let\s+(\S+?)\s*=\s*(.*?)\s*;?\s*(\/\/.*)?$/;

// --- parse body into items ---
const items = [];
for (const line of bodyLines) {
  const m = candRe.exec(line);
  if (m && identRe.test(m[2]) && !/^\/\//.test(line.trim())) {
    items.push({ type: 'cand', indent: m[1], name: m[2], rhs: m[3], comment: m[4] || '' });
  } else {
    items.push({ type: 'verbatim', text: line });
  }
}
const candidates = items.filter(i => i.type === 'cand');
const candSet = new Set(candidates.map(c => c.name));

// --- forced-keep set: final results ---
const forced = new Set();
for (let i = 0; i <= 9; i++) { forced.add('v' + i); forced.add('v' + i + '_'); }

// --- usage counting (candidate RHSs + return) ---
const useCount = Object.create(null);
const countIn = text => {
  for (const m of text.matchAll(tokenRe)) {
    const t = m[0];
    if (candSet.has(t)) useCount[t] = (useCount[t] || 0) + 1;
  }
};
for (const c of candidates) countIn(c.rhs);
const retText = lines.slice(retIdx, retCloseIdx + 1).join('\n');
countIn(retText);

const inlinable = name => candSet.has(name) && !forced.has(name) && useCount[name] === 1;

// --- build expansions (declaration order guarantees deps ready) ---
const expanded = Object.create(null);
for (const c of candidates) {
  expanded[c.name] = c.rhs.replace(tokenRe, t =>
    inlinable(t) ? '(' + expanded[t] + ')' : t);
}

// --- emit transformed body ---
const out = [];
for (const item of items) {
  if (item.type === 'verbatim') { out.push(item.text); continue; }
  if (inlinable(item.name)) continue;
  const cmt = item.comment ? '  ' + item.comment : '';
  out.push(item.indent + 'let ' + item.name + ' = ' + expanded[item.name] + ';' + cmt);
}

// --- collect free names (params for verification) from destructuring block ---
const destrText = lines.slice(fnIdx + 1, xyIdx + 1).join('\n');
const skip = new Set(['let', 'coeffs', 'errorBound', 'getImplicit', 'getXY', 'ps1', 'ps2']);
const ddNames = [];
for (const m of destrText.matchAll(tokenRe)) {
  const t = m[0];
  if (skip.has(t) || isNumber(t) || ddNames.includes(t)) continue;
  ddNames.push(t);
}

// --- sanity: every token in transformed output is candidate|free|number|known-fn ---
const fns = ['tp', 'qm2', 'qmd', 'qmq', 'qaq', 'abs'];
const known = new Set([...candSet, ...ddNames, ...fns, 'γγ3', 'coeffs', 'errBound']);
const unknown = new Set();
for (const item of items) {
  if (item.type !== 'cand' || inlinable(item.name)) continue;
  for (const m of expanded[item.name].matchAll(tokenRe))
    if (!known.has(m[0]) && !isNumber(m[0])) unknown.add(m[0]);
}
console.log('candidates:', candidates.length,
            'inlined:', candidates.filter(c => inlinable(c.name)).length,
            'kept:', candidates.filter(c => !inlinable(c.name)).length);
console.log('ddNames:', ddNames.join(' '));
if (unknown.size) { console.log('!! UNKNOWN TOKENS:', [...unknown]); }

// --- verification: execute original vs transformed with deterministic stub ops ---
const isPair = n => !n.endsWith('_') && !/^[cd][0-9]$/.test(n); // v-values are dd pairs
const paramNames = [...fns, 'γγ3', ...ddNames];
const stubArgs = {
  tp:  (a, b) => [a + b, a * b],
  qm2: p => [p[0] * 2, p[1] * 2],
  qmd: (s, p) => [s + p[0], s * p[1]],
  qmq: (p, q) => [p[0] + q[0], p[1] * q[1]],
  qaq: (p, q) => [p[0] + q[0], p[1] + q[1]],
  abs: x => Math.abs(x),
  'γγ3': 1.0,
};
let seed = 123456789;
const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return 1 + (seed / 0x7fffffff); }; // [1,2)

const origBody = bodyLines.join('\n');
const newBody  = out.join('\n');
const fnOrig = new Function(...paramNames, origBody + '\n' + retText);
const fnNew  = new Function(...paramNames, newBody  + '\n' + retText);

const eqDeep = (a, b) => {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!eqDeep(a[i], b[i])) return false;
    return true;
  }
  return Object.is(a, b);
};

let ok = true;
for (let iter = 0; iter < 200; iter++) {
  const args = paramNames.map(n => {
    if (n in stubArgs) return stubArgs[n];
    return isPair(n) ? [rnd(), rnd()] : rnd();
  });
  const a = fnOrig(...args);
  const b = fnNew(...args);
  if (!eqDeep(a.coeffs, b.coeffs) || !eqDeep(a.errBound, b.errBound)) {
    ok = false;
    console.log('MISMATCH iter', iter);
    console.log('orig.coeffs', JSON.stringify(a.coeffs));
    console.log('new .coeffs', JSON.stringify(b.coeffs));
    console.log('orig.err', JSON.stringify(a.errBound));
    console.log('new .err', JSON.stringify(b.errBound));
    break;
  }
}
console.log('verification:', ok ? 'PASS (200 random runs identical)' : 'FAIL');

if (ok && !unknown.size && process.argv.includes('--write')) {
  const newLines = [...lines.slice(0, bodyStart), ...out, ...lines.slice(bodyEnd + 1)];
  fs.writeFileSync(PATH, newLines.join('\n'));
  console.log('WROTE', PATH);
} else {
  console.log('(dry run — pass --write to apply)');
}
