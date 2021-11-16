"use strict";
exports.__esModule = true;
exports.bezierFromPart = void 0;
var from_0_to_T_js_1 = require("./split-merge-clone/from-0-to-T.js");
var from_T_to_1_js_1 = require("./split-merge-clone/from-T-to-1.js");
var eval_de_casteljau_js_1 = require("../local-properties-at-t/t-to-xy/double/eval-de-casteljau.js");
/**
 * Returns a new bezier from the given bezier by limiting its t range.
 *
 * Uses de Casteljau's algorithm.
 *
 * @param bezierPart A partial bezier
 *
 * @doc
 */
function bezierFromPart(bezierPart) {
    var ps = bezierPart.ps, ts = bezierPart.ts;
    // If ts = [0,1] then return original bezier.
    if (ts[0] === 0 && ts[1] === 1) {
        return ps;
    }
    // If ts[0] === ts[1] then return a single point degenerated bezier.
    if (ts[0] === ts[1]) {
        var p = (0, eval_de_casteljau_js_1.evalDeCasteljau)(ps, ts[0]);
        return [p, p, p, p];
    }
    if (ts[0] === 0) {
        return (0, from_0_to_T_js_1.from0ToT)(ps, ts[1]);
    }
    if (ts[1] === 1) {
        return (0, from_T_to_1_js_1.fromTTo1)(ps, ts[0]);
    }
    // At this stage we know the t range is not degenerate and ts[0] !== 0 
    // and ts[1] !== 1
    return (0, from_0_to_T_js_1.from0ToT)((0, from_T_to_1_js_1.fromTTo1)(ps, ts[0]), (ts[1] - ts[0]) / (1 - ts[0]));
}
exports.bezierFromPart = bezierFromPart;
