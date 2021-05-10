"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOtherTs = exports.bezierBezierIntersectionImplicit = exports.getIntersectionCoeffs = void 0;
const flo_poly_1 = require("flo-poly");
const get_coefficients_1x1_1 = require("./inp-bitlength45/double-double/get-coefficients-1x1");
const get_coefficients_2x1_1 = require("./inp-bitlength45/double-double/get-coefficients-2x1");
const get_coefficients_3x1_1 = require("./inp-bitlength45/double-double/get-coefficients-3x1");
const get_coefficients_1x2_1 = require("./inp-bitlength45/double-double/get-coefficients-1x2");
const get_coefficients_2x2_1 = require("./inp-bitlength45/double-double/get-coefficients-2x2");
const get_coefficients_3x2_1 = require("./inp-bitlength45/double-double/get-coefficients-3x2");
const get_coefficients_1x3_1 = require("./inp-bitlength45/double-double/get-coefficients-1x3");
const get_coefficients_2x3_1 = require("./inp-bitlength45/double-double/get-coefficients-2x3");
const get_coefficients_3x3_1 = require("./inp-bitlength45/double-double/get-coefficients-3x3");
const get_coefficients_1x1_2 = require("./inp-bitlength45/exact/get-coefficients-1x1");
const get_coefficients_2x1_2 = require("./inp-bitlength45/exact/get-coefficients-2x1");
const get_coefficients_3x1_2 = require("./inp-bitlength45/exact/get-coefficients-3x1");
const get_coefficients_1x2_2 = require("./inp-bitlength45/exact/get-coefficients-1x2");
const get_coefficients_2x2_2 = require("./inp-bitlength45/exact/get-coefficients-2x2");
const get_coefficients_3x2_2 = require("./inp-bitlength45/exact/get-coefficients-3x2");
const get_coefficients_1x3_2 = require("./inp-bitlength45/exact/get-coefficients-1x3");
const get_coefficients_2x3_2 = require("./inp-bitlength45/exact/get-coefficients-2x3");
const get_coefficients_3x3_2 = require("./inp-bitlength45/exact/get-coefficients-3x3");
const get_interval_box_1 = require("../../global-properties/bounds/get-interval-box/get-interval-box");
const intersect_boxes_1 = require("../../boxes/intersect-boxes");
const get_coefficients_1x1_3 = require("./inp-bitlength45/double/get-coefficients-1x1");
const get_coefficients_1x2_3 = require("./inp-bitlength45/double/get-coefficients-1x2");
const get_coefficients_1x3_3 = require("./inp-bitlength45/double/get-coefficients-1x3");
const get_coefficients_2x1_3 = require("./inp-bitlength45/double/get-coefficients-2x1");
const get_coefficients_2x2_3 = require("./inp-bitlength45/double/get-coefficients-2x2");
const get_coefficients_2x3_3 = require("./inp-bitlength45/double/get-coefficients-2x3");
const get_coefficients_3x1_3 = require("./inp-bitlength45/double/get-coefficients-3x1");
const get_coefficients_3x2_3 = require("./inp-bitlength45/double/get-coefficients-3x2");
const get_coefficients_3x3_3 = require("./inp-bitlength45/double/get-coefficients-3x3");
// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
const big_float_ts_1 = require("big-float-ts");
const { eSign } = big_float_ts_1.operators;
const abs = Math.abs;
const coeffFunctionsDouble = [
    [get_coefficients_1x1_3.getCoeffs1x1, get_coefficients_1x2_3.getCoeffs1x2, get_coefficients_1x3_3.getCoeffs1x3],
    [get_coefficients_2x1_3.getCoeffs2x1, get_coefficients_2x2_3.getCoeffs2x2, get_coefficients_2x3_3.getCoeffs2x3],
    [get_coefficients_3x1_3.getCoeffs3x1, get_coefficients_3x2_3.getCoeffs3x2, get_coefficients_3x3_3.getCoeffs3x3]
];
// TODO - remove - testing
//function getCoeffs3x3Quad_(ps1: number[][], ps2: number[][]) {
//    let r = getCoeffs3x3(ps1,ps2);
//    return {
//        coeffs: r.coeffs.map(coeff => [0,coeff]),
//        errBound: r.errBound
//    }
//}
const coeffFunctionsQuad = [
    [get_coefficients_1x1_1.getCoeffs1x1Quad, get_coefficients_1x2_1.getCoeffs1x2Quad, get_coefficients_1x3_1.getCoeffs1x3Quad],
    [get_coefficients_2x1_1.getCoeffs2x1Quad, get_coefficients_2x2_1.getCoeffs2x2Quad, get_coefficients_2x3_1.getCoeffs2x3Quad],
    [get_coefficients_3x1_1.getCoeffs3x1Quad, get_coefficients_3x2_1.getCoeffs3x2Quad, get_coefficients_3x3_1.getCoeffs3x3Quad]
];
const coeffFunctionsExact = [
    [get_coefficients_1x1_2.getCoeffs1x1Exact, get_coefficients_1x2_2.getCoeffs1x2Exact, get_coefficients_1x3_2.getCoeffs1x3Exact],
    [get_coefficients_2x1_2.getCoeffs2x1Exact, get_coefficients_2x2_2.getCoeffs2x2Exact, get_coefficients_2x3_2.getCoeffs2x3Exact],
    [get_coefficients_3x1_2.getCoeffs3x1Exact, get_coefficients_3x2_2.getCoeffs3x2Exact, get_coefficients_3x3_2.getCoeffs3x3Exact]
];
/**
 * Returns the intersection polynomial coefficients between two bezier curves
 * unless all coefficients are exactly zero in which case undefined is returned
 * so that is easy to check if the two curves are actually identical
 * algebraically when endpoints are ignored.
 *
 * @param ps1
 * @param ps2
 *
 * @doc
 */
