/**
 * Returns the implicit form of the given quadratic bezier and a coefficientwise
 * error bound.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * **precondition:** TODO - add underflow / overflow conditions + docs below
 * * intermediate calculations are done in **double** precision and this is
 * reflected in the output error bound (which is approximately
 * `n * Number.EPSILON * the condition number`, where roughly `1 < n < 100` and
 * depends on the specific calculation)
 * * the error bound returned first needs to be scaled by `γ === u/(1 - u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * TODO
 * ```
 * return {
 *      vₓₓ_,  // <5>
 *      vₓᵧ_,  // <5>
 *      vᵧᵧ_,  // <5>
 *      vₓ_,   // <8>
 *      vᵧ_,   // <8>
 *      v_     // <10>
 * }
 * ```
 *
 * @param ps
 *
 * @doc mdx
 */
declare function getImplicitForm2ErrorCounters(ps: number[][]): {
    vₓₓ_: number;
    vₓᵧ_: number;
    vᵧᵧ_: number;
    vₓ_: number;
    vᵧ_: number;
    v_: number;
};
export { getImplicitForm2ErrorCounters };
