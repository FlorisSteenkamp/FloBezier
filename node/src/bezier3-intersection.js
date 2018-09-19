"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_poly_1 = require("flo-poly");
const Vector = require("flo-vector2d");
const evaluate_1 = require("./evaluate");
const coincident_1 = require("./coincident");
const from_to_1 = require("./from-to");
const to_hybrid_quadratic_1 = require("./to-hybrid-quadratic");
const get_distance_to_line_function_1 = require("./get-distance-to-line-function");
const ts_at_x_1 = require("./ts-at-x");
const ts_at_y_1 = require("./ts-at-y");
const dst = Vector.distanceBetween;
const sdst = Vector.squaredDistanceBetween;
/**
 * Robust, extremely accurate and extremely fast (cubically convergent in
 * general with fast iteration steps) algorithm that returns the intersections
 * between two cubic beziers.
 *
 * At stretches where the two curves run extremely close to (or on top of) each
 * other and curve the same direction an interval is returned instead of a
 * point.
 *
 * The algorithm is based on a <a href="http://scholarsarchive.byu.edu/cgi/viewcontent.cgi?article=2206&context=etd">paper</a>
 * that finds the intersection of a fat line and a so-called geometric interval
 * making it faster and more accurate than the standard fat-line intersection
 * algorithm. The algorithm has been modified to prevent run-away recursion
 * by checking for coincident pieces at subdivision steps.
 *
 * @param ps1 - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param ps2 - Another cubic bezier
 * @param [δ] - An optional tolerance to within which the t parameter
 * should be calculated - defaults to the minimum value of 24*Number.EPSILON or
 * approximately 5e-15. Note that it might not make sense to set this to as
 * large as say 1e-5 since only a single iteration later the maximum accuracy
 * will be attained and not much speed will be gained anyway. Similarly if δ is
 * set to 1e-2 only two iterations will be saved. This is due to the algorithm
 * being cubically convergent (usually converging in about 4 to 8 iterations for
 * typical intersections).
 * @param [Δ] - A tolerance that indicates how closely a stretch of the
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
    //let iterations = 0;
    intersection(ps1, ps2, [0, 1], [0, 1], 1);
    //console.log(iterations);
    return tss;
    // Helper function
    function intersection(Q_, P_, qRange, pRange, idx) {
        //iterations++;
        let cidx = idx === 0 ? 1 : 0; // Counter flip-flop index
        // Move intersection toward the origin to prevent serious floating point 
        // issues that are introduced specifically by the getLineEquation 
        // function. This allows us to get a relative error in the final 
        // result usually in the 10 ULPS or less range.
        [P_, Q_] = center(P_, Q_);
        let [Q0, Q1, Q2, Q3] = Q_;
        let [P0, P1, P2, P3] = P_;
        // Get the implict line equation for the line from the first to the last
        // control point of Q. This equation gives the distance between any 
        // point and the line.
        let dQ = get_distance_to_line_function_1.getDistanceToLineFunction([Q0, Q3]);
        // Calculate the distance from the control points of Q to the line 
        // [Q0,Q3].
        let dQi = (i) => dQ(Q_[i]);
        let dQs = [1, 2].map(dQi);
        let [dQ1, dQ2] = dQs;
        // Calculate the fat line of Q.
        let C = (dQ1 * dQ2 > 0) ? 3 / 4 : 4 / 9;
        let dMin = C * Math.min(0, dQ1, dQ2);
        let dMax = C * Math.max(0, dQ1, dQ2);
        let { tMin, tMax } = geoClip(P_, dQ, dMin, dMax);
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
            intersection(A, Q_, [tMinA, tMaxA], qRange, cidx);
            intersection(B, Q_, [tMinB, tMaxB], qRange, cidx);
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
            let t2 = calcOtherT(t1, pq[0], pq[1]);
            if (t2 === undefined) {
                return undefined;
            }
            let ts = idx === 0 ? [t1, t2] : [t2, t1];
            tss.push(ts);
            return;
        }
        // Swap Q and P and iterate.
        intersection(P_, Q_, [tMin_, tMax_], qRange, cidx);
    }
}
exports.bezier3Intersection = bezier3Intersection;
/**
 * @private
 * @param P
 * @param dQ
 * @param dMin
 * @param dMax
 */
