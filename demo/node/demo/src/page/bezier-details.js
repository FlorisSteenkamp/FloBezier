import * as React from 'react';
import { totalLength } from '../../../src/global-properties/length/total-length.js';
import { totalAbsoluteCurvature } from '../../../src/global-properties/total-absolute-curvature.js';
import { totalCurvature } from '../../../src/global-properties/total-curvature.js';
import { getHodograph } from '../../../src/transformation/get-hodograph.js';
import { toPowerBasis } from '../../../src/to-power-basis/to-power-basis/double/to-power-basis.js';
import { toCubic } from '../../../src/transformation/degree-or-type/to-cubic.js';
import { getBendingEnergy } from '../../../src/global-properties/get-bending-energy.js';
import { cubicToAnglesAndSpeeds } from '../../../src/angles-and-speeds/bezier-by-angles-and-speeds/cubic-to-angles-and-speeds.js';
import { getImplicitForm3 } from '../../../src/implicit-form/double/get-implicit-form3.js';
import { getImplicitForm2 } from '../../../src/implicit-form/double/get-implicit-form2.js';
import { getImplicitForm1 } from '../../../src/implicit-form/double/get-implicit-form1.js';
import { getCurvatureExtrema } from '../../../src/get-curvature-extrema/double/get-curvature-extrema.js';
import { curvature } from '../../../src/local-properties-at-t/curvature/curvature.js';
import { area } from '../../../src/global-properties/area.js';
import { curviness } from '../../../src/global-properties/curviness.js';
import { classify } from '../../../src/global-properties/classification/classify.js';
function fmt(n, d = 4) {
    if (!Number.isFinite(n)) {
        return String(n);
    }
    if (n === 0) {
        return '0';
    }
    const a = Math.abs(n);
    if (a >= 1e6 || a < 1e-4) {
        return n.toExponential(d - 1);
    }
    return String(Number(n.toFixed(d)));
}
function fmtPt(p) {
    return `(${fmt(p[0])}, ${fmt(p[1])})`;
}
function fmtPts(ps) {
    return `[ ${ps.map(fmtPt).join(', ')} ]`;
}
function fmtPoly(coeffs) {
    return `[ ${coeffs.map(c => fmt(c)).join(', ')} ]`;
}
/** Max absolute curvature over the curve (endpoints + curvature maxima). */
function maxCurvature(ps) {
    const { maxima } = getCurvatureExtrema(ps);
    let max = 0;
    for (const t of [0, 1, ...maxima]) {
        const k = Math.abs(curvature(ps, t));
        if (Number.isFinite(k) && k > max) {
            max = k;
        }
    }
    return max;
}
function getImplicitForm(ps) {
    if (ps.length === 4) {
        return getImplicitForm3(ps);
    }
    if (ps.length === 3) {
        return getImplicitForm2(ps);
    }
    if (ps.length === 2) {
        return getImplicitForm1(ps);
    }
    return undefined;
}
function anglesAndSpeeds(ps) {
    const p0 = ps[0];
    const pN = ps[ps.length - 1];
    if (p0[0] === pN[0] && p0[1] === pN[1]) {
        return 'n/a (endpoints coincide)';
    }
    const { α, β, s0, s1, L, rot, p } = cubicToAnglesAndSpeeds(toCubic(ps));
    return [
        `α (start angle): ${fmt(α)} rad`,
        `β (end angle): ${fmt(β)} rad`,
        `s0 (start speed): ${fmt(s0)}`,
        `s1 (end speed): ${fmt(s1)}`,
        `L (endpoint dist): ${fmt(L)}`,
        `rot: ${fmt(rot)} rad`,
        `p (offset): ${fmtPt(p)}`,
    ].join('\n');
}
const labelStyle = {
    fontSize: '11px', color: '#557', fontWeight: 600,
    marginTop: '10px', textTransform: 'uppercase', letterSpacing: '0.03em'
};
const valueStyle = {
    fontSize: '12px', color: '#223', whiteSpace: 'pre-wrap',
    wordBreak: 'break-word', fontFamily: 'ui-monospace, Menlo, Consolas, monospace'
};
const cpInputStyle = {
    width: '145px', fontSize: '12px', padding: '2px 4px',
    border: '1px solid #b9cbb9', borderRadius: '4px',
    fontFamily: 'ui-monospace, Menlo, Consolas, monospace'
};
function Row(props) {
    return (React.createElement("div", null,
        React.createElement("div", { style: { ...labelStyle, display: 'flex', alignItems: 'center', gap: '6px' }, title: props.title },
            props.label,
            props.extra),
        React.createElement("div", { style: valueStyle }, props.children)));
}
/**
 * Parses pasted control points, e.g. `[[0.1, 0.2],\n[0.3, 0.4]]`.
 *
 * Simply collects all numbers (so whitespace, newlines, brackets, trailing
 * commas, etc. are all tolerated) and pairs them up.
 */
