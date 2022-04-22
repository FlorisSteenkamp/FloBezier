/**
 * Returns the cubic version of the given quadratic bezier curve (by degree
 * elevation).
 *
 * * quadratic bezier curves can always be represented exactly by cubics - the
 * converse is false
 *
 * @param ps a quadratic bezier curve.
 *
 * @internal
 */
declare function quadraticToCubic(ps: number[][]): number[][];
export { quadraticToCubic };
