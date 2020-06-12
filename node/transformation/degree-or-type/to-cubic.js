"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toCubic = void 0;
const linear_to_cubic_1 = require("./linear-to-cubic");
const quadratic_to_cubic_1 = require("./quadratic-to-cubic");
/**
 * Returns a cubic bezier curve that is equivalent to the given linear or
 * quadratic bezier curve. Cubics are just returned unaltered.
 * @param ps An order 1, 2 or 3 bezier curve
 */
function toCubic(ps) {
    if (ps.length === 2) { // Linear
        return linear_to_cubic_1.linearToCubic(ps);
    }
    else if (ps.length === 3) { // Quadratic
        return quadratic_to_cubic_1.quadraticToCubic(ps);
    }
    else if (ps.length === 4) { // Cubic
        return ps;
    }
}
exports.toCubic = toCubic;
//# sourceMappingURL=to-cubic.js.map