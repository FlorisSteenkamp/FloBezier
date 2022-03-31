import { X } from "../bezier-bezier-intersection/x.js";
import { ddAddDd } from "double-double";
import { eEstimate } from 'big-float-ts';
import { getLinearTransformation2 } from "../../transformation/get-transformed-ts.js";
import { getXYExact } from "../../to-power-basis/get-xy/exact/get-xy-exact.js";
import { expect } from "chai";

const est = eEstimate;

const eps = Number.EPSILON;
const u = eps/2;
const uu = u*u;

const { sqrt } = Math;

// const close = closeTo([2**7]);
const close = closeTo([2**8]);

function getTransform(
        _xyA: number[][][],
        _xyB: number[][][],
        psA: number[][],
        psB: number[][]) {

    let c!: number[];
    let d!: number[];
    let sgnD!: number;

    //////
    //const psBR = psB.slice().reverse();
    //const _xyBR = getXYExact(psBR);
    //////

    const xyA = _xyA[0];
    const xyB = _xyB[0];

    const { ca, d2,   cb, d1,   signD2, signD1, signParity } = getLinearTransformation2(xyA, xyB);

    const [p2x,p1x,p0x] = _xyA[0].map(est);
    const [p2y,p1y,p0y] = _xyA[1].map(est);

    const [r2x,r1x,r0x] = _xyB[0].map(est);
    const [r2y,r1y,r0y] = _xyB[1].map(est);

    // `t0 = -d/c` (or `t0 = f`)
    // `t1 = (1 - d)/c` (or `t1 = e + f`)
    const _tA_B0_1 = est(d2);
    const _tA_B0_2 = est(d1);


    //////
    //const xyBR = _xyBR[i];
    //const { d2: d1R, d1: d2R, signsD: signsDR } = getLinearTransformation2(xyA, xyBR);
    //const _tA_B1_1__ = est(d1R);//?
    //////

    const rad = sqrt(r2x/p2x)*sqrt(-4*p0x*p2x + p1x**2 + 4*p2x*r0x);
    //const aX1_1 = signParity === 1 ? r0x + r2x + rad : r0x + r2x - rad;
    //const aX1_2 = signParity === 1 ? r0x + r2x - rad : r0x + r2x + rad;
    //const _tA_B0_2 = est(d2);

    const _tA_B1_1 = est(ddAddDd(ca,d2));
    const _tA_B1_2 = est(ddAddDd(cb,d1));
    const _tA_B1_3 = est(ddAddDd(ca,d1));
    const _tA_B1_4 = est(ddAddDd(cb,d2));

    
    const X1_1 = p2x*_tA_B1_1**2 + p1x*_tA_B1_1 + p0x;
    const Y1_1 = p2y*_tA_B1_1**2 + p1y*_tA_B1_1 + p0y;
    // const X1_2 = r0x + r2x - sqrt(r2x/p2x)*sqrt(-4*p0x*p2x + p1x**2 + 4*p2x*r0x);
    const X1_2 = p2x*_tA_B1_2**2 + p1x*_tA_B1_2 + p0x;
    const Y1_2 = p2y*_tA_B1_2**2 + p1y*_tA_B1_2 + p0y;
    // const X1_3 = p2x*_tA_B1_3**2 + p1x*_tA_B1_3 + p0x;
    const Y1_3 = p2y*_tA_B1_3**2 + p1y*_tA_B1_3 + p0y;
    // const X1_4 = p2x*_tA_B1_4**2 + p1x*_tA_B1_4 + p0x;
    const Y1_4 = p2y*_tA_B1_4**2 + p1y*_tA_B1_4 + p0y;

    // r0x;//?
    //const X0_1 = p2x*_tA_B0_1**2 + p1x*_tA_B0_1 + p0x;//?
    const Y0_1 = p2y*_tA_B0_1**2 + p1y*_tA_B0_1 + p0y;//?
    // const X0_2 = p2x*_tA_B0_2**2 + p1x*_tA_B0_2 + p0x;//?
    const Y0_2 = p2y*_tA_B0_2**2 + p1y*_tA_B0_2 + p0y;//?

    const psB0 = psB[0];
    const psB2 = psB[2];

    // TODO - remove closeTo and fix (must be *exact*)
    if (close(psB0[1],Y0_1) &&
        close(psB2[0],X1_1) && close(psB2[1],Y1_1)) {
        d = d2;
        sgnD = signD2;
    } 
    if (close(psB0[1],Y0_2) &&
        close(psB2[0],X1_2) && close(psB2[1],Y1_2)) {
        d = d1;
        sgnD = signD1;
    } 
    if (close(psB0[1],Y0_2) &&
        close(psB2[1],Y1_3)) {
        d = d1;
        sgnD = signD1;
    } 
    if (close(psB0[1],Y0_1) &&
        close(psB2[1],Y1_4)) {
        d = d2;
        sgnD = signD2;
    }


    return { d, sgnD };
}


function getAB(
        psA: number[][],
        psB: number[][]) {

    const psAR = psA.slice().reverse();
    const psBR = psB.slice().reverse();

    const _xyA = getXYExact(psA);
    const _xyB = getXYExact(psB);
    const _xyAR = getXYExact(psAR);
    const _xyBR = getXYExact(psBR);

    
    // throw new Error('a');
    const { sgnD, d }                = getTransform(_xyA,  _xyB,  psA,  psB);
    const { sgnD: sgnD_AR }          = getTransform(_xyAR, _xyB,  psAR, psB);
    const { sgnD: sgnD_BR, d: d_BR } = getTransform(_xyA,  _xyBR, psA,  psBR);
    const { sgnD: sgnD_ARBR }        = getTransform(_xyAR, _xyBR, psAR, psBR);
    

    // `t0 = -d/c` (or `t0 = f`)
    // `t1 = (1 - d)/c` (or `t1 = e + f`)
    const _tA_B0 = est(d);
    const _tA_B1 = est(d_BR);

    const sgn_tA_B0      = sgnD;
    const sgn_tA_B1      = sgnD_BR;
    const sgn_tA_B0_min1 = -sgnD_AR;
    const sgn_tA_B1_min1 = -sgnD_ARBR;

    const tA_B0 = ensureRange(_tA_B0, sgn_tA_B0, sgn_tA_B0_min1);
    const tA_B1 = ensureRange(_tA_B1, sgn_tA_B1, sgn_tA_B1_min1);

    return [tA_B0, tA_B1];
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

    // `t0 = -d/c` (or `t0 = f`)
    // `t1 = (1 - d)/c` (or `t1 = e + f`)
    const [tA_B0,tA_B1] = getAB(psA, psB);
    const [tB_A0,tB_A1] = getAB(psB, psA);

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