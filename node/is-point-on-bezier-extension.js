"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_x_1 = require("./get-x");
const get_y_1 = require("./get-y");
const det_naive_1 = require("./matrix/det-naive");
/**
 * Returns true if the given point is on the given bezier curve where the
 * parameter t is allowed to extend to +-infinity, i.e. t is an element of
 * [-inf, +inf], false otherwise.
 *
 * Exact: This algorithm uses exact floating point arithmetic and thus not
 * susceptible to round-off error.
 *
 * Precondition: ps and p must be grid-aligned and have a maximum bitlength
 * of 50.
 * (note: it is relatively easy to extend the algorithm to relax this condition
 * but would then run much slower)
 * (note: 53 - 3 = 50 bits due to the power representation calculation that
 * multiplies the coordinates by 1,2,3, or 6. When multiplied by 6 a coordinate
 * can move 3 bits off the grid (to the left of course)
 */
function isPointOnBezierExtension(ps, p) {
    let ps_ = ps.slice();
    if (typeof _bez_debug_ !== 'undefined') {
        // Check precondition
        for (let p of ps_) {
            //if (bitLength())
        }
    }
    // Get power basis
    let x = get_x_1.getX(ps_);
    let y = get_y_1.getY(ps_);
    // Move to origin
    x[x.length - 1] -= p[0];
    y[y.length - 1] -= p[1];
    let a = 0;
    let b = 0;
    let c = 0;
    let d = 0;
    let e = 0;
    let f = 0;
    let g = 0;
    let h = 0;
    if (x.length === 4) {
        [a, b, c, d] = x;
    }
    else if (x.length === 3) {
        [b, c, d] = x;
    }
    else if (x.length === 2) {
        [c, d] = x;
    }
    if (y.length === 4) {
        [e, f, g, h] = y;
    }
    else if (y.length === 3) {
        [f, g, h] = y;
    }
    else if (y.length === 2) {
        [g, h] = y;
    }
    // first non-zero x power
    let fnzX = a !== 0 ? 3 :
        b !== 0 ? 2 :
            c !== 0 ? 1 :
                d !== 0 ? 0 : -1;
    // first non-zero y power
    let fnzY = e !== 0 ? 3 :
        f !== 0 ? 2 :
            g !== 0 ? 1 :
                h !== 0 ? 0 : -1;
    // Swap if necessary
    if (fnzX < fnzY) {
        [fnzX, fnzY] = [fnzY, fnzX];
        [a, e] = [e, a];
        [b, f] = [f, b];
        [c, g] = [g, c];
        [d, h] = [h, d];
    }
    // The sylvester matrix
    let S;
    if (fnzX === 3 && fnzY === 3) {
        S = [
            [a, b, c, d, 0, 0],
            [0, a, b, c, d, 0],
            [0, 0, a, b, c, d],
            [e, f, g, h, 0, 0],
            [0, e, f, g, h, 0],
            [0, 0, e, f, g, h]
        ];
    }
    else if (fnzX === 3 && fnzY === 2) {
        S = [
            [a, b, c, d, 0],
            [0, a, b, c, d],
            [f, g, h, 0, 0],
            [0, f, g, h, 0],
            [0, 0, f, g, h]
        ];
    }
    else if (fnzX === 3 && fnzY === 1) {
        S = [
            [a, b, c, d],
            [g, h, 0, 0],
            [0, g, h, 0],
            [0, 0, g, h]
        ];
    }
    else if (fnzX === 3 && fnzY === 0) {
        // of course we can take a shortcut here - left for symmetry
        return false;
        /*
        S = [
            [h,0,0],
            [0,h,0],
            [0,0,h]
        ];
        */
    }
    else if (fnzX === 3 && fnzY === -1) {
        // This is a cubic curve that 'loops' back on itself - it degenrates into
        // a self-overlapping line. The point is on the curve.
        return true;
    }
    else if (fnzX === 2 && fnzY === 2) {
        S = [
            [b, c, d, 0],
            [0, b, c, d],
            [f, g, h, 0],
            [0, f, g, h]
        ];
    }
    else if (fnzX === 2 && fnzY === 1) {
        S = [
            [b, c, d],
            [g, h, 0],
            [0, g, h]
        ];
    }
    else if (fnzX === 2 && fnzY === 0) {
        return false;
        // Below just kept for the sake of symmetry
        /*
        S = [
            [h,0],
            [0,h]
        ];
        */
    }
    else if (fnzX === 2 && fnzY === -1) {
        // This is a cubic curve that 'loops' back on itself - it degenrates into
        // a self-overlapping line. The point may be on the curve?.
        return true;
    }
    else if (fnzX === 1 && fnzY === 1) {
        // x(t) is a line, y(t) is also a line
        S = [
            [c, d],
            [g, h]
        ];
    }
    else if (fnzX === 1 && fnzY === 0) {
        // x(t) is a line, y(t) === d
        // This degenerates into the line y(x) === d
        return false;
        //S = [[h]];
    }
    else if (fnzX === 1 && fnzY === -1) {
        // x(t) is a line, y(t) === 0
        // This is a line y(x) === 0. The point is on the curve.
        return true;
    }
    else if (fnzX === 0 && fnzY === 0) {
        // x(t) is a constant !== 0, y(t) is a constant !== 0
        // This is a bezier degenerated into a point
        return false;
    }
    else if (fnzX === 0 && fnzY === -1) {
        // x(t) is a constant !== 0, y(t) === 0
        // This is also a bezier degenerated into a point
        return false;
    }
    else if (fnzX === -1 && fnzY === -1) {
        // x(t) === 0, y(t) === 0
        // This is also a bezier degenerated into a point, but the point is
        // identical to the input point!
        return true;
    }
    let detS = det_naive_1.detSlowExact(S.map(row => row.map(x => [x])));
    return detS[detS.length - 1] === 0;
}
exports.isPointOnBezierExtension = isPointOnBezierExtension;
//# sourceMappingURL=is-point-on-bezier-extension.js.map