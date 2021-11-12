// TODO - put back (and export from index)? or is there a better version somewhere else in the code?
/*
import { evaluateExact } from "../local-properties-at-t/t-to-xy/exact/evaluate-exact.js";
import { squaredDistanceBetween } from "flo-vector2d";
import { allRootsCertified, mid } from "flo-poly";
//import { getTangentPolyFromPointExact } from "../simultaneous-properties/closest-point-on-bezier/get-coeffs/exact/get-closest-on-bezier-from-point-exact.js";
import { getClosestOnBezierFromPointExact } from "../simultaneous-properties/closest-point-on-bezier/get-coeffs/exact/get-closest-on-bezier-from-point-exact.js";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { eEstimate } = bigFloatOperators;


/**
 * Returns the closest point t value on the bezier to the given point - only
 * returns t values in the range [0,1].
 * 
 * * **precondition** coefficients of curve and point bit-aligned bitlength <= 46
 * * this function also acts as an inversion formula.
 * 
 * @param ps 
 * @param p 
 * 
 * @doc
 */
/*
function inversion01Precise(
        ps: number[][], 
        p: number[]): number {

    // TODO - a double point could give two t-values which is not currently
    // checked for and handled - this might or might not be important depending
    // on the application

    if (ps.length === 2) {
        return inversionLine(ps, p);
    }

    // the coefficients of the poly below is max double-double
    //const poly = getTangentPolyFromPointExact(ps, p);
    const poly = getClosestOnBezierFromPointExact(ps, p);

    const ts = allRootsCertified(poly);
    if (!ts.length) { return undefined; }
    
    const ps_ = ts.map(t => ({ 
        t: mid(t),
        p: evaluateExact(ps, mid(t)).map(eEstimate)
    }));

    // Get point with minimum distance
    let minD = Number.POSITIVE_INFINITY;
    let t: number = undefined;
    ps_.forEach(p_ => {
        const d = squaredDistanceBetween(p_.p, p);
        if (d < minD) {
            minD = d;
            t = p_.t;
        }
    });

    return t;
}


/**
 * Returns the t parameter value of the point closest to the given point on the
 * given line.
 * 
 * * **precondition:** The bit-aligned bitlength of the control point 
 * coordinates of the line and the given point must be <= 52
 * * the result is accurate to within 1 ulp
 * 
 * @param ps an order 1 bezier curve
 * @param p a point
 *//*
function inversionLine(
        ps: number[][], 
        p: number[]) {

    const [[x0,y0],[x1,y1]] = ps;
    const [x,y] = p;

    const x1_x0 = x1 - x0;
    const y1_y0 = y1 - y0;

    // the compare below ensures numerical stability
    return Math.abs(x1_x0) > Math.abs(y1_y0)
        ? (x - x0) / x1_x0
        : (y - y0) / y1_y0;
}


export { inversion01Precise }
*/