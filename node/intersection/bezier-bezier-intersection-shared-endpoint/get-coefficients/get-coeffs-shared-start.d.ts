/**
 * Returns the polynomial (in double-double precision, including a
 * coefficientwise error bound, still to be multiplied by `γγ3`, and a function
 * returning the exact polynomial) whose roots are the parameter values of the
 * intersection points of `ps2` with `ps1`, *given that they start at the same
 * point*, with the known root at `t = 0` divided out (twice if the curves are
 * tangent at the shared point), i.e. `f₁(ps2(t))/t` (or `f₁(ps2(t))/t²`)
 * where `f₁` is the implicit form of `ps1`.
 *
 * * the counterpart of [[getCoeffsBezBez]] for curves sharing their start
 * point (see e.g. [[getCoeffsBez3Bez3SharedStartDd]] for details)
 *
 * * **precondition:** `ps1[0]` and `ps2[0]` must be exactly equal
 * * **precondition:** if `tangent` is `true` the `t` coefficient of
 * `f₁(ps2(t))` must be exactly zero (e.g. if the curves are tangent at the
 * shared point)
 *
 * @param ps1 an order 1, 2 or 3 bezier curve
 * @param ps2 an order 1, 2 or 3 bezier curve with `ps2[0]` equal to `ps1[0]`
 * @param tangent if `true` then `t²` is divided out (instead of `t`)
 *
 * @internal
 */
declare function getCoeffsSharedStart(ps1: number[][], ps2: number[][], tangent: boolean): {
    coeffs: number[][];
    errBound: number[];
    getPExact: () => number[][];
};
export { getCoeffsSharedStart };
