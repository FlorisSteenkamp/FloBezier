
import Poly            from 'flo-poly';
import * as Vector     from 'flo-vector2d';
import Memoize         from 'flo-memoize';
import gaussQuadrature from 'flo-gauss-quadrature';
import grahamScan      from 'flo-graham-scan';

import { ICurriedMapFunction2       } from 'flo-vector2d';
import { ICurriedMapFunctionSpecial } from 'flo-vector2d';

import { getX        } from './src/get-x';
import { getY        } from './src/get-y';
import { getX2       } from './src/get-x2';
import { getY2       } from './src/get-y2';
import { getDx       } from './src/get-dx';
import { getDy       } from './src/get-dy';
import { getDx2      } from './src/get-dx2';
import { getDy2      } from './src/get-dy2';
import { evaluateX   } from './src/evaluate-x';
import { evaluateY   } from './src/evaluate-y';
import { evaluate    } from './src/evaluate';
import { evaluateDx  } from './src/evaluate-dx';
import { evaluateDy  } from './src/evaluate-dy';
import { evaluateDx2 } from './src/evaluate-dx2';
import { evaluateDy2 } from './src/evaluate-dy2';
import { tangent     } from './src/tangent';
import { normal      } from './src/normal';
import { from0ToT    } from './src/from-0-to-T';
import { fromTTo1    } from './src/from-T-to-1';
import { fromTo      } from './src/from-to';
import { toHybridQuadratic }  from './src/to-hybrid-quadratic';
import { coincident } from './src/coincident';
import { lineIntersection } from './src/line-intersection';
import { bezier3Intersection } from './src/bezier3-intersection/bezier3-intersection';
import { bezier3IntersectionSylvester } from './src/bezier3-intersection-sylvester/bezier3-intersection-sylvester_';
import { tsAtX } from './src/ts-at-x';
import { tsAtY } from './src/ts-at-y';

import { BezDebug } from './src/debug/debug';
import { IDrawFunctions } from './src/debug/draw-functions';
import { DebugElemType } from './src/debug/debug';
import { FatLine } from './src/debug/fat-line';
import { deCasteljau } from './src/de-casteljau';
import { evalDeCasteljau } from './src/eval-de-casteljau';


// Possibly typescript bug? Below line does not work
//const { rotatePs: rotate, translatePs: translate } = Vector;
let rotate: ICurriedMapFunctionSpecial<number, number, number[], number[]> = Vector.rotatePs;
let translate: ICurriedMapFunction2<number[], number[], number[]> = Vector.translatePs;

const memoize = Memoize.m1;


/**
 * Returns the second derivative of the power basis representation of the 
 * bezier's x-coordinates. This function is memoized on its points parameter by 
 * object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The twice differentiated power basis polynomial from 
 * highest power to lowest, e.g. at + b is returned as [a,b]
 */
let getDdx = memoize((ps: number[][]) => Poly.differentiate(getDx(ps)));


/**
 * Returns the second derivative of the power basis representation of the 
 * bezier's y-coordinates. This function is memoized on its points parameter by 
 * object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The twice differentiated power basis polynomial from 
 * highest power to lowest, e.g. at + b is returned as [a,b]
 */
let getDdy = memoize((ps: number[][])  => Poly.differentiate(getDy(ps)));


/**
 * Returns the third derivative of the power basis representation of the 
 * bezier's x-coordinates. This function is memoized on its points parameter by 
 * object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The thrice differentiated power basis polynomial (a 
 * constant in array from), e.g. a is returned as [a]
 */
let getDddx = memoize((ps: number[][]) => Poly.differentiate(getDdx(ps)));


/**
 * Returns the third derivative of the power basis representation of the 
 * bezier's y-coordinates. This function is memoized on its points parameter by 
 * object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The thrice differentiated power basis polynomial (a 
 * constant in array from), e.g. a is returned as [a]
 */