function parseControlPoints(str) {
    const ns = (str.match(/[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/g) ?? []).map(Number);
    if (ns.length % 2 !== 0) {
        return `odd number of coordinates (${ns.length})`;
    }
    const ps = [];
    for (let i = 0; i < ns.length; i += 2) {
        ps.push([ns[i], ns[i + 1]]);
    }
    if (ps.length < 2 || ps.length > 4) {
        return `expected 2 to 4 points (got ${ps.length})`;
    }
    return ps;
}
function PasteControlPointsDialog(props) {
    const { onAccept, onClose } = props;
    const [text, setText] = React.useState(() => '[' + props.ps.map(p => `[${p[0]}, ${p[1]}]`).join(',\n') + ']');
    const parsed = parseControlPoints(text);
    const error = typeof parsed === 'string' ? parsed : undefined;
    function accept() {
        if (typeof parsed !== 'string') {
            onAccept(parsed);
            onClose();
        }
    }
    return (React.createElement("div", { onMouseDown: onClose, style: {
            position: 'fixed', inset: 0, zIndex: 100,
            background: 'rgba(0,0,0,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        } },
        React.createElement("div", { onMouseDown: e => e.stopPropagation(), style: {
                background: 'white', border: '1px solid #91be91', borderRadius: '6px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.25)', padding: '10px',
                display: 'flex', flexDirection: 'column', gap: '6px', width: '420px'
            } },
            React.createElement("div", { style: { fontSize: '12px', fontWeight: 600, color: '#557' } }, "Paste control points (2 to 4 points, e.g. [[x0,y0],[x1,y1],[x2,y2]])"),
            React.createElement("textarea", { autoFocus: true, value: text, onChange: e => setText(e.target.value), onFocus: e => e.target.select(), onKeyDown: e => {
                    if (e.key === 'Escape') {
                        onClose();
                    }
                    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                        accept();
                    }
                }, rows: 6, spellCheck: false, style: {
                    fontSize: '12px', padding: '4px', resize: 'vertical',
                    border: '1px solid #b9cbb9', borderRadius: '4px',
                    fontFamily: 'ui-monospace, Menlo, Consolas, monospace'
                } }),
            React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '6px' } },
                React.createElement("span", { style: { flex: 1, fontSize: '11px', color: error ? '#a30f0f' : '#889' } }, error ?? `${parsed.length} points · Ctrl+Enter to accept`),
                React.createElement("button", { type: "button", onClick: onClose }, "cancel"),
                React.createElement("button", { type: "button", onClick: accept, disabled: !!error }, "accept")))));
}
function BezierDetails(props) {
    const { beziers, selectedBezierIdx, selectedControlPointIdx } = props;
    const { onSelectControlPoint, onControlPointChange, onControlPointsReplace } = props;
    const [pasteOpen, setPasteOpen] = React.useState(false);
    if (selectedBezierIdx === undefined || !beziers[selectedBezierIdx]) {
        return (React.createElement("div", { style: { fontSize: '12px', color: '#889', marginTop: '10px' } }, "Select a bezier to see its details."));
    }
    const ps = beziers[selectedBezierIdx];
    const c = classify(ps);
    const implicit = getImplicitForm(ps);
    return (React.createElement("div", { style: { overflowY: 'auto', height: '100%', paddingRight: '4px' } },
        React.createElement("div", { style: { fontSize: '13px', fontWeight: 700, color: '#2b5', marginBottom: '4px' } },
            "Bezier #",
            selectedBezierIdx),
        React.createElement(Row, { label: "control points (click to edit)", extra: React.createElement("button", { type: "button", title: "paste control points as an array, e.g. [[x0,y0],[x1,y1],[x2,y2]]", onClick: () => setPasteOpen(true), style: {
                    fontSize: '10px', lineHeight: 1, padding: '1px 4px',
                    border: '1px solid #91be91', borderRadius: '3px',
                    background: 'white', color: '#557', cursor: 'pointer',
                    textTransform: 'none', letterSpacing: 0
                } }, "paste") },
            pasteOpen &&
                React.createElement(PasteControlPointsDialog, { ps: ps, onAccept: onControlPointsReplace, onClose: () => setPasteOpen(false) }),
            React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: '2px' } }, ps.map((c, j) => {
                const selected = j === selectedControlPointIdx;
                return (React.createElement("div", { key: j, onClick: () => onSelectControlPoint(j), style: {
                        display: 'flex', alignItems: 'center', gap: '4px',
                        cursor: 'pointer', padding: '1px 4px', borderRadius: '4px',
                        background: selected ? '#ffe6c7' : 'transparent',
                        fontWeight: selected ? 700 : 400
                    } },
                    React.createElement("span", { style: { color: '#889' } }, `P${j}`),
                    selected ? (React.createElement(React.Fragment, null,
                        React.createElement("input", { type: "number", step: "any", value: c[0], onClick: e => e.stopPropagation(), onChange: e => onControlPointChange(j, 0, Number(e.target.value)), style: cpInputStyle }),
                        React.createElement("input", { type: "number", step: "any", value: c[1], onClick: e => e.stopPropagation(), onChange: e => onControlPointChange(j, 1, Number(e.target.value)), style: cpInputStyle }))) : (React.createElement("span", null, fmtPt(c)))));
            }))),
        React.createElement(Row, { label: "classification" }, `order ${c.order} (real ${c.realOrder}), ${c.collinear ? 'collinear' : 'non-collinear'}, ${c.nodeType}`),
        React.createElement(Row, { label: "total length" }, fmt(totalLength(ps))),
        React.createElement(Row, { label: "max curvature" }, fmt(maxCurvature(ps))),
        React.createElement(Row, { label: "total curvature" }, `${fmt(totalCurvature(ps))} rad`),
        React.createElement(Row, { label: "total absolute curvature" }, `${fmt(totalAbsoluteCurvature(ps))} rad`),
        React.createElement(Row, { label: "bending energy [1/length]", title: "\u222B \u03BA\u00B2 ds" }, fmt(getBendingEnergy(ps))),
        React.createElement(Row, { label: "signed area (about origin)", title: "Curve's contribution to Green's theorem ½∮(x·dy − y·dx): the signed area swept by the radius vector from the origin as t goes 0→1. Origin-dependent." }, fmt(area(ps))),
        React.createElement(Row, { label: "curviness" }, `${fmt(curviness(ps))} rad`),
        React.createElement(Row, { label: "hodograph" }, fmtPts(getHodograph(ps))),
        React.createElement(Row, { label: "power basis [x(t), y(t)]" }, toPowerBasis(ps).map((poly, i) => (React.createElement("div", { key: i }, `${i === 0 ? 'x' : 'y'}: ${fmtPoly(poly)}`)))),
        React.createElement(Row, { label: "cubic form" }, fmtPts(toCubic(ps))),
        React.createElement(Row, { label: "implicit form (rounded)" }, implicit
            ? Object.entries(implicit).map(([k, v]) => (React.createElement("div", { key: k }, `${k} = ${fmt(v)}`)))
            : 'n/a'),
        React.createElement(Row, { label: "angle & speed form" }, anglesAndSpeeds(ps)),
        React.createElement("div", { style: {
                marginTop: '16px', padding: '8px 10px',
                border: '1px dashed #e0a3a3', borderRadius: '6px',
                background: '#fff2f2', color: '#a30f0f',
                fontSize: '12.5px', fontWeight: 700, textAlign: 'center'
            } }, "100+ more functions not showcased here")));
}
export { BezierDetails };
//# sourceMappingURL=bezier-details.js.map