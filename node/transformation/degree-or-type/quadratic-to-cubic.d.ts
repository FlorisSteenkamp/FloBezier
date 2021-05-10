/**
 * Returns the cubic version of the given quadratic bezier curve. Quadratic
 * bezier curves can always be represented by cubics - the converse is false.
 *
 * @param ps a quadratic bezier curve.
 *
 * @doc
 */
declare function quadraticToCubic(ps: number[][]): number[][];
export { quadraticToCubic };