let getDddy = memoize((ps: number[][]) => Poly.differentiate(getDdy(ps)));


/** 
 * Returns the convex hull of a bezier's control points. This hull bounds the 
 * bezier curve. This function is memoized.
 * 
 * The tolerance at which the cross product of two nearly collinear lines of the 
 * hull are considered collinear is 1e-12.
 * @param ps - A bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns An ordered array of convex hull points.
 */
let getBoundingHull = memoize(grahamScan);


/**
 * Returns a cubic bezier from the given line with evenly spaced control points.
 * @param l - a 2d line represented by two points
 * @returns Control points of the cubic bezier.
 */
function fromLine(l: number[][]) {
	let [[x0,y0],[x1,y1]] = l;
	
	let xInterval = (x1 - x0)/3;
	let yInterval = (y1 - y0)/3;
	
	return [
		[x0, y0],
		[x0 + xInterval,   y0 + yInterval],
		[x0 + xInterval*2, y0 + yInterval*2],
		[x1, y1]
	];
}


/** 
 * Returns the given bezier's inflection points. 
 **/
function findInflectionPoints(ps: number[][]) {
	
	let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
	
	// From http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html eq. 4
	let ax = x1-x0;				let ay = y1-y0;
	let bx = x2-x1-ax;			let by = y2-y1-ay;
	let cx = x3-x2-ax-(2*bx);	let cy = y3-y2-ay-(2*by);
	
	// From http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html eq. 6:
	//   infl(t) := ax*by - ay*bx + t*(ax*cy - ay*cx) + t^2*(bx*cy - by*cx);
	// We find the roots of the quadratic - a,b,c are the quadratic coefficients
	let a = bx*cy - by*cx;
	let b = ax*cy - ay*cx;
	let c = ax*by - ay*bx;
	
	let inflectionTs = Poly.allRoots([a,b,c],0,1);
	
	const evPs = evaluate(ps);

	return inflectionTs.map(evPs);
}


/**
 * Returns the curvature, κ, at a specific t. This function is curried. Alias
 * of curvature.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t - The parameter value where the curvature should be 
 * evaluated
 */
function κ(ps: number[][], t: number): number;
function κ(ps: number[][]): (t: number) => number;
function κ(ps: number[][], t?: number) {
	const evDx  = evaluateDx (ps); 
	const evDy  = evaluateDy (ps);
	const evDdx = evaluateDdx(ps);
	const evDdy = evaluateDdy(ps);

	function f(t: number): number {
		let dx  = evDx (t); 
		let dy  = evDy (t);
		let ddx = evDdx(t);
		let ddy = evDdy(t);
		
		let a = dx*ddy - dy*ddx;
		let b = Math.sqrt((dx*dx + dy*dy)**3);

		return a/b; 	
	}

	// Curry
	return t === undefined ? f : f(t);
}


/**
 * Alias of κ.
 */
let curvature = κ;


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


/** 
 * Helper function. This function is curried.
 * A modified version of the differential of κ (use quotient rule, ignore 
 * denominator and multiply by 2/3). We need to find the zeros of this function 
 * to get the min/max curvature.
 * See <a href="http://math.info/Calculus/Curvature_Parametric/">this</a> for
 * more details.
 * @ignore
**/
function dκMod(ps: number[][], t: number): number;
function dκMod(ps: number[][]): (t: number) => number;
function dκMod(ps: number[][], t?: number) {
	let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
	
	function f(t: number): number {
		
		let ts = t*t;
		let omt = 1-t; 
		
		let a = ts*x3;
		let b = ts*y3;
		let c = 2*t - 3*ts;
		let d = (3*t-1)*omt;
		let e = omt*omt;
		let f = 3 * (a+c*x2-d*x1-e*x0);
		let g = 3 * (b+c*y2-d*y1-e*y0);
		let h = 6 * (t*y3-(3*t-1)*y2 + (3*t-2)*y1 + omt*y0); 
		let i = 6 * (t*x3-(3*t-1)*x2 + (3*t-2)*x1 + omt*x0);
		let j = Math.sqrt(f*f+g*g);

	   	return 4*(f*(y3-3*y2+3*y1-y0) - 
			   g*(x3-3*x2+3*x1-x0)) * j**3 - 
			   (f*h-i*g)*(2*h*g+2*i*f) * j;
	}

	return t === undefined ? f : f(t);	
}


