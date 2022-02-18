/**
 * Returns a bezier curve that starts and ends at the given `t` parameters
 * including an error bound (that needs to be multiplied by `3u`, `5u` or `8u`
 * (for lines, quadratic or cubic bezier curves respectively),
 * where `u === Number.EPSILON/2`).
 *
 * @param ps a bezier curve of order 0,1,2 or 3
 * @param tS the `t` parameter where the resultant bezier should start
 * @param tE the `t` parameter where the resultant bezier should end
 *
 * @doc
 */
declare function fromTo(ps: number[][], tS: number, tE: number): {
    ps: number[][];
    _ps: number[][];
};
export { fromTo };
