import { BezierPart } from './bezier-part';
import { length } from './global-properties/length/length';
import { clone } from './transformation/clone';
import { getTAtLength } from './local-properties-to-t/get-t-at-length';
import { equal } from './simultaneous-properties/equal';
import { cubicToQuadratic } from './transformation/cubic-to-quadratic';
import { bezierFromPart } from './transformation/from-bezier-piece';
import { evaluateHybridQuadratic } from './local-properties-at-t/t-to-xy/evaluate-hybrid-quadratic';
import { closestPointOnBezier } from './simultaneous-properties/closest-point-on-bezier/closest-point-on-bezier';
import { intersectBoxes } from './boxes/intersect-boxes';
import { areBoxesIntersecting } from './boxes/are-boxes-intersecting';
import { evalDeCasteljau, evalDeCasteljauX, evalDeCasteljauY } from './local-properties-at-t/t-to-xy/eval-de-casteljau';
import { evalDeCasteljauWithErr, evalDeCasteljauWithErrQuad } from './local-properties-at-t/t-to-xy/eval-de-casteljau-with-err';
import { isPointOnBezierExtension } from './simultaneous-properties/is-point-on-bezier-extension';
import { totalCurvature, totalAbsoluteCurvature } from './global-properties/total-curvature';
import { reverse } from './transformation/reverse';
import { X } from './intersection/bezier-bezier-intersection/x';
import { getInflections } from './global-properties/get-inflections';
import { getIntersectionCoeffs } from './intersection/bezier-bezier-intersection/bezier-bezier-intersection-implicit';
import { getImplicitForm3 } from './implicit-form/naive/get-implicit-form3';
import { getImplicitForm3Quad } from './implicit-form/quad/get-implicit-form3';
import { getImplicitForm3Exact } from './implicit-form/exact/get-implicit-form3';
import { getImplicitForm2 } from './implicit-form/naive/get-implicit-form2';
import { getImplicitForm2Quad } from './implicit-form/quad/get-implicit-form2';
import { getImplicitForm2Exact } from './implicit-form/exact/get-implicit-form2';
import { getImplicitForm1 } from './implicit-form/naive/get-implicit-form1';
import { getImplicitForm1Quad } from './implicit-form/quad/get-implicit-form1';
import { getImplicitForm1Exact } from './implicit-form/exact/get-implicit-form1';
import { getCoeffs3x3 } from './intersection/bezier-bezier-intersection/naive/get-coefficients-3x3';
import { getCoeffs3x3Quad } from './intersection/bezier-bezier-intersection/quad/get-coefficients-3x3';
import { getCoeffs3x3Exact } from './intersection/bezier-bezier-intersection/exact/get-coefficients-3x3';
import { getCoeffs3x2 } from './intersection/bezier-bezier-intersection/naive/get-coefficients-3x2';
import { getCoeffs3x2Quad } from './intersection/bezier-bezier-intersection/quad/get-coefficients-3x2';
import { getCoeffs3x2Exact } from './intersection/bezier-bezier-intersection/exact/get-coefficients-3x2';
import { getCoeffs3x1 } from './intersection/bezier-bezier-intersection/naive/get-coefficients-3x1';
import { getCoeffs3x1Quad } from './intersection/bezier-bezier-intersection/quad/get-coefficients-3x1';
import { getCoeffs3x1Exact } from './intersection/bezier-bezier-intersection/exact/get-coefficients-3x1';
import { getCoeffs2x3 } from './intersection/bezier-bezier-intersection/naive/get-coefficients-2x3';
import { getCoeffs2x3Quad } from './intersection/bezier-bezier-intersection/quad/get-coefficients-2x3';
import { getCoeffs2x3Exact } from './intersection/bezier-bezier-intersection/exact/get-coefficients-2x3';
import { getCoeffs2x2 } from './intersection/bezier-bezier-intersection/naive/get-coefficients-2x2';
import { getCoeffs2x2Quad } from './intersection/bezier-bezier-intersection/quad/get-coefficients-2x2';
import { getCoeffs2x2Exact } from './intersection/bezier-bezier-intersection/exact/get-coefficients-2x2';
import { getCoeffs2x1 } from './intersection/bezier-bezier-intersection/naive/get-coefficients-2x1';
import { getCoeffs2x1Quad } from './intersection/bezier-bezier-intersection/quad/get-coefficients-2x1';
import { getCoeffs2x1Exact } from './intersection/bezier-bezier-intersection/exact/get-coefficients-2x1';
import { getCoeffs1x3 } from './intersection/bezier-bezier-intersection/naive/get-coefficients-1x3';
import { getCoeffs1x3Quad } from './intersection/bezier-bezier-intersection/quad/get-coefficients-1x3';
import { getCoeffs1x3Exact } from './intersection/bezier-bezier-intersection/exact/get-coefficients-1x3';
import { getCoeffs1x2 } from './intersection/bezier-bezier-intersection/naive/get-coefficients-1x2';
import { getCoeffs1x2Quad } from './intersection/bezier-bezier-intersection/quad/get-coefficients-1x2';
import { getCoeffs1x2Exact } from './intersection/bezier-bezier-intersection/exact/get-coefficients-1x2';
import { getCoeffs1x1 } from './intersection/bezier-bezier-intersection/naive/get-coefficients-1x1';
import { getCoeffs1x1Quad } from './intersection/bezier-bezier-intersection/quad/get-coefficients-1x1';
import { getCoeffs1x1Exact } from './intersection/bezier-bezier-intersection/exact/get-coefficients-1x1';
import { getCoeffs3 } from './intersection/self-intersection/naive/get-coeffs-3';
import { getCoeffs3Quad } from './intersection/self-intersection/quad/get-coeffs-3';
import { getCoeffs3Exact } from './intersection/self-intersection/exact/get-coeffs-3';
import { toExpansion } from './transformation/to-expansion';
import { toEstimation } from './transformation/to-estimation';
import { fromPowerBases } from './from-power-basis/from-power-bases';
import { getHodograph } from './transformation/get-hodograph';
import { generateCuspAtHalf3 } from './create/generate-cusp-at-half-t';
import { cubicThroughPointGiven013 } from './create/cubic-through-point';
import { bezierSelfIntersection } from './intersection/self-intersection/self-intersection';
import { getEndpointIntersections } from './intersection/get-endpoint-intersections';
import { inversion01Precise } from './intersection/inversion-01';
import { getXY } from './to-power-basis/get-xy';
import { getDxy } from './to-power-basis/get-dxy';
import { getDdxy } from './to-power-basis/get-ddxy';
import { getX } from './to-power-basis/get-x';
import { getY } from './to-power-basis/get-y';
import { getDx } from './to-power-basis/get-dx';
import { getDy } from './to-power-basis/get-dy';
import { getDdx } from './to-power-basis/get-ddx';
import { getDdy } from './to-power-basis/get-ddy';
import { getDxyAt1 } from './local-properties-at-t/t-to-dxy/get-dxy-at-1';
import { getDdxyAt1 } from './local-properties-at-t/t-to-ddxy/get-ddxy-at-1';
import { getDxyAt0 } from './local-properties-at-t/t-to-dxy/get-dxy-at-0';
import { getDdxyAt0 } from './local-properties-at-t/t-to-ddxy/get-ddxy-at-0';
import { getDddxy } from './to-power-basis/get-dddxy';
import { evaluateX } from './local-properties-at-t/t-to-xy/evaluate-x';
import { evaluateY } from './local-properties-at-t/t-to-xy/evaluate-y';
import { evaluate } from './local-properties-at-t/t-to-xy/evaluate';
import { evaluateExact } from './local-properties-at-t/t-to-xy/evaluate';
import { evaluateDx } from './local-properties-at-t/t-to-dxy/evaluate-dx';
import { evaluateDdx } from './local-properties-at-t/t-to-ddxy/evaluate-ddx';
import { evaluateDy } from './local-properties-at-t/t-to-dxy/evaluate-dy';
import { evaluateDdy } from './local-properties-at-t/t-to-ddxy/evaluate-ddy';
import { tangent } from './local-properties-at-t/tangent';
import { normal } from './local-properties-at-t/normal';
import { from0ToT } from './transformation/split-merge-clone/from-0-to-T';
import { fromTTo1 } from './transformation/split-merge-clone/from-T-to-1';
import { fromTo, fromToPrecise } from './transformation/split-merge-clone/from-to';
import { getOtherTs } from './intersection/bezier-bezier-intersection/bezier-bezier-intersection-implicit';
import { bezierBezierIntersectionImplicit } from './intersection/bezier-bezier-intersection/bezier-bezier-intersection-implicit';
import { toCubic } from './transformation/degree-or-type/to-cubic';
import { κ, curvature } from './local-properties-at-t/curvature';
import { quadToPolyline } from './transformation/quad-to-polyline';
import { isQuadObtuse } from './global-properties/type/is-quad-obtuse';
import { getIntervalBox } from './global-properties/bounds/get-interval-box/get-interval-box';
import { getIntervalBoxQuad, getIntervalBox1Quad, getIntervalBox2Quad, getIntervalBox3Quad } from './global-properties/bounds/get-interval-box/get-interval-box-quad';
import { splitAt, splitAtPrecise } from './transformation/split-merge-clone/split-at';
import { closestPointOnBezierPrecise } from './simultaneous-properties/closest-point-on-bezier/closest-point-on-bezier';
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
import { getXBoundsTight, getYBoundsTight } from './global-properties/bounds/get-bounds';
import { getBounds } from './global-properties/bounds/get-bounds';
import { getBoundingBoxTight } from './global-properties/bounds/get-bounding-box-tight';
import { getBoundingBox } from './global-properties/bounds/get-bounding-box';
import { toHybridQuadratic } from './transformation/degree-or-type/to-hybrid-quadratic';
import { isCubicReallyQuad } from './global-properties/type/is-cubic-really-quad';
import { toQuadraticFromCubic } from './transformation/degree-or-type/to-quad-from-cubic';
import { circleBezierIntersection } from './intersection/circle-bezier-intersection/naive/circle-bezier-intersection';
import { circleBezierIntersectionPrecise } from './intersection/circle-bezier-intersection/circle-bezier-intersection-precise';
/**
 * Returns the convex hull of a bezier's control points. This hull bounds the
 * bezier curve. This function is memoized.
 *
 * The tolerance at which the cross product of two nearly collinear lines of the
 * hull are considered collinear is 1e-12.
 * @param ps - A bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns An ordered array of convex hull points.
 */
