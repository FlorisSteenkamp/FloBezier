import { integrate, multiply, subtract } from "flo-poly";
import { toPowerBasis } from '../to-power-basis/to-power-basis/double/to-power-basis.js';
import { toPowerBasis_1stDerivative } from '../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js';


/**
 * Returns the signed area between the given bezier curve and the line between
 * its 1st and last control points.
 * 
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 */
function area(
        ps: number[][]) {

    const [x,y] = toPowerBasis(ps);
    const [dx,dy] = toPowerBasis_1stDerivative(ps);

    const poly = integrate(
        subtract(
            multiply(x,dy), 
            multiply(y,dx)
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
