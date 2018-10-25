"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_memoize_1 = require("flo-memoize");
const memoize = flo_memoize_1.default.m1;
/**
 * Returns the power basis representation of the bezier's x-coordinates.
 * This function is memoized on its points parameter by object reference.
 * @param ps - A quadratic bezier, e.g. [[0,0],[1,1],[2,1]]
 * @returns The power basis polynomial from highest power to lowest,
 * e.g. at^2 + bt + c is returned as [a,b,c]
 */
let getX2 = memoize(function (ps) {
    let [[x0,], [x1,], [x2,]] = ps;
    return [
        x2 - 2 * x1 + x0,
        2 * x1 - 2 * x0,
        x0,
    ];
});
exports.getX2 = getX2;
//# sourceMappingURL=get-x2.js.map