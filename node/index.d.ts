import { grahamScan } from 'flo-graham-scan';
import { BezierPart } from './bezier-part.js';
import { length } from './global-properties/length/length.js';
import { totalLength } from './global-properties/length/total-length.js';
import { clone } from './transformation/clone.js';
import { getTAtLength } from './local-properties-to-t/get-t-at-length.js';
import { equal } from './simultaneous-properties/equal.js';
import { cubicToQuadratic } from './transformation/cubic-to-quadratic.js';
import { bezierFromPart } from './transformation/from-bezier-piece.js';
import { getControlPointBox } from './global-properties/bounds/get-control-point-box.js';
import { closestPointOnBezier } from './simultaneous-properties/closest-point-on-bezier/closest-point-on-bezier.js';
import { bezier3Intersection } from './intersection/bezier3-intersection/bezier3-intersection.js';
import { intersectBoxes } from './boxes/intersect-boxes.js';
import { areBoxesIntersecting } from './boxes/are-boxes-intersecting.js';
import { evalDeCasteljau } from './local-properties-at-t/t-to-xy/double/eval-de-casteljau.js';
import { evalDeCasteljauError } from './local-properties-at-t/t-to-xy/eval-de-casteljau-error.js';
import { isPointOnBezierExtension } from './simultaneous-properties/is-point-on-bezier-extension/is-point-on-bezier-extension.js';
import { totalCurvature, totalAbsoluteCurvature } from './global-properties/total-curvature.js';
import { reverse } from './transformation/reverse.js';
import { X } from './intersection/bezier-bezier-intersection/x.js';
import { getInflections } from './global-properties/get-inflections.js';
import { getCoeffsBezBez } from './intersection/bezier-bezier-intersection/get-coefficients/get-coeffs-bez-bez.js';
import { getImplicitForm3 } from './implicit-form/double/get-implicit-form3.js';
import { getImplicitForm3ErrorCounters } from './implicit-form/get-error-counters/get-implicit-form3-error-counters.js';
import { getImplicitForm3DdWithRunningError } from './implicit-form/double-double/get-implicit-form3-dd-with-running-error.js';
import { getImplicitForm3Exact } from './implicit-form/exact/get-implicit-form3-exact.js';
import { getImplicitForm2 } from './implicit-form/double/get-implicit-form2.js';
import { getImplicitForm2ErrorCounters } from './implicit-form/get-error-counters/get-implicit-form2-error-counters.js';
import { getImplicitForm2DdWithRunningError } from './implicit-form/double-double/get-implicit-form2-dd-with-running-error.js';
import { getImplicitForm2Exact } from './implicit-form/exact/get-implicit-form2-exact.js';
import { getImplicitForm1 } from './implicit-form/double/get-implicit-form1.js';
import { getImplicitForm1ErrorCounters } from './implicit-form/get-error-counters/get-implicit-form1-error-counters.js';
import { getImplicitForm1DdWithRunningError } from './implicit-form/double-double/get-implicit-form1-dd-with-running-error.js';
import { getImplicitForm1Exact } from './implicit-form/exact/get-implicit-form1-exact.js';
import { getCoeffsBez3Bez3Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez3-bez3-dd.js';
import { getCoeffsBez3Bez3Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez3-bez3-exact.js';
import { getCoeffsBez3Bez2Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez3-bez2-dd.js';
import { getCoeffsBez3Bez2Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez3-bez2-exact.js';
import { getCoeffsBez3Bez1Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez3-bez1-dd.js';
import { getCoeffsBez3Bez1Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez3-bez1-exact.js';
import { getCoeffsBez2Bez3Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez2-bez3-dd.js';
import { getCoeffsBez2Bez3Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez2-bez3-exact.js';
import { getCoeffsBez2Bez2Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez2-bez2-dd.js';
import { getCoeffsBez2Bez2Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez2-bez2-exact.js';
import { getCoeffsBez2Bez1Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez2-bez1-dd.js';
import { getCoeffsBez2Bez1Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez2-bez1-exact.js';
import { getCoeffsBez1Bez3Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez1-bez3-dd.js';
import { getCoeffsBez1Bez3Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez1-bez3-exact.js';
import { getCoeffsBez1Bez2Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez1-bez2-dd.js';
import { getCoeffsBez1Bez2Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez1-bez2-exact.js';
import { getCoeffsBez1Bez1Dd } from './intersection/bezier-bezier-intersection/get-coefficients/double-double/get-coeffs-bez1-bez1-dd.js';
import { getCoeffsBez1Bez1Exact } from './intersection/bezier-bezier-intersection/get-coefficients/exact/get-coeffs-bez1-bez1-exact.js';
import { getCoeffsBez3WithRunningError } from './intersection/self-intersection/get-coefficients/double/get-coeffs-bez3-with-running-error.js';
import { getCoeffsBez3Exact } from './intersection/self-intersection/get-coefficients/exact/get-coeffs-bez3-exact.js';
import { toExpansion } from './transformation/to-expansion.js';
import { toEstimation } from './transformation/to-estimation.js';
import { fromPowerBasis } from './from-power-basis/from-power-basis.js';
import { getHodograph } from './transformation/get-hodograph.js';
import { generateCuspAtHalf3 } from './create/generate-cusp-at-half-t.js';
import { cubicThroughPointGiven013 } from './create/cubic-through-point-given013.js';
import { bezierSelfIntersection } from './intersection/self-intersection/bezier-self-intersection.js';
import { tFromXY3 } from './local-properties-to-t/t-from-xy.js';
import { getXY } from './to-power-basis/get-xy/double/get-xy.js';
import { getDxy } from './to-power-basis/get-dxy/double/get-dxy.js';
import { getDdxy } from './to-power-basis/get-ddxy/double/get-ddxy.js';
import { getDxyAt1 } from './local-properties-at-t/t-to-dxy/double/get-dxy-at-1.js';
import { getDdxyAt1 } from './local-properties-at-t/t-to-ddxy/double/get-ddxy-at-1.js';
import { getDxyAt0 } from './local-properties-at-t/t-to-dxy/double/get-dxy-at-0.js';
import { getDdxyAt0 } from './local-properties-at-t/t-to-ddxy/double/get-ddxy-at-0.js';
import { getDddxy } from './to-power-basis/get-dddxy/double/get-dddxy.js';
import { tangent } from './local-properties-at-t/tangent.js';
import { normal } from './local-properties-at-t/normal.js';
import { from0ToT } from './transformation/split-merge-clone/from-0-to-T.js';
import { fromTTo1 } from './transformation/split-merge-clone/from-T-to-1.js';
import { fromTo, fromToPrecise } from './transformation/split-merge-clone/from-to.js';
import { bezierBezierIntersection } from './intersection/bezier-bezier-intersection/bezier-bezier-intersection.js';
import { toCubic } from './transformation/degree-or-type/to-cubic.js';
import { κ, curvature } from './local-properties-at-t/curvature.js';
import { quadToPolyline } from './transformation/quad-to-polyline.js';
import { isQuadObtuse } from './global-properties/type/is-quad-obtuse.js';
import { getIntervalBox } from './global-properties/bounds/get-interval-box/get-interval-box.js';
import { getIntervalBoxDd } from './global-properties/bounds/get-interval-box/get-interval-box-dd.js';
import { splitAt, splitAtPrecise } from './transformation/split-merge-clone/split-at.js';
import { closestPointOnBezierCertified } from './simultaneous-properties/closest-point-on-bezier/closest-point-on-bezier-certified.js';
import { hausdorffDistance, hausdorffDistanceCandidates } from './simultaneous-properties/hausdorff-distance.js';
import { lengthUpperBound } from './global-properties/length/length-upper-bound.js';
import { lengthSquaredUpperBound } from './global-properties/length/length-squared-upper-bound.js';
import { splitByMaxCurveLength } from './transformation/split-merge-clone/split-by-max-curve-length.js';
import { getCurvatureExtrema } from './get-curvature-extrema/get-curvature-extrema.js';
import { flatness } from './global-properties/flatness.js';
import { splitByMaxCurvature } from './transformation/split-merge-clone/split-by-max-curvature.js';
import { splitByCurvatureAndLength } from './transformation/split-merge-clone/split-by-curvature-and-length.js';
import { areBeziersInSameKFamily } from './simultaneous-properties/are-beziers-in-same-k-family.js';
import { isLine, isHorizontalLine, isVerticalLine } from './global-properties/type/is-line.js';
import { isSelfOverlapping } from './global-properties/type/is-self-overlapping.js';
import { getBounds } from './global-properties/bounds/get-bounds.js';
import { getBoundingBoxTight } from './global-properties/bounds/get-bounding-box-tight.js';
import { getBoundingBox } from './global-properties/bounds/get-bounding-box.js';
import { toHybridQuadratic } from './transformation/degree-or-type/to-hybrid-quadratic.js';
import { isCubicReallyQuad } from './global-properties/type/is-cubic-really-quad.js';
import { isQuadReallyLine } from './global-properties/type/is-quad-really-line.js';
import { toQuadraticFromCubic } from './transformation/degree-or-type/to-quad-from-cubic.js';
import { circleBezierIntersection } from './intersection/circle-bezier-intersection/circle-bezier-intersection.js';
import { evaluateExact } from './local-properties-at-t/t-to-xy/exact/evaluate-exact.js';
import { evaluate } from './local-properties-at-t/t-to-xy/double/evaluate.js';
import { evaluateDdxy } from './local-properties-at-t/t-to-ddxy/double/evaluate-ddxy.js';
import { evaluateDxy } from './local-properties-at-t/t-to-dxy/double/evaluate-dxy.js';
import { getXY3DdWithRunningError } from './to-power-basis/get-xy/double-double/get-xy-dd-with-running-error.js';
/**
 * Returns the convex hull of a bezier's control points. This hull bounds the
 * bezier curve.
 *
 * The tolerance at which the cross product of two nearly collinear lines of the
 * hull are considered collinear is 1e-12.
 * @param ps - A bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns An ordered array of convex hull points.
 */
declare const getBoundingHull: typeof grahamScan;
/** Alias of κ. */
/**
 * Returns a human readable string representation of the given bezier.
 * @param ps - A bezier curve
 */
declare function toString(ps: number[][]): string | undefined;
export { getXY, getDxy, getDdxy, getDddxy, getDxyAt1, getDdxyAt1, getDxyAt0, getDdxyAt0, κ, curvature, tangent, normal, getTAtLength, toCubic, cubicToQuadratic, fromPowerBasis, toHybridQuadratic, reverse, from0ToT, fromTTo1, fromTo, fromToPrecise, splitAt, splitAtPrecise, splitByMaxCurveLength, splitByMaxCurvature, splitByCurvatureAndLength, clone, toString, quadToPolyline, toExpansion, toEstimation, getImplicitForm3, getImplicitForm3ErrorCounters, getImplicitForm3DdWithRunningError, getImplicitForm3Exact, getImplicitForm2, getImplicitForm2ErrorCounters, getImplicitForm2DdWithRunningError, getImplicitForm2Exact, getImplicitForm1, getImplicitForm1ErrorCounters, getImplicitForm1DdWithRunningError, getImplicitForm1Exact, getBounds, getBoundingHull, getBoundingBoxTight, getBoundingBox, lengthUpperBound, lengthSquaredUpperBound, getIntervalBox, getCurvatureExtrema, totalCurvature, totalAbsoluteCurvature, length, totalLength, isQuadObtuse, flatness, isLine, isHorizontalLine, isVerticalLine, isSelfOverlapping, getHodograph, isQuadReallyLine, isCubicReallyQuad, toQuadraticFromCubic, getInflections, equal, areBeziersInSameKFamily, closestPointOnBezierCertified, closestPointOnBezier, hausdorffDistance, hausdorffDistanceCandidates, tFromXY3, bezierBezierIntersection, getCoeffsBezBez, intersectBoxes, areBoxesIntersecting, circleBezierIntersection, bezierSelfIntersection, bezierFromPart, generateCuspAtHalf3, cubicThroughPointGiven013, getIntervalBoxDd, evalDeCasteljau, evalDeCasteljauError, evaluateExact, isPointOnBezierExtension, getCoeffsBez3Bez3Dd, getCoeffsBez3Bez2Dd, getCoeffsBez3Bez1Dd, getCoeffsBez2Bez3Dd, getCoeffsBez2Bez2Dd, getCoeffsBez2Bez1Dd, getCoeffsBez1Bez3Dd, getCoeffsBez1Bez2Dd, getCoeffsBez1Bez1Dd, getCoeffsBez3Bez3Exact, getCoeffsBez3Bez2Exact, getCoeffsBez3Bez1Exact, getCoeffsBez2Bez3Exact, getCoeffsBez2Bez2Exact, getCoeffsBez2Bez1Exact, getCoeffsBez1Bez3Exact, getCoeffsBez1Bez2Exact, getCoeffsBez1Bez1Exact, getCoeffsBez3WithRunningError as getCoeffsBez3, getCoeffsBez3Exact, evaluate, evaluateDdxy, evaluateDxy, bezier3Intersection, getControlPointBox, getXY3DdWithRunningError as getXYDdAnyBitlength3, };
export { BezierPart, X };
