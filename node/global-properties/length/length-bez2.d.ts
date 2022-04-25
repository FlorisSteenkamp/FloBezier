/**
 * Returns the curve length in the specified interval.
 *
 * @param ps A quadratic bezier, e.g. [[0,0],[1,1],[2,1]]
 * @param interval The paramter interval over which the length is
 * to be calculated (often === [0,1]).
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
