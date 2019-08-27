
import { memoize } from "flo-memoize";
import { getDx } from "./get-dx";
import { getDy } from "./get-dy";
import { allRoots } from "flo-poly";
import { evaluateX } from "./evaluate-x/evaluate-x";
import { evaluateY } from "./evaluate-y/evaluate-y";


/**
 * Calculates and returns general bezier bounds.
 * @returns The axis-aligned bounding box together with the t values
 * where the bounds on the bezier are reached.
 */
let getBounds = memoize(function(ps: number[][]) {
	// TODO - handle special cases of line / quadratic

	// Roots of derivative
	let roots = [getDx(ps), getDy(ps)]
	.map(poly => allRoots(poly,0,1));
	
	// Endpoints
	roots[0].push(0, 1); 
	roots[1].push(0, 1);
	
	let minX = Number.POSITIVE_INFINITY;
	let maxX = Number.NEGATIVE_INFINITY;
	let minY = Number.POSITIVE_INFINITY;
	let maxY = Number.NEGATIVE_INFINITY;
	
	let tMinX = undefined;
	let tMinY = undefined;
	let tMaxX = undefined;
	let tMaxY = undefined;

	// Test points
	for (let i=0; i<roots[0].length; i++) {
		let t = roots[0][i];
		let x = evaluateX(ps, t);
		if (x < minX) { minX = x;  tMinX = t; }
		if (x > maxX) { maxX = x;  tMaxX = t; }
	}
	for (let i=0; i<roots[1].length; i++) {
		let t = roots[1][i]; 
		let y = evaluateY(ps, t);  
		if (y < minY) { minY = y;  tMinY = t; }
		if (y > maxY) { maxY = y;  tMaxY = t; }
	}
	
	let ts  = [[tMinX, tMinY], [tMaxX, tMaxY]];
	let box = [[minX,  minY ], [maxX,  maxY ]];
	
	return { ts, box };
});


export { getBounds }
