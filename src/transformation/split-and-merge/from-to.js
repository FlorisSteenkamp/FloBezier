"use strict";
exports.__esModule = true;
exports.fromToPrecise = exports.fromTo = void 0;
var split_at_js_1 = require("./split-at.js");
var eval_de_casteljau_js_1 = require("../../local-properties-at-t/t-to-xy/double/eval-de-casteljau.js");
/**
 * Returns a bezier curve that starts and ends at the given t parameters.
 * Uses de Casteljau's algorithm.
 *
 * A loose bound on the accuracy of the resultant points is given by:
 * |δP| = 2*2n*max_k(|b_k|)η, where n = 3 (for a cubic), b_k are the control
 * points and η is Number.EPSILON.
 *
 * @param ps a cubic bezier curve
 * @param t1 the t parameter where the resultant bezier should start
 * @param t2 the t parameter where the resultant bezier should end
 *
 * @doc
 */
function fromTo(ps) {
    return function (t1, t2) {
        var _a;
        var reverse = t1 > t2;
        if (t1 > t2) {
            _a = [t2, t1], t1 = _a[0], t2 = _a[1];
        }
        var ps_;
        if (t1 === 0 && t2 === 1) {
            ps_ = ps;
        }
        else if (t1 === 0) {
            ps_ = (0, split_at_js_1.splitAt)(ps, t2)[0];
        }
        else if (t2 === 1) {
            ps_ = (0, split_at_js_1.splitAt)(ps, t1)[1];
        }
        else if (t1 === t2) {
            // Degenerate case
            var p = (0, eval_de_casteljau_js_1.evalDeCasteljau)(ps, t1);
            if (ps.length === 1) {
                return [p];
            }
            if (ps.length === 2) {
                return [p, p];
            }
            if (ps.length === 3) {
                return [p, p, p];
            }
            if (ps.length === 4) {
                return [p, p, p, p];
            }
            throw new Error('The given bezier curve is invalid.');
        }
        else {
            ps_ = (0, split_at_js_1.splitAt)((0, split_at_js_1.splitAt)(ps, t1)[1], (t2 - t1) / (1 - t1))[0];
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
        var _a;
        var reverse = t1 > t2;
        if (t1 > t2) {
            _a = [t2, t1], t1 = _a[0], t2 = _a[1];
        }
        var ps_;
        if (t1 === 0 && t2 === 1) {
            ps_ = ps;
        }
        else if (t1 === 0) {
            ps_ = (0, split_at_js_1.splitAtPrecise)(ps, t2)[0];
        }
        else if (t2 === 1) {
            ps_ = (0, split_at_js_1.splitAtPrecise)(ps, t1)[1];
        }
        else if (t1 === t2) {
            // Degenerate case
            var p = (0, eval_de_casteljau_js_1.evalDeCasteljau)(ps, t1);
            if (ps.length === 1) {
                return [p];
            }
            if (ps.length === 2) {
                return [p, p];
            }
            if (ps.length === 3) {
                return [p, p, p];
            }
            if (ps.length === 4) {
                return [p, p, p, p];
            }
            throw new Error('The given bezier curve is invalid.');
        }
        else {
            ps_ = (0, split_at_js_1.splitAtPrecise)((0, split_at_js_1.splitAtPrecise)(ps, t1)[1], (t2 - t1) / (1 - t1))[0];
        }
        return reverse ? ps_.slice().reverse() : ps_;
    };
}
exports.fromToPrecise = fromToPrecise;
