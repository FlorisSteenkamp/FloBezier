"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
/**
 * Returns 2 new beziers split at the given t parameter, i.e. for the ranges
 * [0,t] and [t,1].
 * @param ps An order 1, 2 or 3 bezier curve
 * @param t The curve parameter
 */
function splitAt(ps, t) {
    if (ps.length === 2) {
        return splitLineAt(ps, t);
    }
    else if (ps.length === 3) {
        return splitQuadAt(ps, t);
    }
    else if (ps.length === 4) {
        return splitCubicAt(ps, t);
    }
    return [];
}
exports.splitAt = splitAt;
/**
 * Returns 2 new beziers split at the given t parameter, i.e. for the ranges
 * [0,t] and [t,1].
 *
 * The result is precise, i.e. each returned coordinate is rounded to the
 * nearest ulp (unit in the last place)
 *
 * @param ps An order 1, 2 or 3 bezier curve
 * @param t The curve parameter
 */
function splitAtPrecise(ps, t) {
    if (ps.length === 2) {
        return splitLineAtPrecise(ps, t);
    }
    else if (ps.length === 3) {
        return splitQuadAtPrecise(ps, t);
    }
    else if (ps.length === 4) {
        return splitCubicAtPrecise(ps, t);
    }
    return [];
}
exports.splitAtPrecise = splitAtPrecise;
/**
 * Returns 2 new cubic beziers split at the given t parameter, i.e. for the ranges
 * [0,t] and [t,1]. Uses de Casteljau's algorithm.
 *
 * A loose bound on the accuracy of the resultant points is given by:
 * |δP| = 2n*max_k(|b_k|)η, where n = 3 (cubic), b_k are the control points
 * and η is Number.EPSILON.
 * @param ps A cubic bezier curve
 * @param t The t parameter where the curve should be split
 */
function splitCubicAt(ps, t) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    let s = 1 - t;
    /** The split point */
    let p = [
        x3 * Math.pow(t, 3) + 3 * x2 * s * Math.pow(t, 2) + 3 * x1 * Math.pow(s, 2) * t + x0 * Math.pow(s, 3),
        y3 * Math.pow(t, 3) + 3 * y2 * s * Math.pow(t, 2) + 3 * y1 * Math.pow(s, 2) * t + y0 * Math.pow(s, 3)
    ];
    let ps1 = [
        [x0, y0],
        [x1 * t + x0 * s,
            y1 * t + y0 * s],
        [x2 * Math.pow(t, 2) + 2 * x1 * s * t + x0 * Math.pow(s, 2),
            y2 * Math.pow(t, 2) + 2 * y1 * s * t + y0 * Math.pow(s, 2)],
        p
    ];
    let ps2 = [
        p,
        [x3 * Math.pow(t, 2) + 2 * x2 * t * s + x1 * Math.pow(s, 2),
            y3 * Math.pow(t, 2) + 2 * y2 * t * s + y1 * Math.pow(s, 2)],
        [x3 * t + x2 * s,
            y3 * t + y2 * s],
        [x3, y3]
    ];
    return [ps1, ps2];
}
/**
 * Returns 2 new cubic beziers split at the given t parameter, i.e. for the ranges
 * [0,t] and [t,1]. Uses de Casteljau's algorithm.
 *
 * The result is precise, i.e. each returned coordinate is rounded to the
 * nearest ulp (unit in the last place)
 * @param ps A cubic bezier curve
 * @param t The t parameter where the curve should be split
 */
