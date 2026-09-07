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
import { getCurvatureExtrema } from '../../../src/get-curvature-extrema/get-curvature-extrema.js';
import { curvature } from '../../../src/local-properties-at-t/curvature/curvature.js';
import { area } from '../../../src/global-properties/area.js';
import { curviness } from '../../../src/global-properties/curviness.js';
import { classify } from '../../../src/global-properties/classification/classify.js';


function fmt(n: number, d = 4): string {
    if (!Number.isFinite(n)) { return String(n); }
    if (n === 0) { return '0'; }
    const a = Math.abs(n);
    if (a >= 1e6 || a < 1e-4) { return n.toExponential(d - 1); }
    return String(Number(n.toFixed(d)));
}

function fmtPt(p: number[]): string {
    return `(${fmt(p[0])}, ${fmt(p[1])})`;
}

function fmtPts(ps: number[][]): string {
    return `[ ${ps.map(fmtPt).join(', ')} ]`;
}

function fmtPoly(coeffs: number[]): string {
    return `[ ${coeffs.map(c => fmt(c)).join(', ')} ]`;
}

/** Max absolute curvature over the curve (endpoints + curvature maxima). */
function maxCurvature(ps: number[][]): number {
    const { maxima } = getCurvatureExtrema(ps);
    let max = 0;
    for (const t of [0, 1, ...maxima]) {
        const k = Math.abs(curvature(ps, t));
        if (Number.isFinite(k) && k > max) { max = k; }
    }
    return max;
}

function getImplicitForm(ps: number[][]): Record<string, number> | undefined {
    if (ps.length === 4) { return getImplicitForm3(ps) as Record<string, number>; }
    if (ps.length === 3) { return getImplicitForm2(ps) as Record<string, number>; }
    if (ps.length === 2) { return getImplicitForm1(ps) as Record<string, number>; }
    return undefined;
}

function anglesAndSpeeds(ps: number[][]): string {
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


const labelStyle: React.CSSProperties = {
    fontSize: '11px', color: '#557', fontWeight: 600,
    marginTop: '10px', textTransform: 'uppercase', letterSpacing: '0.03em'
};
const valueStyle: React.CSSProperties = {
    fontSize: '12px', color: '#223', whiteSpace: 'pre-wrap',
    wordBreak: 'break-word', fontFamily: 'ui-monospace, Menlo, Consolas, monospace'
};

const cpInputStyle: React.CSSProperties = {
    width: '145px', fontSize: '12px', padding: '2px 4px',
    border: '1px solid #b9cbb9', borderRadius: '4px',
    fontFamily: 'ui-monospace, Menlo, Consolas, monospace'
};

function Row(props: { label: string; title?: string; children: React.ReactNode }) {
    return (
        <div>
            <div style={labelStyle} title={props.title}>{props.label}</div>
            <div style={valueStyle}>{props.children}</div>
        </div>
    );
}


interface Props {
    beziers: number[][][];
    selectedBezierIdx: number | undefined;
    selectedControlPointIdx: number | undefined;
    onSelectControlPoint: (cpIdx: number) => void;
    onControlPointChange: (cpIdx: number, axis: 0 | 1, value: number) => void;
}

function BezierDetails(props: Props) {
    const { beziers, selectedBezierIdx, selectedControlPointIdx } = props;
    const { onSelectControlPoint, onControlPointChange } = props;

    if (selectedBezierIdx === undefined || !beziers[selectedBezierIdx]) {
        return (
            <div style={{ fontSize: '12px', color: '#889', marginTop: '10px' }}>
                Select a bezier to see its details.
            </div>
        );
    }

    const ps = beziers[selectedBezierIdx];
    const c = classify(ps);
    const implicit = getImplicitForm(ps);

    return (
        <div style={{ overflowY: 'auto', height: '100%', paddingRight: '4px' }}>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#2b5', marginBottom: '4px' }}>
                Bezier #{selectedBezierIdx}
            </div>

            <Row label="control points (click to edit)">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {ps.map((c, j) => {
                        const selected = j === selectedControlPointIdx;
                        return (
                            <div
                                key={j}
                                onClick={() => onSelectControlPoint(j)}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '4px',
                                    cursor: 'pointer', padding: '1px 4px', borderRadius: '4px',
                                    background: selected ? '#ffe6c7' : 'transparent',
                                    fontWeight: selected ? 700 : 400
                                }}
                            >
                                <span style={{ color: '#889' }}>{`P${j}`}</span>
                                {selected ? (
                                    <>
                                        <input
                                            type="number" step="any" value={c[0]}
                                            onClick={e => e.stopPropagation()}
                                            onChange={e => onControlPointChange(j, 0, Number(e.target.value))}
                                            style={cpInputStyle}
                                        />
                                        <input
                                            type="number" step="any" value={c[1]}
                                            onClick={e => e.stopPropagation()}
                                            onChange={e => onControlPointChange(j, 1, Number(e.target.value))}
                                            style={cpInputStyle}
                                        />
                                    </>
                                ) : (
                                    <span>{fmtPt(c)}</span>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Row>
            <Row label="classification">
                {`order ${c.order} (real ${c.realOrder}), ${c.collinear ? 'collinear' : 'non-collinear'}, ${c.nodeType}`}
            </Row>
            <Row label="total length">{fmt(totalLength(ps))}</Row>
            <Row label="max curvature">{fmt(maxCurvature(ps))}</Row>
            <Row label="total curvature">{`${fmt(totalCurvature(ps))} rad`}</Row>
            <Row label="total absolute curvature">{`${fmt(totalAbsoluteCurvature(ps))} rad`}</Row>
            <Row label="bending energy">{fmt(getBendingEnergy(ps))}</Row>
            <Row
                label="signed area (about origin)"
                title={"Curve's contribution to Green's theorem ½∮(x·dy − y·dx): the signed area swept by the radius vector from the origin as t goes 0→1. Origin-dependent."}
            >{fmt(area(ps))}</Row>
            <Row label="curviness">{`${fmt(curviness(ps))} rad`}</Row>
            <Row label="hodograph">{fmtPts(getHodograph(ps))}</Row>
            <Row label="power basis [x(t), y(t)]">
                {toPowerBasis(ps).map((poly, i) => (
                    <div key={i}>{`${i === 0 ? 'x' : 'y'}: ${fmtPoly(poly)}`}</div>
                ))}
            </Row>
            <Row label="cubic form">{fmtPts(toCubic(ps))}</Row>
            <Row label="implicit form (rounded)">
                {implicit
                    ? Object.entries(implicit).map(([k, v]) => (
                        <div key={k}>{`${k} = ${fmt(v)}`}</div>
                    ))
                    : 'n/a'}
            </Row>
            <Row label="angle & speed form">{anglesAndSpeeds(ps)}</Row>

            <div style={{
                marginTop: '16px', padding: '8px 10px',
                border: '1px dashed #e0a3a3', borderRadius: '6px',
                background: '#fff2f2', color: '#a30f0f',
                fontSize: '12.5px', fontWeight: 700, textAlign: 'center'
            }}>
                100+ more functions not showcased here
            </div>
        </div>
    );
}


export { BezierDetails }
