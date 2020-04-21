"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_numerical_1 = require("flo-numerical");
function evaluate(ps, t) {
    const len = ps.length;
    return t === undefined ? f : f(t);
    function f(t) {
        if (t === 0) {
            return ps[0];
        }
        else if (t === 1) {
            return ps[len - 1];
        }
        let s = 1 - t;
        if (ps.length === 4) {
            // cubic
            let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
            let x = x0 * Math.pow(s, 3) + 3 * x1 * Math.pow(s, 2) * t + 3 * x2 * s * Math.pow(t, 2) + x3 * Math.pow(t, 3);
            let y = y0 * Math.pow(s, 3) + 3 * y1 * Math.pow(s, 2) * t + 3 * y2 * s * Math.pow(t, 2) + y3 * Math.pow(t, 3);
            return [x, y];
        }
        if (ps.length === 3) {
            // quadratic
            let [[x0, y0], [x1, y1], [x2, y2]] = ps;
            let x = x0 * Math.pow(s, 2) + 2 * x1 * s * t + x2 * Math.pow(t, 2);
            let y = y0 * Math.pow(s, 2) + 2 * y1 * s * t + y2 * Math.pow(t, 2);
            return [x, y];
        }
        if (ps.length === 2) {
            // line
            let [[x0, y0], [x1, y1]] = ps;
            let x = x0 * s + x1 * t;
            let y = y0 * s + y1 * t;
            return [x, y];
        }
    }
}
exports.evaluate = evaluate;
function evaluateExact(ps, t) {
    const len = ps.length;
    if (t === 0) {
        return ps[0].map(c => [c]);
    }
    else if (t === 1) {
        return ps[len - 1].map(c => [c]);
    }
    let s = 1 - t;
    let s2 = flo_numerical_1.twoProduct(s, s);
    let s3 = flo_numerical_1.scaleExpansion(s2, s);
    let t2 = flo_numerical_1.twoProduct(t, t);
    let t3 = flo_numerical_1.scaleExpansion(t2, t);
    if (ps.length === 4) {
        // cubic
        let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
        //let x = x0*s3 + 3*x1*s2*t + 3*x2*s*t2 + x3*t3;
        //let y = y0*s3 + 3*y1*s2*t + 3*y2*s*t2 + y3*t3;
        let x = flo_numerical_1.calculateSum([
            flo_numerical_1.scaleExpansion(s3, x0),
            flo_numerical_1.expansionProduct(flo_numerical_1.scaleExpansion(flo_numerical_1.twoProduct(3, x1), t), s2),
            flo_numerical_1.expansionProduct(flo_numerical_1.scaleExpansion(flo_numerical_1.twoProduct(3, x2), s), t2),
            flo_numerical_1.scaleExpansion(t3, x3)
        ]);
        let y = flo_numerical_1.calculateSum([
            flo_numerical_1.scaleExpansion(s3, y0),
            flo_numerical_1.expansionProduct(flo_numerical_1.scaleExpansion(flo_numerical_1.twoProduct(3, y1), t), s2),
            flo_numerical_1.expansionProduct(flo_numerical_1.scaleExpansion(flo_numerical_1.twoProduct(3, y2), s), t2),
            flo_numerical_1.scaleExpansion(t3, y3)
        ]);
        return [x, y];
    }
    if (ps.length === 3) {
        // quadratic
        let [[x0, y0], [x1, y1], [x2, y2]] = ps;
        //let x = x0*s**2 + 2*x1*s*t + x2*t**2;
        //let y = y0*s**2 + 2*y1*s*t + y2*t**2;
        let x = flo_numerical_1.calculateSum([
            flo_numerical_1.scaleExpansion(s2, x0),
            flo_numerical_1.scaleExpansion(flo_numerical_1.twoProduct(2 * x1, s), t),
            flo_numerical_1.scaleExpansion(t2, x2)
        ]);
        let y = flo_numerical_1.calculateSum([
            flo_numerical_1.scaleExpansion(s2, y0),
            flo_numerical_1.scaleExpansion(flo_numerical_1.twoProduct(2 * y1, s), t),
            flo_numerical_1.scaleExpansion(t2, y2)
        ]);
        return [x, y];
    }
    if (ps.length === 2) {
        // line
        let [[x0, y0], [x1, y1]] = ps;
        let x = flo_numerical_1.fastExpansionSum(flo_numerical_1.twoProduct(x0, s), flo_numerical_1.twoProduct(x1, t));
        let y = flo_numerical_1.fastExpansionSum(flo_numerical_1.twoProduct(y0, s), flo_numerical_1.twoProduct(y1, t));
        ;
        return [x, y];
    }
}
exports.evaluateExact = evaluateExact;
function expEvaluateExact(ps, t) {
    const len = ps.length;
    if (t === 0) {
        return ps[0];
    }
    else if (t === 1) {
        return ps[len - 1];
    }
    let s = 1 - t;
    let s2 = flo_numerical_1.twoProduct(s, s);
    let s3 = flo_numerical_1.scaleExpansion(s2, s);
    let t2 = flo_numerical_1.twoProduct(t, t);
    let t3 = flo_numerical_1.scaleExpansion(t2, t);
    let st = flo_numerical_1.twoProduct(s, t);
    let st2 = flo_numerical_1.scaleExpansion(t2, s);
    let s2t = flo_numerical_1.scaleExpansion(s2, t);
    if (ps.length === 4) {
        // cubic
        let [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps;
        //let x = x0*s3 + 3*x1*s2*t + 3*x2*s*t2 + x3*t3;
        //let y = y0*s3 + 3*y1*s2*t + 3*y2*s*t2 + y3*t3;
        let x = flo_numerical_1.calculate([[x0, s3], [[3], x1, s2, [t]], [[3], x2, [s], t2], [x3, t3]]);
        let y = flo_numerical_1.calculate([[y0, s3], [[3], y1, s2, [t]], [[3], y2, [s], t2], [y3, t3]]);
        return [x, y];
    }
    if (ps.length === 3) {
        // quadratic
        let [[x0, y0], [x1, y1], [x2, y2]] = ps;
        //let x = x0*s**2 + 2*x1*s*t + x2*t**2;
        //let y = y0*s**2 + 2*y1*s*t + y2*t**2;
        let x = flo_numerical_1.calculate([[x0, s2], [x1, [2 * s], [t]], [x2, t2]]);
        let y = flo_numerical_1.calculate([[y0, s2], [y1, [2 * s], [t]], [y2, t2]]);
        return [x, y];
    }
    if (ps.length === 2) {
        // line
        let [[x0, y0], [x1, y1]] = ps;
        let x = flo_numerical_1.fastExpansionSum(flo_numerical_1.scaleExpansion(x0, s), flo_numerical_1.scaleExpansion(x1, t));
        let y = flo_numerical_1.fastExpansionSum(flo_numerical_1.scaleExpansion(y0, s), flo_numerical_1.scaleExpansion(y1, t));
        ;
        return [x, y];
    }
}
exports.expEvaluateExact = expEvaluateExact;
//# sourceMappingURL=evaluate.js.map