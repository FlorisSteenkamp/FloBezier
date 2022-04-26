/**
 * Returns the curve length of the given line within the specified parameter
 * interval.
 *
 * @param interval the paramter interval over which the length is
 * to be calculated (often `[0,1]`)
 * @param ps a linear bezier curve given by an ordered array of its control
 * points, e.g. `[[0,0],[1,1]]`
 *
 * @internal
 */
declare function lengthBez1(interval: number[], ps: number[][]): number;
export { lengthBez1 };
