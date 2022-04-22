/**
 * Returns a bezier curve that starts and ends at the given t parameters
 * including an error bound (that needs to be multiplied by `9u`, where
 * `u === Number.EPSILON/2`).
 *
 * @param ps a cubic bezier curve
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 *
 * @internal
 */
declare function fromTo3(ps: number[][], tS: number, tE: number): {
    ps: number[][];
    _ps: number[][];
};
export { fromTo3 };
