import { grahamScan }  from 'flo-graham-scan';
import { BezierPart } from './bezier-part';
import { length } from './global-properties/length/length';
import { totalLength } from './global-properties/length/total-length';
import { clone } from './transformation/clone';
import { getTAtLength } from './local-properties-to-t/get-t-at-length';
import { equal } from './simultaneous-properties/equal';
import { cubicToQuadratic } from './transformation/cubic-to-quadratic';
import { bezierFromPart } from './transformation/from-bezier-piece';
import { evaluateHybridQuadratic } from './local-properties-at-t/t-to-xy/evaluate-hybrid-quadratic';

import { getControlPointBox } from './global-properties/bounds/get-control-point-box';

import { closestPointOnBezier } from './simultaneous-properties/closest-point-on-bezier/closest-point-on-bezier';

// TODO - remove - just for testing
import { bezier3Intersection } from './intersection/bezier3-intersection/bezier3-intersection';

import { intersectBoxes } from './boxes/intersect-boxes';
import { areBoxesIntersecting } from './boxes/are-boxes-intersecting';
import { evalDeCasteljau } from './local-properties-at-t/t-to-xy/eval-de-casteljau';
import { evalDeCasteljauWithErr } from './local-properties-at-t/t-to-xy/eval-de-casteljau-with-err';
import { evalDeCasteljauWithErrDd } from './local-properties-at-t/t-to-xy/eval-de-casteljau-with-err-dd';

import { isPointOnBezierExtension } from './simultaneous-properties/is-point-on-bezier-extension/is-point-on-bezier-extension';
import { totalCurvature, totalAbsoluteCurvature } from './global-properties/total-curvature';
import { reverse } from './transformation/reverse';
import { X } from './intersection/bezier-bezier-intersection/x';
import { getInflections } from './global-properties/get-inflections';
import { getCoeffsBezBez } from './intersection/bezier-bezier-intersection/get-coefficients/get-coeffs-bez-bez';

import { getImplicitForm3 } from './implicit-form/double/get-implicit-form3';
import { getImplicitForm3ErrorCounters } from './implicit-form/get-error-counters/get-implicit-form3-error-counters';
import { getImplicitForm3DdWithRunningError } from './implicit-form/double-double/get-implicit-form3-dd-with-running-error';
import { getImplicitForm3Exact } from './implicit-form/exact/get-implicit-form3-exact';

import { getImplicitForm2 } from './implicit-form/double/get-implicit-form2';
import { getImplicitForm2ErrorCounters } from './implicit-form/get-error-counters/get-implicit-form2-error-counters';
import { getImplicitForm2DdWithRunningError } from './implicit-form/double-double/get-implicit-form2-dd-with-running-error';
import { getImplicitForm2Exact } from './implicit-form/exact/get-implicit-form2-exact';

import { getImplicitForm1 } from './implicit-form/double/get-implicit-form1';
import { getImplicitForm1ErrorCounters } from './implicit-form/get-error-counters/get-implicit-form1-error-counters';
import { getImplicitForm1DdWithRunningError } from './implicit-form/double-double/get-implicit-form1-dd-with-running-error';
import { getImplicitForm1Exact } from './implicit-form/exact/get-implicit-form1-exact';

