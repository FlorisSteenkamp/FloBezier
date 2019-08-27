"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const evaluate_1 = require("./evaluate/evaluate");
const split_at_1 = require("./split-at");
/**
 * Returns a bezier curve that starts at the given curve and ends at the
 * given t parameter. Uses de Casteljau's algorithm.
 *
 * A loose bound on the accuracy of the resultant points is given by:
 * |δP| = 2*2n*max_k(|b_k|)η, where n = 3 (for a cubic), b_k are the control
 * points and η is Number.EPSILON.
 * @param ps - A cubic bezier curve
 * @param t1 - The t parameter where the resultant bezier should start
 * @param t2 - The t parameter where the resultant bezier should end
 */
function fromTo(ps) {
    return function (t1, t2) {
        let reverse = t1 > t2;
        if (t1 > t2) {
            [t1, t2] = [t2, t1];
        }
        let ps_;
        if (t1 === 0 && t2 === 1) {
            ps_ = ps;
        }
        else if (t1 === 0) {
            ps_ = split_at_1.splitAt(ps, t2)[0];
        }
        else if (t2 === 1) {
            ps_ = split_at_1.splitAt(ps, t1)[1];
        }
        else if (t1 === t2) {
            // Degenerate case
            let p = evaluate_1.evaluate(ps, t1);
            if (ps.length === 2) {
                return [p, p];
            }
            if (ps.length === 3) {
                return [p, p, p];
            }
            if (ps.length === 4) {
                return [p, p, p, p];
            }
        }
        else {
            ps_ = split_at_1.splitAt(split_at_1.splitAt(ps, t1)[1], (t2 - t1) / (1 - t1))[0];
        }
        return reverse ? ps_.slice().reverse() : ps_;
    };
}
exports.fromTo = fromTo;
/**
 * Returns a bezier curve that starts at the given curve and ends at the
 * given t parameter. Uses de Casteljau's algorithm.
 *
 * A loose bound on the accuracy of the resultant points is given by:
 * |δP| = 2*2n*max_k(|b_k|)η, where n = 3 (for a cubic), b_k are the control
 * points and η is Number.EPSILON.
 * @param ps - A cubic bezier curve
 * @param t1 - The t parameter where the resultant bezier should start
 * @param t2 - The t parameter where the resultant bezier should end
 */
function fromToPrecise(ps) {
    return function (t1, t2) {
        let reverse = t1 > t2;
        if (t1 > t2) {
            [t1, t2] = [t2, t1];
        }
        let ps_;
        if (t1 === 0 && t2 === 1) {
            ps_ = ps;
        }
        else if (t1 === 0) {
            ps_ = split_at_1.splitAtPrecise(ps, t2)[0];
        }
        else if (t2 === 1) {
            ps_ = split_at_1.splitAtPrecise(ps, t1)[1];
        }
        else if (t1 === t2) {
            // Degenerate case
            let p = evaluate_1.evaluate(ps, t1);
            if (ps.length === 2) {
                return [p, p];
            }
            if (ps.length === 3) {
                return [p, p, p];
            }
            if (ps.length === 4) {
                return [p, p, p, p];
            }
        }
        else {
            ps_ = split_at_1.splitAtPrecise(split_at_1.splitAtPrecise(ps, t1)[1], (t2 - t1) / (1 - t1))[0];
        }
        return reverse ? ps_.slice().reverse() : ps_;
    };
}
exports.fromToPrecise = fromToPrecise;
//# sourceMappingURL=from-to.js.map