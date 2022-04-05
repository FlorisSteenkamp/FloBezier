import { X } from "../bezier-bezier-intersection/x.js";
import { eDiff, eEstimate, eMult } from 'big-float-ts';
import { getLinearTransformation2 } from "./get-transformed-ts2.js";
import { getXYExact } from "../../to-power-basis/get-xy/exact/get-xy-exact.js";
import { assert, expect } from "chai";

const est = eEstimate;

const eps = Number.EPSILON;
const u = eps/2;
const uu = u*u;

const { sqrt, sign } = Math;

// const close = closeTo([2**7]);
const close = closeTo([2**16]);
function close2(a: number, b: number) {
    return (
        closeTo(2**8)(a,b) || 
        closeTo([2**8])(a,b)
    );
}


function eMultBy4(a: number[]) { 
    return a.map(v => 4*v);
}
function eSquare(a: number[]) { 
    return eMult(a,a);
}


function getTransform(
        _xyA: number[][][],
        _xyB: number[][][],
        psA: number[][],
        psB: number[][]): { d: number[]; sgnD: number; } {

    let c!: number[];
    let d!: number[];
    let sgnD!: number;

    //////
    //const psBR = psB.slice().reverse();
    //const _xyBR = getXYExact(psBR);
    //////

    const xyAx = _xyA[0];
    const xyBx = _xyB[0];

    const xyAy = _xyA[1];
    const xyBy = _xyB[1];

    const { ca: cax, D2: D2x, cb: cbx, D1: D1x, sgnCA: sgnCAx } = getLinearTransformation2(xyAx, xyBx);
    const { ca: cay, D2: D2y, cb: cby, D1: D1y, sgnCA: sgnCAy } = getLinearTransformation2(xyAy, xyBy);

    const [p2x,p1x,p0x] = _xyA[0];
    const [p2y,p1y,p0y] = _xyA[1];
    const [r2x,r1x,r0x] = _xyB[0];
    const [r2y,r1y,r0y] = _xyB[1];

    const [p2x_,p1x_,p0x_] = [p2x,p1x,p0x].map(est);
    const [p2y_,p1y_,p0y_] = [p2y,p1y,p0y].map(est);
    const [r2x_,r1x_,r0x_] = [r2x,r1x,r0x].map(est);
    const [r2y_,r1y_,r0y_] = [r2y,r1y,r0y].map(est);

    const d1x = (-p1x_ - sign(p2x_)*sqrt(p1x_**2 - 4*p2x_*(p0x_ - r0x_)))/(2*p2x_);
    const d1x_ = est(D1x.d);
    expect(d1x).to.be.nearly([2**8],d1x_);

    const d2x = (-p1x_ + sign(p2x_)*sqrt(p1x_**2 - 4*p2x_*(p0x_ - r0x_)))/(2*p2x_);
    const d2x_ = est(D2x.d);
    expect(d2x).to.be.nearly([2**8],d2x_);

    const d1y = (-p1y_ - sign(p2y_)*sqrt(p1y_**2 - 4*p2y_*(p0y_ - r0y_)))/(2*p2y_);
    const d1y_ = est(D1y.d);
    expect(d1y).to.be.nearly([2**8],d1y_);

    const d2y = (-p1y_ + sign(p2y_)*sqrt(p1y_**2 - 4*p2y_*(p0y_ - r0y_)))/(2*p2y_);
    const d2y_ = est(D2y.d);
    expect(d2y).to.be.nearly([2**8],d2y_);


    const radx = sqrt(p1x_**2 - 4*p2x_*(p0x_ - r0x_));
    const rady = sqrt(p1y_**2 - 4*p2y_*(p0y_ - r0y_));

    expect(est(D1x.d) <= est(D2x.d)).to.be.true;
    expect(est(D1y.d) <= est(D2y.d)).to.be.true;

    // const close11 = close(D1x.d,D1y.d);
    const close11 = close2(
        p2y_*p1x_ - p2x_*p1y_,
        p2x_*sign(p2y_)*rady - p2y_*sign(p2x_)*radx
    );
    const aa = p1x_**2 - 4*p2x_*(p0x_ - r0x_);
    if (sqrt(aa)**2 !== aa) {
        const _A = eDiff(
            eSquare(p1x),
            eMultBy4(eMult(p2x,eDiff(p0x, r0x)))
        );

        
    };

    if (close11) {
        return D1x;
    }
    if (close(D1x.d,D2y.d)) {
        return D1x;
    }
    if (close(D2x.d,D1y.d)) {
        return D2x;
    }
    if (close(D2x.d,D2y.d)) {
        return D2x;
    }

    throw new Error('we should not get here')
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
    const { sgnD: sgnD_AR, d: d_AR } = getTransform(_xyAR, _xyB,  psAR, psB);
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

    //d_AR;//?
    //expect(sgn_tA_B0*eSign(d)).to.be.greaterThanOrEqual(0);
    //expect(sgn_tA_B1*eSign(d_AR)).to.be.greaterThanOrEqual(0);

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