import { X } from "../bezier-bezier-intersection/x.js";
import { ddAddDd } from "double-double";
import { eEstimate, eMult, eSign, eDiff, eAdd } from 'big-float-ts';
import { getLinearTransformation2 } from "../../transformation/get-transformed-ts.js";
import { getXYExact } from "../../to-power-basis/get-xy/exact/get-xy-exact.js";

const est = eEstimate;

const eps = Number.EPSILON;
const u = eps/2;
const uu = u*u;



function calcCD2(_xyA: number[][][], _xyB: number[][][], psB: number[][]) {
    let c!: number[];
    let d!: number[];
    let e!: number[];
    let f!: number[];
    let sgnC!: number;
    let sgnD!: number;
    let sgnE!: number;
    let sgnF!: number;

    for (let i=0; i<2; i++) {
        const xyA = _xyA[i];
        const xyB = _xyB[i];

        const { cds: [{c:c1,d:d1},{c:c2,d:d2}], signsC:signsC, signsD:signsD } = getLinearTransformation2(xyB, xyA);
        const { cds: [{c:e1,d:f1},{c:e2,d:f2}], signsC:signsE, signsD:signsF } = getLinearTransformation2(xyA, xyB);

        const xyA0 = _xyA[0];
        const xyA1 = _xyA[1];
        const [p2x,p1x,p0x] = xyA0.map(est);
        const [p2y,p1y,p0y] = xyA1.map(est);

        // `t0 = -d/c` (or `t0 = f`)
        // `t1 = (1 - d)/c` (or `t1 = e + f`)
        const _tA_B0_1 = est(f1);
        const _tA_B1_1 = est(ddAddDd(e1,f1));
        const _tA_B0_2 = est(f2);
        const _tA_B1_2 = est(ddAddDd(e2,f2));

        const X0_1 = p2x*_tA_B0_1**2 + p1x*_tA_B0_1 + p0x;
        const Y0_1 = p2y*_tA_B0_1**2 + p1y*_tA_B0_1 + p0y;
        const X1_1 = p2x*_tA_B1_1**2 + p1x*_tA_B1_1 + p0x;
        const Y1_1 = p2y*_tA_B1_1**2 + p1y*_tA_B1_1 + p0y;

        const X0_2 = p2x*_tA_B0_2**2 + p1x*_tA_B0_2 + p0x;
        const Y0_2 = p2y*_tA_B0_2**2 + p1y*_tA_B0_2 + p0y;
        const X1_2 = p2x*_tA_B1_2**2 + p1x*_tA_B1_2 + p0x;
        const Y1_2 = p2y*_tA_B1_2**2 + p1y*_tA_B1_2 + p0y;

        const psB0 = psB[0];
        const psB2 = psB[2];

        // TODO - remove closeTo and fix (must be *exact*)
        const close = closeTo([2**0]);
        if (close(psB0[0],X0_1) && close(psB2[0],X1_1) &&
            close(psB0[1],Y0_1) && close(psB2[1],Y1_1)) {
            c = c1;
            d = d1;
            e = e1;
            f = f1;
            sgnC = signsC[0];
            sgnD = signsD[0];
            sgnE = signsE[0];
            sgnF = signsF[0];
        }
        // TODO - remove closeTo and fix (must be *exact*)
        if (close(psB0[0],X0_2) && close(psB2[0],X1_2) &&
            close(psB0[1],Y0_2) && close(psB2[1],Y1_2)) {
            c = c2;
            d = d2;
            e = e2;
            f = f2;
            sgnC = signsC[1];
            sgnD = signsD[1];
            sgnE = signsE[1];
            sgnF = signsF[1];
        }
    }

    return { c, d, e, f, sgnC, sgnD, sgnE, sgnF };
}


