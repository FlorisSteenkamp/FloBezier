/**
 * Returns the curve length of the given quadratic bezier curve within the
 * specified parameter interval.
 *
 * * calculated using the closed form expression for the arc length of a
 * parabola (evaluated in a numerically stable way so that the result is
 * accurate to within a few ulps for all inputs, including degenerate cases
 * such as collinear control points, very short intervals, etc.)
 *
 * @param interval the paramter interval over which the length is
 * to be calculated (often `[0,1]`)
 * @param ps a quadratic bezier curve given by an ordered array of its control
 * points, e.g. `[[0,0],[1,1],[2,1]]`
 *
 * @internal
 */
declare function lengthBez2(interval: number[], ps: number[][]): number;
export { lengthBez2 };
