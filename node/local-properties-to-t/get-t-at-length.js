"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTAtLength = void 0;
const to_cubic_1 = require("../transformation/degree-or-type/to-cubic");
const length_1 = require("../global-properties/length/length");
const flo_poly_1 = require("flo-poly");
function getTAtLength(ps, s) {
    let ps_ = to_cubic_1.toCubic(ps);
    const lenAtT = (t) => length_1.length([0, t], ps_);
    function f(s) {
        return flo_poly_1.brent(t => (lenAtT(t) - s), -0.1, 1.1);
    }
    // Curry
    return s === undefined ? f : f(s);
}
exports.getTAtLength = getTAtLength;
//# sourceMappingURL=get-t-at-length.js.map