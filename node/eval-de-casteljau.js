"use strict";
//import { deCasteljau }  from './de-casteljau';
/**
 * Evaluates the given bezier curve at the parameter t. This function is
 * curried.
 * @param ps A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t The parameter value where the bezier should be evaluated
 **/ /* TODO - re-implement maybe
function evalDeCasteljau(ps: number[][]): (t: number) => number[];
function evalDeCasteljau(ps: number[][], t: number): number[];
function evalDeCasteljau(ps: number[][], t?: number) {
   const [[x0, y0], [x1,y1], [x2,y2], [x3, y3]] = ps;
   let evX = deCasteljau([x0,x1,x2,x3]);
   let evY = deCasteljau([y0,y1,y2,y3]);
   
   function f(t: number): number[] {
       if (t === 0) {
           return [x0, y0];
       } else if (t === 1) {
           return [x3, y3];
       }
       
       return [evX(t)[1][0], evY(t)[1][0]];
   }

   return t === undefined ? f : f(t);
}


export { evalDeCasteljau }
*/ 
//# sourceMappingURL=eval-de-casteljau.js.map