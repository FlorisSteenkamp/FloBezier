import * as vector from 'flo-vector2d';
import { isQuadObtuse } from "./is-quad-obtuse.js";
import { evalDeCasteljau } from '../../local-properties-at-t/t-to-xy/double/eval-de-casteljau.js';


/**
 * Returns true if the given quadratic bezier curve is acute (see isQuadObtuse) 
 * and can be approximated with a line segment with maximum Hausdorff distance 
 * <= the given tolerance.
 * 
 * @param ps A quadratic bezier curve.
 * 
 * @internal
 */
function isQuadFlat(
        ps: number[][],
        tolerance: number) {

    if (isQuadObtuse(ps)) { return false; }

    const [[x1,y1],, [x2,y2]] = ps;

    if (x1 === x2 && y1 === y2) { return true; }

    const [x0,y0] = evalDeCasteljau(ps, 0.5);

    const numerator = ((y2-y1)*x0 - (x2-x1)*y0 + x2*y1 - y2*x1)**2;
    const denominator = vector.squaredDistanceBetween(ps[0], ps[2]);

    const dSquared = Math.abs(numerator / denominator);

    return dSquared < tolerance**2;
}


export { isQuadFlat }
