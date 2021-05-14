
import { splitAt } from "./split-at";

/**
 * Returns an order 1, 2 or 3 bezier curve that starts at the given t parameter 
 * and ends at t=1.
 * 
 * A loose bound on the accuracy of the resultant points is given by: 
 * |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * abd η is Number.EPSILON.
 * 
 * @param ps a cubic bezier curve
 * @param t the t parameter where the resultant bezier should start
 * 
 * @doc
 */
function fromTTo1(ps: number[][], t: number): number[][] {
	return splitAt(ps, t)[1];
}
/*
function fromTTo1(ps: number[][], t: number): number[][] {
	const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps; 
	
	const xs = [x0,x1,x2,x3];
	const ys = [y0,y1,y2,y3];

	const [x0_, x1_, x2_, x3_] = deCasteljau(xs, t)[1];
	const [y0_, y1_, y2_, y3_] = deCasteljau(ys, t)[1];

	return [[x0_, y0_], [x1_, y1_], [x2_, y2_], [x3_, y3_]];
}
*/

export { fromTTo1 }
