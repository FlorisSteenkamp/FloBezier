import { differentiate as differentiate_ } from "flo-poly";
import { hornerWithRunningError as hornerWithRunningError_ } from "flo-poly";
import { Horner as Horner_ } from "flo-poly";
import { brentPoly as brentPoly_ } from "./brent-poly.js";
import { removeLeadingZeros as removeLeadingZeros_ } from "flo-poly";


// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const differentiate = differentiate_;
const Horner = Horner_;
const brentPoly = brentPoly_;
const removeLeadingZeros = removeLeadingZeros_;
const hornerWithRunningError = hornerWithRunningError_;

const eps = Number.EPSILON;
const abs = Math.abs;

const Δ = eps * 2**-2;


function allRoots(p: number[]): number[] {

	// return an empty array for a constant or the zero polynomial
	if (p.length <= 1) {
		return [];
	}
	
	const lb = 0;
	const ub = 1;

	//p = removeLeadingZeros(p);

	//---- count and remove roots at zero
	let numZerosAtZero = 0;
	while (p[p.length-1] === 0) {
		p = p.slice(0,-1);
		numZerosAtZero++;
	}
	//------------------------


	let maxCoeff = Number.NEGATIVE_INFINITY;
	for (let i=0; i<p.length; i++) {
		if (abs(p[i]) > maxCoeff) { maxCoeff = abs(p[i]); }
	}
	// TODO - use better error bound for this
	const ΔΔ = Δ*maxCoeff;
	// Get all derivatives, i.e. 
	// ps === [p, dp, ddp, ..., constant]
	//        [0,  1,   2, ..., deg     ]
	const ps = [p];
	for (let i=1; i<=p.length-1; i++) {
		ps.push(differentiate(ps[i-1])); 
	}

	//const δ = Math.max(2*eps, 2*eps * Math.max(Math.abs(lb), Math.abs(ub)));

	/** root intervals */
	let is: number[] = [];
	// loop: ps[diffCount] === [linear, quadratic, ..., deg]
	for (let diffCount=p.length-2; diffCount>=0; diffCount--) {
		// Get roots within intervals:
		// ---------------------------
		// Finds and returns all roots of the given polynomial within the given 
	 	// intervals, starting from the lower bound (lb) and ending at the upper
	 	// bound (ub)
		const p = ps[diffCount];
		const roots: number[] = [];

		let _a_ = lb;
		let [_A_,eLB] = hornerWithRunningError(p, _a_);

		// if lower bound value is zero and this is the last iteration with 
		// p === the original polynomial then push the root at the lower bound
		//if (_A_ === 0 && diffCount === 0) {
		//	roots.push(lb);
		//}
		if (abs(_A_) < eLB) {
			roots.push(lb);
		}

		for (let i=0; i<is.length; i++) {
			const _b_ = is[i];
			let [_B_,e] = hornerWithRunningError(p, _b_);
			
			// if there is a root at the right interval then add it
			if (_A_*_B_ < 0) {
				roots.push(brentPoly(p, _a_, _b_, _A_, _B_));
			} else if (abs(_B_) < e) {  //if (_B_ === 0) {
				roots.push(_b_);
			}

			_a_ = _b_;
			_A_ = _B_;
		}

		const [_B_,eUB] = hornerWithRunningError(p, ub);

		// if upper bound value is zero and this is the last iteration with 
		// p === the original polynomial then push the root at the upper bound
		if (_A_*_B_ < 0) {
			roots.push(brentPoly(p, _a_, ub, _A_, _B_));
		} else if (abs(_B_) < eUB) {  //if (_B_ === 0 && diffCount === 0) {
			roots.push(ub);
		}

		is = roots;
	}

	if (numZerosAtZero > 0 && lb <= 0 && ub >= 0) {
		// at this point the existing intervals, `is`, are sorted
		// find the insertion spot and insert the zero roots to keep the roots
		// sorted
		let isWithZeroRoots: number[] = [];
		let zerosInserted = false;
		for (let i=0; i<is.length; i++) {
			if (!zerosInserted && is[i] >= 0) {
				// push the zero roots
				for (let j=0; j<numZerosAtZero; j++) {
					isWithZeroRoots.push(0);
				}
				zerosInserted = true;
			}
			isWithZeroRoots.push(is[i]);
		}
		return isWithZeroRoots;
	}

	return is;
} 


export { allRoots }
