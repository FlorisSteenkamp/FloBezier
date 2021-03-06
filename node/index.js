"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BezDebug = exports.closestPointOnBezier = exports.getCoeffs3Exact = exports.getCoeffs3Quad = exports.getCoeffs3 = exports.getCoeffs1x1Exact_ = exports.getCoeffs1x1Exact = exports.getCoeffs1x1Quad = exports.getCoeffs1x1 = exports.getCoeffs1x2Exact_ = exports.getCoeffs1x2Exact = exports.getCoeffs1x2Quad = exports.getCoeffs1x2 = exports.getCoeffs1x3Exact_ = exports.getCoeffs1x3Exact = exports.getCoeffs1x3Quad = exports.getCoeffs1x3 = exports.getCoeffs2x1Exact_ = exports.getCoeffs2x1Exact = exports.getCoeffs2x1Quad = exports.getCoeffs2x1 = exports.getCoeffs2x2Exact_ = exports.getCoeffs2x2Exact = exports.getCoeffs2x2Quad = exports.getCoeffs2x2 = exports.getCoeffs2x3Exact_ = exports.getCoeffs2x3Exact = exports.getCoeffs2x3Quad = exports.getCoeffs2x3 = exports.getCoeffs3x1Exact_ = exports.getCoeffs3x1Exact = exports.getCoeffs3x1Quad = exports.getCoeffs3x1 = exports.getCoeffs3x2Exact_ = exports.getCoeffs3x2Exact = exports.getCoeffs3x2Quad = exports.getCoeffs3x2 = exports.getCoeffs3x3Exact_ = exports.getCoeffs3x3Exact = exports.getCoeffs3x3Quad = exports.getCoeffs3x3 = exports.isPointOnBezierExtension = exports.evalDeCasteljauWithErrQuad = exports.evalDeCasteljauWithErr = exports.evalDeCasteljauY = exports.evalDeCasteljauX = exports.evalDeCasteljau = exports.getIntervalBox3Quad = exports.getIntervalBox2Quad = exports.getIntervalBox1Quad = exports.getIntervalBoxQuad = exports.cubicThroughPointGiven013 = exports.generateCuspAtHalf3 = exports.bezierFromPart = exports.bezierSelfIntersection = exports.circleBezierIntersectionPrecise = exports.circleBezierIntersection = exports.intersectBoxes = exports.getOtherTs = exports.getIntersectionCoeffs = exports.bezierBezierIntersectionImplicit = exports.inversion1_BL52_1ULP = exports.inversion01Precise = exports.getEndpointIntersections = exports.hausdorffDistanceCandidates = exports.hausdorffDistance = exports.getTangentPolyFromPointExact = exports.getTangentPolyFromPoint = exports.closestPointOnBezierPrecise = exports.areBeziersInSameKFamily = exports.getInterfaceCcw = exports.equal = exports.getInflectionPoints = exports.toQuadraticFromCubic = exports.isCubicReallyQuad = exports.getHodograph = exports.isSelfOverlapping = exports.isVerticalLine = exports.isHorizontalLine = exports.isLine = exports.flatness = exports.isQuadObtuse = exports.length = exports.totalAbsoluteCurvature = exports.totalCurvature = exports.getInflections = exports.getCurvatureExtrema = exports.getIntervalBox3 = exports.getIntervalBox2 = exports.getIntervalBox1 = exports.getIntervalBox = exports.lengthSquaredUpperBound = exports.lengthUpperBound = exports.getBoundingBox = exports.getBoundingBoxTight = exports.getBoundingHull = exports.getYBoundsTight = exports.getXBoundsTight = exports.getBounds = exports.getImplicitForm1Exact_ = exports.getImplicitForm1Exact = exports.getImplicitForm1Quad = exports.getImplicitForm1 = exports.getImplicitForm2Exact_ = exports.getImplicitForm2Exact = exports.getImplicitForm2Quad = exports.getImplicitForm2 = exports.getImplicitForm3Exact_ = exports.getImplicitForm3Exact = exports.getImplicitForm3Quad = exports.getImplicitForm3 = exports.toEstimation = exports.toExpansion = exports.quadToPolyline = exports.toString = exports.clone = exports.splitByCurvatureAndLength = exports.splitByMaxCurvature = exports.splitByMaxCurveLength = exports.splitAtPrecise = exports.splitAt = exports.fromToPrecise = exports.fromTo = exports.fromTTo1 = exports.from0ToT = exports.reverse = exports.toHybridQuadratic = exports.fromPowerBases = exports.cubicToQuadratic = exports.toCubic = exports.getTAtLength = exports.normal = exports.tangent = exports.curvature = exports.κ = exports.evaluateHybridQuadratic = exports.evaluateExact = exports.evaluate = exports.evaluateDdy = exports.evaluateDdx = exports.evaluateDy = exports.evaluateDx = exports.evaluateY = exports.evaluateX = exports.getDdxyAt0 = exports.getDxyAt0 = exports.getDdxyAt1 = exports.getDxyAt1 = exports.getDddxy = exports.getDdy = exports.getDdx = exports.getDy = exports.getDx = exports.getY = exports.getX = exports.getDdxy = exports.getDxy = exports.getXY = void 0;
//import { rotatePs as rotate, translatePs as translate } from 'flo-vector2d';
const flo_memoize_1 = require("flo-memoize");
const flo_graham_scan_1 = require("flo-graham-scan");
const length_1 = require("./global-properties/length/length");
Object.defineProperty(exports, "length", { enumerable: true, get: function () { return length_1.length; } });
const clone_1 = require("./transformation/clone");
Object.defineProperty(exports, "clone", { enumerable: true, get: function () { return clone_1.clone; } });
const get_t_at_length_1 = require("./local-properties-to-t/get-t-at-length");
Object.defineProperty(exports, "getTAtLength", { enumerable: true, get: function () { return get_t_at_length_1.getTAtLength; } });
const equal_1 = require("./simultaneous-properties/equal");
Object.defineProperty(exports, "equal", { enumerable: true, get: function () { return equal_1.equal; } });
const cubic_to_quadratic_1 = require("./transformation/cubic-to-quadratic");
Object.defineProperty(exports, "cubicToQuadratic", { enumerable: true, get: function () { return cubic_to_quadratic_1.cubicToQuadratic; } });
const from_bezier_piece_1 = require("./transformation/from-bezier-piece");
Object.defineProperty(exports, "bezierFromPart", { enumerable: true, get: function () { return from_bezier_piece_1.bezierFromPart; } });
const evaluate_hybrid_quadratic_1 = require("./local-properties-at-t/t-to-xy/evaluate-hybrid-quadratic");
Object.defineProperty(exports, "evaluateHybridQuadratic", { enumerable: true, get: function () { return evaluate_hybrid_quadratic_1.evaluateHybridQuadratic; } });
const closest_point_on_bezier_1 = require("./simultaneous-properties/closest-point-on-bezier/closest-point-on-bezier");
Object.defineProperty(exports, "closestPointOnBezier", { enumerable: true, get: function () { return closest_point_on_bezier_1.closestPointOnBezier; } });
const intersect_boxes_1 = require("./geometry/intersect-boxes");
Object.defineProperty(exports, "intersectBoxes", { enumerable: true, get: function () { return intersect_boxes_1.intersectBoxes; } });
const eval_de_casteljau_1 = require("./local-properties-at-t/t-to-xy/eval-de-casteljau");
Object.defineProperty(exports, "evalDeCasteljau", { enumerable: true, get: function () { return eval_de_casteljau_1.evalDeCasteljau; } });
Object.defineProperty(exports, "evalDeCasteljauX", { enumerable: true, get: function () { return eval_de_casteljau_1.evalDeCasteljauX; } });
Object.defineProperty(exports, "evalDeCasteljauY", { enumerable: true, get: function () { return eval_de_casteljau_1.evalDeCasteljauY; } });
const eval_de_casteljau_with_err_1 = require("./local-properties-at-t/t-to-xy/eval-de-casteljau-with-err");
Object.defineProperty(exports, "evalDeCasteljauWithErr", { enumerable: true, get: function () { return eval_de_casteljau_with_err_1.evalDeCasteljauWithErr; } });
Object.defineProperty(exports, "evalDeCasteljauWithErrQuad", { enumerable: true, get: function () { return eval_de_casteljau_with_err_1.evalDeCasteljauWithErrQuad; } });
const is_point_on_bezier_extension_1 = require("./simultaneous-properties/is-point-on-bezier-extension");
Object.defineProperty(exports, "isPointOnBezierExtension", { enumerable: true, get: function () { return is_point_on_bezier_extension_1.isPointOnBezierExtension; } });
const total_curvature_1 = require("./global-properties/total-curvature");
Object.defineProperty(exports, "totalCurvature", { enumerable: true, get: function () { return total_curvature_1.totalCurvature; } });
Object.defineProperty(exports, "totalAbsoluteCurvature", { enumerable: true, get: function () { return total_curvature_1.totalAbsoluteCurvature; } });
const reverse_1 = require("./transformation/reverse");
Object.defineProperty(exports, "reverse", { enumerable: true, get: function () { return reverse_1.reverse; } });
const get_inflection_points_1 = require("./global-properties/get-inflection-points");
Object.defineProperty(exports, "getInflectionPoints", { enumerable: true, get: function () { return get_inflection_points_1.getInflectionPoints; } });
const bezier_bezier_intersection_implicit_1 = require("./intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit");
Object.defineProperty(exports, "getIntersectionCoeffs", { enumerable: true, get: function () { return bezier_bezier_intersection_implicit_1.getIntersectionCoeffs; } });
const get_implicit_form3_1 = require("./implicit-form/naive/get-implicit-form3");
Object.defineProperty(exports, "getImplicitForm3", { enumerable: true, get: function () { return get_implicit_form3_1.getImplicitForm3; } });
const get_implicit_form3_2 = require("./implicit-form/quad/get-implicit-form3");
Object.defineProperty(exports, "getImplicitForm3Quad", { enumerable: true, get: function () { return get_implicit_form3_2.getImplicitForm3Quad; } });
const get_implicit_form3_3 = require("./implicit-form/exact/get-implicit-form3");
Object.defineProperty(exports, "getImplicitForm3Exact", { enumerable: true, get: function () { return get_implicit_form3_3.getImplicitForm3Exact; } });
const get_implicit_form3_4 = require("./implicit-form/exact/get-implicit-form3-");
Object.defineProperty(exports, "getImplicitForm3Exact_", { enumerable: true, get: function () { return get_implicit_form3_4.getImplicitForm3Exact_; } });
const get_implicit_form2_1 = require("./implicit-form/naive/get-implicit-form2");
Object.defineProperty(exports, "getImplicitForm2", { enumerable: true, get: function () { return get_implicit_form2_1.getImplicitForm2; } });
const get_implicit_form2_2 = require("./implicit-form/quad/get-implicit-form2");
Object.defineProperty(exports, "getImplicitForm2Quad", { enumerable: true, get: function () { return get_implicit_form2_2.getImplicitForm2Quad; } });
const get_implicit_form2_3 = require("./implicit-form/exact/get-implicit-form2");
Object.defineProperty(exports, "getImplicitForm2Exact", { enumerable: true, get: function () { return get_implicit_form2_3.getImplicitForm2Exact; } });
const get_implicit_form2_4 = require("./implicit-form/exact/get-implicit-form2-");
Object.defineProperty(exports, "getImplicitForm2Exact_", { enumerable: true, get: function () { return get_implicit_form2_4.getImplicitForm2Exact_; } });
const get_implicit_form1_1 = require("./implicit-form/naive/get-implicit-form1");
Object.defineProperty(exports, "getImplicitForm1", { enumerable: true, get: function () { return get_implicit_form1_1.getImplicitForm1; } });
const get_implicit_form1_2 = require("./implicit-form/quad/get-implicit-form1");
Object.defineProperty(exports, "getImplicitForm1Quad", { enumerable: true, get: function () { return get_implicit_form1_2.getImplicitForm1Quad; } });
const get_implicit_form1_3 = require("./implicit-form/exact/get-implicit-form1");
Object.defineProperty(exports, "getImplicitForm1Exact", { enumerable: true, get: function () { return get_implicit_form1_3.getImplicitForm1Exact; } });
const get_implicit_form1_4 = require("./implicit-form/exact/get-implicit-form1-");
Object.defineProperty(exports, "getImplicitForm1Exact_", { enumerable: true, get: function () { return get_implicit_form1_4.getImplicitForm1Exact_; } });
const get_coefficients_3x3_1 = require("./intersection/bezier-intersection-implicit/naive/get-coefficients-3x3");
Object.defineProperty(exports, "getCoeffs3x3", { enumerable: true, get: function () { return get_coefficients_3x3_1.getCoeffs3x3; } });
const get_coefficients_3x3_2 = require("./intersection/bezier-intersection-implicit/quad/get-coefficients-3x3");
Object.defineProperty(exports, "getCoeffs3x3Quad", { enumerable: true, get: function () { return get_coefficients_3x3_2.getCoeffs3x3Quad; } });
const get_coefficients_3x3_3 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-3x3");
Object.defineProperty(exports, "getCoeffs3x3Exact", { enumerable: true, get: function () { return get_coefficients_3x3_3.getCoeffs3x3Exact; } });
const get_coefficients_3x3_4 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-3x3-");
Object.defineProperty(exports, "getCoeffs3x3Exact_", { enumerable: true, get: function () { return get_coefficients_3x3_4.getCoeffs3x3Exact_; } });
const get_coefficients_3x2_1 = require("./intersection/bezier-intersection-implicit/naive/get-coefficients-3x2");
Object.defineProperty(exports, "getCoeffs3x2", { enumerable: true, get: function () { return get_coefficients_3x2_1.getCoeffs3x2; } });
const get_coefficients_3x2_2 = require("./intersection/bezier-intersection-implicit/quad/get-coefficients-3x2");
Object.defineProperty(exports, "getCoeffs3x2Quad", { enumerable: true, get: function () { return get_coefficients_3x2_2.getCoeffs3x2Quad; } });
const get_coefficients_3x2_3 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-3x2");
Object.defineProperty(exports, "getCoeffs3x2Exact", { enumerable: true, get: function () { return get_coefficients_3x2_3.getCoeffs3x2Exact; } });
const get_coefficients_3x2_4 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-3x2-");
Object.defineProperty(exports, "getCoeffs3x2Exact_", { enumerable: true, get: function () { return get_coefficients_3x2_4.getCoeffs3x2Exact_; } });
const get_coefficients_3x1_1 = require("./intersection/bezier-intersection-implicit/naive/get-coefficients-3x1");
Object.defineProperty(exports, "getCoeffs3x1", { enumerable: true, get: function () { return get_coefficients_3x1_1.getCoeffs3x1; } });
const get_coefficients_3x1_2 = require("./intersection/bezier-intersection-implicit/quad/get-coefficients-3x1");
Object.defineProperty(exports, "getCoeffs3x1Quad", { enumerable: true, get: function () { return get_coefficients_3x1_2.getCoeffs3x1Quad; } });
const get_coefficients_3x1_3 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-3x1");
Object.defineProperty(exports, "getCoeffs3x1Exact", { enumerable: true, get: function () { return get_coefficients_3x1_3.getCoeffs3x1Exact; } });
const get_coefficients_3x1_4 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-3x1-");
Object.defineProperty(exports, "getCoeffs3x1Exact_", { enumerable: true, get: function () { return get_coefficients_3x1_4.getCoeffs3x1Exact_; } });
const get_coefficients_2x3_1 = require("./intersection/bezier-intersection-implicit/naive/get-coefficients-2x3");
Object.defineProperty(exports, "getCoeffs2x3", { enumerable: true, get: function () { return get_coefficients_2x3_1.getCoeffs2x3; } });
const get_coefficients_2x3_2 = require("./intersection/bezier-intersection-implicit/quad/get-coefficients-2x3");
Object.defineProperty(exports, "getCoeffs2x3Quad", { enumerable: true, get: function () { return get_coefficients_2x3_2.getCoeffs2x3Quad; } });
const get_coefficients_2x3_3 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-2x3");
Object.defineProperty(exports, "getCoeffs2x3Exact", { enumerable: true, get: function () { return get_coefficients_2x3_3.getCoeffs2x3Exact; } });
const get_coefficients_2x3_4 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-2x3-");
Object.defineProperty(exports, "getCoeffs2x3Exact_", { enumerable: true, get: function () { return get_coefficients_2x3_4.getCoeffs2x3Exact_; } });
const get_coefficients_2x2_1 = require("./intersection/bezier-intersection-implicit/naive/get-coefficients-2x2");
Object.defineProperty(exports, "getCoeffs2x2", { enumerable: true, get: function () { return get_coefficients_2x2_1.getCoeffs2x2; } });
const get_coefficients_2x2_2 = require("./intersection/bezier-intersection-implicit/quad/get-coefficients-2x2");
Object.defineProperty(exports, "getCoeffs2x2Quad", { enumerable: true, get: function () { return get_coefficients_2x2_2.getCoeffs2x2Quad; } });
const get_coefficients_2x2_3 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-2x2");
Object.defineProperty(exports, "getCoeffs2x2Exact", { enumerable: true, get: function () { return get_coefficients_2x2_3.getCoeffs2x2Exact; } });
const get_coefficients_2x2_4 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-2x2-");
Object.defineProperty(exports, "getCoeffs2x2Exact_", { enumerable: true, get: function () { return get_coefficients_2x2_4.getCoeffs2x2Exact_; } });
const get_coefficients_2x1_1 = require("./intersection/bezier-intersection-implicit/naive/get-coefficients-2x1");
Object.defineProperty(exports, "getCoeffs2x1", { enumerable: true, get: function () { return get_coefficients_2x1_1.getCoeffs2x1; } });
const get_coefficients_2x1_2 = require("./intersection/bezier-intersection-implicit/quad/get-coefficients-2x1");
Object.defineProperty(exports, "getCoeffs2x1Quad", { enumerable: true, get: function () { return get_coefficients_2x1_2.getCoeffs2x1Quad; } });
const get_coefficients_2x1_3 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-2x1");
Object.defineProperty(exports, "getCoeffs2x1Exact", { enumerable: true, get: function () { return get_coefficients_2x1_3.getCoeffs2x1Exact; } });
const get_coefficients_2x1_4 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-2x1-");
Object.defineProperty(exports, "getCoeffs2x1Exact_", { enumerable: true, get: function () { return get_coefficients_2x1_4.getCoeffs2x1Exact_; } });
const get_coefficients_1x3_1 = require("./intersection/bezier-intersection-implicit/naive/get-coefficients-1x3");
Object.defineProperty(exports, "getCoeffs1x3", { enumerable: true, get: function () { return get_coefficients_1x3_1.getCoeffs1x3; } });
const get_coefficients_1x3_2 = require("./intersection/bezier-intersection-implicit/quad/get-coefficients-1x3");
Object.defineProperty(exports, "getCoeffs1x3Quad", { enumerable: true, get: function () { return get_coefficients_1x3_2.getCoeffs1x3Quad; } });
const get_coefficients_1x3_3 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-1x3");
Object.defineProperty(exports, "getCoeffs1x3Exact", { enumerable: true, get: function () { return get_coefficients_1x3_3.getCoeffs1x3Exact; } });
const get_coefficients_1x3_4 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-1x3-");
Object.defineProperty(exports, "getCoeffs1x3Exact_", { enumerable: true, get: function () { return get_coefficients_1x3_4.getCoeffs1x3Exact_; } });
const get_coefficients_1x2_1 = require("./intersection/bezier-intersection-implicit/naive/get-coefficients-1x2");
Object.defineProperty(exports, "getCoeffs1x2", { enumerable: true, get: function () { return get_coefficients_1x2_1.getCoeffs1x2; } });
const get_coefficients_1x2_2 = require("./intersection/bezier-intersection-implicit/quad/get-coefficients-1x2");
Object.defineProperty(exports, "getCoeffs1x2Quad", { enumerable: true, get: function () { return get_coefficients_1x2_2.getCoeffs1x2Quad; } });
const get_coefficients_1x2_3 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-1x2");
Object.defineProperty(exports, "getCoeffs1x2Exact", { enumerable: true, get: function () { return get_coefficients_1x2_3.getCoeffs1x2Exact; } });
const get_coefficients_1x2_4 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-1x2-");
Object.defineProperty(exports, "getCoeffs1x2Exact_", { enumerable: true, get: function () { return get_coefficients_1x2_4.getCoeffs1x2Exact_; } });
const get_coefficients_1x1_1 = require("./intersection/bezier-intersection-implicit/naive/get-coefficients-1x1");
Object.defineProperty(exports, "getCoeffs1x1", { enumerable: true, get: function () { return get_coefficients_1x1_1.getCoeffs1x1; } });
const get_coefficients_1x1_2 = require("./intersection/bezier-intersection-implicit/quad/get-coefficients-1x1");
Object.defineProperty(exports, "getCoeffs1x1Quad", { enumerable: true, get: function () { return get_coefficients_1x1_2.getCoeffs1x1Quad; } });
const get_coefficients_1x1_3 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-1x1");
Object.defineProperty(exports, "getCoeffs1x1Exact", { enumerable: true, get: function () { return get_coefficients_1x1_3.getCoeffs1x1Exact; } });
const get_coefficients_1x1_4 = require("./intersection/bezier-intersection-implicit/exact/get-coefficients-1x1-");
Object.defineProperty(exports, "getCoeffs1x1Exact_", { enumerable: true, get: function () { return get_coefficients_1x1_4.getCoeffs1x1Exact_; } });
const get_coeffs_3_1 = require("./intersection/self-intersection/naive/get-coeffs-3");
Object.defineProperty(exports, "getCoeffs3", { enumerable: true, get: function () { return get_coeffs_3_1.getCoeffs3; } });
const get_coeffs_3_2 = require("./intersection/self-intersection/quad/get-coeffs-3");
Object.defineProperty(exports, "getCoeffs3Quad", { enumerable: true, get: function () { return get_coeffs_3_2.getCoeffs3Quad; } });
const get_coeffs_3_3 = require("./intersection/self-intersection/exact/get-coeffs-3");
Object.defineProperty(exports, "getCoeffs3Exact", { enumerable: true, get: function () { return get_coeffs_3_3.getCoeffs3Exact; } });
const to_expansion_1 = require("./transformation/to-expansion");
Object.defineProperty(exports, "toExpansion", { enumerable: true, get: function () { return to_expansion_1.toExpansion; } });
const to_estimation_1 = require("./transformation/to-estimation");
Object.defineProperty(exports, "toEstimation", { enumerable: true, get: function () { return to_estimation_1.toEstimation; } });
const from_power_bases_1 = require("./from-power-basis/from-power-bases");
Object.defineProperty(exports, "fromPowerBases", { enumerable: true, get: function () { return from_power_bases_1.fromPowerBases; } });
const get_hodograph_1 = require("./transformation/get-hodograph");
Object.defineProperty(exports, "getHodograph", { enumerable: true, get: function () { return get_hodograph_1.getHodograph; } });
const generate_cusp_at_half_t_1 = require("./create/generate-cusp-at-half-t");
Object.defineProperty(exports, "generateCuspAtHalf3", { enumerable: true, get: function () { return generate_cusp_at_half_t_1.generateCuspAtHalf3; } });
const cubic_through_point_1 = require("./create/cubic-through-point");
Object.defineProperty(exports, "cubicThroughPointGiven013", { enumerable: true, get: function () { return cubic_through_point_1.cubicThroughPointGiven013; } });
const self_intersection_1 = require("./intersection/self-intersection/self-intersection");
Object.defineProperty(exports, "bezierSelfIntersection", { enumerable: true, get: function () { return self_intersection_1.bezierSelfIntersection; } });
const get_endpoint_intersections_1 = require("./intersection/get-endpoint-intersections");
Object.defineProperty(exports, "getEndpointIntersections", { enumerable: true, get: function () { return get_endpoint_intersections_1.getEndpointIntersections; } });
const inversion_01_1 = require("./intersection/inversion-01");
Object.defineProperty(exports, "inversion01Precise", { enumerable: true, get: function () { return inversion_01_1.inversion01Precise; } });
const inversion_old_1 = require("./intersection/bezier-intersection-implicit/inversion-old");
Object.defineProperty(exports, "inversion1_BL52_1ULP", { enumerable: true, get: function () { return inversion_old_1.inversion1_BL52_1ULP; } });
const get_xy_1 = require("./to-power-basis/get-xy");
Object.defineProperty(exports, "getXY", { enumerable: true, get: function () { return get_xy_1.getXY; } });
const get_dxy_1 = require("./to-power-basis/get-dxy");
Object.defineProperty(exports, "getDxy", { enumerable: true, get: function () { return get_dxy_1.getDxy; } });
const get_ddxy_1 = require("./to-power-basis/get-ddxy");
Object.defineProperty(exports, "getDdxy", { enumerable: true, get: function () { return get_ddxy_1.getDdxy; } });
const get_x_1 = require("./to-power-basis/get-x");
Object.defineProperty(exports, "getX", { enumerable: true, get: function () { return get_x_1.getX; } });
const get_y_1 = require("./to-power-basis/get-y");
Object.defineProperty(exports, "getY", { enumerable: true, get: function () { return get_y_1.getY; } });
const get_dx_1 = require("./to-power-basis/get-dx");
Object.defineProperty(exports, "getDx", { enumerable: true, get: function () { return get_dx_1.getDx; } });
const get_dy_1 = require("./to-power-basis/get-dy");
Object.defineProperty(exports, "getDy", { enumerable: true, get: function () { return get_dy_1.getDy; } });
const get_ddx_1 = require("./to-power-basis/get-ddx");
Object.defineProperty(exports, "getDdx", { enumerable: true, get: function () { return get_ddx_1.getDdx; } });
const get_ddy_1 = require("./to-power-basis/get-ddy");
Object.defineProperty(exports, "getDdy", { enumerable: true, get: function () { return get_ddy_1.getDdy; } });
const get_dxy_at_1_1 = require("./local-properties-at-t/t-to-dxy/get-dxy-at-1");
Object.defineProperty(exports, "getDxyAt1", { enumerable: true, get: function () { return get_dxy_at_1_1.getDxyAt1; } });
const get_ddxy_at_1_1 = require("./local-properties-at-t/t-to-ddxy/get-ddxy-at-1");
Object.defineProperty(exports, "getDdxyAt1", { enumerable: true, get: function () { return get_ddxy_at_1_1.getDdxyAt1; } });
const get_dxy_at_0_1 = require("./local-properties-at-t/t-to-dxy/get-dxy-at-0");
Object.defineProperty(exports, "getDxyAt0", { enumerable: true, get: function () { return get_dxy_at_0_1.getDxyAt0; } });
const get_ddxy_at_0_1 = require("./local-properties-at-t/t-to-ddxy/get-ddxy-at-0");
Object.defineProperty(exports, "getDdxyAt0", { enumerable: true, get: function () { return get_ddxy_at_0_1.getDdxyAt0; } });
const get_dddxy_1 = require("./to-power-basis/get-dddxy");
Object.defineProperty(exports, "getDddxy", { enumerable: true, get: function () { return get_dddxy_1.getDddxy; } });
const evaluate_x_1 = require("./local-properties-at-t/t-to-xy/evaluate-x");
Object.defineProperty(exports, "evaluateX", { enumerable: true, get: function () { return evaluate_x_1.evaluateX; } });
const evaluate_y_1 = require("./local-properties-at-t/t-to-xy/evaluate-y");
Object.defineProperty(exports, "evaluateY", { enumerable: true, get: function () { return evaluate_y_1.evaluateY; } });
const evaluate_1 = require("./local-properties-at-t/t-to-xy/evaluate");
Object.defineProperty(exports, "evaluate", { enumerable: true, get: function () { return evaluate_1.evaluate; } });
const evaluate_2 = require("./local-properties-at-t/t-to-xy/evaluate");
Object.defineProperty(exports, "evaluateExact", { enumerable: true, get: function () { return evaluate_2.evaluateExact; } });
const evaluate_dx_1 = require("./local-properties-at-t/t-to-dxy/evaluate-dx");
Object.defineProperty(exports, "evaluateDx", { enumerable: true, get: function () { return evaluate_dx_1.evaluateDx; } });
const evaluate_ddx_1 = require("./local-properties-at-t/t-to-ddxy/evaluate-ddx");
Object.defineProperty(exports, "evaluateDdx", { enumerable: true, get: function () { return evaluate_ddx_1.evaluateDdx; } });
const evaluate_dy_1 = require("./local-properties-at-t/t-to-dxy/evaluate-dy");
Object.defineProperty(exports, "evaluateDy", { enumerable: true, get: function () { return evaluate_dy_1.evaluateDy; } });
const evaluate_ddy_1 = require("./local-properties-at-t/t-to-ddxy/evaluate-ddy");
Object.defineProperty(exports, "evaluateDdy", { enumerable: true, get: function () { return evaluate_ddy_1.evaluateDdy; } });
const tangent_1 = require("./local-properties-at-t/tangent");
Object.defineProperty(exports, "tangent", { enumerable: true, get: function () { return tangent_1.tangent; } });
const normal_1 = require("./local-properties-at-t/normal");
Object.defineProperty(exports, "normal", { enumerable: true, get: function () { return normal_1.normal; } });
const from_0_to_T_1 = require("./transformation/split-merge-clone/from-0-to-T");
Object.defineProperty(exports, "from0ToT", { enumerable: true, get: function () { return from_0_to_T_1.from0ToT; } });
const from_T_to_1_1 = require("./transformation/split-merge-clone/from-T-to-1");
Object.defineProperty(exports, "fromTTo1", { enumerable: true, get: function () { return from_T_to_1_1.fromTTo1; } });
const from_to_1 = require("./transformation/split-merge-clone/from-to");
Object.defineProperty(exports, "fromTo", { enumerable: true, get: function () { return from_to_1.fromTo; } });
Object.defineProperty(exports, "fromToPrecise", { enumerable: true, get: function () { return from_to_1.fromToPrecise; } });
const bezier_bezier_intersection_implicit_2 = require("./intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit");
Object.defineProperty(exports, "getOtherTs", { enumerable: true, get: function () { return bezier_bezier_intersection_implicit_2.getOtherTs; } });
const bezier_bezier_intersection_implicit_3 = require("./intersection/bezier-intersection-implicit/bezier-bezier-intersection-implicit");
Object.defineProperty(exports, "bezierBezierIntersectionImplicit", { enumerable: true, get: function () { return bezier_bezier_intersection_implicit_3.bezierBezierIntersectionImplicit; } });
const to_cubic_1 = require("./transformation/degree-or-type/to-cubic");
Object.defineProperty(exports, "toCubic", { enumerable: true, get: function () { return to_cubic_1.toCubic; } });
const debug_1 = require("./debug/debug");
Object.defineProperty(exports, "BezDebug", { enumerable: true, get: function () { return debug_1.BezDebug; } });
const curvature_1 = require("./local-properties-at-t/curvature");
Object.defineProperty(exports, "\u03BA", { enumerable: true, get: function () { return curvature_1.κ; } });
const quad_to_polyline_1 = require("./transformation/quad-to-polyline");
Object.defineProperty(exports, "quadToPolyline", { enumerable: true, get: function () { return quad_to_polyline_1.quadToPolyline; } });
const is_quad_obtuse_1 = require("./global-properties/type/is-quad-obtuse");
Object.defineProperty(exports, "isQuadObtuse", { enumerable: true, get: function () { return is_quad_obtuse_1.isQuadObtuse; } });
const get_interval_box_1 = require("./global-properties/bounds/get-interval-box/get-interval-box");
Object.defineProperty(exports, "getIntervalBox", { enumerable: true, get: function () { return get_interval_box_1.getIntervalBox; } });
Object.defineProperty(exports, "getIntervalBox1", { enumerable: true, get: function () { return get_interval_box_1.getIntervalBox1; } });
Object.defineProperty(exports, "getIntervalBox2", { enumerable: true, get: function () { return get_interval_box_1.getIntervalBox2; } });
Object.defineProperty(exports, "getIntervalBox3", { enumerable: true, get: function () { return get_interval_box_1.getIntervalBox3; } });
const get_interval_box_quad_1 = require("./global-properties/bounds/get-interval-box/get-interval-box-quad");
Object.defineProperty(exports, "getIntervalBoxQuad", { enumerable: true, get: function () { return get_interval_box_quad_1.getIntervalBoxQuad; } });
Object.defineProperty(exports, "getIntervalBox1Quad", { enumerable: true, get: function () { return get_interval_box_quad_1.getIntervalBox1Quad; } });
Object.defineProperty(exports, "getIntervalBox2Quad", { enumerable: true, get: function () { return get_interval_box_quad_1.getIntervalBox2Quad; } });
Object.defineProperty(exports, "getIntervalBox3Quad", { enumerable: true, get: function () { return get_interval_box_quad_1.getIntervalBox3Quad; } });
const split_at_1 = require("./transformation/split-merge-clone/split-at");
Object.defineProperty(exports, "splitAt", { enumerable: true, get: function () { return split_at_1.splitAt; } });
Object.defineProperty(exports, "splitAtPrecise", { enumerable: true, get: function () { return split_at_1.splitAtPrecise; } });
const closest_point_on_bezier_2 = require("./simultaneous-properties/closest-point-on-bezier/closest-point-on-bezier");
Object.defineProperty(exports, "closestPointOnBezierPrecise", { enumerable: true, get: function () { return closest_point_on_bezier_2.closestPointOnBezierPrecise; } });
const hausdorff_distance_1 = require("./simultaneous-properties/hausdorff-distance");
Object.defineProperty(exports, "hausdorffDistance", { enumerable: true, get: function () { return hausdorff_distance_1.hausdorffDistance; } });
Object.defineProperty(exports, "hausdorffDistanceCandidates", { enumerable: true, get: function () { return hausdorff_distance_1.hausdorffDistanceCandidates; } });
const length_upper_bound_1 = require("./global-properties/length/length-upper-bound");
Object.defineProperty(exports, "lengthUpperBound", { enumerable: true, get: function () { return length_upper_bound_1.lengthUpperBound; } });
const length_squared_upper_bound_1 = require("./global-properties/length/length-squared-upper-bound");
Object.defineProperty(exports, "lengthSquaredUpperBound", { enumerable: true, get: function () { return length_squared_upper_bound_1.lengthSquaredUpperBound; } });
const split_by_max_curve_length_1 = require("./transformation/split-merge-clone/split-by-max-curve-length");
Object.defineProperty(exports, "splitByMaxCurveLength", { enumerable: true, get: function () { return split_by_max_curve_length_1.splitByMaxCurveLength; } });
const get_curvature_extrema_1 = require("./get-curvature-extrema/get-curvature-extrema");
Object.defineProperty(exports, "getCurvatureExtrema", { enumerable: true, get: function () { return get_curvature_extrema_1.getCurvatureExtrema; } });
const get_inflections_1 = require("./local-properties-to-t/get-inflections");
Object.defineProperty(exports, "getInflections", { enumerable: true, get: function () { return get_inflections_1.getInflections; } });
const flatness_1 = require("./global-properties/flatness");
Object.defineProperty(exports, "flatness", { enumerable: true, get: function () { return flatness_1.flatness; } });
const split_by_max_curvature_1 = require("./transformation/split-merge-clone/split-by-max-curvature");
Object.defineProperty(exports, "splitByMaxCurvature", { enumerable: true, get: function () { return split_by_max_curvature_1.splitByMaxCurvature; } });
const split_by_curvature_and_length_1 = require("./transformation/split-merge-clone/split-by-curvature-and-length");
Object.defineProperty(exports, "splitByCurvatureAndLength", { enumerable: true, get: function () { return split_by_curvature_and_length_1.splitByCurvatureAndLength; } });
const are_beziers_in_same_k_family_1 = require("./simultaneous-properties/are-beziers-in-same-k-family");
Object.defineProperty(exports, "areBeziersInSameKFamily", { enumerable: true, get: function () { return are_beziers_in_same_k_family_1.areBeziersInSameKFamily; } });
const get_interface_ccw_1 = require("./simultaneous-properties/get-interface-ccw");
Object.defineProperty(exports, "getInterfaceCcw", { enumerable: true, get: function () { return get_interface_ccw_1.getInterfaceCcw; } });
const is_line_1 = require("./global-properties/type/is-line");
Object.defineProperty(exports, "isLine", { enumerable: true, get: function () { return is_line_1.isLine; } });
Object.defineProperty(exports, "isHorizontalLine", { enumerable: true, get: function () { return is_line_1.isHorizontalLine; } });
Object.defineProperty(exports, "isVerticalLine", { enumerable: true, get: function () { return is_line_1.isVerticalLine; } });
const is_self_overlapping_1 = require("./global-properties/type/is-self-overlapping");
Object.defineProperty(exports, "isSelfOverlapping", { enumerable: true, get: function () { return is_self_overlapping_1.isSelfOverlapping; } });
const get_tangent_poly_from_point_1 = require("./simultaneous-properties/get-tangent-poly-from-point/naive/get-tangent-poly-from-point");
Object.defineProperty(exports, "getTangentPolyFromPoint", { enumerable: true, get: function () { return get_tangent_poly_from_point_1.getTangentPolyFromPoint; } });
const get_tangent_poly_from_point_2 = require("./simultaneous-properties/get-tangent-poly-from-point/exact/get-tangent-poly-from-point");
Object.defineProperty(exports, "getTangentPolyFromPointExact", { enumerable: true, get: function () { return get_tangent_poly_from_point_2.getTangentPolyFromPointExact; } });
const get_bounds_1 = require("./global-properties/bounds/get-bounds");
Object.defineProperty(exports, "getXBoundsTight", { enumerable: true, get: function () { return get_bounds_1.getXBoundsTight; } });
Object.defineProperty(exports, "getYBoundsTight", { enumerable: true, get: function () { return get_bounds_1.getYBoundsTight; } });
const get_bounds_2 = require("./global-properties/bounds/get-bounds");
Object.defineProperty(exports, "getBounds", { enumerable: true, get: function () { return get_bounds_2.getBounds; } });
const get_bounding_box_tight_1 = require("./global-properties/bounds/get-bounding-box-tight");
Object.defineProperty(exports, "getBoundingBoxTight", { enumerable: true, get: function () { return get_bounding_box_tight_1.getBoundingBoxTight; } });
const get_bounding_box_1 = require("./global-properties/bounds/get-bounding-box");
Object.defineProperty(exports, "getBoundingBox", { enumerable: true, get: function () { return get_bounding_box_1.getBoundingBox; } });
const to_hybrid_quadratic_1 = require("./transformation/degree-or-type/to-hybrid-quadratic");
Object.defineProperty(exports, "toHybridQuadratic", { enumerable: true, get: function () { return to_hybrid_quadratic_1.toHybridQuadratic; } });
const is_cubic_really_quad_1 = require("./global-properties/type/is-cubic-really-quad");
Object.defineProperty(exports, "isCubicReallyQuad", { enumerable: true, get: function () { return is_cubic_really_quad_1.isCubicReallyQuad; } });
const to_quad_from_cubic_1 = require("./transformation/degree-or-type/to-quad-from-cubic");
Object.defineProperty(exports, "toQuadraticFromCubic", { enumerable: true, get: function () { return to_quad_from_cubic_1.toQuadraticFromCubic; } });
const circle_bezier_intersection_1 = require("./intersection/circle-bezier-intersection/naive/circle-bezier-intersection");
Object.defineProperty(exports, "circleBezierIntersection", { enumerable: true, get: function () { return circle_bezier_intersection_1.circleBezierIntersection; } });
const circle_bezier_intersection_precise_1 = require("./intersection/circle-bezier-intersection/circle-bezier-intersection-precise");
Object.defineProperty(exports, "circleBezierIntersectionPrecise", { enumerable: true, get: function () { return circle_bezier_intersection_precise_1.circleBezierIntersectionPrecise; } });
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
/** Alias of κ. */
let curvature = curvature_1.κ;
exports.curvature = curvature;
/**
 * Returns a human readable string representation of the given bezier.
 * @param ps - A bezier curve
 */
function toString(ps) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    return `[[${x0},${y0}],[${x1},${y1}],[${x2},${y2}],[${x3},${y3}]]`;
}
exports.toString = toString;
//# sourceMappingURL=index.js.map