/**
 * Categorizes the given cubic bezier curve according to whether it has a loop,
 * a cusp, or zero, one or two inflection points all of which are mutually 
 * exclusive. 
 *
 * See <a href="http://graphics.pixar.com/people/derose/publications/CubicClassification/paper.pdf">
 * this</a> paper.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns A value of 'L', 'C', '0', '1', or '2' depending on whether
 * the curve has a loop, a cusp, or zero, one or two inflection points.
 */
function categorize(ps: number[][]) {
	// TODO - finish
}


/**
 * TODO - replace this function by simply checking tangents at beginning and
 * end of curve.
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
	const tanPs = tangent(ps);

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



/**
 * Returns the curve (linear, quadratic or cubic bezier) length in the specified 
 * interval. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval - The paramter interval over which the length is 
 * to be calculated (often === [0,1]).
 */
function len(interval: number[], ps: number[][]): number;
function len(interval: number[]): (ps: number[][]) => number;
function len(interval: number[], ps?: number[][]) {

	function f(ps: number[][]) {
		let fs = [,,length1,length2,length3];

		return fs[ps.length](interval, ps);
	}

	// Curry
	return ps === undefined ? f : f(ps);
}


/**
 * Returns the curve length in the specified interval. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval - The paramter interval over which the length is 
 * to be calculated (often === [0,1]).
 */
function length3(interval: number[], ps: number[][]) {
	if (interval[0] === interval[1]) { return 0; }

	let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
	// Keep line below to ensure zero length curve returns zero!
	if (x0 === x1 && x1 === x2 && x2 === x3 &&
		y0 === y1 && y1 === y2 && y2 === y3) {
		return 0;
	}
	const evDs = ds(ps);
	return gaussQuadrature(evDs, interval);
}


/**
 * Returns the curve length in the specified interval. This function is curried.
 * Unused because it is not numerically stable in its current form.
 * See https://gist.github.com/tunght13488/6744e77c242cc7a94859
 * @param ps - A quadratic bezier, e.g. [[0,0],[1,1],[2,1]]
 * @param interval - The paramter interval over which the length is 
 * to be calculated (often === [0,1]).
 */
/*
function length2(interval: number[], ps: number[][]) {
	if (interval[0] === interval[1]) { return 0; }

	let [[x0_, y0_], [x1_, y1_], [x2_, y2_]] = ps;
	// Keep line below to ensure zero length curve returns zero!
	if (x0_ === x1_ && x1_ === x2_ && y0_ === y1_ && y1_ === y2_) {
		return 0;
	} 

	let [[x0, y0], [x1, y1], [x2, y2]] = 
			fromTo(ps)(interval[0], interval[1]);

	let ax = x0 - 2*x1 + x2;
	let ay = y0 - 2*y1 + y2;
	let bx = 2*x1 - 2*x0;
	let by = 2*y1 - 2*y0;

	let A = 4 * (ax*ax + ay*ay);
	let B = 4 * (ax*bx + ay*by);
	let C = bx*bx + by*by;

	let Sabc = 2*Math.sqrt(A+B+C);
	let A_2 = Math.sqrt(A);
	let A_32 = 2*A*A_2;
	let C_2 = 2*Math.sqrt(C);
	let BA = B/A_2;

	return (
		A_32*Sabc + A_2*B*(Sabc - C_2) + 
		(4*C*A - B*B)*Math.log((2*A_2 + BA + Sabc) / (BA + C_2))
	) / (4*A_32);
}
*/
function length2(interval: number[], ps: number[][]) {
	if (interval[0] === interval[1]) { return 0; }

	let [[x0, y0], [x1, y1], [x2, y2]] = ps;
	// Keep line below to ensure zero length curve returns zero!
	if (x0 === x1 && x1 === x2 && y0 === y1 && y1 === y2) { return 0; }

	const evDs = ds2(ps); 
	return gaussQuadrature(evDs, interval);
}


