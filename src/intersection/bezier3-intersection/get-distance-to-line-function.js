"use strict";
exports.__esModule = true;
exports.getDistanceToLineFunction = void 0;
var double_double_1 = require("double-double");
var tp = double_double_1.twoProduct;
var qdq = double_double_1.ddDiffDd;
var abs = Math.abs;
var eps = Number.EPSILON;
var u = eps / 2;
/*
function getDistanceToLineFunction(
        pS: number[],
        pE: number[]): (p: number[]) => number {

    const xS = pS[0];
    const yS = pS[1];
    const xE = pE[0];
    const yE = pE[1];

    const s = yS - yE;
    const t = xE - xS;
    const u = qdq(tp(xS,yE), tp(xE,yS))[1];

    return function(p: number[]) {
        return s*p[0] + t*p[1] + u;
    }
}
*/
function getDistanceToLineFunction(pS, pE) {
    var xS = pS[0];
    var yS = pS[1];
    var xE = pE[0];
    var yE = pE[1];
    // note: td(yS, yE) nearly always has low double === 0 -> could potentially be taken advantage of in future
    var s = yS - yE; // <1>s
    var t = xE - xS; // <1>t
    var v = qdq(tp(xS, yE), tp(xE, yS))[1]; // <1>v
    var _s = abs(s);
    var _t = abs(t);
    var _v = abs(v);
    return function (p, _p) {
        // error counter assumed <12> 
        // (the max of <6>,<6>,<10>,<11> and <12> from other functions)
        var x = p[0]; // <12>x 
        var y = p[1]; // <12>y
        //return s*x + t*y + u;
        var _x = _p[0];
        var _y = _p[1];
        // error counter of <12> on all coordinates
        var d = s * x + t * y + v;
        // <16>r <= <16>(<15>(<14>(<1>s*<12>x) + <14>(<1>t*<12>y)) + <1>v)
        var _d = _s * _x + _t * _y + _v;
        var E = 16 * u * _d;
        return { dMin: d - E, dMax: d + E };
    };
}
exports.getDistanceToLineFunction = getDistanceToLineFunction;
