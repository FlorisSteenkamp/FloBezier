"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromPowerBases = void 0;
/**
 * Returns the approximate Bernstein basis representation of a line, quadratic
 * or cubic bezier's power bases.
 *
 * @param cs An order 1, 2 or 3 parametric curve in power bases with the
 * x-coordinate coefficients given first as an array representing the polynomial
 * in the parameter from highest to lowest order, e.g. [[1,2,3,4], [5,6,7,8]]
 * represents a cubic parametric curve.
 */
function fromPowerBases(cs) {
    if (cs[0].length === 4) {
        let [[a3, a2, a1, a0], [b3, b2, b1, b0]] = cs;
        return [
            [a0 + a1 + a2 + a3,
                b0 + b1 + b2 + b3],
            [a0 + 2 * a1 / 3 + a2 / 3,
                b0 + 2 * b1 / 3 + b2 / 3],
            [a0 + a1 / 3,
                b0 + b1 / 3],
            [a0,
                b0]
        ];
    }
    else if (cs.length === 3) {
        let [[a2, a1, a0], [b2, b1, b0]] = cs;
        return [
            [a0 + a1 + a2,
                b0 + b1 + b2,],
            [a0 + a1 / 2,
                b0 + b1 / 2],
            [a0,
                b0]
        ];
    }
    else if (cs.length === 2) {
        let [[a1, a0], [b1, b0]] = cs;
        return [
            [a0 + a1,
                b0 + b1],
            [a0,
                b0]
        ];
    }
}
exports.fromPowerBases = fromPowerBases;
//# sourceMappingURL=from-power-bases.js.map