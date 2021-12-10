import { add, Horner, integrate, multiply, negate, subtract } from "flo-poly";
import { getXY } from '../to-power-basis/get-xy/double/get-xy.js';
import { getDxy } from '../to-power-basis/get-dxy/double/get-dxy.js';
import { splitByMaxCurvature } from "../transformation/split/split-by-max-curvature.js";
import { gaussQuadrature } from "flo-gauss-quadrature";


/**
 * TODO
 * Returns the signed area between the given bezier curve and the line between
 * its 1st and last control points.
 * 
 * * precondition: the curve must have monotone curvature (this condition would
 * be easy to relax if need be)
 * 
 * @param ps 
 */
function area(
        ps: number[][]) {

    let [x,y] = getXY(ps);
    let [dx,dy] = getDxy(ps);

    const poly = integrate(
        subtract(
            multiply(x, dy), 
            multiply(y, dx)
        ), 0
    );

    // the below is exactly te same as: Horner(poly_,1) - Horner(poly_,0)
    let total = 0;
    for (let i=0; i<poly.length; i++) {
        total += poly[i];
    }

    return total / 2;
}


export { area }
