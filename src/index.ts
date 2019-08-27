
import { brent, allRoots } from 'flo-poly';
import { rotatePs as rotate, translatePs as translate, distanceBetween } from 'flo-vector2d';
import { memoize }     from 'flo-memoize';
import gaussQuadrature from 'flo-gauss-quadrature';
import { grahamScan }  from 'flo-graham-scan';

import { getX        } from './get-x';
import { getY        } from './get-y';
import { getDx       } from './get-dx';
import { getDy       } from './get-dy';
import { getDdx      } from './get-ddx';
import { getDdy      } from './get-ddy';
import { getDxyAt1   } from './get-dxy-at-1';
import { getDdxyAt1  } from './get-ddxy-at-1';
import { getDxyAt0   } from './get-dxy-at-0';
import { getDdxyAt0  } from './get-ddxy-at-0';
import { getDddxy    } from './get-dddxy';
import { evaluateX   } from './evaluate-x/evaluate-x';
import { evaluateY   } from './evaluate-y/evaluate-y';
import { evaluate    } from './evaluate/evaluate';
import { evaluateDx  } from './evaluate-dx';
import { evaluateDdx } from './evaluate-ddx';
import { evaluateDy  } from './evaluate-dy';
import { evaluateDdy } from './evaluate-ddy';
import { tangent     } from './tangent';
import { normal      } from './normal';
import { from0ToT    } from './from-0-to-T';
import { fromTTo1    } from './from-T-to-1';
import { fromTo, fromToPrecise } from './from-to';
import { coincident } from './coincident';
import { lineIntersection } from './line-intersection';
import { bezier3Intersection } from './bezier3-intersection/bezier3-intersection';
import { bezier3IntersectionSylvester } from './bezier3-intersection-sylvester/bezier3-intersection-sylvester_';
import { tsAtX } from './ts-at-x';
import { tsAtY } from './ts-at-y';

import { BezDebug } from './debug/debug';
import { IDrawFunctions } from './debug/draw-functions';
import { DebugElemType } from './debug/debug';
import { FatLine } from './debug/fat-line';
import { κ } from './curvature';
import { quadToPolyline } from './quad-to-polyline';
import { isQuadObtuse } from './is-quad-obtuse';
import { splitAt, splitAtPrecise } from './split-at';
import { closestPointOnBezier } from './closest-point-on-bezier';
import { hausdorffDistance, hausdorffDistanceCandidates } from './hausdorff-distance';
import { lengthUpperBound } from './length-upper-bound';
import { lengthSquaredUpperBound } from './length-squared-upper-bound';
import { splitByMaxCurveLength } from './split-by-max-curve-length';
import { getCurvatureExtrema } from './get-curvature-extrema/get-curvature-extrema';
import { getInflections } from './get-inflections';
import { flatness } from './flatness';
import { splitByMaxCurvature } from './split-by-max-curvature';
import { splitByCurvatureAndLength } from './split-by-curvature-and-length';
import { isPointOnBezierExtension } from './is-point-on-bezier-extension';
import { areBeziersInSameKFamily } from './are-beziers-in-same-k-family';
import { getInterfaceCcw } from './get-interface-ccw';
import { isLine, isHorizontalLine, isVerticalLine } from './is-line';
import { isSelfOverlapping } from './is-self-overlapping';
import { getTangentPolyFromPoint } from './get-tangent-poly-from-point';
import { getBounds } from './get-bounds';
import { getBoundingBoxTight } from './get-bounding-box-tight';
import { getBoundingBox } from './get-bounding-box';


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
 * @param l a 2d line represented by two points
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
	
	let inflectionTs = allRoots([a,b,c],0,1);
	
	const evPs = evaluate(ps);

	return inflectionTs.map(evPs);
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
 * @param ps A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns A value of 'L', 'C', '0', '1', or '2' depending on whether
 * the curve has a loop, a cusp, or zero, one or two inflection points.
 */
