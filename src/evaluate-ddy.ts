
import { getDdy } from "./get-ddy";
import { evaluate as polyEvaluate } from 'flo-poly';


/**
 * Returns the y value of the twice differentiated (with respect to t) cubic 
 * bezier when evaluated at t. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t - The t parameter
 * @returns 
 */
function evaluateDdy(ps: number[][], t: number): number;
function evaluateDdy(ps: number[][]): (t: number) => number;
function evaluateDdy(ps: number[][], t?: number)  {
	const ddPs = getDdy(ps); // Speed optimizing cache
	const f = polyEvaluate(ddPs);

	return t === undefined ? f : f(t); // Curry
}


export { evaluateDdy }
