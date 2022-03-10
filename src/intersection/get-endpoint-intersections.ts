import { X } from "./bezier-bezier-intersection/x.js";
import { ddAddDd, ddDiffDd, ddDivDd, ddNegativeOf } from "double-double";
import { eEstimate, eMult, eSign, eAdd, eDiff } from 'big-float-ts';
import { getLinearTransformation/*, getTransformation*/ } from "../transformation/get-transformed-ts.js";
import { sub1Ulp } from "../sub-1-ulp.js";
import { add1Ulp } from "../add-1-ulp.js";
import { getXYExact } from "../to-power-basis/get-xy/exact/get-xy-exact.js";
import { reduceOrderIfPossible } from "../transformation/reduce-order-if-possible.js";

const { sign } = Math;
const eps = Number.EPSILON;
const u = eps/2;


// TODO
function getEndpointIntersections(
        psA: number[][],
        psB: number[][],
        orderAlreadyReduced = false): X[][] {

    if (!orderAlreadyReduced) {
        psA = reduceOrderIfPossible(psA);
        psB = reduceOrderIfPossible(psB);
    }

    if (psA.length !== psB.length) {
        throw new Error('The given bezier curves should be algebraically *identical*');
    }

    const _xyA = getXYExact(psA);
    const _xyB = getXYExact(psB);

    const coord = eSign(_xyB[0][0]) === 0 ? 1 : 0;
    const xyA = _xyA[coord];
    const xyB = _xyB[coord];

    const {a,b} = getLinearTransformation(xyB, xyA)!


    /*
    const [A0,A1,A2,A3] = psA;
    const [B0,B1,B2,B3] = psB;

    if (A0[0] === B0[0] && A0[1] === B0[1]) {
        // starting points match exactly
    }
    if (A0[0] === B3[0] && A0[1] === B3[1]) {
        // A's start matches B's end exactly
    }
    if (A3[0] === B0[0] && A3[1] === B0[1]) {
        // A's end matches B's start exactly
    }
    if (A3[0] === B3[0] && A3[1] === B3[1]) {
        // A's end matches B's end exactly
    }
    */

    // t0 = -b/a;
    // t1 = (1 - b)/a;
    const tA_B0 = eEstimate(ddDivDd(ddNegativeOf(b),a));
    const tA_B1 = eEstimate(ddDivDd(ddDiffDd([0,1],b),a));

    // t0' = b;
    // t1' = a + b;
    const tB_A0 = eEstimate(b);
    const tB_A1 = eEstimate(ddAddDd(a,b));

    
    //-----------------------------------
    // Get the certified sign of `tA_B0`
    //-----------------------------------
    // tA_B0 = -b/a
    // sgn(tA_B0) = -sgn(b) * sgn(a)
    // a**3 = r0/p0 =>
    // sgn(tA_B0) = sgn(b) * -sgn(r0) * sgn(p0)
    // 3*r0*b = -aaa*p1 + a*r1 =>
    // sgn(b) = sgn(-aaa*p1 + a*r1) * sgn(r0)
    // = sgn(-aaa*p1 + a*r1) 
    // = sgn(-p1*r0/p0 + a*r1)
    // = sgn(-p1*r0 + a*r1*p0) * sign(p0)
    // = sgn(a*r1*p0 - p1*r0) * sign(p0)
    // = sgn((a*r1*p0)**3 - (p1*r0)**3) * sign(p0)
    // = sgn(((r0/p0)*r1**3*p0**3) - p1**3*r0**3) * sign(p0)
    // = sgn((r1**3*p0**2) - p1**3*r0**2) * sign(p0) * sign(r0)

    const [p0,p1,p2,p3] = xyB;
    const [r0,r1,r2,r3] = xyA;

    const sgnB = eSign(eDiff(
        eMult( eMult(r1,eMult(r1,r1)), eMult(p0,p0)),
        eMult( eMult(p1,eMult(p1,p1)), eMult(r0,r0))
    ));

    // the actual sign as if calculated to infinite precision
    const sgn_tA_B0 = -sign(sgnB * eSign(r0));


    const A = eEstimate(a);//?
    const B = eEstimate(b);//?
    const P0 = eEstimate(p0);//?
    const R0 = eEstimate(r0);//?
    const P1 = eEstimate(p1);//?
    const R1 = eEstimate(r1);//?

    //--------------------------------------
    // Get the certified sign of `tA_B0 - 1`
    //--------------------------------------
    // tA_B0 = -b/a - 1
    // sgn(tA_B0) = -sgn(b) * sgn(a)
    // a**3 = r0/p0 =>
    // sgn(tA_B0) = sgn(b) * -sgn(r0) * sgn(p0)
    // 3*r0*b = -aaa*p1 + a*r1 =>
    // sgn(b) = sgn(-aaa*p1 + a*r1) * sgn(r0)
    // = sgn(-aaa*p1 + a*r1) 
    // = sgn(-p1*r0/p0 + a*r1)
    // = sgn(-p1*r0 + a*r1*p0) * sign(p0)
    // = sgn(a*r1*p0 - p1*r0) * sign(p0)
    // = sgn((a*r1*p0)**3 - (p1*r0)**3) * sign(p0)
    // = sgn(((r0/p0)*r1**3*p0**3) - p1**3*r0**3) * sign(p0)
    // = sgn((r1**3*p0**2) - p1**3*r0**2) * sign(p0) * sign(r0)

    let sgn_tA_B0_min1: number;
    if (sgn_tA_B0 <= 0) {
        sgn_tA_B0_min1 = -1;
    } else {
        
    }



    //----------------------------------------
    // Perform a kind of sweep line algorithm
    //----------------------------------------

    const infos = [
        { tA: tA_B0, tB: 0, bez: 'B', start: true },
        { tA: tA_B1, tB: 1, bez: 'B', start: false },
        { tA: 0, tB: tB_A0, bez: 'A', start: true },
        { tA: 1, tB: tB_A1, bez: 'A', start: false }
    ].sort((a,b) => {
        return a.tA - b.tA;
    });

    if (infos[1].bez === infos[0].bez) {
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


    // TODO
    // const tB0Min = tB0 - eps;
    // const tB0Max = tB0 + eps;
    // const tB1Min = tB1 - eps;
    // const tB1Max = tB1 + eps;
}


/**
 * TODO - can this not just be symmetrified into point/bezier intersection?
 * 
 * Returns the intersection range (given as 2 pairs of intersections (`X`s) with 
 * the intersection of `ps1` always the first entry of each pair) where the 
 * endpoints of the two given *algebraically identical* curves 
 * overlap (provided they overlap).
 * 
 * * **precondition:** the two given curves must be *algebraically identical*
 * (i.e. identical except possibly for endpoints). This can be checked for by 
 * calling [[areBeziersInSameKFamily]]. TODO
 * * **precondition:** neither bezier curve may be of order 1 (a point)
 * 
 * @param ps1 an order 1,2 or 3 bezier curve
 * @param ps2 another order 1,2 or 3 bezier curve
 * 
 * @doc mdx
 */
/*
function getEndpointIntersections(
        ps1: number[][],
        ps2: number[][]): X[][] {

    const p1S = ps1[0];
    const p1E = ps1[ps1.length-1];
    const p2S = ps2[0];
    const p2E = ps2[ps2.length-1];
    
    const t2S1 = tFromXY(ps2, p1S);
    const t2E1 = tFromXY(ps2, p1E);
    const t1S2 = tFromXY(ps1, p2S);
    const t1E2 = tFromXY(ps1, p2E);

    const xs: X[][] = [];

    xs.push(
        ...t2S1.map<X[]>(ri => {
            const box = getIntervalBox(ps2, [ri.tS, ri.tE]);
            return [
                { ri: createRootExact(0), kind: 5, box },
                { ri, kind: 5, box }
            ]
        }),
        ...t1S2.map<X[]>(ri => {
            const box = getIntervalBox(ps1, [ri.tS, ri.tE]);
            return [
                { ri, kind: 5, box },
                { ri: createRootExact(0), kind: 5, box }
            ]
        }),
        ...t2E1.map<X[]>(ri => {
            const box = getIntervalBox(ps2, [ri.tS, ri.tE]);
            return [
                { ri: createRootExact(1), kind: 5, box },
                { ri, kind: 5, box }
            ]
        }),        
        ...t1E2.map<X[]>(ri => {
            const box = getIntervalBox(ps1, [ri.tS, ri.tE]);
            return [
                { ri, kind: 5, box },
                { ri: createRootExact(1), kind: 5, box }
            ]
        })
    );

    if (xs.length === 0) { 
        return []; 
    }

    const ri1 = xs[0][0].ri;
    const tS1 = ri1.tS;

    const ri2 = xs[1][0].ri;
    const tS2 = ri2.tS;

    return tS1 <= tS2 ? xs : [xs[1],xs[0]];
}
*/


export { getEndpointIntersections }
