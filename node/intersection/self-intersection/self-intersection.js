"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_coeffs_3_1 = require("./naive/get-coeffs-3");
const get_coeffs_3_2 = require("./exact/get-coeffs-3-");
const flo_numerical_1 = require("flo-numerical");
const error_analysis_1 = require("../../error-analysis/error-analysis");
const eps = Number.EPSILON;
const abs = Math.abs;
const edif = flo_numerical_1.expansionDiff;
const epr = flo_numerical_1.expansionProduct;
const sce = flo_numerical_1.scaleExpansion2;
const qno = flo_numerical_1.qNegativeOf;
const qaq = flo_numerical_1.qAddQuad;
const qm2 = flo_numerical_1.qMultBy2;
const qdivq = flo_numerical_1.qDivQuad;
/**
 * Returns the self-intersection t values of the given bezier curve if it
 * exists and if both t-values are in [0,1], else returns undefined.
 * * **precondition**: max bit-aligned bitlength: 47
 * * only cubic (or higher order) bezier curves have self-intersections
 * * see http://www.mare.ee/indrek/misc/2d.pdf
 * * the returned t values are within 1 ulp accurate
 * @param ps A cubic bezier curve.
 */
function bezierSelfIntersection(ps) {
    if (ps.length < 4) {
        // lines and quadratics don't have self-intersections (except of course
        // degenerate quadratics).
        return undefined;
    }
    // Apply fast pre-filter - we assume without good reason that about 1 in 10 
    // beziers will have a cusp.
    // First get fast naively calculated coefficients
    let { coeffs: [a, b, c], errBound: [a_, b_, c_] } = get_coeffs_3_1.getCoeffs3(ps);
    // if error in a cannot discern it from zero
    if (abs(a) <= a_) {
        // it is rare to get here 
        // check for sure if a === 0 exactly
        let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
        let a3 = x3 - 3 * x2 + 3 * x1 - x0; // <= exact if max bit-aligned bitlength <= 50
        let a2 = 3 * x2 - 6 * x1 + 3 * x0; // <= exact if max bit-aligned bitlength <= 49
        let b3 = y3 - 3 * y2 + 3 * y1 - y0; // <= exact if max bit-aligned bitlength <= 50
        let b2 = 3 * y2 - 6 * y1 + 3 * y0; // <= exact if max bit-aligned bitlength <= 49
        let a2b3 = flo_numerical_1.twoProduct(a2, b3);
        let a3b2 = flo_numerical_1.twoProduct(a3, b2);
        if (a2b3[0] === a3b2[0] && a2b3[1] === a3b2[1]) {
            return undefined; // a === 0 => no roots possible
        }
    }
    // DD = discriminant = b^2 - 4ac
    // calculate DD and its absolute error DD_
    let bb = b * b;
    let bb_ = 2 * b_ * abs(b) + error_analysis_1.γ1 * bb; // the error in b**2
    let ac4 = 4 * a * c;
    let ac4_ = 4 * (a_ * abs(c) + abs(a) * c_) + error_analysis_1.γ1 * abs(ac4);
    let DD = bb - ac4;
    let DD_ = bb_ + ac4_ + error_analysis_1.γ1 * abs(DD);
    // if the discriminant is smaller than negative the error bound then
    // certainly there are no roots, i.e. no cusp and no self-intersections
    if (DD < -DD_) {
        // discriminant is definitely negative
        return undefined;
    }
    // if the discriminant is definitely positive
    if (DD > DD_) {
        // calculate roots naively as a fast pre-filter
        let { est: D, err: D_ } = flo_numerical_1.sqrtWithErr(DD, DD_);
        let q1;
        if (b >= 0) {
            // let r1 = (-b - D) / 2*a;
            // let r2 = (2*c) / (-b - D);
            q1 = -b - D;
        }
        else {
            // let r2 = (-b + D) / 2*a;
            // let r1 = (2*c) / (-b + D);
            q1 = -b + D;
        }
        let q1_ = b_ + D_ + error_analysis_1.γ1 * abs(q1);
        let { est: r1, err: r1_ } = flo_numerical_1.divWithErr(q1, 2 * a, q1_, 2 * a_);
        let { est: r2, err: r2_ } = flo_numerical_1.divWithErr(2 * c, q1, 2 * c_, q1_);
        //console.log(r1,r2);
        // the actual 'filter' follows
        // IF
        // at least one root is definitely smaller than 0  ||
        // at least one root is definitely larger than 1 
        // THEN no self-intersection
        if (r1 + r1_ < 0 || r2 + r2_ < 0 ||
            r1 - r1_ > 1 || r2 - r2_ > 1) {
            return undefined;
        }
    }
    // we need to check exactly - (a !== 0) at this point - tested for earlier
    let [A, B, C] = get_coeffs_3_2.getCoeffs3Exact_(ps);
    // exact - DD = b^2 - 4ac
    let eDD = edif(epr(B, B), sce(4, epr(A, C)));
    let sgn = flo_numerical_1.sign(eDD);
    if (sgn < 0) {
        // sgn < 0 => no real roots => no cusp or double point for t in [0,1]
        return undefined;
    }
    if (sgn > 0) {
        let D = flo_numerical_1.qSqrt(toQuad(eDD));
        A = toQuad(A);
        B = toQuad(B);
        C = toQuad(C);
        let nBD;
        if (flo_numerical_1.sign(B) >= 0) {
            nBD = qno(qaq(B, D));
            //t1 = (-B - D) / (2*A);
            //t2 = (2*C) / (-B - D);
        }
        else {
            nBD = qaq(qno(B), D);
            //t1 = (2*C) / (-B + D);
            //t2 = (-B + D) / (2*A);
        }
        let t1 = flo_numerical_1.estimate(qdivq(nBD, qm2(A))); // max 1 ulps out
        let t2 = flo_numerical_1.estimate(qdivq(qm2(C), nBD)); // max 1 ulps out
        // if any root is outside the range => no double point for t in [0,1]
        if (t1 < -eps || t1 > 1 + eps ||
            t2 < -eps || t2 > 1 + eps) {
            return undefined;
        }
        t1 = t1 < 0
            ? 0
            : t1 > 1 ? 1 : t1;
        t2 = t2 < 0
            ? 0
            : t2 > 1 ? 1 : t2;
        return t1 < t2 ? [t1, t2] : [t2, t1];
    }
    // sign === 0 => cusp
    // set t = b/d = b/-2a
    let d = flo_numerical_1.eMultByNeg2(A);
    let sgnB = flo_numerical_1.sign(B);
    let sgnD = flo_numerical_1.sign(d);
    // if result is negative the cusp is outside the bezier endpoints
    let sgn_ = sgnB * sgnD;
    if (sgn_ < 0) {
        return undefined;
    }
    // if result is > 1 the cusp is outside the bezier endpoints
    if (flo_numerical_1.compare(flo_numerical_1.abs(B), flo_numerical_1.abs(d)) > 0) {
        return undefined;
    }
    let qB = toQuad(B);
    let qd = toQuad(d);
    let qt = qdivq(qB, qd);
    let t = qt[1];
    return [t, t];
}
exports.bezierSelfIntersection = bezierSelfIntersection;
/**
 * Returns the result of converting a floating point expansion to a
 * double-double.
 */
function toQuad(e) {
    // TODO - there's already a toQuad in flo-numerical ??
    // investigate when to compress and when not to
    // e = compress(e);
    let len = e.length;
    if (len === 2) {
        return e; // already a quad
    }
    else if (len === 1) {
        return [0, e[0]];
    }
    else {
        return [e[len - 2], e[len - 1]];
    }
}
//# sourceMappingURL=self-intersection.js.map