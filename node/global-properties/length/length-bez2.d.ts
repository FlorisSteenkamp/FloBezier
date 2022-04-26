/**
 * Returns the curve length of the given quadratic bezier curve within the
 * specified parameter interval.
 *
 * @param interval the paramter interval over which the length is
 * to be calculated (often `[0,1]`)
 * @param ps a quadratic bezier curve given by an ordered array of its control
 * points, e.g. `[[0,0],[1,1],[2,1]]`
 * @param maxCurviness optional maximum 'curviness' (defined as the total angle
 * change between consecutive line segments between the curve control points)
 * before subdivision occurs; defaults to 0.4 radians
 * @param gaussOrder the optional order of the Gaussian Quadrature performed
 * between curve segments; defaults to 16; can be 4,16 or 64
 *
 * @internal
 */
declare function lengthBez2(interval: number[], ps: number[][], maxCurviness?: number, gaussOrder?: 4 | 16 | 64): number;
/**
 * Returns the curve length in the specified interval.
 *
 * * unused because it is not numerically stable in its current form.
 *
 * See https://gist.github.com/tunght13488/6744e77c242cc7a94859
 *
 * @param ps - A quadratic bezier, e.g. [[0,0],[1,1],[2,1]]
 * @param interval - The paramter interval over which the length is
 * to be calculated (often === [0,1]).
 */
export { lengthBez2 };
