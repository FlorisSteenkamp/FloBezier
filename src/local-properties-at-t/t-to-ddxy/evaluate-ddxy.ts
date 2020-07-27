
import { getDdxy } from "../../to-power-basis/get-ddxy";
import { evaluate as polyEvaluate } from 'flo-poly';


/**
 * Returns the x value of the twice differentiated (with respect to t) cubic 
 * bezier when evaluated at t. This function is curried.
 * @param ps a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t the t parameter
 * @returns 
 */
function evaluateDdxy(ps: number[][], t: number): number[];
function evaluateDdxy(ps: number[][]): (t: number) => number[];
function evaluateDdxy(ps: number[][], t?: number)  {
	const [ddPsX, ddPsY] = getDdxy(ps);
	const fX = polyEvaluate(ddPsX);
	const fY = polyEvaluate(ddPsY);

	const f = (t: number) => [fX(t), fY(t)];

	return t === undefined ? f : f(t); // Curry
}


export { evaluateDdxy }