function getIntersectionCoeffs(ps1, ps2) {
    let { coeffs, errBound } = coeffFunctionsQuad[ps1.length - 2][ps2.length - 2](ps1, ps2);
    //let { coeffs, errBound } = coeffFunctionsDouble[ps1.length-2][ps2.length-2](ps1, ps2);
    let getPExact = () => coeffFunctionsExact[ps1.length - 2][ps2.length - 2](ps1, ps2);
    // check if all coefficients are zero, 
    // i.e. the two curves are possibly in the same k-family
    let possiblySameKFamily = true;
    for (let i = 0; i < coeffs.length; i++) {
        if (abs(coeffs[i][1]) - errBound[i] > 0) {
            possiblySameKFamily = false;
            break;
        }
    }
    let sameKFamily = false;
    if (possiblySameKFamily) {
        sameKFamily = true;
        let poly = getPExact();
        for (let i = 0; i < poly.length; i++) {
            if (eSign(poly[i]) !== 0) {
                sameKFamily = false;
                break;
            }
        }
    }
    if (sameKFamily) {
        return undefined;
    }
    return { coeffs, errBound, getPExact };
}
exports.getIntersectionCoeffs = getIntersectionCoeffs;
/**
 * Returns the intersection between two linear, quadratic or cubic bezier curves
 * in any combination.
 * * Returns **undefined** only in the case that the two beziers are in the same
 * k-family.
 * * The second bezier's t values are retuned. Call getOtherTs to get the first
 * bezier's t values.
 * * this algorithm is always accurate to within `4 * Number.EPSILON` in the t
 * values for the **second** bezier.
 * * Before calling this function, ensure the two given beziers are really cubic
 * or quadratic if given as such (check with isReallyQuadratic), else convert
 * them (cubics can be converted with toQuadraticFromCubic)
 * * algorithm adapted from [Indrek](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 *
 * @doc
 */
function bezierBezierIntersectionImplicit(ps1, ps2) {
    let _coeffs = getIntersectionCoeffs(ps1, ps2);
    if (_coeffs === undefined) {
        return undefined;
    }
    let { coeffs, errBound, getPExact } = _coeffs;
    return flo_poly_1.allRootsCertified(coeffs, 0, 1, errBound, getPExact);
}
exports.bezierBezierIntersectionImplicit = bezierBezierIntersectionImplicit;
/**
 * Returns the ordered (first ps1, then ps2) intersection pairs given the two
 * curves that intersect and the t values of the **second** curve.
 *
 * * If the t values given is undefined, undefined is returned
 * * if it is an empty array, an empty array is returned.
 * * If the t values given is not an empty array and it turns out the curves
 * are in the same k family then undefined is returned.
 * @param ps1 the first bezier
 * @param ps2 the second bezier
 * @param ts2 the t values of the second bezier
 */
function getOtherTs(ps1, ps2, ts2) {
    if (ts2 === undefined) {
        return undefined;
    }
    if (ts2.length === 0) {
        return [];
    }
    let ts1 = bezierBezierIntersectionImplicit(ps2, ps1);
    if (ts1 === undefined) {
        return undefined;
    }
    if (ts1.length === 0) {
        return [];
    }
    let is1 = ts1.map(ri => get_interval_box_1.getIntervalBox(ps1, [ri.tS, ri.tE]));
    let is2 = ts2.map(ri => get_interval_box_1.getIntervalBox(ps2, [ri.tS, ri.tE]));
    let xPairs = [];
    for (let i = 0; i < ts1.length; i++) {
        let box1 = is1[i];
        for (let j = 0; j < ts2.length; j++) {
            let box2 = is2[j];
            let box = intersect_boxes_1.intersectBoxes(box1, box2);
            if (box !== undefined) {
                // TODO important - combine boxes to make sense, i.e. combine better
                // e.g. two odd multiplicity boxes should combine to a single even, etc. etc.
                let x1 = { ri: ts1[i], box, kind: 1 };
                let x2 = { ri: ts2[j], box, kind: 1 };
                xPairs.push([x1, x2]);
            }
        }
    }
    return xPairs;
}
exports.getOtherTs = getOtherTs;
//# sourceMappingURL=bezier-bezier-intersection-implicit.js.map