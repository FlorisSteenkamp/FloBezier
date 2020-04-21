"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const min = Math.min;
const max = Math.max;
/**
 * Returns the intersection of 2 given axis-aligned rectangular boxes.
 * @param a An axis-aligned rectangular box
 * @param a Another axis-aligned rectangular box
 * * **closed**:  interpret boxes as being closed (i.e. they contain their border).
 */
function intersectBoxes(a, b) {
    let [[ax0, ay0], [ax1, ay1]] = a;
    let [[bx0, by0], [bx1, by1]] = b;
    // Swap so smaller coordinate comes first
    if (ax0 > ax1) {
        [ax0, ax1] = [ax1, ax0];
    }
    ;
    if (bx0 > bx1) {
        [bx0, bx1] = [bx1, bx0];
    }
    ;
    if (ay0 > ay1) {
        [ay0, ay1] = [ay1, ay0];
    }
    ;
    if (by0 > by1) {
        [by0, by1] = [by1, by0];
    }
    ;
    if (!(ax0 <= bx1 && ax1 >= bx0 &&
        by0 <= ay1 && by1 >= ay0)) {
        // they don't intersect
        return undefined;
    }
    return [
        [max(ax0, bx0), max(ay0, by0)],
        [min(ax1, bx1), min(ay1, by1)]
    ];
}
exports.intersectBoxes = intersectBoxes;
//# sourceMappingURL=intersect-boxes.js.map