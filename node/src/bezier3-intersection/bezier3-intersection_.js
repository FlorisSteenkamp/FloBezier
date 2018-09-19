"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const coincident_1 = require("../coincident");
const from_to_1 = require("../from-to");
const get_distance_to_line_function_1 = require("./get-distance-to-line-function");
const calc_other_t_1 = require("./calc-other-t");
const geo_clip_1 = require("./geo-clip");
const center_1 = require("./center");
/**
 * Extremely accurate and extremely fast (cubically convergent in general with
 * fast iteration steps) algorithm that returns the intersections between two
 * cubic beziers.
 *
 * At stretches where the two curves run extremely close to (or on top of) each
 * other and curve the same direction an interval is returned instead of a
 * point. This tolerance can be set by the Δ parameter.
 *
 * The algorithm is based on a <a href="http://scholarsarchive.byu.edu/cgi/viewcontent.cgi?article=2206&context=etd">paper</a>
 * that finds the intersection of a fat line and a so-called geometric interval
 * making it faster and more accurate than the standard fat-line intersection
 * algorithm. The algorithm has been modified to prevent run-away recursion
 * by checking for coincident pieces at subdivision steps.
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
    const δMin = 24 * Number.EPSILON;
    // Maximum error - limited to take rounding error into account.
    if (δ === undefined) {
        δ = 0;
    }
    δ = Math.max(δ, δMin);
    if (Δ === undefined) {
        Δ = ΔMin;
    }
    Δ = Math.max(Δ, ΔMin);
    // Intersection t values for both beziers
    let tss = [];
    f(ps1, ps2, [0, 1], [0, 1], 1);
    return tss;
    // Helper function
    function f(Q_, P_, qRange, pRange, idx) {
        let cidx = idx === 0 ? 1 : 0; // Counter flip-flop index
        // Move intersection toward the origin to prevent floating point issues
        // that are introduced specifically by the getLineEquation function. 
        // This allows us to get a relative error in the final result usually in 
        // the 10 ULPS or less range.
        [P_, Q_] = center_1.center(P_, Q_);
        let [Q0, , , Q3] = Q_;
        // Get the implict line equation for the line defined by the first and 
        // last control point of Q. This equation gives the distance between any 
        // point and the line.
        let dQ = get_distance_to_line_function_1.getDistanceToLineFunction([Q0, Q3]);
        // Calculate the distance from the control points of Q to the line 
        let dQi = (i) => dQ(Q_[i]);
        let dQs = [1, 2].map(dQi);
        let [dQ1, dQ2] = dQs;
        // Calculate the fat line of Q.
        let C = (dQ1 * dQ2 > 0) ? 3 / 4 : 4 / 9;
        let dMin = C * Math.min(0, dQ1, dQ2);
        let dMax = C * Math.max(0, dQ1, dQ2);
        let { tMin, tMax } = geo_clip_1.geoClip(P_, dQ, dMin, dMax);
        if (tMin === Number.POSITIVE_INFINITY) {
            return; // No intersection
        }
        // The paper calls for a heuristic that if less than 30% will be
        // clipped, rather split the longest curve and find intersections in the
        // two halfs seperately.
        if (tMax - tMin > 0.7) {
            // Some length measure
            let pSpan = pRange[1] - pRange[0];
            let qSpan = qRange[1] - qRange[0];
            let pq = coincident_1.coincident(P_, Q_);
            if (pq !== undefined) {
                return;
            }
            // Split the curve in half
            if (pSpan <= qSpan) {
                cidx = idx;
                [P_, Q_] = [Q_, P_];
                [pRange, qRange] = [qRange, pRange];
            }
            // Update t range.
            let span = pRange[1] - pRange[0];
            // 1st half
            let tMinA = pRange[0];
            let tMaxA = tMinA + span / 2;
            // 2nd half
            let tMinB = tMaxA;
            let tMaxB = pRange[1];
            let A = from_to_1.fromTo(P_)(0, 0.5);
            let B = from_to_1.fromTo(P_)(0.5, 1);
            f(A, Q_, [tMinA, tMaxA], qRange, cidx);
            f(B, Q_, [tMinB, tMaxB], qRange, cidx);
            return;
        }
        // Update t range.
        let span = pRange[1] - pRange[0];
        let tMin_ = (tMin * span + pRange[0]);
        let tMax_ = (tMax * span + pRange[0]);
        // Clip
        P_ = from_to_1.fromTo(P_)(tMin, tMax);
        if (Math.abs(tMax_ - tMin_) < δ) {
            let t1 = (tMax_ + tMin_) / 2;
            let pq = idx === 0 ? [ps1, ps2] : [ps2, ps1];
            let t2 = calc_other_t_1.calcOtherT(t1, pq[0], pq[1]);
            if (t2 === undefined) {
                return undefined;
            }
            let ts = idx === 0 ? [t1, t2] : [t2, t1];
            tss.push(ts);
            return;
        }
        // Swap Q and P and iterate.
        f(P_, Q_, [tMin_, tMax_], qRange, cidx);
    }
}
exports.bezier3Intersection = bezier3Intersection;

//# sourceMappingURL=bezier3-intersection_.js.map
