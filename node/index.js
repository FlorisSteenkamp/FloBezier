"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_poly_1 = require("flo-poly");
const flo_vector2d_1 = require("flo-vector2d");
exports.rotate = flo_vector2d_1.rotatePs;
exports.translate = flo_vector2d_1.translatePs;
const flo_memoize_1 = require("flo-memoize");
const flo_gauss_quadrature_1 = require("flo-gauss-quadrature");
const flo_graham_scan_1 = require("flo-graham-scan");
const get_x_1 = require("./get-x");
exports.getX = get_x_1.getX;
const get_y_1 = require("./get-y");
exports.getY = get_y_1.getY;
const get_dx_1 = require("./get-dx");
exports.getDx = get_dx_1.getDx;
const get_dy_1 = require("./get-dy");
exports.getDy = get_dy_1.getDy;
const get_ddx_1 = require("./get-ddx");
exports.getDdx = get_ddx_1.getDdx;
const get_ddy_1 = require("./get-ddy");
exports.getDdy = get_ddy_1.getDdy;
const get_dxy_at_1_1 = require("./get-dxy-at-1");
exports.getDxyAt1 = get_dxy_at_1_1.getDxyAt1;
const get_ddxy_at_1_1 = require("./get-ddxy-at-1");
exports.getDdxyAt1 = get_ddxy_at_1_1.getDdxyAt1;
const get_dxy_at_0_1 = require("./get-dxy-at-0");
exports.getDxyAt0 = get_dxy_at_0_1.getDxyAt0;
const get_ddxy_at_0_1 = require("./get-ddxy-at-0");
exports.getDdxyAt0 = get_ddxy_at_0_1.getDdxyAt0;
const get_dddxy_1 = require("./get-dddxy");
exports.getDddxy = get_dddxy_1.getDddxy;
const evaluate_x_1 = require("./evaluate-x/evaluate-x");
exports.evaluateX = evaluate_x_1.evaluateX;
const evaluate_y_1 = require("./evaluate-y/evaluate-y");
exports.evaluateY = evaluate_y_1.evaluateY;
const evaluate_1 = require("./evaluate/evaluate");
exports.evaluate = evaluate_1.evaluate;
const evaluate_dx_1 = require("./evaluate-dx");
exports.evaluateDx = evaluate_dx_1.evaluateDx;
const evaluate_ddx_1 = require("./evaluate-ddx");
exports.evaluateDdx = evaluate_ddx_1.evaluateDdx;
const evaluate_dy_1 = require("./evaluate-dy");
exports.evaluateDy = evaluate_dy_1.evaluateDy;
const evaluate_ddy_1 = require("./evaluate-ddy");
exports.evaluateDdy = evaluate_ddy_1.evaluateDdy;
const tangent_1 = require("./tangent");
exports.tangent = tangent_1.tangent;
const normal_1 = require("./normal");
exports.normal = normal_1.normal;
const from_0_to_T_1 = require("./from-0-to-T");
exports.from0ToT = from_0_to_T_1.from0ToT;
const from_T_to_1_1 = require("./from-T-to-1");
exports.fromTTo1 = from_T_to_1_1.fromTTo1;
const from_to_1 = require("./from-to");
exports.fromTo = from_to_1.fromTo;
exports.fromToPrecise = from_to_1.fromToPrecise;
//import { toHybridQuadratic }  from './bezier3-intersection/clip/to-hybrid-quadratic';
const coincident_1 = require("./coincident");
exports.coincident = coincident_1.coincident;
const line_intersection_1 = require("./line-intersection");
exports.lineIntersection = line_intersection_1.lineIntersection;
const bezier3_intersection_1 = require("./bezier3-intersection/bezier3-intersection");
exports.bezier3Intersection = bezier3_intersection_1.bezier3Intersection;
const bezier3_intersection_sylvester_1 = require("./bezier3-intersection-sylvester/bezier3-intersection-sylvester_");
exports.bezier3IntersectionSylvester = bezier3_intersection_sylvester_1.bezier3IntersectionSylvester;
const ts_at_x_1 = require("./ts-at-x");
exports.tsAtX = ts_at_x_1.tsAtX;
const ts_at_y_1 = require("./ts-at-y");
exports.tsAtY = ts_at_y_1.tsAtY;
const debug_1 = require("./debug/debug");
exports.BezDebug = debug_1.BezDebug;
//import { deCasteljau } from './de-casteljau';
//import { evalDeCasteljau } from './eval-de-casteljau';
const curvature_1 = require("./curvature");
exports.κ = curvature_1.κ;
const quad_to_polyline_1 = require("./quad-to-polyline");
exports.quadToPolyline = quad_to_polyline_1.quadToPolyline;
const is_quad_obtuse_1 = require("./is-quad-obtuse");
exports.isQuadObtuse = is_quad_obtuse_1.isQuadObtuse;
const split_at_1 = require("./split-at");
exports.splitAt = split_at_1.splitAt;
exports.splitAtPrecise = split_at_1.splitAtPrecise;
const closest_point_on_bezier_1 = require("./closest-point-on-bezier");
exports.closestPointOnBezier = closest_point_on_bezier_1.closestPointOnBezier;
const hausdorff_distance_1 = require("./hausdorff-distance");
exports.hausdorffDistance = hausdorff_distance_1.hausdorffDistance;
exports.hausdorffDistanceCandidates = hausdorff_distance_1.hausdorffDistanceCandidates;
const length_upper_bound_1 = require("./length-upper-bound");
exports.lengthUpperBound = length_upper_bound_1.lengthUpperBound;
const length_squared_upper_bound_1 = require("./length-squared-upper-bound");
exports.lengthSquaredUpperBound = length_squared_upper_bound_1.lengthSquaredUpperBound;
const split_by_max_curve_length_1 = require("./split-by-max-curve-length");
exports.splitByMaxCurveLength = split_by_max_curve_length_1.splitByMaxCurveLength;
const get_curvature_extrema_1 = require("./get-curvature-extrema/get-curvature-extrema");
exports.getCurvatureExtrema = get_curvature_extrema_1.getCurvatureExtrema;
const get_inflections_1 = require("./get-inflections");
exports.getInflections = get_inflections_1.getInflections;
const flatness_1 = require("./flatness");
exports.flatness = flatness_1.flatness;
const split_by_max_curvature_1 = require("./split-by-max-curvature");
exports.splitByMaxCurvature = split_by_max_curvature_1.splitByMaxCurvature;
const split_by_curvature_and_length_1 = require("./split-by-curvature-and-length");
exports.splitByCurvatureAndLength = split_by_curvature_and_length_1.splitByCurvatureAndLength;
const is_point_on_bezier_extension_1 = require("./is-point-on-bezier-extension");
exports.isPointOnBezierExtension = is_point_on_bezier_extension_1.isPointOnBezierExtension;
const are_beziers_in_same_k_family_1 = require("./are-beziers-in-same-k-family");
exports.areBeziersInSameKFamily = are_beziers_in_same_k_family_1.areBeziersInSameKFamily;
const get_interface_ccw_1 = require("./get-interface-ccw");
exports.getInterfaceCcw = get_interface_ccw_1.getInterfaceCcw;
const is_line_1 = require("./is-line");
exports.isLine = is_line_1.isLine;
exports.isHorizontalLine = is_line_1.isHorizontalLine;
exports.isVerticalLine = is_line_1.isVerticalLine;
const is_self_overlapping_1 = require("./is-self-overlapping");
exports.isSelfOverlapping = is_self_overlapping_1.isSelfOverlapping;
const get_tangent_poly_from_point_1 = require("./get-tangent-poly-from-point");
exports.getTangentPolyFromPoint = get_tangent_poly_from_point_1.getTangentPolyFromPoint;
const get_bounds_1 = require("./get-bounds");
exports.getBounds = get_bounds_1.getBounds;
const get_bounding_box_tight_1 = require("./get-bounding-box-tight");
exports.getBoundingBoxTight = get_bounding_box_tight_1.getBoundingBoxTight;
const get_bounding_box_1 = require("./get-bounding-box");
exports.getBoundingBox = get_bounding_box_1.getBoundingBox;
/**
 * Returns the second derivative of the power basis representation of the
 * bezier's x-coordinates. This function is memoized on its points parameter by
 * object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The twice differentiated power basis polynomial from
 * highest power to lowest, e.g. at + b is returned as [a,b]
 */
