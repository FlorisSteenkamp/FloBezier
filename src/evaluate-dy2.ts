
import Poly from 'flo-poly';

import { getDy2 } from './get-dy2';


/**
 * Returns the y value of the once differentiated (with respect to t) quadratic
 * bezier when evaluated at t. This function is curried.
 * @param ps - A quadratic bezier, e.g. [[0,0],[1,1],[2,1]]
 * @param t - The t parameter
  */
 function evaluateDy2(ps: number[][], t: number): number;
 function evaluateDy2(ps: number[][]): (t: number) => number;
 function evaluateDy2(ps: number[][], t?: number)  {
     const dPs = getDy2(ps); // Speed optimizing cache
     const f = Poly.evaluate(dPs);
 
     return t === undefined ? f : f(t); // Curry
 }


 export { evaluateDy2 }
