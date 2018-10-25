"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_memoize_1 = require("flo-memoize");
/**
 * Returns the power basis representation of the bezier's y-coordinates.
 * This function is memoized on its points parameter by object reference.
 * @param ps - A quadratic bezier, e.g. [[0,0],[1,1],[2,1]]
 */
let getY2 = flo_memoize_1.memoize(function (ps) {
    let [[, y0], [, y1], [, y2]] = ps;
    return [
        y2 - 2 * y1 + y0,
        2 * y1 - 2 * y0,
        y0,
    ];
});
exports.getY2 = getY2;
//# sourceMappingURL=get-y2.js.map