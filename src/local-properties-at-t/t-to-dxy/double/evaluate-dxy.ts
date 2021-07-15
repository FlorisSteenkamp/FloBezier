import { Horner } from 'flo-poly';
import { getDxy } from '../../../to-power-basis/get-dxy/double/get-dxy';


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
 function evaluateDxy(ps: number[][], t: number): number[];
 function evaluateDxy(ps: number[][]): (t: number) => number[];
 function evaluateDxy(ps: number[][], t?: number)  {
     const [dX, dY] = getDxy(ps);

     const f = (t: number) => [Horner(dX, t), Horner(dY, t)];
     
     return t === undefined ? f : f(t); // Curry
 }


 export { evaluateDxy }
