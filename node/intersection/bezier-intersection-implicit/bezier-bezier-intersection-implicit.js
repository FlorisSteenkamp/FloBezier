"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
const flo_poly_1 = require("flo-poly");
const get_coefficients_1x1_1 = require("./quad/get-coefficients-1x1");
const get_coefficients_2x1_1 = require("./quad/get-coefficients-2x1");
const get_coefficients_3x1_1 = require("./quad/get-coefficients-3x1");
const get_coefficients_1x2_1 = require("./quad/get-coefficients-1x2");
const get_coefficients_2x2_1 = require("./quad/get-coefficients-2x2");
const get_coefficients_3x2_1 = require("./quad/get-coefficients-3x2");
const get_coefficients_1x3_1 = require("./quad/get-coefficients-1x3");
const get_coefficients_2x3_1 = require("./quad/get-coefficients-2x3");
const get_coefficients_3x3_1 = require("./quad/get-coefficients-3x3");
const get_coefficients_1x1_2 = require("./exact/get-coefficients-1x1-");
const get_coefficients_2x1_2 = require("./exact/get-coefficients-2x1-");
const get_coefficients_3x1_2 = require("./exact/get-coefficients-3x1-");
const get_coefficients_1x2_2 = require("./exact/get-coefficients-1x2-");
const get_coefficients_2x2_2 = require("./exact/get-coefficients-2x2-");
const get_coefficients_3x2_2 = require("./exact/get-coefficients-3x2-");
const get_coefficients_1x3_2 = require("./exact/get-coefficients-1x3-");
const get_coefficients_2x3_2 = require("./exact/get-coefficients-2x3-");
const get_coefficients_3x3_2 = require("./exact/get-coefficients-3x3-");
const differentiate_1 = require("flo-poly/node/calculus/differentiate");
const get_interval_box_1 = require("../../global-properties/bounds/get-interval-box/get-interval-box");
const intersect_boxes_1 = require("../../geometry/intersect-boxes");
const abs = Math.abs;
function getIntersectionCoeffs(ps1, ps2) {
    let { coeffs, errBound } = [
        [get_coefficients_1x1_1.getCoeffs1x1Quad, get_coefficients_1x2_1.getCoeffs1x2Quad, get_coefficients_1x3_1.getCoeffs1x3Quad],
        [get_coefficients_2x1_1.getCoeffs2x1Quad, get_coefficients_2x2_1.getCoeffs2x2Quad, get_coefficients_2x3_1.getCoeffs2x3Quad],
        [get_coefficients_3x1_1.getCoeffs3x1Quad, get_coefficients_3x2_1.getCoeffs3x2Quad, get_coefficients_3x3_1.getCoeffs3x3Quad]
    ][ps1.length - 2][ps2.length - 2](ps1, ps2);
    function getPExact() {
        return [
            [get_coefficients_1x1_2.getCoeffs1x1Exact_, get_coefficients_1x2_2.getCoeffs1x2Exact_, get_coefficients_1x3_2.getCoeffs1x3Exact_],
            [get_coefficients_2x1_2.getCoeffs2x1Exact_, get_coefficients_2x2_2.getCoeffs2x2Exact_, get_coefficients_2x3_2.getCoeffs2x3Exact_],
            [get_coefficients_3x1_2.getCoeffs3x1Exact_, get_coefficients_3x2_2.getCoeffs3x2Exact_, get_coefficients_3x3_2.getCoeffs3x3Exact_]
        ][ps1.length - 2][ps2.length - 2](ps1, ps2);
    }
    function getPsExact() {
        let poly = getPExact();
        let psExact = [poly];
        while (poly.length > 1) {
            poly = differentiate_1.differentiateExact(psExact[psExact.length - 1]);
            psExact.push(poly);
        }
        return psExact;
    }
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
            if (flo_numerical_1.sign(poly[i]) !== 0) {
                sameKFamily = false;
                break;
            }
        }
    }
    if (sameKFamily) {
        return undefined;
    }
    //if (ps1.length === 4 && ps2.length === 2 &&
    //    ps2[0][0] > 376 && ps2[0][0] < 377) {
    //    console.log(ps1,ps2)
    //    console.log(coeffs);
    //    console.log(errBound);
    //    console.log('------');
    //}
    return { coeffs, errBound, getPsExact };
}
exports.getIntersectionCoeffs = getIntersectionCoeffs;
/**
 * Returns the intersection between two linear, quadratic or cubic bezier curves
 * in any combination.
 * * Returns **undefined** only in the case that the two beziers are in the same
 * k-family.
 * * The second bezier's t values are retuned. Call getOtherTs to get the first
 * bezier's t values.
 * * this algorithm is nearly always accurate to 1 u in the t values for the **second**
 * bezier (except if there are several extremely close intersections) and
 * a few u accurate for the second t values.
 * * Before calling this function, ensure the two given beziers are really cubic
 * or quadratic if given as such (check with isReallyQuadratic), else convert
 * them (cubics can be converted with toQuadraticFromCubic)
 * See http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps
 */
function bezierBezierIntersectionImplicit(ps1, ps2) {
    let _coeffs = getIntersectionCoeffs(ps1, ps2);
    if (_coeffs === undefined) {
        return undefined;
    }
    let { coeffs, errBound, getPsExact } = _coeffs;
    return flo_poly_1.allRootsMultiWithErrBounds(coeffs, errBound, getPsExact);
}
exports.bezierBezierIntersectionImplicit = bezierBezierIntersectionImplicit;
/**
 * Returns the ordered (first ps1, then ps2) intersection pairs given the two
 * curves that intersect and the t values of the **second** curve.
 * @param ps1 the first bezier
 * @param ps2 the second bezier
 * @param ts2 the t values of the second bezier
 */
function getOtherTs(ps1, ps2, ts2) {
    if (ts2 === undefined || ts2.length === 0) {
        return [];
    }
    let ts1 = bezierBezierIntersectionImplicit(ps2, ps1);
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
                //console.log(box1)
                //console.log(box2)
                //console.log(box)
                //console.log('---------')
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