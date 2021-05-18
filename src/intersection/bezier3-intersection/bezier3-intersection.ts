import { Iteration } from './iteration';
import { checkIntersectionInRanges as _checkIntersectionInRanges } from './check-intersection-in-ranges';
import { calcOtherT as _calcOtherT } from './calc-other-t';

const checkIntersectionInRanges = _checkIntersectionInRanges;
const calcOtherT = _calcOtherT;


// This is an estimate of the relative floating point error during clipping.
// A bound is given by |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k
// are the control points indexed by k=0,1,2,3 and η is machine epsilon, 
// i.e. Number.EPSILON. We quadruple the bound to be sure.
const δMin = 6*4*8*Number.EPSILON; 

let jj = 0;

/**
 * * **DO NOT USE!** Use bezierBezierIntersectionImplicit instead.
 *  
 * Accurate, fast (cubically convergent) algorithm that returns the 
 * intersections between two cubic beziers.
 *
 * At stretches where the two curves run extremely close to (or on top of) each 
 * other and curve the same direction an interval is returned instead of a 
 * point. This tolerance can be set by the Δ parameter.
 *
 * The algorithm is based on a paper at http://scholarsarchive.byu.edu/cgi/viewcontent.cgi?article=2206&context=etd 
 * that finds the intersection of a fat line and a so-called geometric interval
 * making it faster than the standard fat-line intersection algorithm. The 
 * algorithm has been modified to prevent run-away recursion by checking for 
 * coincident pieces at subdivision steps.
 * 
 * @param ps1 - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param ps2 - Another cubic bezier
 * @param δ - An optional tolerance to within which the t parameter
 * should be calculated - defaults to the minimum value of 24*Number.EPSILON or 
 * approximately 5e-15. Note that it might not make sense to set this to as 
 * large as say 1e-5 since only a single iteration later the maximum accuracy 
 * will be attained and not much speed will be gained anyway. Similarly if δ is 
 * set to 1e-2 only two iterations will be saved. This is due to the algorithm 
 * being cubically convergent (usually converging in about 4 to 8 iterations for 
 * typical intersections).
 * @param Δ - A tolerance that indicates how closely a stretch of the 
 * beziers can run together before being considered coincident. Defaults to the
 * minimum possible value of 1e-6 if not specified.
 * @returns An array that contains the t-value pairs at intersection 
 * of the first and second beziers respectively. The array can also contain t
 * range pairs for coincident pieces that can be either used or ignored
 * depending on the application, e.g. the return value might be [[0.1,0.2],
 * [0.3,0.5],[[0.4,0.5],[0.6,0.7]]] that indicates intersection points at t 
 * values of t1=0.1 and t2=0.2 for the first and second bezier respectively as 
 * well as at t1=0.3 and t2=0.5 and finally indicates the curves to be nearly 
 * coincident from t1=0.4 to t1=0.5 for the first bezier and t2=0.6 to t=0.7 for
 * the second bezier.
 */
function bezier3Intersection(
        ps1: number[][], 
        ps2: number[][], 
        δ?: number): number[] {

    // Maximum error - limited to take rounding error into account.
    if (δ === undefined) { δ = 0; }
    δ = Math.max(δ, δMin);

    // Intersection t values for both beziers
    //let tss: number[][] = []; 	
    // Intersection t values for ps1
    let tss: number[] = [];

    let iteration: Iteration = { 
        ps1, 
        ps2, 
        tRange1: [0,1], 
        tRange2: [0,1],
        idx: 1
    };

    let stack: Iteration[] = [];
    stack.push(iteration);

    let iters = 0;
    //const maxIters = 30; // roughly 1/100 for random points in square
    const maxIters = 50; // roughly 1/10,000 for random points in square
    //const maxIters = 80; // roughly < 1/1000,000 for random points in square
    while (stack.length !== 0 && iters < maxIters) {
        iters++;
        let { ps1: ps1_, ps2: ps2_, tRange1, tRange2, idx } = stack.pop();
        let { newIterations, t1 } = checkIntersectionInRanges(
            ps1_, ps2_, tRange1, tRange2, idx, δ
        );

        stack.push(...newIterations);

        if (t1) {
            let pq = idx === 0 ? [ps1,ps2] : [ps2,ps1];
            //let t2 = calcOtherT(t1, pq[0], pq[1]);
            //if (t2 === undefined) {	continue; }
            //let ts = idx === 0 ? [t1,t2] : [t2,t1];
            //tss.push(ts);
            // mmm...
            let t = idx === 0 ? t1 : calcOtherT(t1, pq[0], pq[1]);
            //let t = idx === 0 ? t1 : 0;
            tss.push(t);
        }
    }

    //if (iters === maxIters) { console.log(jj++)}

    return tss;
}


export { bezier3Intersection }
