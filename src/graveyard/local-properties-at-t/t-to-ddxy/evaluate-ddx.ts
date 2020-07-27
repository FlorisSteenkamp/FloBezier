
import { getDdx } from "../../to-power-basis/get-ddx";
import { evaluate as polyEvaluate } from 'flo-poly';


/**
 * Returns the x value of the twice differentiated (with respect to t) cubic 
 * bezier when evaluated at t. This function is curried.
 * @param ps a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t the t parameter
 * @returns 
 */
function evaluateDdx(ps: number[][], t: number): number;
function evaluateDdx(ps: number[][]): (t: number) => number;
function evaluateDdx(ps: number[][], t?: number)  {
	const ddPs = getDdx(ps);
	const f = polyEvaluate(ddPs);

	return t === undefined ? f : f(t); // Curry
}


export { evaluateDdx }
