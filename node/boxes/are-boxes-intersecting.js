/**
 * Returns `true` if the 2 given axis-aligned rectangular boxes intersect.
 *
 * * **exact**: not susceptible to floating point round-off
 *
 * @param closed if `true`, interpret boxes as being closed (i.e. they contain
 * their border), otherwise open.
 * @param a an axis-aligned rectangular box (given by an array of two points,
 * e.g. `[[1,2], [3,4]]`)
 * @param b another axis-aligned rectangular box
 *
 * @doc mdx
 */
function areBoxesIntersecting(closed, a, b) {
    let [[ax0, ay0], [ax1, ay1]] = a;
    let [[bx0, by0], [bx1, by1]] = b;
    // Swap so smaller coordinate comes first
    if (ay0 > ay1) {
        [ay0, ay1] = [ay1, ay0];
    }
    ;
    if (by0 > by1) {
        [by0, by1] = [by1, by0];
    }
    ;
    if (ax0 > ax1) {
        [ax0, ax1] = [ax1, ax0];
    }
    ;
    if (bx0 > bx1) {
        [bx0, bx1] = [bx1, bx0];
    }
    ;
    return closed
        ? ax0 <= bx1 && ax1 >= bx0 &&
            by0 <= ay1 && by1 >= ay0
        : ax0 < bx1 && ax1 > bx0 &&
            by0 < ay1 && by1 > ay0;
}
export { areBoxesIntersecting };
//# sourceMappingURL=are-boxes-intersecting.js.map