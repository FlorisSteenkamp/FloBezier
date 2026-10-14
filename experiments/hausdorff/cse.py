"""
Greedy common subexpression elimination (CSE) of products for a set of
polynomials given as lists of terms.

A term is `(c, {var: exponent})` with `c` an integer. Each monomial is treated
as a multiset of factors (powers expanded, so `x³` is `x, x, x`). The most
frequent pair of factors over all monomials is repeatedly replaced by a new
temporary (`const tᵢ = a*b`) until no pair occurs more than once. Finding the
cheapest form is NP-hard; this greedy heuristic is the usual practical choice.
"""
from collections import Counter


def cse_products(polys, prefix='t'):
    """
    Returns `(temps, polys2)` where `temps` is an ordered list of
    `(name, a, b)` (`name = a*b`) and `polys2` the polynomials with each term
    as `(c, Counter(atom -> count))`.
    """
    mons = [[(c, Counter(m)) for c, m in p] for p in polys]
    allm = [m for p in mons for _, m in p]
    temps = []
    while True:
        freq = Counter()
        for m in allm:
            atoms = sorted(a for a in m if m[a] > 0)
            for i, a in enumerate(atoms):
                if m[a] >= 2: freq[(a, a)] += m[a]//2
                for b in atoms[i+1:]:
                    freq[(a, b)] += min(m[a], m[b])
        if not freq: break
        # most frequent pair; ties broken deterministically
        (a, b), n = max(freq.items(), key=lambda kv: (kv[1], kv[0]))
        if n < 2: break
        t = f'{prefix}{len(temps)}'
        temps.append((t, a, b))
        for m in allm:
            k = m[a]//2 if a == b else min(m[a], m[b])
            if k == 0: continue
            m[a] -= k; m[b] -= k; m[t] += k
            for x in (a, b):
                if m[x] == 0: del m[x]
    return temps, mons


def mults_naive(polys):
    """multiplications without any sharing (powers by repeated multiplication)"""
    n = 0
    for p in polys:
        for c, m in p:
            n += max(0, sum(m.values()) - 1) + (abs(c) != 1)
    return n


def mults_cse(temps, mons):
    n = len(temps)
    for p in mons:
        for c, m in p:
            n += max(0, sum(m.values()) - 1) + (abs(c) != 1)
    return n


def term_ts(c, m):
    fs = []
    for a in sorted(m):
        fs += [a]*m[a]
    body = '*'.join(fs)
    mag = abs(c)
    return c, (str(mag) if not body else (body if mag == 1 else f'{mag}*{body}'))


def poly_ts(p):
    """terms as TypeScript, `+`/`-` separated (single line)"""
    if not p: return '0'
    out = ''
    for i, (c, m) in enumerate(p):
        s, txt = term_ts(c, m)
        if i == 0: out += ('-' if s < 0 else '') + txt
        else: out += (' - ' if s < 0 else ' + ') + txt
    return out


def cse_products_fast(polys, prefix='t'):
    """
    Same as `cse_products` but with incrementally maintained pair counts (only
    the monomials containing the extracted pair are recounted), for large
    inputs. Ties are broken deterministically.
    """
    import heapq
    mons = [[(c, Counter(m)) for c, m in p] for p in polys]
    allm = [m for p in mons for _, m in p]

    def pairs(m):
        atoms = sorted(a for a in m if m[a] > 0)
        out = []
        for i, a in enumerate(atoms):
            if m[a] >= 2: out.append(((a, a), m[a]//2))
            for b in atoms[i+1:]:
                out.append(((a, b), min(m[a], m[b])))
        return out

    count = Counter()
    where = {}
    for idx, m in enumerate(allm):
        for p, n in pairs(m):
            count[p] += n
            where.setdefault(p, set()).add(idx)
    heap = [(-n, p) for p, n in count.items()]
    heapq.heapify(heap)

    temps = []
    while heap:
        negn, p = heapq.heappop(heap)
        n = count.get(p, 0)
        if -negn != n: 
            if n >= 2: heapq.heappush(heap, (-n, p))
            continue
        if n < 2: break
        a, b = p
        t = f'{prefix}{len(temps)}'
        temps.append((t, a, b))
        touched = set()
        for idx in list(where.get(p, ())):
            m = allm[idx]
            for q, k in pairs(m):
                count[q] -= k
                where[q].discard(idx)
                touched.add(q)
            k = m[a]//2 if a == b else min(m[a], m[b])
            m[a] -= k; m[b] -= k; m[t] += k
            for x in (a, b):
                if m[x] == 0: del m[x]
            for q, k2 in pairs(m):
                count[q] += k2
                where.setdefault(q, set()).add(idx)
                touched.add(q)
        for q in touched:
            if count[q] >= 2: heapq.heappush(heap, (-count[q], q))
    return temps, mons
