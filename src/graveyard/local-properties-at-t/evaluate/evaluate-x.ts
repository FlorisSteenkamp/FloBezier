
import { evaluate } from 'flo-poly';

import { getX } from '../../to-power-basis/get-x';


/**
 * Returns the x value of the given order 1, 2 or 3 bezier when evaluated at t. 
 * This function is curried.
 * @param ps An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t The t parameter
 */
function evaluateX(ps: number[][]): (t: number) => number;
function evaluateX(ps: number[][], t: number): number;
function evaluateX(ps: number[][], t?: number) {
	const xPs = getX(ps);
	const evPs = evaluate(xPs);
	const len = ps.length;
	function f(t: number): number {
		if (t === 0) { return ps[0][0]; }
		if (t === 1) { return ps[len-1][0]; }
		return evPs(t);
	} 
	return t === undefined ? f : f(t); // Curry
}


export { evaluateX }
