
import { tangent } from './tangent';
import { toUnitVector } from 'flo-vector2d';


/**
 * Returns the normal vector of a cubic bezier curve at a specific t. This
 * function is curried.
 * @param ps a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t - The parameter value where the normal should be evaluated
 */
function normal(ps: number[][], t: number): number[];
function normal(ps: number[][]): (t: number) => number[];
function normal(ps: number[][], t?: number) {
	const tan_ = tangent(ps);

	function f(t: number): number[] {
		let v = tan_(t);
		return [v[1], -v[0]];
	}

	// Curry
	return t === undefined ? f : f(t);
}


export { normal }