//let getDdx = /*memoize*/((ps: number[][]) => differentiate(getDx(ps)));
/**
 * Returns the second derivative of the power basis representation of the
 * bezier's y-coordinates. This function is memoized on its points parameter by
 * object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The twice differentiated power basis polynomial from
 * highest power to lowest, e.g. at + b is returned as [a,b]
 */
//let getDdy = /*memoize*/((ps: number[][]) => differentiate(getDy(ps)));
/**
 * Returns the third derivative of the power basis representation of the
 * bezier's x-coordinates. This function is memoized on its points parameter by
 * object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The thrice differentiated power basis polynomial (a
 * constant in array from), e.g. a is returned as [a]
 */
//let getDddx = /*memoize*/((ps: number[][]) => differentiate(getDdx(ps)));
/**
 * Returns the third derivative of the power basis representation of the
 * bezier's y-coordinates. This function is memoized on its points parameter by
 * object reference.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns The thrice differentiated power basis polynomial (a
 * constant in array from), e.g. a is returned as [a]
 */
//let getDddy = /*memoize*/((ps: number[][]) => differentiate(getDdy(ps)));
/**
 * Returns the convex hull of a bezier's control points. This hull bounds the
 * bezier curve. This function is memoized.
 *
 * The tolerance at which the cross product of two nearly collinear lines of the
 * hull are considered collinear is 1e-12.
 * @param ps - A bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns An ordered array of convex hull points.
 */
