import { eHorner } from 'flo-poly';
import { getDxyExact } from '../../../to-power-basis/get-dxy/exact/get-dxy-exact';


/**
 * Returns the `[x,y]` value of the once differentiated (with respect to `t`) 
 * bezier curve when evaluated at `t`. This function is curried.
 * 
 * * uses double precision calculations internally
 * 
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 * 
 * @doc mdx
 */
 function evaluateDxyExact(
        ps: number[][], t: number): number[][] {

     const [dX, dY] = getDxyExact(ps);

     return [eHorner(dX, t), eHorner(dY, t)];
 }


 export { evaluateDxyExact }
