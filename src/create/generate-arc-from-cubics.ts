import { generateArc } from "./generate-arc.js";

const { PI: π } = Math;


// the control point offset that best approximates a quarter circle with a cubic
// bezier curve, see: https://spencermortensen.com/articles/bezier-circle/
const κ = 0.5519150244935105707435627;


/** 
 * Cubic bezier curves that are an approximation of the unit circle starting
 * from the x-axis (each curve approximates a quarter circle).
 * 
 * @doc mdx
 */
const circle = [
    [[1,0],[1,κ],[κ,1],[0,1]],
    [[0,1],[-κ,1],[-1,κ],[-1,0]],
    [[-1,0],[-1,-κ],[-κ,-1],[0,-1]],
    [[0,-1],[κ,-1],[1,-κ],[1,0]]
];


/** 
 * Returns an arc approximation using unit quarter circle cubic bezier
 * curves. The result is returned as an array of cubic bezier curves.
 * 
 * * if the last returned arc is approximately smaller than 2**-40 of a quarter
 * circle it is not added to the returned value
 * * if the last returned arc is approximately (1 - 2**-40) of a quarter
 * circle a full quarter circle is added to the returned value
 * 
 * @param c arc circle center
 * @param p1 arc goes from this point
 * @param p2 to a point on a line from c to this point (since the problem is over-specified)
 * (if `p2` lies on the ray from `c` through `p1` (or `p2` equals `c`) a full
 * circle is generated using 4 cubic bezier curves; if `p2` lies on the
 * opposite ray a half circle is generated)
 *  
 * @doc mdx
 */
function generateArcFromCubics(
        c: number[],
        p1: number[],
        p2: number[]): number[][][] {

    return generateArc(circle, π/2, c, p1, p2);
}


export { generateArcFromCubics }
