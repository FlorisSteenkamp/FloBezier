import { normal } from './normal.js';


/**
 * Returns the unit normal vector of a bezier curve at a specific given
 * parameter value `t` (the `tangent` at that point rotated by 90 degrees and
 * normalized).
 * 
 * * uses double precision calculations internally
 * * returns `undefined` if the tangent vanishes at `t` (e.g. at a cusp) since
 * the curve has no well-defined direction there
 * 
 * @param ps a linear, quadratic or cubic bezier curve given by its ordered
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the normal should be evaluated
 * 
 * @doc mdx
 */
function unitNormal(ps: number[][], t: number): number[] | undefined {
    const [x, y] = normal(ps, t);

    const len = Math.sqrt(x*x + y*y);
    if (len === 0) { return undefined; }

    return [x/len, y/len];
}


export { unitNormal }
