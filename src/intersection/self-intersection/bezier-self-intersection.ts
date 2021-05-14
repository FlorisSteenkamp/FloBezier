import { getCoeffsBez3 } from "./get-coefficients/double/get-coeffs-bez3";
import { getCoeffsBez3Exact } from "./get-coefficients/exact/get-coeffs-bez3-exact";
import { γ } from "../../error-analysis/error-analysis";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
import { operators as ddOperators } from "double-double";
const { eSign, eAbs, eToDd, eMultByNeg2, eEstimate, eCompare } = bigFloatOperators;
import { twoProduct, expansionProduct, eDiff, scaleExpansion2 } from 'big-float-ts';
import { ddNegativeOf, ddAddDd, ddMultBy2, ddDivDd } from 'double-double';
const { sqrtWithErr, divWithErr, ddSqrt } = ddOperators;


const edif = eDiff;
const epr = expansionProduct;
const sce = scaleExpansion2;
const tp = twoProduct;
const qno = ddNegativeOf;
const qaq = ddAddDd;
const qm2 = ddMultBy2;
const qdivq = ddDivDd;


const eps = Number.EPSILON;
const abs = Math.abs;
const γ1 = γ(1);


/**
 * Returns the self-intersection parameter `t` values of the given cubic bezier 
 * curve if they exist and are in the range `[0,1]`, else returns `undefined`.
 * 
 * * only cubic (or higher order) bezier curves have self-intersections
 * * * **precondition:** the coordinates of the given bezier curve must be 
 * 47-bit aligned
 * * this algorithm is mathematically guaranteed accurate to within 
 * `4 * Number.EPSILON` in the `t` values (provided the precondition is met).
 * 
 * @param ps A cubic bezier curve.
 * 
 * @doc mdx
 */
function bezierSelfIntersection(ps: number[][]): number[] {
    if (ps.length < 4) {
        // lines and quadratics don't have self-intersections (except of course
        // degenerate quadratics).
        return undefined;
    }

    // Apply fast pre-filter - we assume without specific reason that about 1 in 10 
    // beziers will have a cusp.

    // First get fast naively calculated coefficients
    const { coeffs: [a, b, c], errBound: [a_, b_, c_] } = getCoeffsBez3(ps);
    
    // if error in a cannot discern it from zero
    if (abs(a) <= a_) {
        // it is rare to get here 
        // check for sure if a === 0 exactly
        const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;
        const a3 = x3 - 3*x2 + 3*x1 - x0;  // <= exact if max bit-aligned bitlength <= 50
        const a2 = 3*x2 - 6*x1 + 3*x0;     // <= exact if max bit-aligned bitlength <= 49
        const b3 = y3 - 3*y2 + 3*y1 - y0;  // <= exact if max bit-aligned bitlength <= 50
        const b2 = 3*y2 - 6*y1 + 3*y0;     // <= exact if max bit-aligned bitlength <= 49
        const a2b3 = tp(a2,b3);
        const a3b2 = tp(a3,b2);

        if (a2b3[0] === a3b2[0] && a2b3[1] === a3b2[1]) {
            return undefined;  // a === 0 => no roots possible
        }
    }

    // DD = discriminant = b^2 - 4ac
    // calculate DD and its absolute error DD_
    const bb = b*b;
    const bb_ = 2*b_*abs(b) + γ1*bb; // the error in b**2
    const ac4 = 4*a*c;
    const ac4_ = 4*(a_*abs(c) + abs(a)*c_) + γ1*abs(ac4)
    const DD = bb - ac4;
    const DD_ = bb_ + ac4_ + γ1*abs(DD);

    // if the discriminant is smaller than negative the error bound then
    // certainly there are no roots, i.e. no cusp and no self-intersections
    if (DD < -DD_) {
        // discriminant is definitely negative
        return undefined;
    }


    // if the discriminant is definitely positive
    if (DD > DD_) {
        // calculate roots naively as a fast pre-filter

        const { est: D, err: D_ } = sqrtWithErr(DD, DD_);

        let q1: number;        
        if (b >= 0) {
            // const r1 = (-b - D) / 2*a;
            // const r2 = (2*c) / (-b - D);
            q1 = -b - D;
        } else {
            // const r2 = (-b + D) / 2*a;
            // const r1 = (2*c) / (-b + D);
            q1 = -b + D;
        }
        const q1_ = b_ + D_ + γ1*abs(q1);
        const { est: r1, err: r1_ } = divWithErr(q1,2*a,q1_,2*a_);
        const { est: r2, err: r2_ } = divWithErr(2*c,q1,2*c_,q1_);        


        // the actual 'filter' follows

        // IF
        //   at least one root is definitely smaller than 0  ||
        //   at least one root is definitely larger than 1 
        // THEN no self-intersection
        if (r1 + r1_ < 0 || r2 + r2_ < 0 ||
            r1 - r1_ > 1 || r2 - r2_ > 1) {
            return undefined;
        }
    }

    // we need to check exactly - (a !== 0) at this point - tested for earlier
    let [A,B,C] = getCoeffsBez3Exact(ps);

    // exact - DD = b^2 - 4ac
    const eDD = edif(epr(B,B), sce(4,epr(A,C)));
    const sgn = eSign(eDD);

    if (sgn < 0) {
        // sgn < 0 => no real roots => no cusp or double point for t in [0,1]
        return undefined;
    }


    if (sgn > 0) {
        const D = ddSqrt(eToDd(eDD));
        A = eToDd(A);
        B = eToDd(B);
        C = eToDd(C);

        let nBD: number[];
        if (eSign(B) >= 0) {
            nBD = qno(qaq(B,D));
            //t1 = (-B - D) / (2*A);
            //t2 = (2*C) / (-B - D);
        } else {
            nBD = qaq(qno(B),D);
            //t1 = (2*C) / (-B + D);
            //t2 = (-B + D) / (2*A);
        }
        let t1 = eEstimate(qdivq(nBD, qm2(A)));  // max 1 ulps out
        let t2 = eEstimate(qdivq(qm2(C), nBD));  // max 1 ulps out

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
    const d = eMultByNeg2(A);
    const sgnB = eSign(B);
    const sgnD = eSign(d);

    // if result is negative the cusp is outside the bezier endpoints
    const sgn_ = sgnB * sgnD;
    if (sgn_ < 0) { return undefined; }

    // if result is > 1 the cusp is outside the bezier endpoints
    if (eCompare(eAbs(B), eAbs(d)) > 0) { return undefined; }

    const qB = eToDd(B);
    const qd = eToDd(d);
    const qt = qdivq(qB,qd);
    const t = qt[1];

    return [t, t];
}


export { bezierSelfIntersection }
