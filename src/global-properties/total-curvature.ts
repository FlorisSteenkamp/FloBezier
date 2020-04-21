
import { gaussQuadrature } from "flo-gauss-quadrature";
import { evaluateDx } from "../local-properties-at-t/t-to-dxy/evaluate-dx";
import { evaluateDy } from "../local-properties-at-t/t-to-dxy/evaluate-dy";
import { evaluateDdx } from "../local-properties-at-t/t-to-ddxy/evaluate-ddx";
import { evaluateDdy } from "../local-properties-at-t/t-to-ddxy/evaluate-ddy";


/**
 * TODO - replace this function with a more sane version where total curvature 
 * is tallied by looking for inflection points and adding curvature over those 
 * pieces by looking at tangent at beginning and end of the pieces.
 * Returns the total absolute curvature of the bezier over [0,1] using Gaussian 
 * Quadrature integration with 16 wieghts and abscissas which is generally very 
 * accurate and fast. Returns the result in radians. 
 * @param ps - A cubic bezier
 * @param interval
 */
function totalAbsoluteCurvature(ps: number[][], interval: number[]): number;
function totalAbsoluteCurvature(ps: number[][]): (interval: number[]) => number; 
function totalAbsoluteCurvature(ps: number[][], interval?: number[]) {
	
	function f(interval: number[] = [0,1]) {
		// Numerically integrate the absolute curvature
		let result = gaussQuadrature(
				t => Math.abs(κds(ps)(t)),
				interval
		);
		
		return result;		
	}

	// Curry
	return interval === undefined ? f : f(interval);
}


// TODO - replace this function by simply checking tangents at beginning and
// end of curve.
/**
 * Returns the total curvature of the bezier over the given interval using 
 * Gaussian Quadrature integration with 16 wieghts and abscissas which is 
 * generally very accurate and fast. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval - The interval of integration (often === [0,1])
 * @returns The total curvature.
 */
function totalCurvature(ps: number[][], interval: number[]): number;
function totalCurvature(ps: number[][]): (interval: number[]) => number;
function totalCurvature(ps: number[][], interval?: number[]) {
	//const tanPs = tangent(ps);

	function f(interval: number[]): number {
		return gaussQuadrature(κds(ps), interval);
		// TODO
		/*
		let [a,b] = interval;
		let tangentA = tanPs(a);
		let tangentB = tanPs(b);
		let sinθ = Vector.cross(tanA, tanB)
		*/
	}

	// Curry
	return interval === undefined ? f : f(interval);
}


/**
 * Helper function. This function is curried.
 * @private
 */
function κds(ps: number[][], t: number): number;
function κds(ps: number[][]): (t: number) => number;
function κds(ps: number[][], t?: number) {
	const evDx  = evaluateDx (ps); 
	const evDy  = evaluateDy (ps);
	const evDdx = evaluateDdx(ps);
	const evDdy = evaluateDdy(ps);

	function f(t: number): number {
		let dx    = evDx (t); 
		let dy    = evDy (t);
		let ddx   = evDdx(t);
		let ddy   = evDdy(t);
		
		let a = dx*ddy - dy*ddx;
		let b = dx*dx + dy*dy;
		
		return a/b;
	}

	// Curry
	return t === undefined ? f : f(t);
}


export { totalCurvature, totalAbsoluteCurvature }
