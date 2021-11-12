import { toCubic } from "../transformation/degree-or-type/to-cubic.js";
import { length } from "../global-properties/length/length.js";
import { brent } from "flo-poly";


/**
 * Returns the `t` parameter value where the given bezier curve reaches the 
 * given length `s` starting from `t = 0` and clipping at `t = 1.125`. 
 * This function is curried.
 * 
 * @param ps a linear, quadratic or cubic bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param s the length
 * 
 * @doc mdx
 */
function getTAtLength(ps: number[][], s: number): number;
function getTAtLength(ps: number[][]): (s: number) => number;
function getTAtLength(ps: number[][], s?: number) {
	let ps_ = toCubic(ps);
	const lenAtT = (t: number) => length([0,t], ps_); 

	function f(s: number): number {
		if (s === 0) { return 0; }

		return brent(t => (lenAtT(t) - s), 0, 1.125);
	}

	// Curry
	return s === undefined ? f : f(s);
}


export { getTAtLength }
