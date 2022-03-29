import { X } from "../bezier-bezier-intersection/x.js";
import { ddAddDd } from "double-double";
import { eEstimate, eMult, eSign, eDiff, scaleExpansion, scaleExpansion2 } from 'big-float-ts';
import { getLinearTransformation3 } from "../../transformation/get-transformed-ts.js";
import { getXYExact } from "../../to-power-basis/get-xy/exact/get-xy-exact.js";

const est = eEstimate;

const eps = Number.EPSILON;
const u = eps/2;
const uu = u*u;


/**
 * @param psA a cubic bezier curve
 * @param psB another cubic bezier curve
 * 
 * * **precondition**: not all bezier control points collinear
 * 
 * @internal
 */
 function getEndpointIntersections3(
        psA: number[][],
        psB: number[][]): X[][] {

    const _xyA = getXYExact(psA);
    const _xyB = getXYExact(psB);

    // TODO
    const coord = eSign(_xyB[0][0]) === 0 ? 1 : 0;
    const xyA = _xyA[coord];
    const xyB = _xyB[coord];

    const xyAR = getXYExact(psA.slice().reverse())[coord];
    const xyBR = getXYExact(psB.slice().reverse())[coord];

    const {c,d} = getLinearTransformation3(xyB, xyA)
    const {c: e, d: f} = getLinearTransformation3(xyA, xyB)

    // `t0 = -d/c` (or `t0 = f`)
    // `t1 = (1 - d)/c` (or `t1 = e + f`)
    // const _tA_B0 = est(ddDivDd(ddNegativeOf(d),c));
    const _tA_B0 = est(f);
    // const _tA_B1 = est(ddDivDd(ddDiffDd([0,1],d),c));
    const _tA_B1 = est(ddAddDd(e,f));

    // t0' = d (or `t0' = -f/e`)
    // t1' = c + d or (`t1' = (1 - f)/e`)
    // const _tB_A0 = est(ddDivDd(ddNegativeOf(f),e));
    const _tB_A0 = est(d);
    // const _tB_A1 = est(ddDivDd(ddDiffDd([0,1],f),e));
    const _tB_A1 = est(ddAddDd(c,d));

    // Get the *certified* sign of `tA_B0`, `tA_B0 - 1`, etc. so that points
    // at `t === 0` and `t === 1` are calculated exactly.
    
    const sgnC      = signC(xyA,xyB);
    const sgnC_AR   = signC(xyAR,xyB);
    const sgnC_BR   = signC(xyA,xyBR);
    const sgnC_ARBR = signC(xyAR,xyBR);

    const sgnD      = signD(xyA,xyB);
    const sgnD_AR   = signD(xyAR,xyB);
    const sgnD_BR   = signD(xyA,xyBR);
    const sgnD_ARBR = signD(xyAR,xyBR);

    const sgn_tA_B0 = -sgnD * sgnC;
    const sgn_tA_B0_min1 = sgnD_AR * sgnC_AR;
    const sgn_tA_B1 = -sgnD_BR * sgnC_BR;
    const sgn_tA_B1_min1 = sgnD_ARBR * sgnC_ARBR;

    const sgnRD      = signD(xyB,xyA);
    const sgnRD_AR   = signD(xyBR,xyA);
    const sgnRD_BR   = signD(xyB,xyAR);
    const sgnRD_ARBR = signD(xyBR,xyAR);

    const sgn_tB_A0 = -sgnRD * sgnC;
    const sgn_tB_A0_min1 = sgnRD_AR * sgnC_AR;
    const sgn_tB_A1 = -sgnRD_BR * sgnC_BR;
    const sgn_tB_A1_min1 = sgnRD_ARBR * sgnC_ARBR;

    const tA_B0 = ensureRange(_tA_B0, sgn_tA_B0, sgn_tA_B0_min1);
    const tA_B1 = ensureRange(_tA_B1, sgn_tA_B1, sgn_tA_B1_min1);
    const tB_A0 = ensureRange(_tB_A0, sgn_tB_A0, sgn_tB_A0_min1);
    const tB_A1 = ensureRange(_tB_A1, sgn_tB_A1, sgn_tB_A1_min1);

    //------------------------------------------------
    // Perform a simple unrolled sweep line algorithm
    //------------------------------------------------

    const infos = [
        { tA: tA_B0, tB: 0, bez: 'B' as const, start: true },
        { tA: tA_B1, tB: 1, bez: 'B' as const, start: false },
        { tA: 0, tB: tB_A0, bez: 'A' as const, start: true },
        { tA: 1, tB: tB_A1, bez: 'A' as const, start: false }
    ].sort((a,b) => a.tA - b.tA);

    if (infos[1].tA === infos[2].tA) {
        // const boxB1 = getIntervalBox(psB, [tA1, tA1]);
        const box: number[][] = []; //TODO

        const info = infos[1];

        return [[
            // TODO tS and tE range
            { ri: { tS: info.tA, tE: info.tA, multiplicity: 1 }, kind: 4, box: box },
            { ri: { tS: info.tB, tE: info.tB, multiplicity: 1 }, kind: 4, box: box }
        ]]
    }

    if (infos[0].bez === infos[1].bez) {
        return [];
    }
    
    // const boxB1 = getIntervalBox(psB, [tA1, tA1]);
    const box: number[][] = []; //TODO

    const start = infos[1];
    const end   = infos[2];

    return [
        [
            { ri: { tS: start.tA, tE: start.tA, multiplicity: 1 }, kind: 5, box: box },
            { ri: { tS: start.tB, tE: start.tB, multiplicity: 1 }, kind: 5, box: box }
        ],[
            { ri: { tS: end.tA, tE: end.tA, multiplicity: 1 }, kind: 5, box: box },
            { ri: { tS: end.tB, tE: end.tB, multiplicity: 1 }, kind: 5, box: box }
        ]
    ];
}


