import { integrate, multiply, subtract } from "flo-poly";
import { getXY } from '../to-power-basis/get-xy/double/get-xy.js';
import { getDxy } from '../to-power-basis/get-dxy/double/get-dxy.js';


/**
 * Returns the signed area between the given bezier curve and the line between
 * its 1st and last control points.
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

    // the below is exactly te same as: Horner(poly,1) - Horner(poly,0)
    let total = 0;
    for (let i=0; i<poly.length; i++) {
        total += poly[i];
    }

    return total / 2;
}


export { area }
