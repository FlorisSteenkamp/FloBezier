/**
 * TODO - replace this function with a more sane version where total curvature
 * is tallied by looking for inflection points and adding curvature over those
 * pieces by looking at tangent at beginning and end of the pieces.
 * Returns the total absolute curvature of the bezier over [0,1] using Gaussian
 * Quadrature integration with 16 wieghts and abscissas which is generally very
 * accurate and fast. Returns the result in radians.
 * @param ps - A cubic bezier
 * @param interval
 */
declare function totalAbsoluteCurvature(ps: number[][], interval: number[]): number;
declare function totalAbsoluteCurvature(ps: number[][]): (interval: number[]) => number;
/**
 * Returns the total curvature of the bezier over the given interval using
 * Gaussian Quadrature integration with 16 wieghts and abscissas which is
 * generally very accurate and fast. This function is curried.
 * @param ps - A cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval - The interval of integration (often === [0,1])
 * @returns The total curvature.
 */
declare function totalCurvature(ps: number[][], interval: number[]): number;
declare function totalCurvature(ps: number[][]): (interval: number[]) => number;
export { totalCurvature, totalAbsoluteCurvature };