function length1(interval: number[], ps: number[][]) {
	let [t1, t2] = interval;
	if (t1 === t2) { return 0; }

	let [[x0, y0], [x1, y1]] = ps;
	// Keep line below to ensure zero length curve returns zero!
	if (x0 === x1 && y0 === y1) { return 0; } 

	let p1 = [x0 + t1*(x1-x0), y0 + t1*(y1-y0)];
	let p2 = [x0 + t2*(x1-x0), y0 + t2*(y1-y0)];

	return Vector.distanceBetween(p1,p2);
}



/**
 * Returns the t parameter value where the given cubic bezier reaches the given
 * length, s, starting from t = 0. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param s - The length
 * @returns {number}
 */
function getTAtLength(ps: number[][], s: number): number;
function getTAtLength(ps: number[][]): (s: number) => number;
function getTAtLength(ps: number[][], s?: number) {
	const lenAtT = (t: number) => len([0,t], ps); 

	function f(s: number): number {
		return Poly.brent(t => (lenAtT(t) - s), 0, 1);
	}

	// Curry
	return s === undefined ? f : f(s);
}


/**
 * Returns ds for a cubic bezier curve. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t - The parameter value
 */
function ds(ps: number[][], t: number): number;
function ds(ps: number[][]): (t: number) => number;
function ds(ps: number[][], t?: number) {
	const evDx = evaluateDx(ps);
	const evDy = evaluateDy(ps);

	function f(t: number): number {
		let dx = evDx(t);
		let dy = evDy(t);
		
		return Math.sqrt(dx*dx + dy*dy);	
	}

	// Curry
	return t === undefined ? f : f(t);	
}


/**
 * Returns ds for a quadratic bezier curve. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t - The parameter value
 */
function ds2(ps: number[][], t: number): number;
function ds2(ps: number[][]): (t: number) => number;
function ds2(ps: number[][], t?: number) {
	const evDx = evaluateDx2(ps);
	const evDy = evaluateDy2(ps);

	function f(t: number): number {
		let dx = evDx(t);
		let dy = evDy(t);
		
		return Math.sqrt(dx*dx + dy*dy);	
	}

	// Curry
	return t === undefined ? f : f(t);	
}


/**
 * Returns the x value of the twice differentiated (with respect to t) cubic 
 * bezier when evaluated at t. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t - The t parameter
 * @returns 
 */
function evaluateDdx(ps: number[][], t: number): number;
function evaluateDdx(ps: number[][]): (t: number) => number;
function evaluateDdx(ps: number[][], t?: number)  {
	const ddPs = getDdx(ps); // Speed optimizing cache
	const f = Poly.evaluate(ddPs);

	return t === undefined ? f : f(t); // Curry
}


/**
 * Returns the y value of the twice differentiated (with respect to t) cubic 
 * bezier when evaluated at t. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t - The t parameter
 * @returns 
 */
function evaluateDdy(ps: number[][], t: number): number;
function evaluateDdy(ps: number[][]): (t: number) => number;
function evaluateDdy(ps: number[][], t?: number)  {
	const ddPs = getDdy(ps); // Speed optimizing cache
	const f = Poly.evaluate(ddPs);

	return t === undefined ? f : f(t); // Curry
}


/**
 * Returns the x value of the thrice differentiated (with respect to t) cubic 
 * bezier when evaluated at t. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t - The t parameter
 */
