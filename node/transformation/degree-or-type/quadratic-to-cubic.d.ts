/**
 * Returns the cubic version of the given quadratic bezier curve (by degree
 * elevation).
 *
 * * quadratic bezier curves can always be represented exactly by cubics - the
 * converse is false
 *
 * @param ps an quadratic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @internal
 */
declare function quadraticToCubic(ps: number[][]): number[][];
export { quadraticToCubic };
