import { toPowerBasis_1stDerivative } from '../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js';
import { Horner } from 'flo-poly';


/**
 * Returns a tangent vector (not necessarily of unit length) of an 
 * order 1, 2 or 3 bezier curve at a specific given parameter value `t`. 
 * 
 * * this function is curried
 * 
 * @param ps a linear, quadratic or cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t the parameter value where the tangent should be evaluated
 * 
 * @doc mdx
 */
function tangent(ps: number[][], t: number): number[];
function tangent(ps: number[][]): (t: number) => number[];
function tangent(ps: number[][], t?: number) {
	const [dX, dY] = toPowerBasis_1stDerivative(ps);

	function f(t: number): number[] {
		return [
			Horner(dX,t),
			Horner(dY,t)
		];
	}

	// Curry
	return t === undefined ? f : f(t);
}


export { tangent }
