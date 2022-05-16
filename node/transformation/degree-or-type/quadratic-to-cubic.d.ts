/**
 * Returns the cubic version of the given quadratic bezier curve (by degree
 * elevation).
 *
 * * quadratic bezier curves can always be represented exactly by cubics - the
 * converse is false
 *
 * @param ps a quadratic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1]]`
 *
 * @doc mdx
 */
declare function quadraticToCubic(ps: number[][]): number[][];
export { quadraticToCubic };
