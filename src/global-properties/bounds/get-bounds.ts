import { allRoots } from "flo-poly";
import { getDxy } from "../../to-power-basis/get-dxy/double/get-dxy.js";
import { evalDeCasteljau } from "../../local-properties-at-t/t-to-xy/double/eval-de-casteljau.js";


/**
 * Returns an axis-aligned bounding box together with the t values where the 
 * bounds on the bezier are reached.
 * 
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control 
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * 
 * @doc mdx
 */
function getBounds(
		ps: number[][]): { ts: number[][]; box: number[][]; } {

	// Roots of derivative
	const dxy = getDxy(ps);
	const rootsX = allRoots(dxy[0],0,1);
	const rootsY = allRoots(dxy[1],0,1);
		
	// Endpoints
	rootsX.push(0, 1); 
	rootsY.push(0, 1);
	
	let minX = Number.POSITIVE_INFINITY;
	let maxX = Number.NEGATIVE_INFINITY;
	let minY = Number.POSITIVE_INFINITY;
	let maxY = Number.NEGATIVE_INFINITY;
	
	let tMinX: number;
	let tMaxX: number;
	let tMinY: number;
	let tMaxY: number;

	// Test points
	for (let i=0; i<rootsX.length; i++) {
		const t = rootsX[i];
		const [x,] = evalDeCasteljau(ps, t);
		if (x < minX) { minX = x;  tMinX = t; }
		if (x > maxX) { maxX = x;  tMaxX = t; }
	}
	for (let i=0; i<rootsY.length; i++) {
		const t = rootsY[i]; 
		const [,y] = evalDeCasteljau(ps, t);  
		if (y < minY) { minY = y;  tMinY = t; }
		if (y > maxY) { maxY = y;  tMaxY = t; }
	}
	
	// `tMinX`, ... is guaranteed defined below - TS was (understandably) 
	// unable to follow the logic.
	const ts  = [[tMinX!, tMinY!], [tMaxX!, tMaxY!]];
	const box = [[minX,  minY ], [maxX,  maxY ]];
	
	return { ts, box };
}


export { getBounds }
