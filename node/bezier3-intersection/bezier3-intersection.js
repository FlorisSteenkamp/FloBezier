"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evaluate_1 = require("../evaluate/evaluate");
const check_intersection_in_ranges_1 = require("./check-intersection-in-ranges");
const calc_other_t_1 = require("./calc-other-t");
/**
 * Aaccurate, fast (cubically convergent) algorithm that returns the
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
function bezier3Intersection(ps1, ps2, δ, Δ) {
    // The minimum value Δ can be. If it is too small the algorithm may take too
    // long in cases where the two curves run extremely close to each other for
    // their entire length and curve the same direction.
    const ΔMin = 1e-6;
    // This is an estimate of the relative floating point error during clipping.
    // A bound is given by |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k
    // are the control points indexed by k=0,1,2,3 and η is machine epsilon, 
    // i.e. Number.EPSILON. We quadruple the bound to be sure.
    const δMin = 6 * 4 * 8 * Number.EPSILON;
    // Maximum error - limited to take rounding error into account.
    if (δ === undefined) {
        δ = 0;
    }
    δ = Math.max(δ, δMin);
    if (Δ === undefined) {
        Δ = ΔMin;
    }
    Δ = Math.max(Δ, ΔMin);
    if (typeof _bez_debug_ !== 'undefined') {
        _bez_debug_.generated.elems.beziers.push([ps1, ps2]);
        _bez_debug_.generated.elems.fatLine.push({ l: [[0, 0], [1e-10, 1e-10]], minD: 0, maxD: 0 });
    }
    // Intersection t values for both beziers
    let tss = [];
    let iteration = {
        ps1,
        ps2,
        tRange1: [0, 1],
        tRange2: [0, 1],
        idx: 1
    };
    let stack = [];
    stack.push(iteration);
    while (stack.length !== 0) {
        let { ps1: ps1_, ps2: ps2_, tRange1, tRange2, idx } = stack.pop();
        let { newIterations, t1 } = check_intersection_in_ranges_1.checkIntersectionInRanges(ps1_, ps2_, tRange1, tRange2, idx, δ);
        stack.push(...newIterations);
        if (t1) {
            let pq = idx === 0 ? [ps1, ps2] : [ps2, ps1];
            let t2 = calc_other_t_1.calcOtherT(t1, pq[0], pq[1]);
            if (t2 === undefined) {
                continue;
            }
            let ts = idx === 0 ? [t1, t2] : [t2, t1];
            tss.push(ts);
        }
    }
    if (typeof _bez_debug_ !== 'undefined') {
        for (let ts of tss) {
            _bez_debug_.generated.elems.intersection.push(evaluate_1.evaluate(ps1, ts[0]));
        }
    }
    return tss;
}
exports.bezier3Intersection = bezier3Intersection;
//# sourceMappingURL=bezier3-intersection.js.map