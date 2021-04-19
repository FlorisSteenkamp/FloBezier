"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalDeCasteljauWithErr = void 0;
const error_analysis_1 = require("../../error-analysis/error-analysis");
const abs = Math.abs;
const γ1 = error_analysis_1.γ(1);
/**
 * Evaluates the given bezier curve at the parameter t, including error.
 *
 * * **precondition**: 49-bit aligned coordinates
 *
 * @param ps An order 1, 2 or 3 bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t The parameter value where the bezier should be evaluated
 **/
function evalDeCasteljauWithErr(ps, t) {
    if (t === 0) {
        return { p: ps[0], pE: [0, 0] };
    }
    else if (t === 1) {
        return { p: ps[ps.length - 1], pE: [0, 0] };
    }
    // let s = 1 - t;  // <= exact if eps | t, but not a precondition here
    // let s = 1 - t;  // <1>s1
    if (ps.length === 4) {
        const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
        let _x0 = abs(x0);
        let _y0 = abs(y0);
        let _x1 = abs(x1);
        let _y1 = abs(y1);
        let _x2 = abs(x2);
        let _y2 = abs(y2);
        let _x3 = abs(x3);
        let _y3 = abs(y3);
        let a01 = x0 + (x1 - x0) * t;
        let a11 = x1 + (x2 - x1) * t;
        let a21 = x2 + (x3 - x2) * t;
        let a02 = a01 + (a11 - a01) * t;
        let a12 = a11 + (a21 - a11) * t;
        let x = a02 + (a12 - a02) * t;
        let _a01 = _x0 + (_x1 + _x0) * t;
        //let _a01 = <2>(_x0 + <1>((_x1 + _x0)*t));
        let _a11 = _x1 + (_x2 + _x1) * t;
        //let _a11 = <2>(_x1 + <1>((_x2 + _x1)*t));
        let _a21 = _x2 + (_x3 + _x2) * t;
        //let _a21 = <2>(_x2 + <1>((_x3 + _x2)*t));
        let _a02 = _a01 + (_a11 + _a01) * t;
        //let _a02 = <5>(<2>_a01 + <4>(<3>(<2>_a11 + <2>_a01)*t));
        let _a12 = _a11 + (_a21 + _a11) * t;
        //let _a12 = <5>(<2>_a11 + <4>(<3>(<2>_a21 + <2>_a11)*t));
        let _x = _a02 + (_a12 + _a02) * t;
        //let _x = <8>(<5>_a02 + <7>(<6>(<5>_a12 + <5>_a02)*t));
        _x = 8 * γ1 * _x;
        let b01 = y0 + (y1 - y0) * t;
        let b11 = y1 + (y2 - y1) * t;
        let b21 = y2 + (y3 - y2) * t;
        let b02 = b01 + (b11 - b01) * t;
        let b12 = b11 + (b21 - b11) * t;
        let y = b02 + (b12 - b02) * t;
        let _b01 = _y0 + (_y1 + _y0) * t;
        let _b11 = _y1 + (_y2 + _y1) * t;
        let _b21 = _y2 + (_y3 + _y2) * t;
        let _b02 = _b01 + (_b11 + _b01) * t;
        let _b12 = _b11 + (_b21 + _b11) * t;
        let _y = _b02 + (_b12 + _b02) * t;
        _y = 8 * γ1 * _y;
        return { p: [x, y], pE: [_x, _y] };
    }
    else if (ps.length === 3) {
        const [[x0, y0], [x1, y1], [x2, y2]] = ps;
        let _x0 = abs(x0);
        let _y0 = abs(y0);
        let _x1 = abs(x1);
        let _y1 = abs(y1);
        let _x2 = abs(x2);
        let _y2 = abs(y2);
        let a01 = x0 + (x1 - x0) * t;
        let a11 = x1 + (x2 - x1) * t;
        let x = a01 + (a11 - a01) * t;
        let _a01 = _x0 + (_x1 + _x0) * t;
        //let _a01 = <2>(_x0 + <1>((_x1 + _x0)*t));
        let _a11 = _x1 + (_x2 + _x1) * t;
        //let _a11 = <2>(_x1 + <1>((_x2 + _x1)*t));
        let _x = _a01 + (_a11 + _a01) * t;
        //let _x = <5>(<2>_a01 + <4>((<3>(<2>_a11 + <2>_a01))*t));
        _x = 5 * γ1 * _x;
        let b01 = y0 + (y1 - y0) * t;
        let b11 = y1 + (y2 - y1) * t;
        let y = b01 + (b11 - b01) * t;
        let _b01 = _y0 + (_y1 + _y0) * t;
        let _b11 = _y1 + (_y2 + _y1) * t;
        let _y = _b01 + (_b11 + _b01) * t;
        _y = 5 * γ1 * _y;
        return { p: [x, y], pE: [_x, _y] };
    }
    else if (ps.length === 2) {
        const [[x0, y0], [x1, y1]] = ps;
        let _x0 = abs(x0);
        let _y0 = abs(y0);
        let _x1 = abs(x1);
        let _y1 = abs(y1);
        let x = x0 + (x1 - x0) * t;
        let y = y0 + (y1 - y0) * t;
        let _x = _x0 + (_x1 + _x0) * t;
        //let _x = <2>(_x0 + <1>((_x1 + _x0)*t));
        _x = 2 * γ1 * _x;
        let _y = _y0 + (_y1 + _y0) * t;
        //let _y = <2>(_y0 + <1>((_y1 + _y0)*t));
        _y = 2 * γ1 * _y;
        return { p: [x, y], pE: [_x, _y] };
    }
}
exports.evalDeCasteljauWithErr = evalDeCasteljauWithErr;
//# sourceMappingURL=eval-de-casteljau-with-err.js.map