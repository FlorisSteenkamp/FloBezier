"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoundingBox = void 0;
const flo_memoize_1 = require("flo-memoize");
const get_bounds_1 = require("./get-bounds");
/**
 * Returns an axis-aligned bounding box of the given order 2,
 * 3 or 4 bezier.
 * * **certified**
 * @param ps A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @returns the axis-aligned bounding box in the form
 * [[minx, miny], [maxx,maxy]
 */
const getBoundingBox = flo_memoize_1.memoize(function getBoundingBox(ps) {
    const xBounds = get_bounds_1.getXBoundsTight(ps);
    const yBounds = get_bounds_1.getYBoundsTight(ps);
    return [
        [xBounds.minX.box[0][0], yBounds.minY.box[0][1]],
        [xBounds.maxX.box[1][0], yBounds.maxY.box[1][1]]
    ];
});
exports.getBoundingBox = getBoundingBox;
//# sourceMappingURL=get-bounding-box.js.map