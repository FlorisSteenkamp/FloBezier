import { gaussQuadrature } from "flo-gauss-quadrature";
import { ds } from "../../local-properties-at-t/ds.js";
import { fromTo2InclErrorBound } from "../../transformation/split/from-to/from-to-2-incl-error-bound.js";
import { splitByCurvature } from "../../transformation/split/split-by-curvature.js";


/**
 * Returns the curve length in the specified interval.
 * 
 * @param ps A quadratic bezier, e.g. [[0,0],[1,1],[2,1]]
 * @param interval The paramter interval over which the length is 
 * to be calculated (often === [0,1]).
 * 
 * @internal
 */
 function lengthBez2(
	 	interval: number[], 
		ps: number[][],
		maxCurviness = 0.4,
		gaussOrder: 4|16|64 = 16): number {

	const tS = interval[0];
	const tE = interval[1];

	if (tS === tE) { return 0; }

	const [[x0, y0], [x1, y1], [x2, y2]] = ps;
	// Ensure zero length curve returns zero!
	if (x0 === x1 && x1 === x2 && y0 === y1 && y1 === y2) { return 0; }

	const ps_ = fromTo2InclErrorBound(ps,tS,tE).ps;
	const ts = splitByCurvature(ps_, maxCurviness);

	let total = 0;
	for (let i=0; i<ts.length-1; i++) {
		const tS = ts[i];
		const tE = ts[i+1];

		total += gaussQuadrature(ds(ps_), [tS,tE], gaussOrder);
	}

	return total;
}


/**
 * Returns the curve length in the specified interval.
 * 
 * * unused because it is not numerically stable in its current form.
 * 
 * See https://gist.github.com/tunght13488/6744e77c242cc7a94859
 * 
 * @param ps - A quadratic bezier, e.g. [[0,0],[1,1],[2,1]]
 * @param interval - The paramter interval over which the length is 
 * to be calculated (often === [0,1]).
 */
/*
function lengthBez2(interval: number[], ps: number[][]) {
	if (interval[0] === interval[1]) { return 0; }

	const [[x0_, y0_], [x1_, y1_], [x2_, y2_]] = ps;
	// Keep line below to ensure zero length curve returns zero!
	if (x0_ === x1_ && x1_ === x2_ && y0_ === y1_ && y1_ === y2_) {
		return 0;
	} 

	const [[x0, y0], [x1, y1], [x2, y2]] = 
			fromTo(ps)(interval[0], interval[1]);

	const ax = x0 - 2*x1 + x2;
	const ay = y0 - 2*y1 + y2;
	const bx = 2*x1 - 2*x0;
	const by = 2*y1 - 2*y0;

	const A = 4 * (ax*ax + ay*ay);
	const B = 4 * (ax*bx + ay*by);
	const C = bx*bx + by*by;

	const Sabc = 2*Math.sqrt(A+B+C);
	const A_2 = Math.sqrt(A);
	const A_32 = 2*A*A_2;
	const C_2 = 2*Math.sqrt(C);
	const BA = B/A_2;

	return (
		A_32*Sabc + A_2*B*(Sabc - C_2) + 
		(4*C*A - B*B)*Math.log((2*A_2 + BA + Sabc) / (BA + C_2))
	) / (4*A_32);
}
*/


export { lengthBez2 }
