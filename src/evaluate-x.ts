
import Poly from 'flo-poly';

import { getX } from './get-x';


/**
 * Returns the x value of the given cubic bezier when evaluated at t. This
 * function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t - The t parameter
 * @returns 
 */
function evaluateX(ps: number[][]): (t: number) => number;
function evaluateX(ps: number[][], t: number): number;
function evaluateX(ps: number[][], t?: number) {
	const xPs = getX(ps); // Speed optimizing cache
	const evPs = Poly.evaluate(xPs);
	function f(t: number): number {
		if (t === 0) { return ps[0][0]; }
		if (t === 1) { return ps[3][0]; }
		return evPs(t);
	} 
	return t === undefined ? f : f(t); // Curry
}


export { evaluateX }
