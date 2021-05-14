/**
 * Returns the best least squares quadratic bezier approximation to the given
 * cubic bezier.
 * * the input and output bezier endpoints will differ in general
 *
 * @param ps - A cubic bezier curve.
 *
 * @doc
 */
declare function cubicToQuadratic(ps: number[][]): number[][];
export { cubicToQuadratic };
