/**
 * Evaluates and returns the result of evaluating the given implicit function
 * (a degree 1 bivariate polynomial in `x` and `y`) at the point `[x,y]`.
 *
 * * the implicit form is given by: `vₓ*x + vᵧ*y + v`, where the `vₓ`, `vₓ`, `v`,
 * etc are constants
 *
 * @example
 * ```typescript
 * evaluateImplicit1({ vₓ: 1, vᵧ: 2, v: 3 }, 1, 1);  //=> 6
 * ```
 *
 * @param cs the polynomial to evaluate
 * @param x the `x` variable at which to evaluate
 * @param y the `y` variable at which to evaluate
 *
 * @doc
 */
function evaluateImplicit1(cs, x, y) {
    const { vₓ, vᵧ, v } = cs;
    return vₓ * x + vᵧ * y + v;
}
export { evaluateImplicit1 };
//# sourceMappingURL=evaluate-implicit1.js.map