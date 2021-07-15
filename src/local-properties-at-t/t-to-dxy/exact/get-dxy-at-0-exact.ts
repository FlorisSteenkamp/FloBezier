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
function getDxyAt0Exact(
		ps: number[][]): number[][] {

	const [[x0,y0], [x1,y1]] = ps;

	if (ps.length === 4) {
		return [
            sce(3,td(x1,x0)),
            sce(3,td(y1,y0))
		];
	} else if (ps.length === 3) {
		return [
            td(2*x1,2*x0),
            td(2*y1,2*y0),
		];
	} else if (ps.length === 2) {
		return [
            td(x1,x0),
            td(y1,y0),
		];
	}
}


export { getDxyAt0Exact }
