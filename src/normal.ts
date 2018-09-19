
import { tangent } from './tangent';


/**
 * Returns the normal unit vector of a cubic bezier curve at a specific t. This
 * function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t - The parameter value where the normal should be evaluated
 */
function normal(ps: number[][], t: number): number[];
function normal(ps: number[][]): (t: number) => number[];
function normal(ps: number[][], t?: number) {
	const tanPs = tangent(ps);

	function f(t: number): number[] {
		let v = tanPs(t);
		return [v[1], -v[0]];
	}

	// Curry
	return t === undefined ? f : f(t);
}


export { normal }
