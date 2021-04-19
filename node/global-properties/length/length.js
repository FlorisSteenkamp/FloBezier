"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.length = void 0;
const ds_1 = require("../../local-properties-at-t/ds");
const flo_gauss_quadrature_1 = require("flo-gauss-quadrature");
const flo_vector2d_1 = require("flo-vector2d");
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
 * Returns the curve length in the specified interval.
 *
 * @param ps a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval the paramter interval over which the length is to be
 * calculated (often === [0,1]).
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
    const evDs = ds_1.ds(ps);
    return flo_gauss_quadrature_1.gaussQuadrature(evDs, interval);
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
    const evDs = ds_1.ds(ps);
    return flo_gauss_quadrature_1.gaussQuadrature(evDs, interval);
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
//# sourceMappingURL=length.js.map