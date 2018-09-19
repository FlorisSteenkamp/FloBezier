
import { evaluateX } from './evaluate-x';
import { evaluateY } from './evaluate-y';


/** 
 * Evaluates the given bezier curve at the parameter t. This function is 
 * curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t - The parameter value where the bezier should be evaluated
 * @returns The resultant point. 
 **/
function evaluate(ps: number[][]): (t: number) => number[];
function evaluate(ps: number[][], t: number): number[];
function evaluate(ps: number[][], t?: number) {
	const [[x0, y0],,, [x3, y3]] = ps;
	const evX = evaluateX(ps);
	const evY = evaluateY(ps);
	
	function f(t: number): number[] {
		if (t === 0) {
			return [x0, y0];
		} else if (t === 1) {
			return [x3, y3];
		}
		
		return [evX(t), evY(t)];		
	}

	return t === undefined ? f : f(t);
}


export { evaluate }
