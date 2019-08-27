import { rotatePs as rotate, translatePs as translate } from 'flo-vector2d';
import { getX } from './get-x';
import { getY } from './get-y';
import { getDx } from './get-dx';
import { getDy } from './get-dy';
import { getDdx } from './get-ddx';
import { getDdy } from './get-ddy';
import { getDxyAt1 } from './get-dxy-at-1';
import { getDdxyAt1 } from './get-ddxy-at-1';
import { getDxyAt0 } from './get-dxy-at-0';
import { getDdxyAt0 } from './get-ddxy-at-0';
import { getDddxy } from './get-dddxy';
import { evaluateX } from './evaluate-x/evaluate-x';
import { evaluateY } from './evaluate-y/evaluate-y';
import { evaluate } from './evaluate/evaluate';
import { evaluateDx } from './evaluate-dx';
import { evaluateDdx } from './evaluate-ddx';
import { evaluateDy } from './evaluate-dy';
import { evaluateDdy } from './evaluate-ddy';
import { tangent } from './tangent';
import { normal } from './normal';
import { from0ToT } from './from-0-to-T';
import { fromTTo1 } from './from-T-to-1';
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
 * Returns the second derivative of the power basis representation of the
 * bezier's x-coordinates. This function is memoized on its points parameter by
 * object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The twice differentiated power basis polynomial from
 * highest power to lowest, e.g. at + b is returned as [a,b]
 */
/**
 * Returns the second derivative of the power basis representation of the
 * bezier's y-coordinates. This function is memoized on its points parameter by
 * object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The twice differentiated power basis polynomial from
 * highest power to lowest, e.g. at + b is returned as [a,b]
 */
/**
 * Returns the third derivative of the power basis representation of the
 * bezier's x-coordinates. This function is memoized on its points parameter by
 * object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The thrice differentiated power basis polynomial (a
 * constant in array from), e.g. a is returned as [a]
 */
/**
 * Returns the third derivative of the power basis representation of the
 * bezier's y-coordinates. This function is memoized on its points parameter by
 * object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The thrice differentiated power basis polynomial (a
 * constant in array from), e.g. a is returned as [a]
 */
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
/**
 * Returns a cubic bezier from the given line with evenly spaced control points.
 * @param l - a 2d line represented by two points
 * @returns Control points of the cubic bezier.
 */
declare function fromLine(l: number[][]): number[][];
/**
 * Alias of κ.
 */
declare let curvature: typeof κ;
/**
 * Helper function. This function is curried.
 * A modified version of the differential of κ (use quotient rule, ignore
 * denominator and multiply by 2/3). We need to find the zeros of this function
 * to get the min/max curvature.
 * See <a href="http://math.info/Calculus/Curvature_Parametric/">this</a> for
 * more details.
 * @ignore
**/
declare function dκMod(ps: number[][], t: number): number;
declare function dκMod(ps: number[][]): (t: number) => number;
/**
 * Returns the total curvature of the bezier over the given interval using
 * Gaussian Quadrature integration with 16 wieghts and abscissas which is
 * generally very accurate and fast. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval - The interval of integration (often === [0,1])
 * @returns The total curvature.
 */
declare function totalCurvature(ps: number[][], interval: number[]): number;
declare function totalCurvature(ps: number[][]): (interval: number[]) => number;
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
declare function totalAbsoluteCurvature(ps: number[][], interval: number[]): number;
declare function totalAbsoluteCurvature(ps: number[][]): (interval: number[]) => number;
/**
 * Returns the curve (linear, quadratic or cubic bezier) length in the specified
 * interval. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval - The paramter interval over which the length is
 * to be calculated (often === [0,1]).
 */
declare function length(interval: number[], ps: number[][]): number;
declare function length(interval: number[]): (ps: number[][]) => number;
/**
 * Returns the t parameter value where the given cubic bezier reaches the given
 * length, s, starting from t = 0. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param s - The length
 */
declare function getTAtLength(ps: number[][], s: number): number;
declare function getTAtLength(ps: number[][]): (s: number) => number;
/**
 * Returns ds for a linear, quadratic or cubic bezier curve. This function is
 * curried.
 * @param ps An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t The parameter value
 */
