import { distanceBetween } from 'flo-vector2d';
import { closestPointOnBezier } from '../../../src/index.js';
import { evalDeCasteljau } from '../../../src/index.js';
import { controlPointLinesLength } from '../../../src/index.js';
import { fromTo } from '../../../src/index.js';

const max = Math.max;


// We need to calculate `H(A,B)`, the two sided Hausdorff distance between
// the bezier curves `A` and `B` which equals `max(h(A,B), h(B,A))`, where
// `h(A,B)` is the one sided Hausdorff distance from `A` to `B`

// Let: ωf(σ) = sup{ |f(t) − f(t′)| : t, t′ ∈ [a,b] with |t − t′| ≤ σ }

// where: δS = max[ (1≤ i ≤M+1)(ti − ti−1) ] is the maximum distance between 
// two consecutive parameter values

// Lemma 2.1: 
//   h(A,S) ≤ ωf(δS/2) and
//   h(B,T) ≤ ωg(δT/2)

// Theorem 2.3: (both curves discretized)
//   |h(S,T) − h(A,B)| ≤ max[ h(A,S), h(B,T) ] 
//                     ≤ max[ ωf(δS/2), ωg(δT/2) ]
//  

// (only A discretized)
// |h(S,B) − h(A,B)| ≤ ωf(δS/2)


interface IntervalStack {
    tS: number;
    tE: number;
    hL: number;  // Hausdorff distance left
    hR: number;  // Hausdorff distance right
    hEL: number;  // Hausdorff error left
    hER: number;  // Hausdorff error right
}

/**
 * Calculates and returns the one-sided Hausdorff distance from the bezier 
 * curve `A` to the bezier curve `B`.
 * 
 * * partially based off [Computing the Hausdorff distance between two sets of parametric curves](https://www.semanticscholar.org/paper/COMPUTING-THE-HAUSDORFF-DISTANCE-BETWEEN-TWO-SETS-Kim-McLean/d2bd6529c4b118e389e1db209d8f1bf7467f9016)
 * 
 * @param A
 * @param B
 * @param tolerance maximum relative error allowed where relative error is 
 * calculated as `error / (controlPointLinesLength(A) + controlPointLinesLength(B))`
 * 
 * @doc
 */
 
function Hkm(
        A: number[][], 
        B: number[][],
        tolerance = 1/1000_000): number[] {

    const l = controlPointLinesLength(A) + controlPointLinesLength(B);

    // an array of intervals
    let stack: IntervalStack[] = [{ 
        tS: 0, tE: 1, 
        hL: 0, hR: 0, 
        hEL: Number.POSITIVE_INFINITY,
        hER: Number.POSITIVE_INFINITY
    }];

    let j = 0;
    let bestHUpper = Number.POSITIVE_INFINITY;
    let bestHLower = Number.NEGATIVE_INFINITY;
    while (true) {
        const idx = findBestUpperIdx(stack);
        const { tS, tE, hL, hR, hEL, hER } = stack[idx];

        const tM = (tS + tE)/2;
        const [ELL,ELR] = calcHErrorBound(A,tS,tM);
        const [ERL,ERR] = calcHErrorBound(A,tM,tE);

        //---- get hM ---------------------------
        const pM = evalDeCasteljau(A, tM);
        const pB = closestPointOnBezier(B, pM).p;
        const hM = distanceBetween(pM, pB);
        //---------------------------------------

        const h = max(hL, hM, hR);
        if (h > bestHLower) { bestHLower = h; }

        bestHUpper = max(hL + hEL, hR + hER);
        if ((bestHUpper - bestHLower)/l < tolerance) {
            //j
            //stack.length//?
            //stack[0]//?
            //bestHLower; 
            //bestHUpper; 
            return [bestHLower, bestHUpper];
        }

        if (j++ > 100) {
            return [bestHLower, bestHUpper];
        }

        stack.splice(idx, 1, 
            { tS, tE: tM, hL, hR: hM, hEL: ELL, hER: ELR },
            { tS: tM, tE, hL: hM, hR, hEL: ERL, hER: ERR }
        );
        
        
        const newStack: IntervalStack[] = [];
        for (let j=0; j<stack.length; j++) {
            const s = stack[j];
            const { hL, hR, hEL, hER } = s;
            if (max(hL + hEL, hR + hER) > bestHLower) {
                newStack.push(s);
            }
        }

        stack = newStack;
    }
}


function findBestUpperIdx(stack: IntervalStack[]) {
    let best = Number.NEGATIVE_INFINITY;
    let idx = -1;
    for (let j=0; j<stack.length; j++) {
        const s = stack[j];
        const { hL, hR, hEL, hER } = s;
        const m = max(hL + hEL, hR + hER);
        if (m > best) { 
            best = m;
            idx = j;
        }
    }

    return idx;
}


// Let: ωf(σ) = sup{ |f(t) − f(t′)| : t, t′ ∈ [a,b] with |t − t′| ≤ σ }
//
// |h(S,B) − h(A,B)| ≤ ωf(δS/2)
// where: δS = max_(1≤i≤M+1)[ (ti − ti−1) ] is the maximum distance between 
// two consecutive parameter values
/**
 * 
 * @param ts the test parameter values - there must be at least 2
 * @param A 
 * @param B 
 */
function calcHErrorBound(
        A: number[][],
        tS: number,
        tE: number) {

    // To calculate an upper bound for ωf(δS/2) we can either check the max 
    // absolute tangent values on curve segments or use the control point 
    // lengths as an upper bound.

    const tM = (tE + tS) / 2;  // since the formula says `δS/2` so divide by 2
    const psL = fromTo(A, tS, tM).ps;
    const psR = fromTo(A, tM, tE).ps;
    const eL = controlPointLinesLength(psL);
    const eR = controlPointLinesLength(psR);

    return [eL,eR];
}


function HHkm(
        A: number[][], 
        B: number[][],
        tolerance = 1/1000_000) {

    const [lowerAB,upperAB] = Hkm(A,B,tolerance);
    const [lowerBA,upperBA] = Hkm(B,A,tolerance);

    return [max(lowerAB, lowerBA), max(upperAB, upperBA)];
}


export { HHkm, Hkm }

// 187