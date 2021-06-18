import type { __Debug__, IterationExtras } from './debug';
import type { Iteration } from './iteration';
import { checkIntersectionInRanges as _checkIntersectionInRanges } from './check-intersection-in-ranges';
import { bezierBezierIntersection, getOtherTs } from '../bezier-bezier-intersection/bezier-bezier-intersection';
import { toString } from '../..';

declare var __debug__: __Debug__;

const checkIntersectionInRanges = _checkIntersectionInRanges;

const min = Math.min;
const max = Math.max;
const abs = Math.abs;

// TODO - add back quadratic and linear cases


/** 
 * The guarantee in accuracy of the `t` parameter value chosen to be reasonable 
 * for this type of intersection algorithm.
 */
const δ = 2**(-33);  // 2**(-33) === 1.1641532182693481e-10
/** a heuristic value for the minimum t-span of the final iteration */
const Δ = 2**(-43);  // 2**(-43) === 1.1368683772161603e-13


/**
 * Accurate, fast (*eventually* cubically convergent) algorithm that returns 
 * the intersections between two bezier curves.
 * 
 * * returns an array that contains the `t` paramater pairs at intersection 
 * of the first and second bezier curves respectively.
 * 
 * * the algorithm is based on a paper at http://scholarsarchive.byu.edu/cgi/viewcontent.cgi?article=2206&context=etd 
 * that finds the intersection of a fat line and a so-called geometric interval
 * making it faster than the standard fat-line intersection algorithm (that
 * is *eventually* quadratically convergent)
 * * *eventually* cubically convergent (usually converging in about 4 to 8 
 * iterations for typical intersections) but for hard intersections can become 
 * extremely slow due to sub-linear convergence (and similarly for all fatline
 * algorithms) in those cases; luckily this algorithm detects those cases and
 * reverts to implicitization with strict error bounds to guarantee accuracy
 * and efficiency (implicitization is roughly 10x slower but is rare)
 * 
 * @param ps1 a bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param ps2 another bezier curve
 */

function bezier3Intersection(
        ps1: number[][], 
        ps2: number[][]): number[][][] {

    /** Intersection t values for both beziers */
    let xs: number[][][] = [];

    /** an iteration still left to check for intersections */
    let iteration: Iteration = { 
        F: ps1, 
        G: ps2,
        fRange: [0,1], 
        gRange: [0,1],
        last: undefined
    };

    let stack = [iteration];

    if (typeof __debug__ !== 'undefined' && !__debug__.already) {
        __debug__.tree = iteration;
    }

    let iters = 0;
    // A slight improvement to the algorithm may be possible by doing a 
    // breath-first (rather than depth-first) traversal and reverting to 
    // implicitization once the tree reaches a certain width
    /** max iteration heuristic before doing implicitization */
    const maxIters = 60;   // TODO - make about 60
    while (stack.length !== 0 && iters < maxIters) {
        iters++;
        const iter = stack.pop();
        const swapped = iter.F === ps2;

        if (typeof __debug__ !== 'undefined' && !__debug__.already) {
            __debug__.currentIter = iter;
            (iter as Iteration & IterationExtras).uid = __debug__.uid++;
        }

        let newIterations = checkIntersectionInRanges(iter, swapped);

        if (newIterations.length === 1) {
            const newIter = newIterations[0];
            const fRange = newIter.fRange;

            const δδ = abs(fRange[1] - fRange[0]);

            // if the previous iteration was precise enough
            if (newIter.last) {
                const lfRange = newIter.last.fRange;

                if (δδ > δ) {
                    // This case can occur when the geometric interval clips a
                    // piece of the other bezier very far away but is by 
                    // coincidence of length < δ.
                    // It can also occur in some other edge cases such as 
                    // self-overlapping cubic curves, etc.

                    // revert to implicitization
                    return implicit(ps1, ps2);  
                }

                xs.push(swapped
                    ? [fRange, lfRange]
                    : [lfRange, fRange]
                );
            // else if this iteration is precise enough
            } else if (δδ < δ) {
                if (typeof __debug__ !== 'undefined' && !__debug__.already) {
                    (newIter as Iteration & IterationExtras).foundX = true;
                }
                if (δδ < Δ) {
                    // destructively change the `fRange` as a heuristic so its not
                    // too narrow for the final clip; this might only be a 
                    // problem if `fRange === 0` 
                    fRange[0] = max(0, fRange[0] - Δ);
                    fRange[1] = min(1, fRange[1] + Δ);
                }
                newIter.last = newIter;
                stack.push(newIter);  // push the final iteration
            } else {
                stack.push(newIter);
            }
        } else if (newIterations.length === 2) {
            stack.push(...newIterations);
        }
    }

    if (typeof __debug__ !== 'undefined') {
        // prevent further debugging
        __debug__.already = true;
    }

    if (iters === maxIters) {
        return implicit(ps1, ps2);
    }


    //---------------------------------------------------------------
    // check for possible duplicate intersections at split points
    //---------------------------------------------------------------
    xs.sort((x1, x2) => x1[0][0] - x2[0][0]);

    combineXs(xs);

    //console.log(xs.map(x => x[0][0]))

    //if (xs.length === 6) {
    //    console.log(toString(ps1))
    //    console.log(toString(ps2))
    //}

    return xs;
}


function combineXs(xs: number[][][]) {
    let testAgain = true;
    while (testAgain) {
        testAgain = false;
        for (let i=1; i<xs.length; i++) {
            const x1bez1 = xs[i-1][0];
            const x2bez1 = xs[i][0];
            // if the prior tmax value is higher than the next t value's tmin
            // then they overlap
            if (x1bez1[1] >= x2bez1[0]) {  // if overlap found
                // Check if the second bezier's `t` values also overlap, else we
                // have a loop getting intersected at its self-intersection point.
                const x1bez2 = xs[i-1][1];
                const x2bez2 = xs[i][1];
                const x1min = x1bez2[0];
                const x1max = x1bez2[1];
                const x2min = x2bez2[0];
                const x2max = x2bez2[1];

                const overlap = 
                    (x1min <= x2max && x1max >= x2min) ||
                    (x2min <= x1max && x2max >= x1min);

                if (overlap) {
                    // combine ranges and test agin
                    testAgain = true;

                    const tMinBez2 = min(x1min, x1max, x2min, x2max);
                    const tMaxBez2 = max(x1min, x1max, x2min, x2max);
                    
                    const x1min1 = x1bez1[0];
                    const x1max1 = x1bez1[1];
                    const x2min1 = x2bez1[0];
                    const x2max1 = x2bez1[1];

                    const tMinBez1 = min(x1min1, x1max1, x2min1, x2max1);
                    const tMaxBez1 = max(x1min1, x1max1, x2min1, x2max1);

                    const x: number[][] = [
                        [tMinBez1, tMaxBez1], 
                        [tMinBez2, tMaxBez2]
                    ];

                    // insert new combined intersection
                    xs.splice(i-1, 2, x);

                    break;  // break out of inner loop
                }
            }
        }
    }
}


// rename
function implicit(
        ps1: number[][], 
        ps2: number[][]): number[][][] {

    // fall back to implicitization (about 5x slower)
    // TODO - ensure implicitization works perfectly
    const rs = bezierBezierIntersection(ps1,ps2);
    const xPairs = getOtherTs(ps1, ps2, rs);
    if (!xPairs) { return []; } 

    return xPairs.map(xPair => [
        [xPair[0].ri.tS, xPair[0].ri.tE],
        [xPair[1].ri.tS, xPair[1].ri.tE]]
    );
}


export { bezier3Intersection }