function eSquare(v: number[]) {
    return eMult(v,v);
}

function eCube(v: number[]) {
    return eMult(eMult(v,v),v);
}


/**
 * Returns the *certified* sign of `b * p0`.
 * 
 * @internal
 */
 function signD(
        xyA: number[][],
        xyB: number[][]): number {

    const [p0,p1,p2,p3] = xyB;
    const [r0,r1,r2,r3] = xyA;

    // 3*r0*d = -ccc*p1 + c*r1 =>
    // sgn(d) = sgn(-ccc*p1 + c*r1) * sgn(r0)
    //        = sgn(-p1*r0/p0 + c*r1) * sgn(r0)
    //        = sgn(c*r1*p0 - p1*r0) * sign(p0) * sgn(r0)
    //        = sgn((c*r1*p0)**3 - (p1*r0)**3) * sign(p0) * sgn(r0)
    //        = sgn(((r0/p0)*r1**3*p0**3) - p1**3*r0**3) * sign(p0) * sgn(r0)
    //        = sgn((r1**3*p0**2) - p1**3*r0**2) * sign(p0) * sgn(r0) * sgn(r0)
    //        = sgn((r1**3*p0**2) - p1**3*r0**2) * sign(p0)

    // the actual sign as if calculated to infinite precision
    return eSign(eDiff(
        eMult( eCube(r1), eSquare(p0)),
        eMult( eCube(p1), eSquare(r0))
    )) * eSign(p0);
}


/**
 * Returns the *certified* sign of `-b/a`.
 * 
 * @internal
 */
 function signC(
        xyA: number[][],
        xyB: number[][]): number {

    const [p0/*,p1,p2,p3*/] = xyB;
    const [r0/*,r1,r2,r3*/] = xyA;

    return eSign(r0) * eSign(p0);
}


/**
 * 
 * @param t 
 * @param sign 
 * @param min1Sign 
 * 
 * @internal
 */
function ensureRange(
        t: number, 
        sign: number, 
        min1Sign: number): number {

    return (
          sign < 0 
        ? (t < 0 ? t : -uu) 
        : sign === 0
        ? 0
        : min1Sign < 0
        ? (t < 1 ? t : 1 - u)
        : min1Sign === 0
        ? 1
        : (t > 1 ? t : 1 + eps)
    );
}


export { getEndpointIntersections3 }




// TODO - remove - prior attempt at quadratic bezier curves

        // (1)   r0 = cc*p0
        // (2)   r1 = c*p1 + 2*c*d*p0
        // (3)   r2 = p2 + d*p1 + dd*p0
        
        /*
        // 2*c*d*p0 = r1 - c*p1, but cc = r0/p0 =>
        // 2*r0*d = c*r1 - cc*p1 =>
        // sgn(d) = sgn(c*r1 - cc*p1) * sgn(r0)

        const sgnC = eSign(getLinearTransformation(xyA,xyB).c);

        const sgnA = sgnC * eSign(r1);
        const sgnB = eSign(p1);

        // sgnAB = sign(cc*r1**2 - cc**2*p1**2), but cc = r0/p0 =>
        //       = sign((r0/p0)*r1**2 - (r0/p0)**2*p1**2)
        //       = sign(p0*r0*r1**2 - r0**2*p1**2)
        //       = sign(p0*r1**2 - r0**p1**2) * sign(r0)
        const sgnAB = sgnA*sgnB > 0
            ? eSign(eDiff( eMult(p0,eSquare(r1)), eMult(r0,eSquare(p1)) )) * eSign(r0)
            : 0;

        const signPart1 = sgnA > 0
            ? sgnB > 0 ? sgnAB : +1
            : sgnA < 0
                ? sgnB < 0 ? -sgnAB : -1
                : -sgnB;

        return signPart1 * eSign(r0);//?
        */