
import { evaluateDx } from './evaluate-dx';
import { evaluateDy } from './evaluate-dy';

/**
 * Returns the tangent unit vector of a cubic bezier curve at a specific t. This 
 * function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t - The parameter value where the tangent should be evaluated
 */
function tangent(ps: number[][], t: number): number[];
function tangent(ps: number[][]): (t: number) => number[];
function tangent(ps: number[][], t?: number) {
	const evDx = evaluateDx(ps);
	const evDy = evaluateDy(ps);

	function f(t: number): number[] {
		let dx = evDx(t);
		let dy = evDy(t);
		let d = Math.sqrt(dx*dx + dy*dy);

		return [dx/d, dy/d];
	}

	// Curry
	return t === undefined ? f : f(t);
}


export { tangent }
