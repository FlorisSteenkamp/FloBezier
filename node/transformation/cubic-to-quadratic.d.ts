/**
 * Returns the best least squares quadratic bezier approximation to the given
 * cubic bezier.
 * * the two bezier endpoints differ in general
 * @param ps - A cubic bezier curve.
 */
declare function cubicToQuadratic(ps: number[][]): number[][];
export { cubicToQuadratic };
