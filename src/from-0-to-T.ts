
import { splitAt } from "./split-at";


/**
 * Returns an order 1, 2 or 3 bezier curve that starts at the given curve's t=0 
 * and ends at the given t parameter.
 * 
 * A loose bound on the accuracy of the resultant points is given by: 
 * |δP| = 2n*max(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * and η is Number.EPSILON.
 * @param ps - A cubic bezier curve
 * @param t - The t parameter where the resultant bezier should end
 */
function from0ToT(ps: number[][], t: number): number[][] {
	return splitAt(ps, t)[0];
}

/*
function from0ToT(ps: number[][], t: number): number[][] {
	let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps; 
	
	let xs = [x0,x1,x2,x3];
	let ys = [y0,y1,y2,y3];

	let [x0_, x1_, x2_, x3_] = deCasteljau(xs, t)[0];
	let [y0_, y1_, y2_, y3_] = deCasteljau(ys, t)[0];

	return [[x0_, y0_], [x1_, y1_], [x2_, y2_], [x3_, y3_]];
}
*/

export { from0ToT }
