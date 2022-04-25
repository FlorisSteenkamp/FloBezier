import { eCompress } from 'big-float-ts';
import { isPointOnBezierExtension1 } from './is-point-on-bezier-extension-1.js';
import { isPointOnBezierExtension2 } from './is-point-on-bezier-extension-2.js';
import { isPointOnBezierExtension3 } from './is-point-on-bezier-extension-3.js';


/**
 * Returns `true` if the given point is on the given bezier curve where the 
 * parameter `t` is allowed to extend to ±∞, i.e. `t` is an element of 
 * `(-∞, +∞)`, `false` otherwise.
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param p a point with coordinates given as [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) 
 * expansions; if only double precision coordinates need to be provided then 
 * wrap them in a one element array, e.g. for a point with `x` and `y` coordinates 
 * of `1` and `2` set `p === [[1],[2]]`.
 */
function isPointOnBezierExtension(
        ps: number[][], p: number[][]): boolean {

    if (ps.length === 4) {
        return isPointOnBezierExtension3(ps, p);
    }
    if (ps.length === 3) {
        return isPointOnBezierExtension2(ps, p);
    }
    if (ps.length === 2) {
        return isPointOnBezierExtension1(ps, p);
    }
    if (ps.length === 1) {
        const x = eCompress(p[0]);
        const y = eCompress(p[1]);
        return (
            x.length === 1 && y.length === 1 && 
            x[0] === ps[0][0] && y[0] === ps[0][1]
        );
    }

    throw new Error('The given bezier curve must be of order <= 3');
}


export { isPointOnBezierExtension }