declare let getBoundingHull: (a: number[][]) => number[][];
/** Alias of κ. */
/**
 * Returns a human readable string representation of the given bezier.
 * @param ps - A bezier curve
 */
declare function toString(ps: number[][]): string;
export { getXY, getDxy, getDdxy, getX, getY, getDx, getDy, getDdx, getDdy, getDddxy, getDxyAt1, getDdxyAt1, getDxyAt0, getDdxyAt0, evaluateX, evaluateY, evaluateDx, evaluateDy, evaluateDdx, evaluateDdy, evaluate, evaluateExact, evaluateHybridQuadratic, κ, curvature, tangent, normal, getTAtLength, toCubic, cubicToQuadratic, fromPowerBases, toHybridQuadratic, reverse, from0ToT, fromTTo1, fromTo, fromToPrecise, splitAt, splitAtPrecise, splitByMaxCurveLength, splitByMaxCurvature, splitByCurvatureAndLength, clone, toString, quadToPolyline, toExpansion, toEstimation, getImplicitForm3, getImplicitForm3Quad, getImplicitForm3Exact as getImplicitForm3Exact_, getImplicitForm2, getImplicitForm2Quad, getImplicitForm2Exact as getImplicitForm2Exact_, getImplicitForm1, getImplicitForm1Quad, getImplicitForm1Exact as getImplicitForm1Exact_, getBounds, getXBoundsTight, getYBoundsTight, getBoundingHull, getBoundingBoxTight, getBoundingBox, lengthUpperBound, lengthSquaredUpperBound, getIntervalBox, getCurvatureExtrema, totalCurvature, totalAbsoluteCurvature, length, isQuadObtuse, flatness, isLine, isHorizontalLine, isVerticalLine, isSelfOverlapping, getHodograph, isCubicReallyQuad, toQuadraticFromCubic, getInflections, equal, getInterfaceCcw, areBeziersInSameKFamily, closestPointOnBezierPrecise, getTangentPolyFromPoint, getTangentPolyFromPointExact, hausdorffDistance, hausdorffDistanceCandidates, getEndpointIntersections, inversion01Precise, bezierBezierIntersectionImplicit, getIntersectionCoeffs, getOtherTs, intersectBoxes, areBoxesIntersecting, circleBezierIntersection, circleBezierIntersectionPrecise, bezierSelfIntersection, bezierFromPart, generateCuspAtHalf3, cubicThroughPointGiven013, getIntervalBoxQuad, getIntervalBox1Quad, getIntervalBox2Quad, getIntervalBox3Quad, evalDeCasteljau, evalDeCasteljauX, evalDeCasteljauY, evalDeCasteljauWithErr, evalDeCasteljauWithErrQuad, isPointOnBezierExtension, getCoeffs3x3, getCoeffs3x3Quad, getCoeffs3x3Exact, getCoeffs3x2, getCoeffs3x2Quad, getCoeffs3x2Exact, getCoeffs3x1, getCoeffs3x1Quad, getCoeffs3x1Exact, getCoeffs2x3, getCoeffs2x3Quad, getCoeffs2x3Exact, getCoeffs2x2, getCoeffs2x2Quad, getCoeffs2x2Exact, getCoeffs2x1, getCoeffs2x1Quad, getCoeffs2x1Exact, getCoeffs1x3, getCoeffs1x3Quad, getCoeffs1x3Exact, getCoeffs1x2, getCoeffs1x2Quad, getCoeffs1x2Exact, getCoeffs1x1, getCoeffs1x1Quad, getCoeffs1x1Exact, getCoeffs3, getCoeffs3Quad, getCoeffs3Exact, closestPointOnBezier };
export { BezierPart, X };