function evaluateDddx(ps: number[][], t: number): number;
function evaluateDddx(ps: number[][]): (t: number) => number;
function evaluateDddx(ps: number[][], t?: number)  {
	const dddPs = getDddx(ps); // Speed optimizing cache
	const f = Poly.evaluate(dddPs);

	return t === undefined ? f : f(t); // Curry
}


/**
 * Returns the y value of the thrice differentiated (with respect to t) cubic 
 * bezier when evaluated at t. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t - The t parameter
 */
function evaluateDddy(ps: number[][], t: number): number;
function evaluateDddy(ps: number[][]): (t: number) => number;
function evaluateDddy(ps: number[][], t?: number)  {
	const dddPs = getDddy(ps); // Speed optimizing cache
	const f = Poly.evaluate(dddPs);

	return t === undefined ? f : f(t); // Curry
}



// TODO - refactor getBounds, getBoundingBox, etc.
/**
 * Helper function. Returns the bounding box of the normalized (i.e. first point 
 * moved to origin and rotated so that last point lies on x-axis) given cubic 
 * bezier.
 * @ignore
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param sinθ - Sine of angle made by line from first bezier point to 
 * last with x-axis.
 * @param cosθ - Cosine of angle made by line from first bezier point 
 * to last with x-axis.
 * @returns Bounding box in the form [[minX, minY], [maxX,maxY]
 */
function getNormalizedBoundingBox(ps: number[][], sinθ: number, cosθ: number) {
	let vectorToOrigin = Vector.transform(ps[0], x => -x);
	
	let boundingPs = Vector.translateThenRotatePs(
			vectorToOrigin, 
			-sinθ, 
			cosθ,
			ps 
	);
	
	return getBoundingBox(boundingPs);
}


/**
 * Returns the tight bounding box of the given cubic bezier.
 * @returns The tight bounding box of the bezier as four ordered
 * points of a rotated rectangle.
 * TODO - test case of baseLength === 0
 */
let getBoundingBoxTight = memoize(function(ps: number[][]) {
	let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
	
	let baseLength = Math.sqrt((x3-x0)*(x3-x0) + (y3-y0)*(y3-y0));
	let sinθ = (y3-y0) / baseLength; 
	let cosθ = (x3-x0) / baseLength;
	
	let box = getNormalizedBoundingBox(ps, sinθ, cosθ);
	
	let [[p0x,p0y],[p1x,p1y]] = box;

	let axisAlignedBox = [ 
		box[0], [p1x, p0y],
		box[1], [p0x, p1y]
	];

	return Vector.rotateThenTranslatePs(
			sinθ, 
			cosθ,
			ps[0],
			axisAlignedBox
	); 
});


/**
 * Returns the axis-aligned bounding box of a given bezier.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns the axis-aligned bounding box in the form
 * [[minx, miny], [maxx,maxy]
 */
let getBoundingBox = memoize(function(ps: number[][]) {
	return getBounds(ps).box;
});


/**
 * Calculates and returns general bezier bounds.
 * @returns The axis-aligned bounding box together with the t values
 * where the bounds on the bezier are reached.
 */
