/**
 * Returns the implicit form (including a coefficientwise error bound) of the
 * given quadratic bezier curve *relative to its start point*, i.e. of the curve translated
 * so that it starts at the origin (so that the constant coefficient `v` is
 * zero and not returned).
 *
 * * with the power basis `x(t) - x₀ = a₂t² + a₁t`, `y(t) - y₀ = b₂t² + b₁t` and
 * the cross product `×₁₂ = a₁b₂ - a₂b₁` the implicit form
 * `vₓₓx² + vₓᵧxy + vᵧᵧy² + vₓx + vᵧy = 0` is given by
 *   * `vₓₓ = b₂²`, `vₓᵧ = -2a₂b₂`, `vᵧᵧ = a₂²`
 *   * `vₓ = b₁×₁₂`, `vᵧ = -a₁×₁₂`
 * * no translation is actually done (the power basis coefficients, apart from
 * the constant terms, are coordinate differences)
 * * intermediate calculations are done in double-double precision
 * * the error bound returned still needs to be multiplied by `γγ3`
 * * this code was generated (see `research/gen-shared-start.py`)
 *
 * @param ps an order 2 bezier curve given as an ordered array of its control
 * point coordinates
 *
 * @internal
 */
declare function getImplicitForm2AtStartDd(ps: number[][]): {
    coeffs: {
        vₓₓ: number[];
        vₓᵧ: number[];
        vᵧᵧ: number[];
        vₓ: number[];
        vᵧ: number[];
    };
    errorBound: {
        vₓₓ_: number;
        vₓᵧ_: number;
        vᵧᵧ_: number;
        vₓ_: number;
        vᵧ_: number;
    };
};
export { getImplicitForm2AtStartDd };
