import { ddDiffDd, twoProduct } from "double-double";

const tp = twoProduct;
const qdq = ddDiffDd;

const abs = Math.abs;
const eps = Number.EPSILON;
const u = eps/2;


/*
function getDistanceToLineFunction(
		pS: number[],
		pE: number[]): (p: number[]) => number {

	const xS = pS[0];
	const yS = pS[1];
	const xE = pE[0];
	const yE = pE[1];

	const s = yS - yE;
	const t = xE - xS;
	const u = qdq(tp(xS,yE), tp(xE,yS))[1];

	return function(p: number[]) {
		return s*p[0] + t*p[1] + u;
	}
}
*/


function getDistanceToLineFunction(
		pS: number[],
		pE: number[]) {

	const xS = pS[0];
	const yS = pS[1];
	const xE = pE[0];
	const yE = pE[1];

	// note: td(yS, yE) nearly always has low double === 0 -> could potentially be taken advantage of in future
	const s = yS - yE;  // <1>s
	const t = xE - xS;  // <1>t
	const v = qdq(tp(xS,yE), tp(xE,yS))[1];  // <1>v

	const _s = abs(s);
	const _t = abs(t);
	const _v = abs(v);

	return function(p: number[], _p: number[]) {
		// error counter assumed <12> 
		// (the max of <6>,<6>,<10>,<11> and <12> from other functions)
		const x = p[0];  // <12>x 
		const y = p[1];  // <12>y

		//return s*x + t*y + u;

		const _x = _p[0];
		const _y = _p[1];

		// error counter of <12> on all coordinates
		const d = s*x + t*y + v;
		// <16>r <= <16>(<15>(<14>(<1>s*<12>x) + <14>(<1>t*<12>y)) + <1>v)
		const _d = _s*_x + _t*_y + _v;
		const E = 16*u*_d;

		return { dMin: d - E, dMax: d + E };
	}
}

export { getDistanceToLineFunction }
