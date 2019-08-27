"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns the polynomial whose roots are all the t values on the given bezier
 * curve such that the line from the given point to the point on the bezier
 * evaluated at t is tangent to the bezier at t.
 * @param ps An order 1, 2 or 3 bezier curve given by its control points.
 * @param p
 */
function getTangentPolyFromPoint(ps, p) {
    if (ps.length === 4) {
        return getPolyForCubic(ps, p);
    }
    else if (ps.length === 3) {
        return getPolyForQuadratic(ps, p);
    }
    else if (ps.length === 2) {
        return getPolyForLine(ps, p);
    }
}
exports.getTangentPolyFromPoint = getTangentPolyFromPoint;
function getPolyForCubic(ps, p) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    let [xp, yp] = p;
    let xx0 = x0 - xp;
    let xx1 = x1 - xp;
    let xx2 = x2 - xp;
    let xx3 = x3 - xp;
    let yy0 = y0 - yp;
    let yy1 = y1 - yp;
    let yy2 = y2 - yp;
    let yy3 = y3 - yp;
    let x00 = xx0 * xx0;
    let x01 = 6 * xx0 * xx1;
    let x02 = 6 * xx0 * xx2;
    let x03 = 2 * xx0 * xx3;
    let x11 = 9 * xx1 * xx1;
    let x12 = 18 * xx1 * xx2;
    let x13 = 6 * xx1 * xx3;
    let x22 = 9 * xx2 * xx2;
    let x23 = 6 * xx2 * xx3;
    let x33 = xx3 * xx3;
    let y00 = yy0 * yy0;
    let y01 = 6 * yy0 * yy1;
    let y02 = 6 * yy0 * yy2;
    let y03 = 2 * yy0 * yy3;
    let y11 = 9 * yy1 * yy1;
    let y12 = 18 * yy1 * yy2;
    let y13 = 6 * yy1 * yy3;
    let y22 = 9 * yy2 * yy2;
    let y23 = 6 * yy2 * yy3;
    let y33 = yy3 * yy3;
    let t5 = 6 * ((x33 - x23 + x13 - x03 + x22 - x12 + x02 + x11 - x01 + x00) +
        (y33 - y23 + y13 - y03 + y22 - y12 + y02 + y11 - y01 + y00));
    let t4 = 5 * ((x23 - 2 * x13 + 3 * x03 - 2 * x22 + 3 * x12 - 4 * x02 - 4 * x11 + 5 * x01 - 6 * x00) +
        (y23 - 2 * y13 + 3 * y03 - 2 * y22 + 3 * y12 - 4 * y02 - 4 * y11 + 5 * y01 - 6 * y00));
    let t3 = 4 * ((x13 - 3 * x03 + x22 - 3 * x12 + 6 * x02 + 6 * x11 - 10 * x01 + 15 * x00) +
        (y13 - 3 * y03 + y22 - 3 * y12 + 6 * y02 + 6 * y11 - 10 * y01 + 15 * y00));
    let t2 = 3 * ((x03 + x12 - 4 * x02 - 4 * x11 + 10 * x01 - 20 * x00) +
        (y03 + y12 - 4 * y02 - 4 * y11 + 10 * y01 - 20 * y00));
    let t1 = 2 * ((x02 + x11 - 5 * x01 + 15 * x00) +
        (y02 + y11 - 5 * y01 + 15 * y00));
    let t0 = ((x01 - 6 * x00) +
        (y01 - 6 * y00));
    return [t5, t4, t3, t2, t1, t0];
}
function getPolyForQuadratic(ps, p) {
    let [[x0, y0], [x1, y1], [x2, y2]] = ps;
    let [xp, yp] = p;
    let xx0 = x0 - xp;
    let xx1 = x1 - xp;
    let xx2 = x2 - xp;
    let yy0 = y0 - yp;
    let yy1 = y1 - yp;
    let yy2 = y2 - yp;
    let x00 = 1 * xx0 * xx0;
    let x01 = 1 * xx0 * xx1;
    let x02 = 1 * xx0 * xx2;
    let x11 = 1 * xx1 * xx1;
    let x12 = 1 * xx1 * xx2;
    let x22 = 1 * xx2 * xx2;
    let y00 = 1 * yy0 * yy0;
    let y01 = 1 * yy0 * yy1;
    let y02 = 1 * yy0 * yy2;
    let y11 = 1 * yy1 * yy1;
    let y12 = 1 * yy1 * yy2;
    let y22 = 1 * yy2 * yy2;
    let t3 = 4 * (y22 + 2 * y02 - 4 * y12 + 4 * y11 - 4 * y01 + y00 +
        x22 + 2 * x02 - 4 * x12 + 4 * x11 - 4 * x01 + x00);
    let t2 = 12 * (y12 - y02 - 2 * y11 + 3 * y01 - y00 +
        x12 - x02 - 2 * x11 + 3 * x01 - x00);
    let t1 = 4 * (y02 + 2 * y11 - 6 * y01 + 3 * y00 +
        x02 + 2 * x11 - 6 * x01 + 3 * x00);
    let t0 = 4 * (y01 - y00 +
        x01 - x00);
    return [t3, t2, t1, t0];
}
function getPolyForLine(ps, p) {
    let [[x0, y0], [x1, y1]] = ps;
    let [xp, yp] = p;
    let xx0 = x0 - xp;
    let xx1 = x1 - xp;
    let yy0 = y0 - yp;
    let yy1 = y1 - yp;
    let x00 = 1 * xx0 * xx0;
    let x01 = 1 * xx0 * xx1;
    let x11 = 1 * xx1 * xx1;
    let y00 = 1 * yy0 * yy0;
    let y01 = 1 * yy0 * yy1;
    let y11 = 1 * yy1 * yy1;
    let t1 = 2 * (y11 - 2 * y01 + y00 + x11 - 2 * x01 + x00);
    let t0 = 2 * (y01 - y00 + x01 - x00);
    return [t1, t0];
}
//# sourceMappingURL=get-tangent-poly-from-point.js.map