import { getDdxy } from "../../../to-power-basis/get-ddxy/double/get-ddxy.js";
import { Horner } from 'flo-poly';


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
function evaluateDdxy(ps: number[][], t: number): number[] {
	const [ddPsX, ddPsY] = getDdxy(ps);

	return [Horner(ddPsX, t), Horner(ddPsY, t)];
}


export { evaluateDdxy }
