import { fromTo3InclErrorBound } from './from-to/from-to-3-incl-error-bound.js';
import { fromTo2InclErrorBound } from './from-to/from-to-2-incl-error-bound.js';
import { fromTo1InclErrorBound } from './from-to/from-to-1-incl-error-bound.js';


/**
 * Returns a bezier curve, `ps`, that starts and ends at the given `t` parameters 
 * (starting at `tS` and ending at `tE`) including a matching coordinate-wise
 * error bound, `_ps`, that needs to be multiplied by `3u`, `5u` or `8u` (for
 * lines, quadratic or cubic bezier curves respectively) before use,
 * where `u === Number.EPSILON/2`.
 * 
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 * 
 * @doc mdx
 */
 function fromToInclErrorBound(
        ps: number[][], 
        tS: number, 
        tE: number): { ps: number[][]; _ps: number[][]; } {

    if (ps.length === 4) {
        return fromTo3InclErrorBound(ps, tS, tE);
    }

    if (ps.length === 3) {
        return fromTo2InclErrorBound(ps, tS, tE);
    }

    if (ps.length === 2) {
        return fromTo1InclErrorBound(ps, tS, tE);
    }

    if (ps.length === 1) {
        return { ps, _ps: [[0]] };
    }

    throw new Error('The given bezier curve must be of order <= 3.');
}


export { fromToInclErrorBound }
