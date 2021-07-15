import { twoDiff, scaleExpansion2 } from 'big-float-ts';

const td = twoDiff;
const sce = scaleExpansion2;


/**
 * Returns the exact result (`[x,y]`) of evaluating the derivative of a linear, 
 * quadratic or cubic bezier curve at `t === 1`. 
 * 
 * @param ps An order 1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @doc mdx
 */
function getDxyAt1Exact(
		ps: number[][]): number[][] {

	if (ps.length === 4) {
		const [x2,y2] = ps[2];
		const [x3,y3] = ps[3];
		return [
			sce(3,td(x3,x2)),
            sce(3,td(y3,y2))
		];
	} else if (ps.length === 3) {
		const [x1,y1] = ps[1];
		const [x2,y2] = ps[2];
		return [
			td(2*x2,2*x1),
            td(2*y2,2*y1),
		];
	} else if (ps.length === 2) {
		const [[x0,y0], [x1,y1]] = ps;
		return [
			td(x1,x0),
            td(y1,y0),
		];
	}
}


export { getDxyAt1Exact }
