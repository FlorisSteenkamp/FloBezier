/**
 * Returns the implicit form (including a coefficientwise error bound) of the
 * given line *relative to its start point*, i.e. of the curve translated
 * so that it starts at the origin (so that the constant coefficient `v` is
 * zero and not returned).
 *
 * * with `a₁ = x₁ - x₀` and `b₁ = y₁ - y₀` the implicit form `vₓx + vᵧy = 0`
 * is given by `vₓ = b₁`, `vᵧ = -a₁`
 * * no translation is actually done (the power basis coefficients, apart from
 * the constant terms, are coordinate differences)
 * * intermediate calculations are done in double-double precision
 * * the error bound returned still needs to be multiplied by `γγ3`
 * * this code was generated (see `research/gen-shared-start.py`)
 *
 * @param ps an order 1 bezier curve given as an ordered array of its control
 * point coordinates
 *
 * @internal
 */
declare function getImplicitForm1AtStartDd(ps: number[][]): {
    coeffs: {
        vₓ: number[];
        vᵧ: number[];
    };
    errorBound: {
        vₓ_: number;
        vᵧ_: number;
    };
};
export { getImplicitForm1AtStartDd };