let getBounds = memoize(function(ps: number[][]) {

	// Roots of derivative
	let roots = [getDx(ps), getDy(ps)]
	.map(poly => Poly.allRoots(poly,0,1));
	
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


/**
 * Returns 2 new beziers split at the given t parameter, i.e. for the ranges 
 * [0,t] and [t,1]. Uses de Casteljau's algorithm. 
 * 
 * A loose bound on the accuracy of the resultant points is given by: 
 * |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * abd η is Number.EPSILON.
 * @param ps - A cubic bezier curve
 * @param t - The t parameter where the curve should be split
 */
function splitAt(ps: number[][], t: number): number[][][] {
	let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps; 
		
	let s  = 1  - t;
	let t2 = t  * t;
	let t3 = t2 * t;
	let s2 = s  * s;
	let s3 = s2 * s;
	
	let ps1 = [
		[x0, y0],
		[t*x1 + s*x0, t*y1 + s*y0],
		[t2*x2 + 2*s*t*x1 + s2*x0, t2*y2 + 2*s*t*y1 + s2*y0],
		[t3*x3 + 3*s*t2*x2 + 3*s2*t*x1 + s3*x0, 
		 t3*y3 + 3*s*t2*y2 + 3*s2*t*y1 + s3*y0]
	];
	
	let ps2 = [
		ps1[3],
		[t2*x3 + 2*t*s*x2 + s2*x1, t2*y3 + 2*t*s*y2 + s2*y1],
		[t*x3 + s*x2, t*y3 + s*y2],
		[x3, y3]
	];
	
	return [ps1, ps2];
}


/**
 * Returns a new bezier from the given bezier by limiting its t range. 
 * 
 * Uses de Casteljau's algorithm.
 * 
 * @param ps A bezier
 * @param tRange A t range
 */
function bezierFromBezierPiece(ps: number[][], tRange: number[]) {

	// If tRange = [0,1] then return original bezier.
	if (tRange[0] === 0 && tRange[1] === 1) {
		return ps;
	}

	// If tRange[0] === tRange[1] then return a single point degenerated bezier.
	if (tRange[0] === tRange[1]) {
		let p = evaluate(ps)(tRange[0]);
		return [p,p,p,p];
	}

	if (tRange[0] === 0) {
		return from0ToT(ps, tRange[1]);
	} 

	if (tRange[1] === 1) {
		return fromTTo1(ps, tRange[0]);
	} 

	// At this stage we know the t range is not degenerate and tRange[0] !== 0 
	// and tRange[1] !== 1
	return from0ToT(
		fromTTo1(ps, tRange[0]), 
		(tRange[1]-tRange[0]) / (1-tRange[0])
	);
}


/**
 * Returns a human readable string representation of the given bezier.
 * @param ps - A bezier curve
 */
function toString(ps: number[][]) {
	let [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;
	return `[[${x0},${y0}],[${x1},${y1}],[${x2},${y2}],[${x3},${y3}]]`;
}


/**
 * Scales all control points of the given bezier by the given factor.
 * @param ps - A bezier curve
 * @param c - The scale factor
 */
function scale(ps: number[][], c: number) {
	return ps.map(x => [x[0]*c, x[1]*c]);
}


/**
 * Returns the best least squares quadratic bezier approximation to the given
 * cubic bezier. Note that the two bezier endpoints differ in general.
 * @param ps - A cubic bezier curve.
 */
function toQuadratic(ps: number[][]) {
	let [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps;

	return [
		[(19/20)*x0 + (3/20) *x1 + (-3/20)*x2 + (1/20) *x3, 
		 (19/20)*y0 + (3/20) *y1 + (-3/20)*y2 + (1/20) *y3],
		[(-1/4) *x0 + (3/4)  *x1 + (3/4)  *x2 + (-1/4) *x3, 
		 (-1/4) *y0 + (3/4)  *y1 + (3/4)  *y2 + (-1/4) *y3],
		[(1/20) *x0 + (-3/20)*x1 + (3/20) *x2 + (19/20)*x3, 
		 (1/20) *y0 + (-3/20)*y1 + (3/20) *y2 + (19/20)*y3]
	];
}


/**
 * Evaluates the given hybrid quadratic at the given t and th parameters. (see 
 * toHybridQuadratic for details).
 * @param hq - A hybrid quadratic 
 * @param t - The bezier parameter value
 * @param th - The parameter value for the hybrid quadratic point.
 */
function evaluateHybridQuadratic(
		hq: (number[] | number[][])[], 
		t: number, th: number) {

	let P0  = <number[]>  hq[0];
	let P1_ = <number[][]>hq[1];
	let P2  = <number[]>  hq[2];
	
	let P1 = evaluateLinear(<number[][]>hq[1], th);

	return evaluateQuadratic([P0, P1, P2], t);
}


/**
 * Evaluates the given linear bezier (line) at a specific t value.
 * @param ps - A linear bezier curve.
 * @param t - The value where the bezier should be evaluated
 */
function evaluateLinear(ps: number[][], t: number) {
	let [[x0,y0],[x1,y1]] = ps;

	let x = x0*(1-t) + x1*t;
	let y = y0*(1-t) + y1*t;

	return [x,y];
}


/**
 * Returns a clone of the given cubic bezier. Use sparingly; this is not in the
 * spirit of functional programming.
 * @param ps - A cubic bezier given by its array of control points
 */
function clone(ps: number[][]) {
	let [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps;

	return [[x0,y0],[x1,y1],[x2,y2],[x3,y3]];
}


/**
 * Evaluates the given quadratic bezier at a specific t value.
 * @param ps - A quadratic bezier curve.
 * @param t - The value where the bezier should be evaluated
 */
function evaluateQuadratic(ps: number[][], t: number) {
	let [[x0,y0],[x1,y1],[x2,y2]] = ps;

	let x = x0*(1-t)**2 + x1*2*(1-t)*t + x2*t**2;
	let y = y0*(1-t)**2 + y1*2*(1-t)*t + y2*t**2;

	return [x,y];
}


/**
 * Returns the cubic version of the given quadratic bezier curve. Quadratic 
 * bezier curves can always be represented by cubics - the converse is false.
 * @param ps - A quadratic bezier curve.
 */
function toCubic(ps: number[][]) {
	let [[x0,y0],[x1,y1],[x2,y2]] = ps;

	return [
		[x0,y0],
		[(1/3)*x0+(2/3)*x1, (1/3)*y0+(2/3)*y1],
		[(2/3)*x1+(1/3)*x2, (2/3)*y1+(1/3)*y2],
		[x2,y2]
	];
}


/**
 * Returns the given points (e.g. bezier) in reverse order.
 * @param ps
 */
function reverse(ps: number[][]) {
	return ps.slice().reverse();
}


function equal(psA: number[][], psB: number[][]) {
	let [[ax0, ay0], [ax1, ay1], [ax2, ay2], [ax3, ay3]] = psA;
	let [[bx0, by0], [bx1, by1], [bx2, by2], [bx3, by3]] = psB;

	return (
		ax0 === bx0 && ax1 === bx1 && ax2 === bx2 && ax3 === bx3 &&
		ay0 === by0 && ay1 === by1 && ay2 === by2 && ay3 === by3
	)
}


export {
	rotate,
	getX,
	getY,
	getDx,
	getDy,
	getDdx,
	getDdy,
	getDddx,
	getDddy,
	getBounds,
	bezier3Intersection,
	bezier3IntersectionSylvester,
	lineIntersection,
	tsAtX,
	tsAtY,
	getBoundingHull,
	fromLine,
	translate,
	evaluate,
	κ,
	dκMod,
	curvature,
	tangent,
	normal,
	totalCurvature,
	totalAbsoluteCurvature,
	len,
	getTAtLength,
	evaluateX,
	evaluateY,
	evaluateDx,
	evaluateDy,
	evaluateDdx,
	evaluateDdy,
	evaluateDddx,
	evaluateDddy,
	getBoundingBoxTight,
	getBoundingBox,
	fromTo,
	splitAt,
	scale,
	toCubic,
	toQuadratic,
	toHybridQuadratic,
	evaluateHybridQuadratic,
	evaluateQuadratic,
	evaluateLinear,
	coincident,
	from0ToT,
	fromTTo1,
	bezierFromBezierPiece,
	clone,
	reverse,
	equal,
	deCasteljau,
	evalDeCasteljau,
}


export { 
	BezDebug, 
	IDrawFunctions,
	DebugElemType,
	FatLine
}


export interface BezierPoint {
	p: number[],
	t: number
}


