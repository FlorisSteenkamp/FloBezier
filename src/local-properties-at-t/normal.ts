import { getDxy } from '../to-power-basis/get-dxy/double/get-dxy.js';
import { Horner as evaluatePoly } from 'flo-poly';


/**
 * Returns a normal vector (not necessarily of unit length) of an order 1, 2 
 * or 3 bezier curve at a specific given parameter value `t`. 
 * This function is curried.
 * 
 * @param ps a linear, quadratic or cubic bezier given by its control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the normal should be evaluated
 * 
 * @doc mdx
 */
function normal(ps: number[][], t: number): number[];
function normal(ps: number[][]): (t: number) => number[];
function normal(ps: number[][], t?: number) {
	const [dX, dY] = getDxy(ps);

	function f(t: number): number[] {
		return [
			evaluatePoly(dY,t),
			// TODO (should the below be negative??)
			-evaluatePoly(dX,t)
		];
	}

	// Curry
	return t === undefined ? f : f(t);
}


export { normal }
