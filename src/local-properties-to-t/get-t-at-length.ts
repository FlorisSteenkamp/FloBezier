
import { toCubic } from "../transformation/degree-or-type/to-cubic";
import { length } from "../global-properties/length/length";
import { brent } from "flo-poly";


/**
 * Returns the t parameter value where the given cubic bezier reaches the given
 * length, s, starting from t = 0. This function is curried.
 * 
 * @param ps a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param s the length
 * 
 * @doc
 */
function getTAtLength(ps: number[][], s: number): number;
function getTAtLength(ps: number[][]): (s: number) => number;
function getTAtLength(ps: number[][], s?: number) {
	let ps_ = toCubic(ps);
	const lenAtT = (t: number) => length([0,t], ps_); 

	function f(s: number): number {
		return brent(t => (lenAtT(t) - s), -0.1, 1.1);
	}

	// Curry
	return s === undefined ? f : f(s);
}


export { getTAtLength }
