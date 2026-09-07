import { transform } from './transform.js';


/**
 * Returns the given bezier curve flipped horizontally (mirrored left-to-right)
 * about the y-axis, i.e. each control point `[x,y]` is mapped to `[-x,y]`.
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * 
 * @doc mdx
 */
function flipHorizontally(
        ps: number[][]): number[][] {

    return transform(ps, [[-1, 0, 0], [0, 1, 0]]);
}


export { flipHorizontally }
