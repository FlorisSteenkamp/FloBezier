/**
 * Returns a bezier curve that starts and ends at the given `t` parameters
 * including an error bound (that needs to be multiplied by `5u`, where
 * `u === Number.EPSILON/2`).
 *
 * @param ps a quadratic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1]]`
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 *
 * @internal
 */
declare function fromTo2InclErrorBound(ps: number[][], tS: number, tE: number): {
    ps: number[][];
    _ps: number[][];
};
export { fromTo2InclErrorBound };
