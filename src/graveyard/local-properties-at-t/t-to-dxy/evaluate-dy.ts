
import { evaluate } from 'flo-poly';

import { getDy } from '../../to-power-basis/get-dy';


/**
 * Returns the y value of the once differentiated (with respect to t) bezier 
 * when evaluated at t. This function is curried.
 * @param ps A line, quadratic or cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t The t parameter
  */
 function evaluateDy(ps: number[][], t: number): number;
 function evaluateDy(ps: number[][]): (t: number) => number;
 function evaluateDy(ps: number[][], t?: number)  {
     const dPs = getDy(ps); // Speed optimizing cache
     const f = evaluate(dPs);
 
     return t === undefined ? f : f(t); // Curry
 }


 export { evaluateDy }
