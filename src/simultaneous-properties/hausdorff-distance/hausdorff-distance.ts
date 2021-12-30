import { distanceBetween } from 'flo-vector2d';
import { controlPointLinesLength } from '../../global-properties/length/control-point-lines-length.js';
import { evalDeCasteljau } from '../../local-properties-at-t/t-to-xy/double/eval-de-casteljau.js';
import { fromTo } from '../../transformation/split/from-to.js';
import { closestPointOnBezier } from '../closest-and-furthest-point-on-bezier/closest-point-on-bezier.js';
import { maxAbsCoordinate } from '../../error-analysis/max-abs-coordinate.js';
import { LlRbTree } from 'flo-ll-rb-tree';


const max = Math.max;


// We need to calculate `H(A,B)`, the two sided Hausdorff distance between
// the bezier curves `A` and `B` which equals `max(h(A,B), h(B,A))`, where
// `h(A,B)` is the one sided Hausdorff distance from `A` to `B`

// Let: ωf(σ) = sup{ |f(t) − f(t′)| : t, t′ ∈ [a,b] with |t − t′| ≤ σ }

// where: δS = max[ (1 ≤ i ≤ M+1)(ti − ti−1) ] is the maximum distance between 
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
    hL: number;   // Hausdorff distance left
    hR: number;   // Hausdorff distance right
    hEL: number;  // Hausdorff error left
    hER: number;  // Hausdorff error right
}


/**
 * Calculates and returns the one-sided Hausdorff distance from the bezier 
 * curve `A` to the bezier curve `B` as `[min,max]` where `min` is the minimum
 * guaranteed and `max` is the maximum guaranteed Hausdorff distance. The `min`
 * value will be a *much* more accurate result in general.
 * 
 * * partially based off [Computing the Hausdorff distance between two sets of parametric curves](https://www.semanticscholar.org/paper/COMPUTING-THE-HAUSDORFF-DISTANCE-BETWEEN-TWO-SETS-Kim-McLean/d2bd6529c4b118e389e1db209d8f1bf7467f9016)
 * 
 * @param A a bezier curve (the 'from' curve) given by an ordered array of its control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param B a bezier curve (the 'to' curve) given by an ordered array of its control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param tolerance defaults to `Math.max(maxAbsCoordinate(A),maxAbsCoordinate(B))/1000_000`;
 * if the calculated absolute error bound is less than this, the result is 
 * returned; this is *not* a hard tolerance and the returned bound can be less
 * accurate in hard cases (due to the `maxIterations` parameter). Luckily 
 * however, specifically the lower bound returned will be very accurate due to 
 * its fast convergence is such hard cases (see the paper)
 * @param maxIterations defaults to `50`; if the desired guaranteed error bound 
 * has not been achieved after `maxIterations` then the result will be returned
 * 
 * @doc mdx
 */
 function hausdorffDistanceOneSided(
        A: number[][], 
        B: number[][],
        tolerance?: number,
        maxIterations?: number): [number,number] {

    const l = max(maxAbsCoordinate(A),maxAbsCoordinate(B));
    tolerance = tolerance || l/1000_000;
    maxIterations = maxIterations || 50;

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
        if (bestHUpper - bestHLower < tolerance) {
            // The lower bound is by far the best approximation for difficult cases (see the paper).
            return [bestHLower, bestHUpper];
        }

        if (j++ > maxIterations) {
            // The lower bound is by far the best approximation for difficult cases (see the paper).
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


/**
 * @internal
 */
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
 * @internal
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


/**
 * Calculates and returns the (two-sided) Hausdorff distance from the bezier 
 * curve `A` to the bezier curve `B` as `[min,max]` where `min` is the minimum
 * guaranteed and `max` is the maximum guaranteed Hausdorff distance. The `min`
 * value will be a *much* more accurate result in general.
 * 
 * * partially based off [Computing the Hausdorff distance between two sets of parametric curves](https://www.semanticscholar.org/paper/COMPUTING-THE-HAUSDORFF-DISTANCE-BETWEEN-TWO-SETS-Kim-McLean/d2bd6529c4b118e389e1db209d8f1bf7467f9016)
 * 
 * @param A a bezier curve given by an ordered array of its control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param B a bezier curve given by an ordered array of its control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param tolerance defaults to `Math.max(maxAbsCoordinate(A),maxAbsCoordinate(B))/1000_000`;
 * if the calculated absolute error bound is less than this, the result is 
 * returned; this is *not* a hard tolerance and the returned bound can be less
 * accurate in hard cases (due to the `maxIterations` parameter). Luckily 
 * however, specifically the lower bound returned will be very accurate due to 
 * its fast convergence is such hard cases (see the paper)
 * @param maxIterations defaults to `50`; if the desired guaranteed error bound 
 * has not been achieved after `maxIterations` then the result will be returned
 */
function hausdorffDistance(
        A: number[][], 
        B: number[][],
        tolerance?: number,
        maxIterations?: number) {

    const [lowerAB,upperAB] = hausdorffDistanceOneSided(A,B,tolerance,maxIterations);
    const [lowerBA,upperBA] = hausdorffDistanceOneSided(B,A,tolerance,maxIterations);

    return [max(lowerAB, lowerBA), max(upperAB, upperBA)];
}


export { hausdorffDistance, hausdorffDistanceOneSided }
