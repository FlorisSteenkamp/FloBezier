import { Horner as evaluatePoly } from 'flo-poly';
import { getDxy } from '../../to-power-basis/get-dxy';


/**
 * Returns the value of the once differentiated (with respect to t) bezier 
 * when evaluated at t. This function is curried.
 * 
 * @param ps A line, quadratic or cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t The t parameter
 * 
 * @doc
 */
 function evaluateDxy(ps: number[][], t: number): number[];
 function evaluateDxy(ps: number[][]): (t: number) => number[];
 function evaluateDxy(ps: number[][], t?: number)  {
     const [dX, dY] = getDxy(ps);

     const f = (t: number) => [evaluatePoly(dX, t), evaluatePoly(dY, t)];
     
     return t === undefined ? f : f(t); // Curry
 }


 export { evaluateDxy }
