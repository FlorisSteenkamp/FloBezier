/**
 * Returns a clone of the given cubic bezier (with a different reference).
 *
 * @param ps a bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc
 */
declare function clone(ps: number[][]): number[][];
export { clone };
