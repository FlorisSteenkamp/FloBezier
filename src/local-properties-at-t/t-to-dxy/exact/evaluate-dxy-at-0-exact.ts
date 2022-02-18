import { twoDiff, scaleExpansion2 } from 'big-float-ts';

const td = twoDiff;
const sce = scaleExpansion2;


/**
 * Returns the result (`[x,y]`) of evaluating the derivative of a linear, 
 * quadratic or cubic bezier curve at `t === 0`. 
 * 
 * @param ps An order 1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @doc mdx
 */
function evaluateDxyAt0Exact(
		ps: number[][]): number[][] {

	if (ps.length === 4) {
		const [[x0,y0], [x1,y1]] = ps;
		return [
            sce(3,td(x1,x0)),
            sce(3,td(y1,y0))
		];
	} 
	
	if (ps.length === 3) {
		const [[x0,y0], [x1,y1]] = ps;
		return [
            td(2*x1,2*x0),
            td(2*y1,2*y0),
		];
	} 
	
	if (ps.length === 2) {
		const [[x0,y0], [x1,y1]] = ps;
		return [
            td(x1,x0),
            td(y1,y0),
		];
	}

	if (ps.length === 1) {
		return [[0],[0]];
	}

	throw new Error('The given bezier curve must be of order <= 3.');
}


export { evaluateDxyAt0Exact }
