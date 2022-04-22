/**
 * Returns a bezier curve that starts and ends at the given `t` parameters
 * including an error bound (that needs to be multiplied by `3u`, where
 * `u === Number.EPSILON/2`).
 *
 * @param ps a linear bezier curve (a line)
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 *
 * @internal
 */
declare function fromTo1(ps: number[][], tS: number, tE: number): {
    ps: number[][];
    _ps: number[][];
};
export { fromTo1 };