let getBoundingHull = flo_memoize_1.memoize(flo_graham_scan_1.grahamScan);
exports.getBoundingHull = getBoundingHull;
/**
 * Returns a cubic bezier from the given line with evenly spaced control points.
 * @param l - a 2d line represented by two points
 * @returns Control points of the cubic bezier.
 */
function fromLine(l) {
    let [[x0, y0], [x1, y1]] = l;
    let xInterval = (x1 - x0) / 3;
    let yInterval = (y1 - y0) / 3;
    return [
        [x0, y0],
        [x0 + xInterval, y0 + yInterval],
        [x0 + xInterval * 2, y0 + yInterval * 2],
        [x1, y1]
    ];
}
exports.fromLine = fromLine;
/**
 * Returns the given bezier's inflection points.
 **/
function findInflectionPoints(ps) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    // From http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html eq. 4
    let ax = x1 - x0;
    let ay = y1 - y0;
    let bx = x2 - x1 - ax;
    let by = y2 - y1 - ay;
    let cx = x3 - x2 - ax - (2 * bx);
    let cy = y3 - y2 - ay - (2 * by);
    // From http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html eq. 6:
    //   infl(t) := ax*by - ay*bx + t*(ax*cy - ay*cx) + t^2*(bx*cy - by*cx);
    // We find the roots of the quadratic - a,b,c are the quadratic coefficients
    let a = bx * cy - by * cx;
    let b = ax * cy - ay * cx;
    let c = ax * by - ay * bx;
    let inflectionTs = flo_poly_1.allRoots([a, b, c], 0, 1);
    const evPs = evaluate_1.evaluate(ps);
    return inflectionTs.map(evPs);
}
/**
 * Alias of κ.
 */