function geoClip(P, dQ, dMin, dMax) {
    let dPi = (i) => dQ(P[i]);
    let dPs = [0, 1, 2, 3].map(dPi);
    let [dP0, dP1, dP2, dP3] = dPs;
    let hq = to_hybrid_quadratic_1.toHybridQuadratic(P);
    let dH0 = dQ(hq[0]);
    let dH2 = dQ(hq[2]);
    let dH10 = dQ(hq[1][0]);
    let dH11 = dQ(hq[1][1]);
    let dHmin = Math.min(dH10, dH11);
    let dHmax = Math.max(dH10, dH11);
    let DyMin = [
        dH0 - 2 * dHmin + dH2,
        -2 * dH0 + 2 * dHmin,
        dH0
    ];
    let DyMax = [
        dH0 - 2 * dHmax + dH2,
        -2 * dH0 + 2 * dHmax,
        dH0
    ];
    let errorBound = 2 * Math.max(flo_poly_1.default.hornerErrorBound(DyMin, 1), flo_poly_1.default.hornerErrorBound(DyMax, 1));
    dMin = dMin - errorBound;
    dMax = dMax + errorBound;
    let DyMinMin = DyMin.slice();
    DyMinMin[2] = DyMinMin[2] - dMin;
    let DyMinMax = DyMin.slice();
    DyMinMax[2] = DyMinMax[2] - dMax;
    let DyMaxMin = DyMax.slice();
    DyMaxMin[2] = DyMaxMin[2] - dMin;
    let DyMaxMax = DyMax.slice();
    DyMaxMax[2] = DyMaxMax[2] - dMax;
    let tMin = Number.POSITIVE_INFINITY;
    let tMax = Number.NEGATIVE_INFINITY;
    let rootsMinMin = flo_poly_1.default.allRoots(DyMinMin, 0, 1);
    let rootsMinMax = flo_poly_1.default.allRoots(DyMinMax, 0, 1);
    let rootsMaxMin = flo_poly_1.default.allRoots(DyMaxMin, 0, 1);
    let rootsMaxMax = flo_poly_1.default.allRoots(DyMaxMax, 0, 1);
    tMin = Math.min(...rootsMinMin, ...rootsMinMax, ...rootsMaxMin, ...rootsMaxMax);
    tMax = Math.max(...rootsMinMin, ...rootsMinMax, ...rootsMaxMin, ...rootsMaxMax);
    if (dH0 >= dMin && dH0 <= dMax) {
        tMin = 0;
    }
    if (dH2 >= dMin && dH2 <= dMax) {
        tMax = 1;
    }
    if (tMin < 0) {
        tMin = 0;
    }
    if (tMax > 1) {
        tMax = 1;
    }
    return { tMin, tMax };
}
/**
 * Return the given two beziers but translated such that the shorter (by
 * some length measure) is closer to the origin.
 * @private
 * @param P
 * @param Q
 */
function center(P, Q) {
    let [P0, P1, P2, P3] = P;
    let [Q0, Q1, Q2, Q3] = Q;
    let lengthP = sdst(P0, P1) + sdst(P1, P2) + sdst(P2, P3);
    let lengthQ = sdst(Q0, Q1) + sdst(Q1, Q2) + sdst(Q2, Q3);
    let moveX;
    let moveY;
    if (lengthQ < lengthP) {
        moveX = (Q0[0] + Q1[0] + Q2[0] + Q3[0]) / 4;
        moveY = (Q0[1] + Q1[1] + Q2[1] + Q3[1]) / 4;
    }
    else {
        moveX = (P0[0] + P1[0] + P2[0] + P3[0]) / 4;
        moveY = (P0[1] + P1[1] + P2[1] + P3[1]) / 4;
    }
    P = P.map(x => [x[0] - moveX, x[1] - moveY]);
    Q = Q.map(x => [x[0] - moveX, x[1] - moveY]);
    return [P, Q];
}
/**
 * Calculates the t-value of the closest point on Q to P(t).
 * @ignore
 * @param {number}
 * @param Q
 * @param P
 */
function calcOtherT(t, P, Q) {
    let pp = evaluate_1.evaluate(P)(t);
    let [x, y] = pp;
    let tqsh = ts_at_y_1.tsAtY(Q, y);
    let tqsv = ts_at_x_1.tsAtX(Q, x);
    if (!tqsh.length && !tqsv.length) {
        return undefined;
    }
    let tqs = [...tqsh, ...tqsv];
    let bestT = undefined;
    let bestD = Number.POSITIVE_INFINITY;
    for (let tq of tqs) {
        let pq = evaluate_1.evaluate(Q)(tq);
        let d = sdst(pp, pq);
        if (d < bestD) {
            bestD = d;
            bestT = tq;
        }
    }
    return bestT;
}

//# sourceMappingURL=bezier3-intersection.js.map