/**
 * @param psA a cubic bezier curve
 * @param psB another cubic bezier curve
 * 
 * * **precondition**: not all bezier control points collinear
 * 
 * @internal
 */
 function getEndpointIntersections2(
        psA: number[][],
        psB: number[][]): X[][] {

    const psAR = psA.slice().reverse();
    const psBR = psB.slice().reverse();

    const _xyA = getXYExact(psA);
    const _xyB = getXYExact(psB);
    const _xyAR = getXYExact(psAR);
    const _xyBR = getXYExact(psBR);

    const { /*c, d,*/ e, f } = calcCD2(_xyA, _xyB, psB);

    // `t0 = -d/c` (or `t0 = f`)
    // `t1 = (1 - d)/c` (or `t1 = e + f`)
    const _tA_B0 = est(f);
    const _tA_B1 = est(ddAddDd(e,f));
    //const _tB_A0 = est(d);
    //const _tB_A1 = est(ddAddDd(c,d));

    //const { sgnC: sgnC,      sgnD: sgnD      } = calcCD2(_xyA, _xyB, psB);
    //const { sgnC: sgnC_AR,   sgnD: sgnD_AR   } = calcCD2(_xyAR,_xyB, psB);
    //const { sgnC: sgnC_BR,   sgnD: sgnD_BR   } = calcCD2(_xyA,_xyBR, psBR);
    //const { sgnC: sgnC_ARBR, sgnD: sgnD_ARBR } = calcCD2(_xyAR,_xyBR, psBR);

    const { sgnE: sgnE,      sgnF: sgnF      } = calcCD2(_xyA, _xyB, psB);
    const { sgnE: sgnE_AR,   sgnF: sgnF_AR   } = calcCD2(_xyAR,_xyB, psB);
    const { sgnE: sgnE_BR,   sgnF: sgnF_BR   } = calcCD2(_xyA,_xyBR, psBR);
    const { sgnE: sgnE_ARBR, sgnF: sgnF_ARBR } = calcCD2(_xyAR,_xyBR, psBR);

    _tA_B0;
    _tA_B1;

    // `t0 = -d/c` (or `t0 = f`)
    // `t1 = (1 - d)/c` (or `t1 = e + f`)
    const sgn_tA_B0      = sgnF;
    const sgn_tA_B0_min1 = -sgnF_AR;
    const sgn_tA_B1      = sgnF_BR;
    const sgn_tA_B1_min1 = -sgnF_ARBR;

    const { f: fR,    sgnE: sgnRE,      sgnF: sgnRF      } = calcCD2(_xyB, _xyA, psA);
    const {           sgnE: sgnRE_AR,   sgnF: sgnRF_AR   } = calcCD2(_xyBR,_xyA, psA);
    const { f: fR_BR, sgnE: sgnRE_BR,   sgnF: sgnRF_BR   } = calcCD2(_xyB, _xyAR, psAR);
    const {           sgnE: sgnRE_ARBR, sgnF: sgnRF_ARBR } = calcCD2(_xyBR,_xyAR, psAR);

    const _tB_A0 = est(fR);
    const _tB_A1 = est(fR_BR);

    //const sgn_tB_A0 = -sgnRD * sgnC;
    //const sgn_tB_A0_min1 = sgnRD_AR * sgnC_AR;
    //const sgn_tB_A1 = -sgnRD_BR * sgnC_BR;
    //const sgn_tB_A1_min1 = sgnRD_ARBR * sgnC_ARBR;
    const sgn_tB_A0      = sgnRF;
    const sgn_tB_A0_min1 = -sgnRF_AR;
    const sgn_tB_A1      = sgnRF_BR;
    const sgn_tB_A1_min1 = -sgnRF_ARBR;

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
    
    // return [];
}


function eSquare(v: number[]) {
    return eMult(v,v);
}

function eCube(v: number[]) {
    return eMult(eMult(v,v),v);
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


export { getEndpointIntersections2 }




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

        return signPart1 * eSign(r0);
        */


// TODO - remove - temp
type ObjOrArray<T> = 
    | T
    | ObjOrArray<T>[]
    | { [key:string]: ObjOrArray<T> };
function closeTo(ulpsOrEps: number | number[]) {
    let isUlps = true;
    if (Array.isArray(ulpsOrEps)) {
        isUlps = false;
        ulpsOrEps = ulpsOrEps[0];
    }

    function check(
            expected: ObjOrArray<number>,
            actual: ObjOrArray<number>): boolean {

        if (typeof expected === 'number') {
            if (typeof actual !== 'number') { return false; }
            const error = Math.abs((isUlps ? expected : 1)*(ulpsOrEps as number)*eps);
            const actual_ = actual as number;

            return (
                (actual_ >= expected - error) && 
                (actual_ <= expected + error)
            );
        }

        if (Array.isArray(expected)) {
            if (!Array.isArray(actual)) { return false; }
            if (expected.length !== actual.length) { return false; }

            for (let i=0; i<expected.length; i++) {
                const e = expected[i];
                const a = actual[i];
    
                if (!check(e,a)) { return false; }
            }

            return true;
        }
        
        if (typeof expected === 'object') {
            if (typeof actual !== 'object') { return false; }
            const keys = Object.keys(expected);
            const keysE = Object.keys(actual);
            if (keys.length !== keysE.length) { return false; }
            for (let key of keys) {
                const e = expected[key];
                // @ts-ignore
                const a = actual[key];

                if (!check(e,a)) { return false; }
            }

            return true;
        }

        return false;  // unsupported types
    }

    return check;
}