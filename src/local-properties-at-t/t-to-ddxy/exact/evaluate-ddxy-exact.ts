/*
import { getDdxyExact } from "../../../to-power-basis/get-ddxy/exact/get-ddxy-exact.js";
import { eHorner, Horner as polyEvaluate } from 'flo-poly';


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
 *//*
function evaluateDdxy(ps: number[][], t: number): number[][] {
	const [ddPsX, ddPsY] = getDdxyExact(ps);

	return [eHorner(ddPsX, t), eHorner(ddPsY, t)];
}


export { evaluateDdxy }
*/