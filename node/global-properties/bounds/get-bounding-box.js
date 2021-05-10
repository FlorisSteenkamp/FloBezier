"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBoundingBox = void 0;
const get_bounds_1 = require("./get-bounds");
/**
 * Returns an axis-aligned bounding box of the given order 1, 2 or 3 bezier
 * curve given as an array of 2 points, e.g. `[[1,2], [3,4]]`.
 *
 * * **certified:** the box is guaranteed to engulf the given bezier curve.
 *
 * * returns the axis-aligned bounding box in the form `[[minX, minY], [maxX, maxY]`
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
// TODO - why not just use getIntervalBox
function getBoundingBox(ps) {
    const xBounds = get_bounds_1.getXBoundsTight(ps);
    const yBounds = get_bounds_1.getYBoundsTight(ps);
    return [
        [xBounds.minX.box[0][0], yBounds.minY.box[0][1]],
        [xBounds.maxX.box[1][0], yBounds.maxY.box[1][1]]
    ];
}
exports.getBoundingBox = getBoundingBox;
//# sourceMappingURL=get-bounding-box.js.map