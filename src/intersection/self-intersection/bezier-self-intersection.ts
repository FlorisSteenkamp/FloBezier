import {
    expansionProduct, eDiff, scaleExpansion2, fastExpansionSum, growExpansion,
    eSign, eAbs, eToDd, eMultByNeg2, eEstimate, eCompare
} from 'big-float-ts';
import {
    ddNegativeOf, ddAddDd, ddMultBy2, ddDivDd, twoDiff, twoSum,
    sqrtWithErr, divWithErr, ddSqrt
} from 'double-double';
import { getCoeffsBez3WithRunningError } from "./get-coefficients/double/get-coeffs-bez3-with-running-error.js";
import { getCoeffsBez3Exact } from "./get-coefficients/exact/get-coeffs-bez3-exact.js";
import { γ } from "../../error-analysis/error-analysis.js";


const edif = eDiff;
const epr = expansionProduct;
const sce = scaleExpansion2;
const td = twoDiff;
const ts = twoSum;
const qno = ddNegativeOf;
const qaq = ddAddDd;
const qm2 = ddMultBy2;
const qdivq = ddDivDd;
const fes = fastExpansionSum;
const ge = growExpansion;


const eps = Number.EPSILON;
const eps2 = 2*eps;
const abs = Math.abs;
const γ1 = γ(1);


/**
 * Returns the unique self-intersection parameter `t` values of the given
 * bezier curve if they exist, else return `[]` (see also the `inRange` 
 * parameter below).
 * 
 * * only cubic (or higher order) bezier curves can have unique self-intersections
 * * this algorithm is mathematically guaranteed accurate to within an absolute
 * error of `4 * Number.EPSILON` for the returned `t` values satisfying `|t| <= 1`
 * or a relative error of the same `4 * Number.EPSILON` otherwise.
 * * **special case:** a cusp is considered a degenerate self-intersection and
 * the (duplicate) `t` values will be returned
 * 
 * @param ps a bezier curve given as an array of its control points
 * @param inRange if `inRange === true` (the default) then return the two `t` 
 * parameter values only if both are in [0,1] else return `[]`. 
 * If `inRange === false` then return the (0,1 or 2) `t` values in `[0,1]` even
 * if only one is in that range.
 * 
 * @doc mdx
 */
function bezierSelfIntersection(
        ps: number[][],
        inRange = true): number[] {

    if (ps.length < 4) {
        // lines and quadratics don't have uniqure self-intersections.
        return [];
    }

    // First get fast naively calculated coefficients
    const { coeffs: [a, b, c], errBound: [a_, b_, c_] } = 
        getCoeffsBez3WithRunningError(ps);

    // if error in `a` cannot discern it from zero
    if (abs(a) <= a_) {
        // it is rare to get here 
        // check for sure if a === 0 exactly
        const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;

        //const a3 = (x3 - x0) + 3*(x1 - x2);
        //const a2 = (x2 + x0) - 2*x1;
        //const b3 = (y3 - y0) + 3*(y1 - y2);
        //const b2 = (y2 + y0) - 2*y1;

        const a3 = fes(td(x3, x0), sce(3,(td(x1, x2))));
        const a2 = ge(ts(x2, x0), -2*x1);
        const b3 = fes(td(y3, y0), sce(3,(td(y1, y2))));
        const b2 = ge(ts(y2, y0), -2*y1);

        const a2b3 = epr(a2,b3);
        const a3b2 = epr(a3,b2);

        if (eCompare(a2b3, a3b2) === 0) {
            // a === 0 => no roots possible! (also b === 0 always if a === 0)

            // This type of curve is usually shaped like an S where both 
            // extreme curvatures are identical...

            // ...this is an explicit cubic curve!

            return [];
        }
    }

    // `Discr` = discriminant = b^2 - 4ac
    // calculate `Discr` and its absolute error Discr_
    const bb = b*b;
    const bb_ = 2*b_*abs(b) + γ1*bb; // the error in b**2
    const ac4 = 4*a*c;
    const ac4_ = 4*(a_*abs(c) + abs(a)*c_) + γ1*abs(ac4)
    const Discr = bb - ac4;
    const Discr_ = bb_ + ac4_ + γ1*abs(Discr);

    // if the discriminant is smaller than negative the error bound then
    // certainly there are no roots, i.e. no cusp and no self-intersections
    if (Discr < -Discr_) {
        // discriminant is definitely negative
        return [];
    }


    // if the discriminant is definitely positive
    if (Discr > Discr_) {
        // calculate roots naively as a fast pre-filter

        const { est: D, err: D_ } = sqrtWithErr(Discr, Discr_);

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

        if (inRange) {
            // IF at least one root is not in [0,1]
            // THEN no self-intersection (in [0,1])
            if (r1 + r1_ < 0 || r1 - r1_ > 1 || 
                r2 + r2_ < 0 || r2 - r2_ > 1) {
                return [];
            }
        } else {
            // IF both roots not in [0,1] 
            // THEN no self-intersection (in [0,1])
            if ((r1 + r1_ < 0 || r1 - r1_ > 1) &&
                (r2 + r2_ < 0 || r2 - r2_ > 1)) {
                return [];
            }
        }
    }

    // we need to check exactly - (a !== 0) at this point - tested for earlier
    let [A,B,C] = getCoeffsBez3Exact(ps);

    // exact - Discr = b^2 - 4ac
    const eDiscr = edif(epr(B,B), sce(4,epr(A,C)));
    const sgnDiscr = eSign(eDiscr);

    if (sgnDiscr < 0) {
        // sgn < 0 => no real roots => no cusp or double point for t in [0,1]
        return [];
    }


    if (sgnDiscr > 0) {
        const D = ddSqrt(eToDd(eDiscr));
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

        if (inRange) {
            // if any root is outside the range => no double point for t in [0,1]
            if (t1 < -eps2 || t1 > 1 + eps2 ||
                t2 < -eps2 || t2 > 1 + eps2) {
                return [];
            }
        } else {
            // if both roots are outside the range => no double point for t in [0,1]
            if ((t1 < -eps2 || t1 > 1 + eps2) &&
                (t2 < -eps2 || t2 > 1 + eps2)) {
                return [];
            }
        }

        // coerce to 0/1
        //t1 = (t1 >= -eps4 && t1 < 0)
        //    ? 0
        //    : (t1 > 1 && t1 <= 1 + eps4) ? 1 : t1;
        //t2 = (t2 >= -eps4 && t2 < 0)
        //    ? 0
        //    : (t2 > 1 && t2 <= 1 + eps4) ? 1 : t2;

        [t1, t2] = t1 < t2 ? [t1, t2] : [t2, t1];

        return t1 >= 0-eps2 && t1 <= 1+eps2
            ? t2 >= 0-eps2 && t2 <= 1+eps2
                ? [t1,t2]
                : [t1]
            : t2 >= 0-eps2 && t2 <= 1+eps2
                ? [t2]
                : [];
    }
    

    // sign === 0 => cusp

    // set t = b/d = b/-2a
    const d = eMultByNeg2(A);
    const sgnB = eSign(B);
    const sgnD = eSign(d);

    // if result is negative the cusp is outside the bezier endpoints
    const sgn_ = sgnB * sgnD;
    if (sgn_ < 0) { return []; }

    // if result is > 1 the cusp is outside the bezier endpoints
    if (eCompare(eAbs(B), eAbs(d)) > 0) { return []; }

    const qB = eToDd(B);
    const qd = eToDd(d);
    const qt = qdivq(qB,qd);
    const t = qt[1] + qt[0];

    return [t, t];
}


export { bezierSelfIntersection }
