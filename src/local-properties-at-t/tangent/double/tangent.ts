import { Horner } from 'flo-poly';
import { toPowerBasis_1stDerivative } from '../../../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js';


/**
 * Returns the tangent vector (not necessarily of unit length) of an 
 * order 0,1,2 or 3 bezier curve at a specific given parameter value `t`, i.e.
 * returns the `[x,y]` value of the once differentiated (with respect to `t`) 
 * bezier curve's power basis when evaluated at `t`.
 * 
 * * uses double precision calculations internally
 * 
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 * 
 * @doc mdx
 */
 function tangent(ps: number[][], t: number): number[] {
    const [dX,dY] = toPowerBasis_1stDerivative(ps);

    return [
        Horner(dX, t),
        Horner(dY, t)
    ];
 }


 export { tangent }
