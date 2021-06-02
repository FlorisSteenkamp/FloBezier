import { Iteration } from './iteration';
import { checkIntersectionInRanges as _checkIntersectionInRanges } from './check-intersection-in-ranges';
import { calcOtherT as _calcOtherT } from './calc-other-t';
import { IterationExtras, __debug__ } from './debug';
import { toString } from '../../index';
import { bezierBezierIntersection, getOtherTs } from '../bezier-bezier-intersection/bezier-bezier-intersection';


const checkIntersectionInRanges = _checkIntersectionInRanges;
const calcOtherT = _calcOtherT;

//declare var __debug__: __Debug__;


// This is an estimate of the relative floating point error during clipping.
// A bound is given by |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k
// are the control points indexed by k=0,1,2,3 and η is machine epsilon, 
// i.e. Number.EPSILON. We quadruple the bound to be sure.
//const δMin = 6*4*8*Number.EPSILON; 


// TODO - investigate "algebraic pruning technique of [15]" (see paper).


// TODO - add back quadratic and linear cases

let jj = 0;
const δ = 2**(-33);  // 2**(-33) === 1.1641532182693481e-10

/**
 * Accurate, fast (cubically convergent) algorithm that returns the 
 * intersections between two bezier curves.
 *
 * * the algorithm is based on a paper at http://scholarsarchive.byu.edu/cgi/viewcontent.cgi?article=2206&context=etd 
 * that finds the intersection of a fat line and a so-called geometric interval
 * making it faster than the standard fat-line intersection algorithm.
 * * cubically convergent (usually converging in about 4 to 8 iterations for 
 * typical intersections)
 * 
 * @param ps1 a bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param ps2 another bezier curve
 * @returns An array that contains the t-value pairs at intersection 
 * of the first and second beziers respectively.
 */

function bezier3Intersection(
        ps1: number[][], 
        ps2: number[][]): number[][] {

    /** Intersection t values for both beziers */
    let tss: number[][] = [];

    /** an iteration still left to check for intersections */
    let iteration: Iteration = { 
        F: ps1, 
        G: ps2,
        fRange: [0,1], 
        gRange: [0,1],
    };

    let stack: Iteration[] = [];
    stack.push(iteration);

    if (typeof __debug__ !== 'undefined' && !__debug__.already) {
        __debug__.iters.push(iteration);
        __debug__.tree = iteration; 
    }

    let iters = 0;
    const maxIters = 70;  // TODO - tweak this value
    while (stack.length !== 0 && iters < maxIters) {
        iters++;
        const iter = stack.pop();

        if (typeof __debug__ !== 'undefined' && !__debug__.already) {
            __debug__.currentIter = iter;
        }


        // TODO - `checkIntersectionInRanges` can just return iterations
        //let { newIterations, t1 } = checkIntersectionInRanges(iter);
        let newIterations = checkIntersectionInRanges(iter);

        if (newIterations.length === 1) {
            const newIter = newIterations[0];
            const fRange = newIter.fRange;
            const tMin = fRange[0];
            const tMax = fRange[1];

            if (Math.abs(tMax - tMin) < δ) {
                // Accurate enough solution found
                const t1 = (tMax + tMin) / 2;

                //let t = iter.F !== ps1 ? t1 : calcOtherT(t1, ps2, ps1);
                let t = iter.F !== ps1 ? t1 : t1;
                tss.push([t]);

                if (typeof __debug__ !== 'undefined' && !__debug__.already) {
                    (newIter as Iteration & IterationExtras).foundX = true;
                    //console.log('DFOU')
                }
            } else {
                stack.push(newIter);
            }
        } else {
            stack.push(...newIterations);
        }

        //if (t1) {
        //    //let t = iter.F !== ps1 ? t1 : calcOtherT(t1, ps2, ps1);
        //    let t = iter.F !== ps1 ? t1 : t1;
        //    tss.push([t]);
        //}
    }

    // TODO - remove below later
    if (iters === maxIters && jj < 100) { 
        console.log(jj++);
    }
    
    if (typeof __debug__ !== 'undefined') {
        // prevent further debugging
        __debug__.already = true;
    }

    if (iters === maxIters) {
        // fall back to implicitization (about 10x slower)
        const rs = bezierBezierIntersection(ps1,ps2);
        const xs = getOtherTs(ps1, ps2, rs);
        if (!xs) { return []; } 

        return xs.map(x => [(x[0].ri.tE + x[0].ri.tS) / 2]);
    }

    return tss;
}


export { bezier3Intersection }
