import { getFootpointPoly1Exact } from './get-footpoint-poly-1-exact.js';
import { getFootpointPoly2Exact } from './get-footpoint-poly-2-exact.js';
import { getFootpointPoly3Exact } from './get-footpoint-poly-3-exact.js';


/**
 * Returns the *exact* polynomial whose roots are all the `t` values on the 
 * given bezier curve such that the line from the given point to the point on 
 * the bezier evaluated at `t` is tangent to the bezier curve at `t`.
 * 
 * * The returned polynomial coefficients are given densely as an array of 
 * [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) floating 
 * point expansions from highest to lowest power, 
 * e.g. `[[5],[-3],[0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1],[3,5],[7,1]]`
 * @param p a point, e.g. `[1,2]`
 */
function getFootpointPolyExact(
        ps: number[][], p: number[]): number[][] {
    
    if (ps.length === 4) {
        return getFootpointPoly3Exact(ps,p);
    }

    if (ps.length === 3) {
        return getFootpointPoly2Exact(ps,p);
    }

    if (ps.length === 2) {
        return getFootpointPoly1Exact(ps,p);
    }

    throw new Error('The given bezier curve must be of order 1,2 or 3');
}


export { getFootpointPolyExact }
