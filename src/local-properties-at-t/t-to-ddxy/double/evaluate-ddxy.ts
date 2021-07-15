import { getDdxy } from "../../../to-power-basis/get-ddxy/double/get-ddxy";
import { Horner as polyEvaluate } from 'flo-poly';


/**
 * Returns the `[x,y]` value of the twice differentiated (with respect to `t`) 
 * bezier curve when evaluated at `t`. This function is curried.
 * 
 * * uses double precision calculations internally
 * 
 * @param ps a cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 * 
 * @doc mdx
 */
function evaluateDdxy(ps: number[][], t: number): number[];
function evaluateDdxy(ps: number[][]): (t: number) => number[];
function evaluateDdxy(ps: number[][], t?: number)  {
	const [ddPsX, ddPsY] = getDdxy(ps);

	const f = (t: number) => [polyEvaluate(ddPsX, t), polyEvaluate(ddPsY, t)];

	return t === undefined ? f : f(t); // Curry
}


export { evaluateDdxy }
