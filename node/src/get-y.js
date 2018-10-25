"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_memoize_1 = require("flo-memoize");
/**
 * Returns the power basis representation of the bezier's y-coordinates.
 * This function is memoized on its points parameter by object reference.
 * @param ps - A bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 */
let getY = flo_memoize_1.memoize(function (ps) {
    let [[, y0], [, y1], [, y2], [, y3]] = ps;
    return [
        y3 - 3 * y2 + 3 * y1 - y0,
        3 * y2 - 6 * y1 + 3 * y0,
        3 * y1 - 3 * y0,
        y0,
    ];
});
exports.getY = getY;
//# sourceMappingURL=get-y.js.map