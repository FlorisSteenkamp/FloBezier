import { grahamScan } from 'flo-graham-scan';
import { area } from './global-properties/area.js';
import { length } from './global-properties/length/length.js';
import { totalLength } from './global-properties/length/total-length.js';
import { clone } from './transformation/clone.js';
import { getTAtLength } from './local-properties-to-t/get-t-at-length.js';
import { equal } from './simultaneous-properties/equal.js';
import { γ, γγ } from './error-analysis/error-analysis.js';
import { fromTo } from './transformation/split/from-to.js';
import { fitQuadsToCubic } from './fit/fit-quads-to-cubic.js';
import { getControlPointBox } from './global-properties/bounds/get-control-point-box.js';
import { closestPointOnBezier } from './simultaneous-properties/closest-and-furthest-point-on-bezier/closest-point-on-bezier.js';
import { generateQuarterCircle } from './create/generate-quarter-circle.js';
import { bezier3Intersection } from './intersection/bezier3-intersection/bezier3-intersection.js';
import { intersectBoxes } from './boxes/intersect-boxes.js';
import { areBoxesIntersecting } from './boxes/are-boxes-intersecting.js';
import { evalDeCasteljau } from './local-properties-at-t/t-to-xy/double/eval-de-casteljau.js';
import { evalDeCasteljauError } from './local-properties-at-t/t-to-xy/eval-de-casteljau-error.js';
import { evalDeCasteljauWithErr } from './local-properties-at-t/t-to-xy/double/eval-de-casteljau-with-err.js';
import { evalDeCasteljauWithErrDd } from './local-properties-at-t/t-to-xy/double-double/eval-de-casteljau-with-err-dd.js';
import { evalDeCasteljauDd } from './local-properties-at-t/t-to-xy/double-double/eval-de-casteljau-dd.js';
import { isPointOnBezierExtension } from './simultaneous-properties/is-point-on-bezier-extension/is-point-on-bezier-extension.js';
import { totalCurvature, totalAbsoluteCurvature } from './global-properties/total-curvature.js';
import { reverse } from './transformation/reverse.js';
import { getInflections } from './global-properties/get-inflections.js';
import { getCoeffsBezBez } from './intersection/bezier-bezier-intersection/get-coefficients/get-coeffs-bez-bez.js';
import { getImplicitForm3 } from './implicit-form/double/get-implicit-form3.js';
import { getImplicitForm3Dd } from './implicit-form/double-double/get-implicit-form3-dd.js';
import { getImplicitForm3ErrorCounters } from './implicit-form/get-error-counters/get-implicit-form3-error-counters.js';
import { getImplicitForm3DdWithRunningError } from './implicit-form/double-double/get-implicit-form3-dd-with-running-error.js';
import { getImplicitForm3Exact } from './implicit-form/exact/get-implicit-form3-exact.js';
import { getImplicitForm2 } from './implicit-form/double/get-implicit-form2.js';
import { getImplicitForm2Dd } from './implicit-form/double-double/get-implicit-form2-dd.js';
import { getImplicitForm2ErrorCounters } from './implicit-form/get-error-counters/get-implicit-form2-error-counters.js';
import { getImplicitForm2DdWithRunningError } from './implicit-form/double-double/get-implicit-form2-dd-with-running-error.js';
import { getImplicitForm2Exact } from './implicit-form/exact/get-implicit-form2-exact.js';
import { getImplicitForm1 } from './implicit-form/double/get-implicit-form1.js';
import { getImplicitForm1Dd } from './implicit-form/double-double/get-implicit-form1-dd.js';
import { getImplicitForm1ErrorCounters } from './implicit-form/get-error-counters/get-implicit-form1-error-counters.js';
import { getImplicitForm1DdWithRunningError } from './implicit-form/double-double/get-implicit-form1-dd-with-running-error.js';
import { getImplicitForm1Exact } from './implicit-form/exact/get-implicit-form1-exact.js';
import { getCoeffsBez3WithRunningError } from './intersection/self-intersection/get-coefficients/double/get-coeffs-bez3-with-running-error.js';
import { getCoeffsBez3Exact } from './intersection/self-intersection/get-coefficients/exact/get-coeffs-bez3-exact.js';
import { toExpansion } from './transformation/to-expansion.js';
import { toEstimation } from './transformation/to-estimation.js';
import { fromPowerBasis } from './from-power-basis/from-power-basis.js';
import { getHodograph } from './transformation/get-hodograph.js';
import { generateCuspAtHalf3 } from './create/generate-cusp-at-half-t.js';
import { generateSelfIntersecting } from './create/generate-self-intersecting.js';
import { cubicThroughPointGiven013 } from './create/cubic-through-point-given013.js';
import { bezierSelfIntersection } from './intersection/self-intersection/bezier-self-intersection.js';
// TODO - remove getEndpointIntersections (used by 'flo-boolean')
import { getEndpointIntersections } from './intersection/get-endpoint-intersections.js';
import { tFromXY } from './local-properties-to-t/t-from-xy.js';
import { getXY } from './to-power-basis/get-xy/double/get-xy.js';
import { getDxy } from './to-power-basis/get-dxy/double/get-dxy.js';
import { getDdxy } from './to-power-basis/get-ddxy/double/get-ddxy.js';
import { getDxyAt1 } from './local-properties-at-t/t-to-dxy/double/get-dxy-at-1.js';
import { getDdxyAt1 } from './local-properties-at-t/t-to-ddxy/double/get-ddxy-at-1.js';
import { getDxyAt0 } from './local-properties-at-t/t-to-dxy/double/get-dxy-at-0.js';
import { getDdxyAt0 } from './local-properties-at-t/t-to-ddxy/double/get-ddxy-at-0.js';
import { getDddxy } from './to-power-basis/get-dddxy/double/get-dddxy.js';
import { getXYDd } from './to-power-basis/get-xy/double-double/get-xy-dd.js';
import { getDxyDd } from './to-power-basis/get-dxy/double-double/get-dxy-dd.js';
import { getDdxyDd } from './to-power-basis/get-ddxy/double-double/get-ddxy-dd.js';
import { getDddxyDd } from './to-power-basis/get-dddxy/double-double/get-dddxy-dd.js';
import { getXYExact } from './to-power-basis/get-xy/exact/get-xy-exact.js';
import { getDxyExact } from './to-power-basis/get-dxy/exact/get-dxy-exact.js';
import { getDdxyExact } from './to-power-basis/get-ddxy/exact/get-ddxy-exact.js';
import { getDddxyExact } from './to-power-basis/get-dddxy/exact/get-dddxy-exact.js';
import { getXYWithRunningError } from './to-power-basis/get-xy/double/get-xy-with-running-error.js';
import { getXYDdWithRunningError } from './to-power-basis/get-xy/double-double/get-xy-dd-with-running-error.js';
import { getXYErrorCounters } from './to-power-basis/get-xy/get-xy-error-counters.js';
import { getDxyErrorCounters } from './to-power-basis/get-dxy/get-dxy-error-counters.js';
import { tangent } from './local-properties-at-t/tangent.js';
import { normal } from './local-properties-at-t/normal.js';
//import { getOtherTs } from './intersection/bezier-bezier-intersection/get-other-ts.js';
import { bezierBezierIntersection } from './intersection/bezier-bezier-intersection/bezier-bezier-intersection.js';
import { toCubic } from './transformation/degree-or-type/to-cubic.js';
import { κ, curvature } from './local-properties-at-t/curvature.js';
import { quadToPolyline } from './transformation/quad-to-polyline.js';
import { isQuadObtuse } from './global-properties/classification/is-quad-obtuse.js';
import { getIntervalBox } from './global-properties/bounds/get-interval-box/get-interval-box.js';
import { getIntervalBoxDd } from './global-properties/bounds/get-interval-box/get-interval-box-dd.js';
import { getInterfaceRotation } from './simultaneous-properties/get-interface-rotation.js';
import { closestPointOnBezierCertified } from './simultaneous-properties/closest-and-furthest-point-on-bezier/closest-point-on-bezier-certified.js';
import { hausdorffDistanceOneSided } from './simultaneous-properties/hausdorff-distance/hausdorff-distance.js';
import { hausdorffDistance } from './simultaneous-properties/hausdorff-distance/hausdorff-distance.js';
// import { hausdorffDistanceCandidates } from './simultaneous-properties/hausdorff-distance.js';
import { controlPointLinesLength } from './global-properties/length/control-point-lines-length.js';
import { splitByMaxCurveLength } from './transformation/split/split-by-max-curve-length.js';
import { getCurvatureExtrema } from './get-curvature-extrema/get-curvature-extrema.js';
import { flatness } from './global-properties/flatness.js';
import { splitByMaxCurvature } from './transformation/split/split-by-max-curvature.js';
import { splitByCurvatureAndLength } from './transformation/split/split-by-curvature-and-length.js';
import { areBeziersInSameKFamily } from './simultaneous-properties/are-beziers-in-same-k-family.js';
import { isCollinear, isHorizontal, isVertical } from './global-properties/classification/is-collinear.js';
import { isSelfOverlapping } from './global-properties/classification/is-self-overlapping.js';
import { getBounds } from './global-properties/bounds/get-bounds.js';
import { getBoundingBoxTight } from './global-properties/bounds/get-bounding-box-tight.js';
import { getBoundingBox } from './global-properties/bounds/get-bounding-box.js';
import { toHybridQuadratic } from './transformation/degree-or-type/to-hybrid-quadratic.js';
import { isCubicReallyQuad } from './global-properties/classification/is-cubic-really-quad.js';
import { isQuadReallyLine } from './global-properties/classification/is-quad-really-line.js';
import { isReallyPoint } from './global-properties/classification/is-really-point.js';
import { toQuadraticFromCubic } from './transformation/degree-or-type/to-quadratic-from-cubic.js';
import { circleBezierIntersection } from './intersection/circle-bezier-intersection/circle-bezier-intersection.js';
// TODO - ADD!!!
import { evaluateExact } from './local-properties-at-t/t-to-xy/exact/evaluate-exact.js';
import { evaluate } from './local-properties-at-t/t-to-xy/double/evaluate.js';
import { evaluateDdxy } from './local-properties-at-t/t-to-ddxy/double/evaluate-ddxy.js';
import { evaluateDxy } from './local-properties-at-t/t-to-dxy/double/evaluate-dxy.js';
import { getXY3DdWithRunningError } from './to-power-basis/get-xy/double-double/get-xy-dd-with-running-error.js';
import { lineToQuadratic } from './transformation/degree-or-type/line-to-quadratic.js';
import { evaluateDxyExact } from './local-properties-at-t/t-to-dxy/exact/evaluate-dxy-exact.js';
import { evaluateDdxyExact } from './local-properties-at-t/t-to-ddxy/exact/evaluate-ddxy-exact.js';
import { getDdxyAt0Exact } from './local-properties-at-t/t-to-ddxy/exact/get-ddxy-at-0-exact.js';
import { getDdxyAt1Exact } from './local-properties-at-t/t-to-ddxy/exact/get-ddxy-at-1-exact.js';
import { getDxyAt0Exact } from './local-properties-at-t/t-to-dxy/exact/get-dxy-at-0-exact.js';
import { getDxyAt1Exact } from './local-properties-at-t/t-to-dxy/exact/get-dxy-at-1-exact.js';
import { toString } from './transformation/to-string.js';
import { bezierBezierIntersectionBoundless } from './intersection/bezier-bezier-intersection/bezier-bezier-intersection-boundless.js';
import { getClosestSquareDistanceToRect } from './boxes/get-closest-square-distance-to-rect.js';
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO - remove below?? - used by flo-boolean
//////////////////////////////////////////////////////////////////////////////////////////////////////////
import { getXBoundsTight, getYBoundsTight } from './global-properties/bounds/get-bounds.js';
import { getFootpointPolyExact } from "./simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/exact/get-footpoint-poly-exact.js";
import { getFootpointPoly } from "./simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/double/get-footpoint-poly.js";
import { getFootpointPolyDd } from "./simultaneous-properties/closest-and-furthest-point-on-bezier/get-coeffs/double-double/get-footpoint-poly-dd.js";
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO - remove below?? - used by flo-mat
//////////////////////////////////////////////////////////////////////////////////////////////////////////
import { getInterfaceCcw } from './simultaneous-properties/get-interface-ccw.js';
import { compareCurvaturesAtInterface } from './local-properties-at-t/compare-curvatures-at-interface.js';
//////////////////////////////////////////////////////////////////////////////////////////////////////////
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
export { 
// -------------------------------------
// -- Power basis and its derivatives --
// -------------------------------------
getXY, getDxy, getDdxy, getDddxy, getDxyAt1, getDdxyAt1, getDxyAt0, getDdxyAt0, getDddxyDd, getDdxyDd, getDxyDd, getXYDd, getXYExact, getDxyExact, getDdxyExact, getDddxyExact, getXYWithRunningError, getXYDdWithRunningError, getXYErrorCounters, getDxyErrorCounters, 
// -------------------------------
// -- Get local properties at t --
// -------------------------------
κ, curvature, tangent, normal, 
// --------------------------------
// -- Get t for local properties --
// --------------------------------
getTAtLength, 
// ---------------------------------------------------------
// -- Global transformations, e.g. conversions and splits --
// ---------------------------------------------------------
// Affine transformations
// TODO - put back
//rotate,
//translate,
// Order & type transformation
toCubic, fromPowerBasis, toHybridQuadratic, 
// Split, merge and clone
reverse, fromTo, splitByMaxCurveLength, splitByMaxCurvature, splitByCurvatureAndLength, clone, toString, 
// Simplification
quadToPolyline, toExpansion, toEstimation, getImplicitForm3, getImplicitForm3Dd, getImplicitForm3ErrorCounters, getImplicitForm3DdWithRunningError, getImplicitForm3Exact, getImplicitForm2, getImplicitForm2Dd, getImplicitForm2ErrorCounters, getImplicitForm2DdWithRunningError, getImplicitForm2Exact, getImplicitForm1, getImplicitForm1Dd, getImplicitForm1ErrorCounters, getImplicitForm1DdWithRunningError, getImplicitForm1Exact, 
// -----------------------
// -- Global properties --
// -----------------------
// Bounds
getBounds, getXBoundsTight, getYBoundsTight, getBoundingHull, getBoundingBoxTight, getBoundingBox, controlPointLinesLength, getIntervalBox, 
// Curvature
getCurvatureExtrema, totalCurvature, totalAbsoluteCurvature, length, area, totalLength, isQuadObtuse, flatness, isCollinear, isHorizontal, isVertical, isSelfOverlapping, getHodograph, isReallyPoint, isQuadReallyLine, isCubicReallyQuad, toQuadraticFromCubic, getInflections, 
// ------------------------------------------
// -- Simultaneous multi-bezier properties --
// ------------------------------------------
equal, γ, γγ, areBeziersInSameKFamily, closestPointOnBezierCertified, getInterfaceRotation, closestPointOnBezier, generateQuarterCircle, hausdorffDistanceOneSided, hausdorffDistance, tFromXY, 
// Intersections
bezierBezierIntersection, getCoeffsBezBez, intersectBoxes, areBoxesIntersecting, getClosestSquareDistanceToRect, circleBezierIntersection, bezierSelfIntersection, 
// --------------------
// -- Create beziers --
// --------------------
generateCuspAtHalf3, generateSelfIntersecting, cubicThroughPointGiven013, 
// TODO - categorize
getIntervalBoxDd, evalDeCasteljau, evalDeCasteljauError, evalDeCasteljauWithErr, evalDeCasteljauWithErrDd, evaluateExact, isPointOnBezierExtension, 
// self-intersection
getCoeffsBez3WithRunningError, getCoeffsBez3Exact, evaluate, 
/// Add!
evaluateDdxy, evaluateDxy, evaluateDxyExact, evaluateDdxyExact, getDdxyAt0Exact, getDdxyAt1Exact, getDxyAt0Exact, getDxyAt1Exact, evalDeCasteljauDd, bezierBezierIntersectionBoundless, getEndpointIntersections, bezier3Intersection, getControlPointBox, fitQuadsToCubic, getXY3DdWithRunningError, lineToQuadratic, getFootpointPoly, getFootpointPolyDd, getFootpointPolyExact, getInterfaceCcw, compareCurvaturesAtInterface };
//# sourceMappingURL=index.js.map