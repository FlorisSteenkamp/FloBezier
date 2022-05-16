/**
 * Evaluates and returns the result of evaluating the given implicit function
 * (a degree 3 bivariate polynomial in `x` and `y`) at the point `[x,y]`.
 *
 * * the implicit form is given by: `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v`,
 * where the `vₓ`, `vₓ`, `v`, etc are constants
 *
 * @example
 * ```typescript
 * evaluateImplicit3({ vₓₓₓ: -1, vₓₓᵧ: -2, vₓᵧᵧ: -3, vᵧᵧᵧ: -4, vₓₓ: 4, vₓᵧ: 5, vᵧᵧ: 6, vₓ: 1, vᵧ: 2, v: 3 }, 7, -4);  //=> 123
 * ```
 *
 * @param cs the polynomial to evaluate
 * @param x the `x` variable at which to evaluate
 * @param y the `y` variable at which to evaluate
 *
 * @doc
 */
function evaluateImplicit3(cs, x, y) {
    const { vₓₓₓ, vₓₓᵧ, vₓᵧᵧ, vᵧᵧᵧ, vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v } = cs;
    return (vₓₓₓ * x * x * x +
        vₓₓᵧ * x * x * y +
        vₓᵧᵧ * x * y * y +
        vᵧᵧᵧ * y * y * y +
        vₓₓ * x * x +
        vₓᵧ * x * y +
        vᵧᵧ * y * y +
        vₓ * x +
        vᵧ * y +
        v);
}
export { evaluateImplicit3 };
//# sourceMappingURL=evaluate-implicit3.js.map