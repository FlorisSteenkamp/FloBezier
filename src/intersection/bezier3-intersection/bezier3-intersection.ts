import type { __Debug__, IterationExtras } from './debug';
import type { Iteration } from './iteration';
import { checkIntersectionInRanges as _checkIntersectionInRanges } from './check-intersection-in-ranges';
import { bezierBezierIntersection, getOtherTs } from '../bezier-bezier-intersection/bezier-bezier-intersection';

declare var __debug__: __Debug__;

const checkIntersectionInRanges = _checkIntersectionInRanges;


// TODO - add back quadratic and linear cases


/** 
 * The guarantee in accuracy of the `t` parameter value chosen to be reasonable 
 * for this type of intersection algorithm.
 */
const δ = 2**(-33);  // 2**(-33) === 1.1641532182693481e-10


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
    let tss: number[][][] = [];

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
    const maxIters = 60;  
    while (stack.length !== 0 && iters < maxIters) {
        iters++;
        const iter = stack.pop();

        if (typeof __debug__ !== 'undefined' && !__debug__.already) {
            __debug__.currentIter = iter;
        }

        let newIterations = checkIntersectionInRanges(iter);

        if (newIterations.length === 1) {
            const newIter = newIterations[0];
            const fRange = newIter.fRange;

            if (Math.abs(fRange[1] - fRange[0]) < δ) {
                if (newIter.last) {
                    tss.push(iter.F === ps2
                        ? [fRange, newIter.last.fRange]
                        : [newIter.gRange, newIter.last.gRange]
                    );
                } else {
                    if (typeof __debug__ !== 'undefined' && !__debug__.already) {
                        (newIter as Iteration & IterationExtras).foundX = true;
                    }
                    newIter.last = newIter;
                    stack.push(newIter);
                }
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
        // fall back to implicitization (about 10x slower)
        // TODO - ensure implicitization works perfectly
        const rs = bezierBezierIntersection(ps1,ps2);
        const xPairs = getOtherTs(ps1, ps2, rs);
        if (!xPairs) { return []; } 

        return xPairs.map(xPair => [
            [xPair[0].ri.tS, xPair[0].ri.tE],
            [xPair[1].ri.tS, xPair[1].ri.tE]]
        );
    }

    return tss;
}


export { bezier3Intersection }
