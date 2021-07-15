
import { getDxy } from '../to-power-basis/get-dxy/double/get-dxy';
import { Horner as evaluatePoly } from 'flo-poly';


/**
 * Returns the tangent vector (not necessarily of unit length) of an 
 * order 1, 2 or 3 bezier curve at a specific given parameter value `t`. 
 * This function is curried.
 * 
 * @param ps a linear, quadratic or cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t the parameter value where the tangent should be evaluated
 * 
 * @doc mdx
 */
function tangent(ps: number[][], t: number): number[];
function tangent(ps: number[][]): (t: number) => number[];
function tangent(ps: number[][], t?: number) {
	const [dX, dY] = getDxy(ps);

	function f(t: number): number[] {
		return [
			evaluatePoly(dX,t),
			evaluatePoly(dY,t)
		];
	}

	// Curry
	return t === undefined ? f : f(t);
}


export { tangent }