function splitCubicAtPrecise(ps, t) {
    let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
    let s = 1 - t;
    let s2 = flo_numerical_1.twoProduct(s, s);
    let s3 = flo_numerical_1.scaleExpansion(s2, s);
    let t2 = flo_numerical_1.twoProduct(t, t);
    let t3 = flo_numerical_1.scaleExpansion(t2, t);
    let st = flo_numerical_1.twoProduct(s, t);
    let st2 = flo_numerical_1.scaleExpansion(t2, s);
    let s2t = flo_numerical_1.scaleExpansion(s2, t);
    /** The split point */
    let p = [
        //x3*t**3 + 3*x2*s*t**2 + 3*x1*s**2*t + x0*s**3,
        //y3*t**3 + 3*y2*s*t**2 + 3*y1*s**2*t + y0*s**3
        flo_numerical_1.estimate(flo_numerical_1.calculateSum([
            flo_numerical_1.scaleExpansion(t3, x3),
            flo_numerical_1.scaleExpansion(st2, 3 * x2),
            flo_numerical_1.scaleExpansion(s2t, 3 * x1),
            flo_numerical_1.scaleExpansion(s3, x0)
        ])),
        flo_numerical_1.estimate(flo_numerical_1.calculateSum([
            flo_numerical_1.scaleExpansion(t3, y3),
            flo_numerical_1.scaleExpansion(st2, 3 * y2),
            flo_numerical_1.scaleExpansion(s2t, 3 * y1),
            flo_numerical_1.scaleExpansion(s3, y0)
        ]))
    ];
    let ps1 = [
        [x0, y0],
        [
            //x1*t + x0*s,
            //y1*t + y0*s
            flo_numerical_1.estimate(flo_numerical_1.fastExpansionSum(flo_numerical_1.twoProduct(x1, t), flo_numerical_1.twoProduct(x0, s))),
            flo_numerical_1.estimate(flo_numerical_1.fastExpansionSum(flo_numerical_1.twoProduct(y1, t), flo_numerical_1.twoProduct(y0, s)))
        ],
        [
            //x2*t**2 + 2*x1*s*t + x0*s**2, 
            //y2*t**2 + 2*y1*s*t + y0*s**2
            flo_numerical_1.estimate(flo_numerical_1.calculateSum([
                flo_numerical_1.scaleExpansion(t2, x2),
                flo_numerical_1.scaleExpansion(st, 2 * x1),
                flo_numerical_1.scaleExpansion(s2, x0)
            ])),
            flo_numerical_1.estimate(flo_numerical_1.calculateSum([
                flo_numerical_1.scaleExpansion(t2, y2),
                flo_numerical_1.scaleExpansion(st, 2 * y1),
                flo_numerical_1.scaleExpansion(s2, y0)
            ]))
        ],
        p
    ];
    let ps2 = [
        p,
        [
            //x3*t**2 + 2*x2*t*s + x1*s**2, 
            //y3*t**2 + 2*y2*t*s + y1*s**2
            flo_numerical_1.estimate(flo_numerical_1.calculateSum([
                flo_numerical_1.scaleExpansion(t2, x3),
                flo_numerical_1.scaleExpansion(st, 2 * x2),
                flo_numerical_1.scaleExpansion(s2, x1)
            ])),
            flo_numerical_1.estimate(flo_numerical_1.calculateSum([
                flo_numerical_1.scaleExpansion(t2, y3),
                flo_numerical_1.scaleExpansion(st, 2 * y2),
                flo_numerical_1.scaleExpansion(s2, y1)
            ]))
        ],
        [
            //x3*t + x2*s, 
            //y3*t + y2*s
            flo_numerical_1.estimate(flo_numerical_1.fastExpansionSum(flo_numerical_1.twoProduct(x3, t), flo_numerical_1.twoProduct(x2, s))),
            flo_numerical_1.estimate(flo_numerical_1.fastExpansionSum(flo_numerical_1.twoProduct(y3, t), flo_numerical_1.twoProduct(y2, s))),
        ],
        [x3, y3]
    ];
    return [ps1, ps2];
}
function splitQuadAt(ps, t) {
    let [[x0, y0], [x1, y1], [x2, y2]] = ps;
    let s = 1 - t;
    /** The split point */
    let p = [
        x0 * Math.pow(s, 2) + 2 * x1 * s * t + x2 * Math.pow(t, 2),
        y0 * Math.pow(s, 2) + 2 * y1 * s * t + y2 * Math.pow(t, 2)
    ];
    let ps1 = [
        [x0, y0],
        [x0 * s + x1 * t,
            y0 * s + y1 * t],
        p
    ];
    let ps2 = [
        p,
        [x1 * s + x2 * t,
            y1 * s + y2 * t],
        [x2, y2]
    ];
    return [ps1, ps2];
}
/**
 *
 * @param ps
 * @param t
 */
