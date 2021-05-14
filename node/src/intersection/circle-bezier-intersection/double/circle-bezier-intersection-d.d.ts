/**
 * Returns the intersection between a circle and linear, quadratic or cubic bezier
 * curve without taking floating-point round-off into account. For a more precise
 * version use [[circleBezierIntersection]] instead.
 *
 * * an array of intersections are returned each an object containing the bezier
 * curve's parameter `t` value as well as the cartesian point `p` at intersection
 *
 * @param ps linear, quadratic or cubic bezier curve
 * @param circle a circle
 *
 * @doc mdx
 */
declare function circleBezierIntersectionD(circle: {
    center: number[];
    radius: number;
}, ps: number[][]): {
    t: number;
    p: number[];
}[];
export { circleBezierIntersectionD };
