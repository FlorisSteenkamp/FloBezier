import { memoize } from "flo-memoize";
import { getDxy } from "../../to-power-basis/get-dxy";
import { allRoots } from "flo-poly";
import { getIntervalBox } from "./get-interval-box/get-interval-box";
import { γ } from "../../error-analysis/error-analysis";
import { operators } from "double-double";
import { evalDeCasteljau } from "../../local-properties-at-t/t-to-xy/eval-de-casteljau";


const { sqrtWithErr, divWithErr } = operators;

const abs = Math.abs;
const u = Number.EPSILON/2;
const γ1 = γ(1);


/**
 * Returns a tight axis-aligned bounding box bound of the given bezier curve.
 * 
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control 
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 */
const getXBoundsTight = memoize(
	function getXBoundsTight(ps: number[][]): {
		minX: { ts: number[]; box: number[][]; };
		maxX: { ts: number[]; box: number[][]; }; } {

		let pS = ps[0];
		let pE = ps[ps.length-1];

		let minX: { ts: number[]; box: number[][]; };
		let maxX: { ts: number[]; box: number[][]; };
		if (pS[0] < pE[0]) {
			minX = { ts: [0,0], box: [pS,pS] };
			maxX = { ts: [1,1], box: [pE,pE] };
		} else {
			minX = { ts: [1,1], box: [pE,pE] };
			maxX = { ts: [0,0], box: [pS,pS] };
		}

		if (ps.length === 2) { return { minX, maxX }; }

		let [dx,] = getDxy(ps);  // <= exact if 48-bit aligned

		// Roots of derivative
		let rootsX: { r: number; rE: number; }[];
		if (ps.length === 4) {
			rootsX = quadRoots(dx);
		} else { // ps.length === 3
			rootsX = getLinearRoots(dx);
		}
			
		// Test points
		for (let i=0; i<rootsX.length; i++) {
			let r = rootsX[i];
			let ts = [r.r - r.rE, r.r + r.rE];
			let box = getIntervalBox(ps, ts);

			if (box[0][0] < minX.box[0][0]) { minX = { ts, box } }
			if (box[1][0] > maxX.box[0][0]) { maxX = { ts, box } }
		}

		return { minX, maxX };
	}
);


/**
 * Returns a tight axis-aligned bounding box bound of the given bezier curve.
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control 
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 */
const getYBoundsTight = memoize(
	function getYBoundsTight(ps: number[][]) {
		let pS = ps[0];
		let pE = ps[ps.length-1];

		let minY: { ts: number[]; box: number[][]; };
		let maxY: { ts: number[]; box: number[][]; };
		if (pS[1] < pE[1]) {
			minY = { ts: [0,0], box: [pS,pS] };
			maxY = { ts: [1,1], box: [pE,pE] };
		} else {
			minY = { ts: [1,1], box: [pE,pE] };
			maxY = { ts: [0,0], box: [pS,pS] };
		}

		if (ps.length === 2) { return { minY, maxY }; }

		let [,dy] = getDxy(ps);  // <= exact if 48-bit aligned
		// Roots of derivative
		let rootsY: { r: number; rE: number; }[];
		if (ps.length === 4) {
			rootsY = quadRoots(dy);
		} else { // ps.length === 3
			rootsY = getLinearRoots(dy);
		}


		// Test points
		for (let i=0; i<rootsY.length; i++) {
			let r = rootsY[i];
			let ts = [r.r - r.rE, r.r + r.rE];
			let box = getIntervalBox(ps, ts);

			if (box[0][1] < minY.box[0][1]) { minY = { ts, box } }
			if (box[1][1] > maxY.box[0][1]) { maxY = { ts, box } }
		}

		return { minY, maxY };
	}
);


/**
 * @internal
 */
 function getLinearRoots([a,b]: number[]): { r: number; rE: number }[] {
	let r = -b/a;
	let rE = u*abs(b/a);

	if (r + rE > 0 && r - rE < 1) {
		return [{ r, rE }];
	}

	return [];
}


/**
 * Return quad roots in range [0,1] with error assuming input coefficients 
 * are exact.
 * 
 * @internal
 */
function quadRoots([a,b,c]: number[]): { r: number; rE: number }[] {
	// first check a !== 0, else get root of the line 'bt + c = 0'
	if (a === 0) {
		return getLinearRoots([b,c]);
	}

    // DD = discriminant = b^2 - 4ac
    // calculate DD and its absolute error DD_
    let bb = b*b;
    let bb_ = u*bb; // the error bound in b**2
	let ac4 = 4*a*c;
	let ac4_ = 4*u*abs(a*c);
    let DD = bb - ac4;
    let DD_ = bb_ + ac4_ + γ1*abs(DD);

    // If the discriminant is smaller than negative the error bound then
	// certainly there are no roots.
    if (DD <= -DD_) {
		// discriminant is definitely negative
        return [];
    }


	// discriminant is definitely positive
	let { est: D, err: D_ } = sqrtWithErr(DD, DD_);

	let q1: number;        
	if (b >= 0) {
		// let r1 = (-b - D) / 2*a;
		// let r2 = (2*c) / (-b - D);
		q1 = -b - D;
	} else {
		// let r2 = (-b + D) / 2*a;
		// let r1 = (2*c) / (-b + D);
		q1 = -b + D;
	}
	let q1_ = D_ + γ1*abs(q1);
	let { est: r1, err: r1_ } = divWithErr(q1,2*a, q1_,0);
	let { est: r2, err: r2_ } = divWithErr(2*c,q1, 0,q1_);        

	let res: { r: number, rE: number }[] = [];
	if (r1 + r1_ > 0 && r1 - r1_ < 1) {
		res.push({ r: r1, rE: r1_ });
	}
	if (r2 + r2_ > 0 && r2 - r2_ < 1) {
		res.push({ r: r2, rE: r2_ });
	}

	return res;
}


/**
 * Returns the axis-aligned bounding box together with the t values where the 
 * bounds on the bezier are reached.
 * 
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control 
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 */
const getBounds = memoize(
	function getBounds(ps: number[][]): { ts: number[][]; box: number[][]; } {
		// Roots of derivative
		const dxy = getDxy(ps);
		let rootsX = allRoots(dxy[0],0,1);
		let rootsY = allRoots(dxy[1],0,1);
			
		// Endpoints
		rootsX.push(0, 1); 
		rootsY.push(0, 1);
		
		let minX = Number.POSITIVE_INFINITY;
		let minY = Number.POSITIVE_INFINITY;
		let maxX = Number.NEGATIVE_INFINITY;
		let maxY = Number.NEGATIVE_INFINITY;
		
		let tMinX: number;
		let tMaxX: number;
		let tMinY: number;
		let tMaxY: number;

		// Test points
		for (let i=0; i<rootsX.length; i++) {
			let t = rootsX[i];
			let [x] = evalDeCasteljau(ps, t);
			if (x < minX) { minX = x;  tMinX = t; }
			if (x > maxX) { maxX = x;  tMaxX = t; }
		}
		for (let i=0; i<rootsY.length; i++) {
			let t = rootsY[i]; 
			let [,y] = evalDeCasteljau(ps, t);  
			if (y < minY) { minY = y;  tMinY = t; }
			if (y > maxY) { maxY = y;  tMaxY = t; }
		}
		
		let ts  = [[tMinX, tMinY], [tMaxX, tMaxY]];
		let box = [[minX,  minY ], [maxX,  maxY ]];
		
		return { ts, box };
	}
);


export { getBounds, getXBoundsTight, getYBoundsTight }
