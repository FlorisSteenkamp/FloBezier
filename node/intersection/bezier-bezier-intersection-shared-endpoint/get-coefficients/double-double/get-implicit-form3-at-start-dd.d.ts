/**
 * Returns the implicit form (including a coefficientwise error bound) of the
 * given cubic bezier curve *relative to its start point*, i.e. of the curve translated
 * so that it starts at the origin (so that the constant coefficient `v` is
 * zero and not returned).
 *
 * * with the power basis `x(t) - x₀ = a₃t³ + a₂t² + a₁t`,
 * `y(t) - y₀ = b₃t³ + b₂t² + b₁t`, the cross products `×ᵢⱼ = aᵢbⱼ - aⱼbᵢ` and
 * `K = ×₁₃² - ×₁₂×₂₃` the implicit form
 * `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² + vₓᵧxy + vᵧᵧy² + vₓx + vᵧy = 0`
 * is given by
 *   * `vₓₓₓ = b₃³`, `vₓₓᵧ = -3a₃b₃²`, `vₓᵧᵧ = 3a₃²b₃`, `vᵧᵧᵧ = -a₃³`
 *   * `vₓₓ = b₂b₃×₁₃ + (2b₁b₃ - b₂²)×₂₃`
 *   * `vₓᵧ = -(a₂b₃ + a₃b₂)×₁₃ - 2(a₁b₃ + a₃b₁ - a₂b₂)×₂₃`
 *   * `vᵧᵧ = a₂a₃×₁₃ + (2a₁a₃ - a₂²)×₂₃`
 *   * `vₓ = b₁K`, `vᵧ = -a₁K`
 * * no translation is actually done (the power basis coefficients, apart from
 * the constant terms, are coordinate differences)
 * * intermediate calculations are done in double-double precision
 * * the error bound returned still needs to be multiplied by `γγ3`
 * * this code was generated (see `research/gen-shared-start.py`)
 *
 * @param ps an order 3 bezier curve given as an ordered array of its control
 * point coordinates
 *
 * @internal
 */
declare function getImplicitForm3AtStartDd(ps: number[][]): {
    coeffs: {
        vₓₓₓ: number[];
        vₓₓᵧ: number[];
        vₓᵧᵧ: number[];
        vᵧᵧᵧ: number[];
        vₓₓ: number[];
        vₓᵧ: number[];
        vᵧᵧ: number[];
        vₓ: number[];
        vᵧ: number[];
    };
    errorBound: {
        vₓₓₓ_: number;
        vₓₓᵧ_: number;
        vₓᵧᵧ_: number;
        vᵧᵧᵧ_: number;
        vₓₓ_: number;
        vₓᵧ_: number;
        vᵧᵧ_: number;
        vₓ_: number;
        vᵧ_: number;
    };
};
export { getImplicitForm3AtStartDd };
