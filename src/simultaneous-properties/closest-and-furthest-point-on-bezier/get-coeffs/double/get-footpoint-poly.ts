import { getFootpointPoly1 } from './get-footpoint-poly-1.js';
import { getFootpointPoly2 } from './get-footpoint-poly-2.js';
import { getFootpointPoly3 } from './get-footpoint-poly-3.js';


/**
 * Returns a polynomial in 1 variable whose roots are the parameter values of 
 * the foot points on the given bezier curve of the given point.
 * 
 * The returned polynomial coefficients are given densely as an array of 
 * double precision floating point numbers from highest to lowest power, 
 * e.g. `[[0,5],[0,-3],[0,0]]` represents the polynomial `5x^2 - 3x`.
 * 
 * * intermediate calculations are done in double precision
 * 
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control points, e.g. `[[1,2],[3,4],[5,7],[0,0]]` 
 * @param p 
 */
function getFootpointPoly(
        ps: number[][], p: number[]): number[] {
    
    if (ps.length === 4) {
        return getFootpointPoly3(ps,p);
    }

    if (ps.length === 3) {
        return getFootpointPoly2(ps,p);
    }

    if (ps.length === 2) {
        return getFootpointPoly1(ps,p);
    }

    throw new Error('The given bezier curve must be of order 1,2 or 3');
}


export { getFootpointPoly }