let curvature = curvature_1.κ;
exports.curvature = curvature;
function κds(ps, t) {
    const evDx = evaluate_dx_1.evaluateDx(ps);
    const evDy = evaluate_dy_1.evaluateDy(ps);
    const evDdx = evaluate_ddx_1.evaluateDdx(ps);
    const evDdy = evaluate_ddy_1.evaluateDdy(ps);
    function f(t) {
        let dx = evDx(t);
        let dy = evDy(t);
        let ddx = evDdx(t);
        let ddy = evDdy(t);
        let a = dx * ddy - dy * ddx;
        let b = dx * dx + dy * dy;
        return a / b;
    }
    // Curry
    return t === undefined ? f : f(t);
}
function dκMod(ps, t) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    function f(t) {
        let ts = t * t;
        let omt = 1 - t;
        let a = ts * x3;
        let b = ts * y3;
        let c = 2 * t - 3 * ts;
        let d = (3 * t - 1) * omt;
        let e = omt * omt;
        let f = 3 * (a + c * x2 - d * x1 - e * x0);
        let g = 3 * (b + c * y2 - d * y1 - e * y0);
        let h = 6 * (t * y3 - (3 * t - 1) * y2 + (3 * t - 2) * y1 + omt * y0);
        let i = 6 * (t * x3 - (3 * t - 1) * x2 + (3 * t - 2) * x1 + omt * x0);
        let j = Math.sqrt(f * f + g * g);
        return 4 * (f * (y3 - 3 * y2 + 3 * y1 - y0) -
            g * (x3 - 3 * x2 + 3 * x1 - x0)) * Math.pow(j, 3) -
            (f * h - i * g) * (2 * h * g + 2 * i * f) * j;
    }
    return t === undefined ? f : f(t);
}
exports.dκMod = dκMod;
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
function categorize(ps) {
    // TODO - finish
}
function totalCurvature(ps, interval) {
    const tanPs = tangent_1.tangent(ps);
    function f(interval) {
        return flo_gauss_quadrature_1.default(κds(ps), interval);
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
exports.totalCurvature = totalCurvature;
function totalAbsoluteCurvature(ps, interval) {
    function f(interval = [0, 1]) {
        // Numerically integrate the absolute curvature
        let result = flo_gauss_quadrature_1.default(t => Math.abs(κds(ps)(t)), interval);
        return result;
    }
    // Curry
    return interval === undefined ? f : f(interval);
}
exports.totalAbsoluteCurvature = totalAbsoluteCurvature;
function length(interval, ps) {
    let fs = [, , length1, length2, length3];
    function f(ps) {
        return fs[ps.length](interval, ps);
    }
    // Curry
    return ps === undefined ? f : f(ps);
}
exports.length = length;
/**
 * Returns the curve length in the specified interval. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval - The paramter interval over which the length is
 * to be calculated (often === [0,1]).
 */
function length3(interval, ps) {
    if (interval[0] === interval[1]) {
        return 0;
    }
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    // Keep line below to ensure zero length curve returns zero!
    if (x0 === x1 && x1 === x2 && x2 === x3 &&
        y0 === y1 && y1 === y2 && y2 === y3) {
        return 0;
    }
    const evDs = ds(ps);
    return flo_gauss_quadrature_1.default(evDs, interval);
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
function length2(interval, ps) {
    if (interval[0] === interval[1]) {
        return 0;
    }
    let [[x0, y0], [x1, y1], [x2, y2]] = ps;
    // Ensure zero length curve returns zero!
    if (x0 === x1 && x1 === x2 && y0 === y1 && y1 === y2) {
        return 0;
    }
    const evDs = ds(ps);
    return flo_gauss_quadrature_1.default(evDs, interval);
}
function length1(interval, ps) {
    let [t1, t2] = interval;
    if (t1 === t2) {
        return 0;
    }
    let [[x0, y0], [x1, y1]] = ps;
    // Keep line below to ensure zero length curve returns zero!
    if (x0 === x1 && y0 === y1) {
        return 0;
    }
    let p1 = [x0 + t1 * (x1 - x0), y0 + t1 * (y1 - y0)];
    let p2 = [x0 + t2 * (x1 - x0), y0 + t2 * (y1 - y0)];
    return flo_vector2d_1.distanceBetween(p1, p2);
}
function getTAtLength(ps, s) {
    let ps_ = toCubic(ps);
    const lenAtT = (t) => length([0, t], ps_);
    function f(s) {
        return flo_poly_1.brent(t => (lenAtT(t) - s), -0.1, 1.1);
    }
    // Curry
    return s === undefined ? f : f(s);
}
exports.getTAtLength = getTAtLength;
function ds(ps, t) {
    const evDx = evaluate_dx_1.evaluateDx(ps);
    const evDy = evaluate_dy_1.evaluateDy(ps);
    function f(t) {
        let dx = evDx(t);
        let dy = evDy(t);
        return Math.sqrt(dx * dx + dy * dy);
    }
    // Curry
    return t === undefined ? f : f(t);
}
exports.ds = ds;
/**
 * Returns a new bezier from the given bezier by limiting its t range.
 *
 * Uses de Casteljau's algorithm.
 *
 * @param ps A bezier
 * @param tRange A t range
 */
function bezierFromBezierPiece(ps, tRange) {
    // If tRange = [0,1] then return original bezier.
    if (tRange[0] === 0 && tRange[1] === 1) {
        return ps;
    }
    // If tRange[0] === tRange[1] then return a single point degenerated bezier.
    if (tRange[0] === tRange[1]) {
        let p = evaluate_1.evaluate(ps)(tRange[0]);
        return [p, p, p, p];
    }
    if (tRange[0] === 0) {
        return from_0_to_T_1.from0ToT(ps, tRange[1]);
    }
    if (tRange[1] === 1) {
        return from_T_to_1_1.fromTTo1(ps, tRange[0]);
    }
    // At this stage we know the t range is not degenerate and tRange[0] !== 0 
    // and tRange[1] !== 1
    return from_0_to_T_1.from0ToT(from_T_to_1_1.fromTTo1(ps, tRange[0]), (tRange[1] - tRange[0]) / (1 - tRange[0]));
}
exports.bezierFromBezierPiece = bezierFromBezierPiece;
/**
 * Returns a human readable string representation of the given bezier.
 * @param ps - A bezier curve
 */
function toString(ps) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    return `[[${x0},${y0}],[${x1},${y1}],[${x2},${y2}],[${x3},${y3}]]`;
}
exports.toString = toString;
/**
 * Scales all control points of the given bezier by the given factor.
 * @param ps - A bezier curve
 * @param c - The scale factor
 */
function scale(ps, c) {
    return ps.map(x => [x[0] * c, x[1] * c]);
}
exports.scale = scale;
/**
 * Returns the best least squares quadratic bezier approximation to the given
 * cubic bezier. Note that the two bezier endpoints differ in general.
 * @param ps - A cubic bezier curve.
 */
function toQuadratic(ps) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    return [
        [(19 / 20) * x0 + (3 / 20) * x1 + (-3 / 20) * x2 + (1 / 20) * x3,
            (19 / 20) * y0 + (3 / 20) * y1 + (-3 / 20) * y2 + (1 / 20) * y3],
        [(-1 / 4) * x0 + (3 / 4) * x1 + (3 / 4) * x2 + (-1 / 4) * x3,
            (-1 / 4) * y0 + (3 / 4) * y1 + (3 / 4) * y2 + (-1 / 4) * y3],
        [(1 / 20) * x0 + (-3 / 20) * x1 + (3 / 20) * x2 + (19 / 20) * x3,
            (1 / 20) * y0 + (-3 / 20) * y1 + (3 / 20) * y2 + (19 / 20) * y3]
    ];
}
exports.toQuadratic = toQuadratic;
/**
 * Evaluates the given hybrid quadratic at the given t and th parameters. (see
 * toHybridQuadratic for details).
 * @param hq - A hybrid quadratic
 * @param t - The bezier parameter value
 * @param th - The parameter value for the hybrid quadratic point.
 */
function evaluateHybridQuadratic(
//hq: (number[] | number[][])[],
hq, t, th) {
    let P0 = hq[0];
    let P1 = evaluate_1.evaluate(hq[1], th);
    let P2 = hq[2];
    //let P1 = evaluateLinear(<number[][]>hq[1], th);
    //	let P1 = evaluate(hq[1], th);
    //return evaluateQuadratic([P0, P1, P2], t);
    return evaluate_1.evaluate([P0, P1, P2], t);
}
exports.evaluateHybridQuadratic = evaluateHybridQuadratic;
/**
 * Evaluates the given linear bezier (line) at a specific t value.
 * @param ps - A linear bezier curve.
 * @param t - The value where the bezier should be evaluated
 */ /*
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
function clone(ps) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    return [[x0, y0], [x1, y1], [x2, y2], [x3, y3]];
}
exports.clone = clone;
/**
 * Evaluates the given quadratic bezier at a specific t value.
 * @param ps - A quadratic bezier curve.
 * @param t - The value where the bezier should be evaluated
 */ /*
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
function quadraticToCubic(ps) {
    let [[x0, y0], [x1, y1], [x2, y2]] = ps;
    return [
        [x0, y0],
        [(1 / 3) * x0 + (2 / 3) * x1, (1 / 3) * y0 + (2 / 3) * y1],
        [(2 / 3) * x1 + (1 / 3) * x2, (2 / 3) * y1 + (1 / 3) * y2],
        [x2, y2]
    ];
}
exports.quadraticToCubic = quadraticToCubic;
function linearToCubic(ps) {
    let [[x0, y0], [x1, y1]] = ps;
    let xInterval = (x1 - x0) / 3;
    let yInterval = (y1 - y0) / 3;
    return [
        [x0, y0],
        [x0 + xInterval * 1, y0 + yInterval * 1],
        [x0 + xInterval * 2, y0 + yInterval * 2],
        [x1, y1]
    ];
}
exports.linearToCubic = linearToCubic;
/**
 * Returns a cubic bezier curve that is equivalent to the given linear or
 * quadratic bezier curve. Cubics are just returned unaltered.
 * @param ps An order 1, 2 or 3 bezier curve
 */
function toCubic(ps) {
    if (ps.length === 2) { // Linear
        return linearToCubic(ps);
    }
    else if (ps.length === 3) { // Quadratic
        return quadraticToCubic(ps);
    }
    else if (ps.length === 4) { // Cubic
        return ps;
    }
}
exports.toCubic = toCubic;
/**
 * Returns the given points (e.g. bezier) in reverse order.
 * @param ps
 */
function reverse(ps) {
    return ps.slice().reverse();
}
exports.reverse = reverse;
function equal(psA, psB) {
    let [[ax0, ay0], [ax1, ay1], [ax2, ay2], [ax3, ay3]] = psA;
    let [[bx0, by0], [bx1, by1], [bx2, by2], [bx3, by3]] = psB;
    return (ax0 === bx0 && ax1 === bx1 && ax2 === bx2 && ax3 === bx3 &&
        ay0 === by0 && ay1 === by1 && ay2 === by2 && ay3 === by3);
}
exports.equal = equal;
//# sourceMappingURL=index.js.map