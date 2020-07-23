

import { evaluateExact } from "../local-properties-at-t/t-to-xy/evaluate";
import { squaredDistanceBetween } from "flo-vector2d";
import { allRootsMultiWithErrBounds, mid } from "flo-poly";
import { getTangentPolyFromPointExact } from "../simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point";

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators } from "big-float-ts";
const { eEstimate } = bigFloatOperators;


/**
 * Returns the closest point t value on the bezier to the given point - only
 * returns t values in the range [0,1]. Also returns the minimum distance found.
 * **precondition** coefficients of curve and point bit-aligned bitlength <= 46
 * * this function also acts as an inversion formula.
 * 
 * @param ps 
 * @param p 
 */
function inversion01Precise(
        ps: number[][], 
        p: number[]) {

    // TODO - a double point could give two t-values which is not currently
    // checked for and handled - this might or might not be important depending
    // on the application

    // the coefficients of the poly below is max double-double
    let poly = getTangentPolyFromPointExact(ps, p);
    //let ts = quadAllRootsPrecise(poly, 0, 1);
    let ts = allRootsMultiWithErrBounds(poly, poly.map(c => 0));
    if (!ts.length) { return undefined; }
    
    let ps_ = ts.map(t => ({ 
        //t: t.tM,
        t: mid(t),
        p: evaluateExact(ps, mid(t)).map(eEstimate)
    }));

    // Get point with minimum distance
    let minD = Number.POSITIVE_INFINITY;
    let t: number = undefined;
    ps_.forEach(p_ => {
        let d = squaredDistanceBetween(p_.p, p);
        if (d < minD) {
            minD = d;
            t = p_.t;
        }
    });

    return { t, minD };
}


export { inversion01Precise }
