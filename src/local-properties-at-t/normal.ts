import { getDxy } from '../to-power-basis/get-dxy/double/get-dxy.js';
import { Horner } from 'flo-poly';


/**
 * Returns a normal vector (not necessarily of unit length) of a bezier curve 
 * at a specific given parameter value `t` by simply taking the `tangent` at
 * that point and rotating it by 90 degrees (it is *not* the derivative of the 
 * tangent) 
 * 
 * * this function is curried
 * 
 * @param ps a linear, quadratic or cubic bezier curve given by its control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
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
			-Horner(dY,t),
			Horner(dX,t)
		];
	}

	// Curry
	return t === undefined ? f : f(t);
}


export { normal }
