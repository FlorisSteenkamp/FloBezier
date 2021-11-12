import { ds } from "../../local-properties-at-t/ds.js";
import { gaussQuadrature } from "flo-gauss-quadrature";


/**
 * Returns the curve length in the specified interval.
 * 
 * @param ps a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval the paramter interval over which the length is to be 
 * calculated (often === [0,1]).
 * 
 * @internal
 */
 function lengthBez3(
	 	interval: number[], ps: number[][]): number {

	if (interval[0] === interval[1]) { return 0; }

	const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
	// Keep line below to ensure zero length curve returns zero!
	if (x0 === x1 && x1 === x2 && x2 === x3 &&
		y0 === y1 && y1 === y2 && y2 === y3) {
		return 0;
	}
	const evDs = ds(ps);
	return gaussQuadrature(evDs, interval);
}


export { lengthBez3 }
