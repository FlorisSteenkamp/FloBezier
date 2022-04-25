import { Horner } from 'flo-poly';
import { toPowerBasis_1stDerivative } from "../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js";
import { toPowerBasis_2ndDerivative } from "../to-power-basis/to-power-basis-2nd-derivative/double/to-power-basis-2nd-derivative.js";


/**
 * Returns the curvature `κ` of the given linear, quadratic or cubic bezier 
 * curve at a specific given parameter value `t`. 
 * 
 * * returns `Number.NaN` at a cusp - this can be tested for with `Number.isNaN`
 * * this function is curried
 * 
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the curvature should be evaluated
 * 
 * @doc mdx
 */
function curvature(ps: number[][], t: number): number;
function curvature(ps: number[][]): (t: number) => number;
function curvature(ps: number[][], t?: number) {
    const [dX,dY] = toPowerBasis_1stDerivative(ps);
    const [ddX,ddY] = toPowerBasis_2ndDerivative(ps);

	function f(t: number): number {
		const dx  = Horner(dX, t); 
		const dy  = Horner(dY, t); 
		const ddx = Horner(ddX, t); 
		const ddy = Horner(ddY, t); 
		
		const a = dx*ddy - dy*ddx;
		const b = Math.sqrt((dx*dx + dy*dy)**3);

		return a/b;
	}

	// Curry
	return t === undefined ? f : f(t);
}


/**
 * Alias for [[κ]].
 * 
 * Returns the curvature `κ` of the given linear, quadratic or cubic bezier 
 * curve at a specific given parameter value `t`. 
 * 
 * * **alias**: [[curvature]]
 * * this function is curried.
 * 
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the curvature should be evaluated
 * 
 * @doc
 */
const κ = curvature;


export { κ, curvature }
