/**
 * Returns a bezier curve that starts and ends at the given `t` parameters.
 *
 * @param ps a lineer bezier curve (a line) given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1]]`
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 *
 * @internal
 */
declare function fromTo1(ps: number[][], tS: number, tE: number): number[][];
export { fromTo1 };
