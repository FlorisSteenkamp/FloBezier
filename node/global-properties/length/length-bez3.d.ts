/**
 * Returns the curve length of the given cubic bezier curve within the
 * specified parameter interval.
 *
 * @param interval the paramter interval over which the length is
 * to be calculated (often `[0,1]`)
 * @param ps a cubic bezier curve given by an ordered array of its control
 * points, e.g. `[[0,0],[1,1],[2,1],[3,3]]`
 * @param maxCurviness optional maximum 'curviness' (defined as the total angle
 * change between consecutive line segments between the curve control points)
 * before subdivision occurs; defaults to 0.4 radians
 * @param gaussOrder the optional order of the Gaussian Quadrature performed
 * between curve segments; defaults to 16; can be 4,16 or 64
 *
 * @internal
 */
declare function lengthBez3(interval: number[], ps: number[][], maxCurviness?: number, gaussOrder?: 4 | 16 | 64): number;
export { lengthBez3 };