function splitQuadAtPrecise(ps, t) {
    let [[x0, y0], [x1, y1], [x2, y2]] = ps;
    let s = 1 - t;
    let t2 = flo_numerical_1.twoProduct(t, t);
    let s2 = flo_numerical_1.twoProduct(s, s);
    let st = flo_numerical_1.twoProduct(s, t);
    /** The split point */
    let p = [
        //x0*s**2 + 2*x1*s*t + x2*t**2,
        //y0*s**2 + 2*y1*s*t + y2*t**2
        flo_numerical_1.estimate(flo_numerical_1.calculateSum([
            flo_numerical_1.scaleExpansion(s2, x0),
            flo_numerical_1.scaleExpansion(st, 2 * x1),
            flo_numerical_1.scaleExpansion(t2, x2)
        ])),
        flo_numerical_1.estimate(flo_numerical_1.calculateSum([
            flo_numerical_1.scaleExpansion(s2, y0),
            flo_numerical_1.scaleExpansion(st, 2 * y1),
            flo_numerical_1.scaleExpansion(t2, y2)
        ]))
    ];
    let ps1 = [
        [x0, y0],
        [
            //x0*s + x1*t, 
            //y0*s + y1*t
            flo_numerical_1.estimate(flo_numerical_1.fastExpansionSum(flo_numerical_1.twoProduct(x0, s), flo_numerical_1.twoProduct(x1, t))),
            flo_numerical_1.estimate(flo_numerical_1.fastExpansionSum(flo_numerical_1.twoProduct(y0, s), flo_numerical_1.twoProduct(y1, t))),
        ],
        p
    ];
    let ps2 = [
        p,
        [
            //x1*s + x2*t, 
            //y1*s + y2*t
            flo_numerical_1.estimate(flo_numerical_1.fastExpansionSum(flo_numerical_1.twoProduct(x1, s), flo_numerical_1.twoProduct(x2, t))),
            flo_numerical_1.estimate(flo_numerical_1.fastExpansionSum(flo_numerical_1.twoProduct(y1, s), flo_numerical_1.twoProduct(y2, t))),
        ],
        [x2, y2]
    ];
    return [ps1, ps2];
}
function splitLineAt(ps, t) {
    let [[x0, y0], [x1, y1]] = ps;
    let s = 1 - t;
    /** The split point */
    let p = [
        s * x0 + t * x1,
        s * y0 + t * y1
    ];
    let ps1 = [
        [x0, y0],
        p
    ];
    let ps2 = [
        p,
        [x1, y1]
    ];
    return [ps1, ps2];
}
/**
 *
 * @param ps
 * @param t
 */
function splitLineAtPrecise(ps, t) {
    let [[x0, y0], [x1, y1]] = ps;
    let s = 1 - t;
    /** The split point */
    let p = [
        //s*x0 + t*x1,
        //s*y0 + t*y1
        flo_numerical_1.estimate(flo_numerical_1.fastExpansionSum(flo_numerical_1.twoProduct(s, x0), flo_numerical_1.twoProduct(t, x1))),
        flo_numerical_1.estimate(flo_numerical_1.fastExpansionSum(flo_numerical_1.twoProduct(s, y0), flo_numerical_1.twoProduct(t, y1)))
    ];
    let ps1 = [
        [x0, y0],
        p
    ];
    let ps2 = [
        p,
        [x1, y1]
    ];
    return [ps1, ps2];
}
//# sourceMappingURL=split-at.js.map