import { getCoeffsBez3Bez3Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez3-bez3-dd';
import { getCoeffsBez3Bez3Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez3-bez3-exact';

import { getCoeffsBez3Bez2Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez3-bez2-dd';
import { getCoeffsBez3Bez2Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez3-bez2-exact';

import { getCoeffsBez3Bez1Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez3-bez1-dd';
import { getCoeffsBez3Bez1Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez3-bez1-exact';

import { getCoeffsBez2Bez3Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez2-bez3-dd';
import { getCoeffsBez2Bez3Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez2-bez3-exact';

import { getCoeffsBez2Bez2Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez2-bez2-dd';
import { getCoeffsBez2Bez2Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez2-bez2-exact';

import { getCoeffsBez2Bez1Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez2-bez1-dd';
import { getCoeffsBez2Bez1Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez2-bez1-exact';

import { getCoeffsBez1Bez3Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez1-bez3-dd';
import { getCoeffsBez1Bez3Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez1-bez3-exact';

import { getCoeffsBez1Bez2Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez1-bez2-dd';
import { getCoeffsBez1Bez2Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez1-bez2-exact';

import { getCoeffsBez1Bez1Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez1-bez1-dd';
import { getCoeffsBez1Bez1Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez1-bez1-exact';

import { getCoeffsBez3 } from './intersection/self-intersection/get-coefficients/double/get-coeffs-bez3';
import { getCoeffsBez3Dd } from './intersection/self-intersection/get-coefficients/double-double/get-coeffs-bez3-dd';
import { getCoeffsBez3Exact } from './intersection/self-intersection/get-coefficients/exact/get-coeffs-bez3-exact';

import { toExpansion } from './transformation/to-expansion';
import { toEstimation} from './transformation/to-estimation';
import { fromPowerBasis } from './from-power-basis/from-power-basis';
import { getHodograph } from './transformation/get-hodograph';
import { generateCuspAtHalf3 } from './create/generate-cusp-at-half-t';
import { cubicThroughPointGiven013 } from './create/cubic-through-point-given013';
import { bezierSelfIntersection } from './intersection/self-intersection/bezier-self-intersection';
import { getEndpointIntersections } from './intersection/get-endpoint-intersections';
import { inversion01Precise } from './intersection/inversion-01';
import { tFromXY3 } from './intersection/t-from-xy';
//import { inversion1_BL52_1ULP } from './graveyard/inversion-old';

import { getXY       } from './to-power-basis/get-xy/double/get-xy';
import { getDxy      } from './to-power-basis/get-dxy';
import { getDdxy     } from './to-power-basis/get-ddxy';
import { getDxyAt1   } from './local-properties-at-t/t-to-dxy/get-dxy-at-1';
import { getDdxyAt1  } from './local-properties-at-t/t-to-ddxy/get-ddxy-at-1';
import { getDxyAt0   } from './local-properties-at-t/t-to-dxy/get-dxy-at-0';
import { getDdxyAt0  } from './local-properties-at-t/t-to-ddxy/get-ddxy-at-0';
import { getDddxy    } from './to-power-basis/get-dddxy';
import { tangent     } from './local-properties-at-t/tangent';
import { normal      } from './local-properties-at-t/normal';
import { from0ToT    } from './transformation/split-merge-clone/from-0-to-T';
import { fromTTo1    } from './transformation/split-merge-clone/from-T-to-1';
import { fromTo, fromToPrecise } from './transformation/split-merge-clone/from-to';
import { getOtherTs } from './intersection/bezier-bezier-intersection/get-other-ts';
import { bezierBezierIntersection } from './intersection/bezier-bezier-intersection/bezier-bezier-intersection';
import { toCubic } from './transformation/degree-or-type/to-cubic';
import { κ, curvature } from './local-properties-at-t/curvature';
import { quadToPolyline } from './transformation/quad-to-polyline';
import { isQuadObtuse } from './global-properties/type/is-quad-obtuse';
import { getIntervalBox } from './global-properties/bounds/get-interval-box/get-interval-box';
import { getIntervalBoxDd } from './global-properties/bounds/get-interval-box/get-interval-box-dd';
import { splitAt, splitAtPrecise } from './transformation/split-merge-clone/split-at';
import { closestPointOnBezierPrecise } from './simultaneous-properties/closest-point-on-bezier/closest-point-on-bezier-precise';
import { hausdorffDistance, hausdorffDistanceCandidates } from './simultaneous-properties/hausdorff-distance';
import { lengthUpperBound } from './global-properties/length/length-upper-bound';
import { lengthSquaredUpperBound } from './global-properties/length/length-squared-upper-bound';
import { splitByMaxCurveLength } from './transformation/split-merge-clone/split-by-max-curve-length';
import { getCurvatureExtrema } from './get-curvature-extrema/get-curvature-extrema';
import { flatness } from './global-properties/flatness';
import { splitByMaxCurvature } from './transformation/split-merge-clone/split-by-max-curvature';
import { splitByCurvatureAndLength } from './transformation/split-merge-clone/split-by-curvature-and-length';
import { areBeziersInSameKFamily } from './simultaneous-properties/are-beziers-in-same-k-family';
import { getInterfaceCcw } from './simultaneous-properties/get-interface-ccw';
import { isLine, isHorizontalLine, isVerticalLine } from './global-properties/type/is-line';
import { isSelfOverlapping } from './global-properties/type/is-self-overlapping';
import { getTangentPolyFromPoint } from './simultaneous-properties/get-tangent-poly-from-point/naive/get-tangent-poly-from-point';
import { getTangentPolyFromPointExact } from './simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point';
import { getBounds } from './global-properties/bounds/get-bounds';
import { getBoundingBoxTight } from './global-properties/bounds/get-bounding-box-tight';
import { getBoundingBox } from './global-properties/bounds/get-bounding-box';
import { toHybridQuadratic } from './transformation/degree-or-type/to-hybrid-quadratic';
import { isCubicReallyQuad } from './global-properties/type/is-cubic-really-quad';
import { isQuadReallyLine } from  './global-properties/type/is-quad-really-line';
import { toQuadraticFromCubic } from './transformation/degree-or-type/to-quad-from-cubic';
import { circleBezierIntersectionD } from './intersection/circle-bezier-intersection/double/circle-bezier-intersection-d';
import { circleBezierIntersection } from './intersection/circle-bezier-intersection/circle-bezier-intersection';

// TODO - ADD!!!
import { evaluate_anyBitlength_exact } from './local-properties-at-t/t-to-xy/any-bitlength/exact/evaluate-any-bitlength-exact';
import { evaluate } from './local-properties-at-t/t-to-xy/evaluate';
import { evaluateDdxy } from './local-properties-at-t/t-to-ddxy/evaluate-ddxy';
import { evaluateDxy } from './local-properties-at-t/t-to-dxy/evaluate-dxy';

import { getXY3DdWithRunningError } from './to-power-basis/get-xy/double-double/get-xy-dd-with-running-error';


/** 
 * Returns the convex hull of a bezier's control points. This hull bounds the 
 * bezier curve.
 * 
 * The tolerance at which the cross product of two nearly collinear lines of the 
 * hull are considered collinear is 1e-12.
 * @param ps - A bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns An ordered array of convex hull points.
 */
const getBoundingHull = grahamScan;


/** Alias of κ. */
//const curvature = κ;


/**
 * Returns a human readable string representation of the given bezier.
 * @param ps - A bezier curve
 */
function toString(ps: number[][]) {
	if (ps.length === 4) {
		const [[x0,y0], [x1,y1], [x2,y2], [x3,y3]] = ps;
		return `[[${x0},${y0}],[${x1},${y1}],[${x2},${y2}],[${x3},${y3}]]`;
	}

	if (ps.length === 3) {
		const [[x0,y0], [x1,y1], [x2,y2]] = ps;
		return `[[${x0},${y0}],[${x1},${y1}],[${x2},${y2}]]`;		
	}

	if (ps.length === 2) {
		const [[x0,y0], [x1,y1]] = ps;
		return `[[${x0},${y0}],[${x1},${y1}]]`;		
	}

	if (ps.length === 1) {
		const [[x0,y0]] = ps;
		return `[[${x0},${y0}]]`;		
	}
}


export {
	// -------------------------------------
	// -- Power basis and its derivatives --
	// -------------------------------------
	getXY,
	getDxy,
	getDdxy,
	getDddxy,
	getDxyAt1,
	getDdxyAt1,
	getDxyAt0,
	getDdxyAt0,

	// -------------------------------
	// -- Get local properties at t --
	// -------------------------------
	evaluateHybridQuadratic,
	κ, curvature,
	tangent,
	normal,

	// --------------------------------
	// -- Get t for local properties --
	// --------------------------------
	getTAtLength,

	// ---------------------------------------------------------
	// -- Global transformations, e.g. conversions and splits --
	// ---------------------------------------------------------

	// Affine transformations
	//rotate,
	//translate,

	// Order & type transformation
	toCubic,
	cubicToQuadratic,
	fromPowerBasis,
	toHybridQuadratic,

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

	toString,

	// Simplification
	quadToPolyline,
	toExpansion,
	toEstimation,

	getImplicitForm3,
	getImplicitForm3ErrorCounters,
	getImplicitForm3DdWithRunningError,
	getImplicitForm3Exact,

	getImplicitForm2,
	getImplicitForm2ErrorCounters,
	getImplicitForm2DdWithRunningError,
	getImplicitForm2Exact,

	getImplicitForm1,
	getImplicitForm1ErrorCounters,
	getImplicitForm1DdWithRunningError,
	getImplicitForm1Exact,
	
	// -----------------------
	// -- Global properties --
	// -----------------------

	// Bounds
	getBounds,
	//getXBoundsTight, getYBoundsTight,
	getBoundingHull,
	getBoundingBoxTight,
	getBoundingBox,
	lengthUpperBound,
	lengthSquaredUpperBound,
	getIntervalBox,

	// Curvature
	getCurvatureExtrema,
	totalCurvature,
	totalAbsoluteCurvature,

	length,
	totalLength,
	isQuadObtuse,
	flatness,
	isLine, isHorizontalLine, isVerticalLine,
	isSelfOverlapping,
	getHodograph,
	isQuadReallyLine,
	isCubicReallyQuad,
	toQuadraticFromCubic,
	getInflections,

	// ------------------------------------------
	// -- Simultaneous multi-bezier properties --
	// ------------------------------------------

	equal,
	getInterfaceCcw,
	areBeziersInSameKFamily,
	closestPointOnBezierPrecise,
	getTangentPolyFromPoint,
	getTangentPolyFromPointExact,
	hausdorffDistance,
	hausdorffDistanceCandidates,
	getEndpointIntersections,
	inversion01Precise,	
	//inversion1_BL52_1ULP,
	tFromXY3,

	// Intersections
	bezierBezierIntersection, 
	getCoeffsBezBez,
	getOtherTs,
	intersectBoxes,
	areBoxesIntersecting,
	
	circleBezierIntersectionD,
	circleBezierIntersection,
	bezierSelfIntersection,

	// --------------------
	// -- Create beziers --
	// --------------------
	bezierFromPart,
	generateCuspAtHalf3,
	cubicThroughPointGiven013,

	// TODO - categorize
	getIntervalBoxDd,
	evalDeCasteljau,
	evalDeCasteljauWithErr,
	evalDeCasteljauWithErrDd,
	evaluate_anyBitlength_exact,
	isPointOnBezierExtension,

	getCoeffsBez3Bez3Dd,
	getCoeffsBez3Bez2Dd,
	getCoeffsBez3Bez1Dd,
	getCoeffsBez2Bez3Dd,
	getCoeffsBez2Bez2Dd,
	getCoeffsBez2Bez1Dd,
	getCoeffsBez1Bez3Dd,
	getCoeffsBez1Bez2Dd,
	getCoeffsBez1Bez1Dd,

	getCoeffsBez3Bez3Exact,
	getCoeffsBez3Bez2Exact,
	getCoeffsBez3Bez1Exact,
	getCoeffsBez2Bez3Exact,
	getCoeffsBez2Bez2Exact,
	getCoeffsBez2Bez1Exact,
	getCoeffsBez1Bez3Exact,
	getCoeffsBez1Bez2Exact,
	getCoeffsBez1Bez1Exact,

	// self-intersection
	getCoeffsBez3,
	getCoeffsBez3Dd,
	getCoeffsBez3Exact,

	closestPointOnBezier,

	evaluate,

	/// Add!
	evaluateDdxy,
	evaluateDxy,

	// TODO - remove - just for testing
	bezier3Intersection,

	getControlPointBox,

	getXY3DdWithRunningError as getXYDdAnyBitlength3,
}

export { 
	BezierPart,
	X
}
