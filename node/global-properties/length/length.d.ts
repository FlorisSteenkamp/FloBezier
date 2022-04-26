/**
 * Returns the curve length (for a linear, quadratic or cubic bezier curve) in
 * the specified interval calculated using Gaussian Quadrature *with* adaptive
 * subdivision for improved accuracy.
 *
 * @param interval the paramter interval over which the length is
 * to be calculated (typically `[0,1]`)
 * @param ps an order 0,1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[1,2],[3,4],[5,6],[7,8]]`
 * @param maxCurviness optional maximum 'curviness' (defined as the total angle
 * change between consecutive line segments between the curve control points)
 * before subdivision occurs; defaults to 0.4 radians
 * @param gaussOrder the optional order of the Gaussian Quadrature performed
 * between curve segments; defaults to 16; can be 4,16 or 64
 *
 * @doc mdx
 */
declare function length(interval: number[], ps: number[][], maxCurviness?: number, gaussOrder?: 4 | 16 | 64): number;
export { length };