function categorize(ps: number[][]) {
	// TODO - finish
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
function length(interval: number[], ps: number[][]): number;
function length(interval: number[]): (ps: number[][]) => number;
function length(interval: number[], ps?: number[][]) {

	let fs = [,,length1,length2,length3];

	function f(ps: number[][]) {
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
/**
 * Returns the curve length in the specified interval. This function is curried.
 * @param ps A quadratic bezier, e.g. [[0,0],[1,1],[2,1]]
 * @param interval The paramter interval over which the length is 
 * to be calculated (often === [0,1]).
 */
function length2(interval: number[], ps: number[][]) {
	if (interval[0] === interval[1]) { return 0; }

	let [[x0, y0], [x1, y1], [x2, y2]] = ps;
	// Ensure zero length curve returns zero!
	if (x0 === x1 && x1 === x2 && y0 === y1 && y1 === y2) { return 0; }

	const evDs = ds(ps); 
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

	return distanceBetween(p1,p2);
}



/**
 * Returns the t parameter value where the given cubic bezier reaches the given
 * length, s, starting from t = 0. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param s - The length
 */
function getTAtLength(ps: number[][], s: number): number;
function getTAtLength(ps: number[][]): (s: number) => number;
function getTAtLength(ps: number[][], s?: number) {
	let ps_ = toCubic(ps);
	const lenAtT = (t: number) => length([0,t], ps_); 

	function f(s: number): number {
		return brent(t => (lenAtT(t) - s), -0.1, 1.1);
	}

	// Curry
	return s === undefined ? f : f(s);
}


/**
 * Returns ds for a linear, quadratic or cubic bezier curve. This function is 
 * curried.
 * @param ps An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t The parameter value
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
		//hq: (number[] | number[][])[],
		hq: [number[], number[][], number[]], 
		t: number, th: number) {

	let P0 = hq[0];
	let P1 = evaluate(hq[1], th);
	let P2 = hq[2];
	
	//let P1 = evaluateLinear(<number[][]>hq[1], th);
//	let P1 = evaluate(hq[1], th);

	//return evaluateQuadratic([P0, P1, P2], t);
	return evaluate([P0, P1, P2], t);
}


/**
 * Evaluates the given linear bezier (line) at a specific t value.
 * @param ps - A linear bezier curve.
 * @param t - The value where the bezier should be evaluated
 *//*
function evaluateLinear(ps: number[][], t: number) {
	let [[x0,y0],[x1,y1]] = ps;

	let x = x0*(1-t) + x1*t;
	let y = y0*(1-t) + y1*t;

	return [x,y];
}*/


/**
 * Returns a clone of the given cubic bezier (with a different reference).
 * @param ps A cubic bezier given by its array of control points
 */
function clone(ps: number[][]) {
	let [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps;

	return [[x0,y0],[x1,y1],[x2,y2],[x3,y3]];
}


/**
 * Evaluates the given quadratic bezier at a specific t value.
 * @param ps - A quadratic bezier curve.
 * @param t - The value where the bezier should be evaluated
 *//*
function evaluateQuadratic(ps: number[][], t: number) {
	let [[x0,y0],[x1,y1],[x2,y2]] = ps;

	let x = x0*(1-t)**2 + x1*2*(1-t)*t + x2*t**2;
	let y = y0*(1-t)**2 + y1*2*(1-t)*t + y2*t**2;

	return [x,y];
}
*/

/**
 * Returns the cubic version of the given quadratic bezier curve. Quadratic 
 * bezier curves can always be represented by cubics - the converse is false.
 * @param ps - A quadratic bezier curve.
 */
function quadraticToCubic(ps: number[][]) {
	let [[x0,y0],[x1,y1],[x2,y2]] = ps;

	return [
		[x0,y0],
		[(1/3)*x0+(2/3)*x1, (1/3)*y0+(2/3)*y1],
		[(2/3)*x1+(1/3)*x2, (2/3)*y1+(1/3)*y2],
		[x2,y2]
	];
}


function linearToCubic(ps: number[][]) {
	let [[x0,y0],[x1,y1]] = ps;

	let xInterval = (x1-x0)/3;
    let yInterval = (y1-y0)/3;

	return [
		[x0,y0],
		[x0 + xInterval*1, y0 + yInterval*1],
		[x0 + xInterval*2, y0 + yInterval*2],
		[x1,y1]
	];
}


/**
 * Returns a cubic bezier curve that is equivalent to the given linear or
 * quadratic bezier curve. Cubics are just returned unaltered.
 * @param ps An order 1, 2 or 3 bezier curve
 */
function toCubic(ps: number[][]) {
	if (ps.length === 2) { // Linear
		return linearToCubic(ps); 
	} else if (ps.length === 3) { // Quadratic
		return quadraticToCubic(ps); 
	} else if (ps.length === 4) { // Cubic
		return ps;
	}
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
	// -------------------------------------
	// -- Power basis and its derivatives --
	// -------------------------------------
	getX,
	getY,
	getDx,
	getDy,
	getDdx,
	getDdy,
	getDddxy,
	getDxyAt1,
	getDdxyAt1,
	getDxyAt0,
	getDdxyAt0,

	// -------------------------------
	// -- Get local properties at t --
	// -------------------------------
	evaluateX,
	evaluateY,
	evaluateDx,
	evaluateDy,
	evaluateDdx,
	evaluateDdy,
	evaluate,
	evaluateHybridQuadratic,
	κ, curvature,
	tangent,
	normal,
	ds,
	dκMod,

	// --------------------------------
	// -- Get t for local properties --
	// --------------------------------
	tsAtX,
	tsAtY,
	getTAtLength,

	// ---------------------------------------------------------
	// -- Global transformations, e.g. conversions and splits --
	// ---------------------------------------------------------

	// Affine transformations
	rotate,
	translate,
	scale,

	// Order & type transformation
	linearToCubic,
	fromLine,
	toCubic,
	quadraticToCubic,
	toQuadratic,
	//toHybridQuadratic,

	// Split, merge and clone
	reverse,
	from0ToT,
	fromTTo1,
	fromTo,
	fromToPrecise,
	splitAt,
	splitAtPrecise,
	splitByMaxCurveLength,
	splitByMaxCurvature,
	splitByCurvatureAndLength,
	clone,

	// Simplification
	quadToPolyline,
	
	// -----------------------
	// -- Global properties --
	// -----------------------

	// Bounds
	getBounds,
	getBoundingHull,
	getBoundingBoxTight,
	getBoundingBox,
	lengthUpperBound,
	lengthSquaredUpperBound,

	// Curvature
	getCurvatureExtrema,
	getInflections,
	totalCurvature,
	totalAbsoluteCurvature,

	length,
	isQuadObtuse,
	flatness,
	isLine, isHorizontalLine, isVerticalLine,
	isSelfOverlapping,

	// ------------------------------------------
	// -- Simultaneous multi-bezier properties --
	// ------------------------------------------

	equal,
	getInterfaceCcw,
	areBeziersInSameKFamily,
	closestPointOnBezier,
	getTangentPolyFromPoint,
	hausdorffDistance,
	hausdorffDistanceCandidates,

	// Intersections
	bezier3Intersection,
	bezier3IntersectionSylvester,
	lineIntersection,
	coincident,
	isPointOnBezierExtension,

	// -----------
	// -- Other --
	// -----------
	bezierFromBezierPiece,
	toString
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
