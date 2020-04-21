
import { evaluate } from 'flo-poly';
import { getY } from '../../to-power-basis/get-y';


/**
 * Returns the y value of the given order 1, 2 or 3 bezier when evaluated at t. 
 * This function is curried.
 * @param ps A line segment, quadratic or cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t The t parameter
 */
function evaluateY(ps: number[][]): (t: number) => number;
function evaluateY(ps: number[][], t: number): number;
function evaluateY(ps: number[][], t?: number) {
	const yPs = getY(ps);
	const evPs = evaluate(yPs);
	const len = ps.length;
	function f(t: number): number {
		if (t === 0) { return ps[0][1]; }
		if (t === 1) { return ps[len-1][1]; }
		return evPs(t);
	} 
	return t === undefined ? f : f(t); // Curry
}


export { evaluateY }
