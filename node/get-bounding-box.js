"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_memoize_1 = require("flo-memoize");
const get_bounds_1 = require("./get-bounds");
/**
 * Returns the axis-aligned bounding box of a given bezier.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns the axis-aligned bounding box in the form
 * [[minx, miny], [maxx,maxy]
 */
let getBoundingBox = flo_memoize_1.memoize(function (ps) {
    return get_bounds_1.getBounds(ps).box;
});
exports.getBoundingBox = getBoundingBox;
//# sourceMappingURL=get-bounding-box.js.map