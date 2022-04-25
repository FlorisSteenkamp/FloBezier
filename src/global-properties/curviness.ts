import { getInterfaceRotation } from '../simultaneous-properties/get-interface-rotation.js';

const { abs } = Math;


/**
 * Returns a 'curviness' measure of the given bezier curve. `0` is considered 
 * the `flattest` (as is the case of e.g. a line).
 * 
 * The returned flatness, say `f` is such that `0 <= f <= (order-1)*𝜋`, where
 * `order` is the order of the bezier curve (e.g. cubics are of order 3); thus,
 * for example, cubics can have a maximum value of `2𝜋` for curviness (the most
 * curvy) and a minimum value of `0` (the flattest)
 * 
 * This function is useful as a heuristic to test the `flatness` of curves to
 * see if they should be subdivided (in which case they would become flatter)
 * 
 * * curviness is calculated as the sum of the absolute rotation (in radians) of 
 * consecutive vectors formed by the ordered control points of the curve
 * 
 * @param ps An order 0,1,2 or 3 bezier curve.
 * 
 * @doc mdx
 */
function curviness(ps: number[][]): number {
    // The below was the old heuristic which did not work well e.g. if an end 
    // control point was far away from the other 3
    //return controlPointLinesLength(ps) / distanceBetween(ps[0], ps[ps.length-1]);

    const vs: number[][] = [];
    for (let i=0; i<ps.length-1; i++) {
        const v = [ps[i+1][0] - ps[i][0], ps[i+1][1] - ps[i][1]];
        if ((v[0] !== 0 || v[1]) !== 0) {
            vs.push(v);
        }
    }

    const len = vs.length;
    
    let total = 0;
    for (let i=0; i<len-1; i++) {
        total += abs(getInterfaceRotation(vs[i],vs[i+1]));
    }

    return total;
}


export { curviness }
