import { ddHorner } from 'flo-poly';
import { toPowerBasis_1stDerivativeDd } from '../../../to-power-basis/to-power-basis-1st-derivative/double-double/to-power-basis-1st-derivative-dd.js';


/**
 * * Returns a normal vector (not necessarily of unit length) of a bezier curve 
 * at a specific given parameter value `t` by simply taking the `tangent` at
 * that point and rotating it by 90 degrees.
 * 
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the `t` parameter
 * 
 * @doc mdx
 */
 function ddNormal(
        ps: number[][],
        t: number): number[][] {

    const [dX,dY] = toPowerBasis_1stDerivativeDd(ps);
    const Y = ddHorner(dY, t);

    return [
        [-Y[0],-Y[1]],
        ddHorner(dX, t)
    ];
 }


 export { ddNormal }
