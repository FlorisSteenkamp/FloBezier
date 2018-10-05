
import Poly from 'flo-poly';

import { getDx2 } from './get-dx2';


/**
 * Returns the x value of the once differentiated (with respect to t) quadratic 
 * bezier when evaluated at t. This function is curried.
 * @param ps - A quadratic bezier, e.g. [[0,0],[1,1],[2,1]]
 * @param t - The t parameter
  */
 function evaluateDx2(ps: number[][], t: number): number;
 function evaluateDx2(ps: number[][]): (t: number) => number;
 function evaluateDx2(ps: number[][], t?: number)  {
     const dPs = getDx2(ps); // Speed optimizing cache
     const f = Poly.evaluate(dPs);
     
     return t === undefined ? f : f(t); // Curry
 }


 export { evaluateDx2 }