declare function ds(ps: number[][], t: number): number;
declare function ds(ps: number[][]): (t: number) => number;
/**
 * Returns a new bezier from the given bezier by limiting its t range.
 *
 * Uses de Casteljau's algorithm.
 *
 * @param ps A bezier
 * @param tRange A t range
 */
declare function bezierFromBezierPiece(ps: number[][], tRange: number[]): number[][];
/**
 * Returns a human readable string representation of the given bezier.
 * @param ps - A bezier curve
 */
declare function toString(ps: number[][]): string;
/**
 * Scales all control points of the given bezier by the given factor.
 * @param ps - A bezier curve
 * @param c - The scale factor
 */
declare function scale(ps: number[][], c: number): number[][];
/**
 * Returns the best least squares quadratic bezier approximation to the given
 * cubic bezier. Note that the two bezier endpoints differ in general.
 * @param ps - A cubic bezier curve.
 */
declare function toQuadratic(ps: number[][]): number[][];
/**
 * Evaluates the given hybrid quadratic at the given t and th parameters. (see
 * toHybridQuadratic for details).
 * @param hq - A hybrid quadratic
 * @param t - The bezier parameter value
 * @param th - The parameter value for the hybrid quadratic point.
 */
declare function evaluateHybridQuadratic(hq: [number[], number[][], number[]], t: number, th: number): number[];
/**
 * Evaluates the given linear bezier (line) at a specific t value.
 * @param ps - A linear bezier curve.
 * @param t - The value where the bezier should be evaluated
 */ /**
 * Returns a clone of the given cubic bezier (with a different reference).
 * @param ps A cubic bezier given by its array of control points
 */
declare function clone(ps: number[][]): number[][];
/**
 * Evaluates the given quadratic bezier at a specific t value.
 * @param ps - A quadratic bezier curve.
 * @param t - The value where the bezier should be evaluated
 */ /**
 * Returns the cubic version of the given quadratic bezier curve. Quadratic
 * bezier curves can always be represented by cubics - the converse is false.
 * @param ps - A quadratic bezier curve.
 */
declare function quadraticToCubic(ps: number[][]): number[][];
declare function linearToCubic(ps: number[][]): number[][];
/**
 * Returns a cubic bezier curve that is equivalent to the given linear or
 * quadratic bezier curve. Cubics are just returned unaltered.
 * @param ps An order 1, 2 or 3 bezier curve
 */
declare function toCubic(ps: number[][]): number[][];
/**
 * Returns the given points (e.g. bezier) in reverse order.
 * @param ps
 */
declare function reverse(ps: number[][]): number[][];
declare function equal(psA: number[][], psB: number[][]): boolean;
export { getX, getY, getDx, getDy, getDdx, getDdy, getDddxy, getDxyAt1, getDdxyAt1, getDxyAt0, getDdxyAt0, evaluateX, evaluateY, evaluateDx, evaluateDy, evaluateDdx, evaluateDdy, evaluate, evaluateHybridQuadratic, κ, curvature, tangent, normal, ds, dκMod, tsAtX, tsAtY, getTAtLength, rotate, translate, scale, linearToCubic, fromLine, toCubic, quadraticToCubic, toQuadratic, reverse, from0ToT, fromTTo1, fromTo, fromToPrecise, splitAt, splitAtPrecise, splitByMaxCurveLength, splitByMaxCurvature, splitByCurvatureAndLength, clone, quadToPolyline, getBounds, getBoundingHull, getBoundingBoxTight, getBoundingBox, lengthUpperBound, lengthSquaredUpperBound, getCurvatureExtrema, getInflections, totalCurvature, totalAbsoluteCurvature, length, isQuadObtuse, flatness, isLine, isHorizontalLine, isVerticalLine, isSelfOverlapping, equal, getInterfaceCcw, areBeziersInSameKFamily, closestPointOnBezier, getTangentPolyFromPoint, hausdorffDistance, hausdorffDistanceCandidates, bezier3Intersection, bezier3IntersectionSylvester, lineIntersection, coincident, isPointOnBezierExtension, bezierFromBezierPiece, toString };
export { BezDebug, IDrawFunctions, DebugElemType, FatLine };
export interface BezierPoint {
    p: number[];
    t: number;
}
