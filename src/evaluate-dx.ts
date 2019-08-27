
import { evaluate } from 'flo-poly';

import { getDx } from './get-dx';


/**
 * Returns the x value of the once differentiated (with respect to t) bezier 
 * when evaluated at t. This function is curried.
 * @param ps A line, quadratic or cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t The t parameter
  */
 function evaluateDx(ps: number[][], t: number): number;
 function evaluateDx(ps: number[][]): (t: number) => number;
 function evaluateDx(ps: number[][], t?: number)  {
     const dPs = getDx(ps); // Speed optimizing cache
     const f = evaluate(dPs);
     
     return t === undefined ? f : f(t); // Curry
 }


 export { evaluateDx }
