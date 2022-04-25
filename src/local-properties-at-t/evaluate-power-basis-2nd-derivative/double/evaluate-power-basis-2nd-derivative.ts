import { toPowerBasis_2ndDerivative } from "../../../to-power-basis/to-power-basis-2nd-derivative/double/to-power-basis-2nd-derivative.js";
import { Horner } from 'flo-poly';


/**
 * Returns the `[x,y]` value of the twice differentiated (with respect to `t`) 
 * bezier curve's power basis when evaluated at `t`.
 * 
 * * uses double precision calculations internally
 * 
 * @param ps a cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 * 
 * @doc mdx
 */
function evaluatePowerBasis_2ndDerivative(ps: number[][], t: number): number[] {
	const [ddPsX, ddPsY] = toPowerBasis_2ndDerivative(ps);

	return [Horner(ddPsX, t), Horner(ddPsY, t)];
}


export { evaluatePowerBasis_2ndDerivative }
