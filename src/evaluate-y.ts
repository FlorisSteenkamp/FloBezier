
import Poly from 'flo-poly';

import { getY } from './get-y';


/**
 * Returns the y value of the given cubic bezier when evaluated at t. This
 * function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t - The t parameter
 * @returns 
 */
function evaluateY(ps: number[][]): (t: number) => number;
function evaluateY(ps: number[][], t: number): number;
function evaluateY(ps: number[][], t?: number) {
	const yPs = getY(ps); // Speed optimizing cache
	const evPs = Poly.evaluate(yPs);
	function f(t: number): number {
		if (t === 0) { return ps[0][1]; }
		if (t === 1) { return ps[3][1]; }
		return evPs(t);
	} 
	return t === undefined ? f : f(t); // Curry
}


export { evaluateY }
