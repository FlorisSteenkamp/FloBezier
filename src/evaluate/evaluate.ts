
import { evaluateX } from '../evaluate-x/evaluate-x';
import { evaluateY } from '../evaluate-y/evaluate-y';


/** 
 * Evaluates the given bezier curve at the parameter t. This function is 
 * curried.
 * @param ps A line, quadratic or cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t The parameter value where the bezier should be evaluated
 * @returns The resultant point. 
 **/
function evaluate(ps: number[][]): (t: number) => number[];
function evaluate(ps: number[][], t: number): number[];
function evaluate(ps: number[][], t?: number) {
	//const evX = evaluateX(ps);
	//const evY = evaluateY(ps);
	const len = ps.length;

	return t === undefined ? f : f(t);
	
	function f(t: number): number[] {
		if (t === 0) {
			return ps[0];
		} else if (t === 1) {
			return ps[len-1];
		}
	
		let s = 1-t;

		if (ps.length === 4) {
			// cubic
			let [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps;
			let x = x0*s**3 + 3*x1*s**2*t + 3*x2*s*t**2 + x3*t**3;
			let y = y0*s**3 + 3*y1*s**2*t + 3*y2*s*t**2 + y3*t**3;
			return [x,y];
		} 
		
		if (ps.length === 3) {
			// quadratic
			let [[x0,y0],[x1,y1],[x2,y2]] = ps;
			let x = x0*s**2 + 2*x1*s*t + x2*t**2;
			let y = y0*s**2 + 2*y1*s*t + y2*t**2;
			return [x,y];
		} 
		
		if (ps.length === 2) {
			// line
			let [[x0,y0],[x1,y1]] = ps;
			let x = x0*s + x1*t;
			let y = y0*s + y1*t;
			return [x,y];
		}

		//return [evX(t), evY(t)];		
	}
}


export { evaluate }
