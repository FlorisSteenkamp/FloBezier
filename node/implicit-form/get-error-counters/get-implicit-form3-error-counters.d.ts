/**
 * Returns the implicit form of the given cubic bezier and a coefficientwise
 * error bound.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * **precondition:** TODO - add underflow / overflow conditions + docs below
 * * intermediate calculations are done in **double** precision and this is
 * reflected in the output error bound (which is approximately
 * `n * Number.EPSILON * the condition number`, where roughly `1 < n < 100` and
 * depends on the specific calculation)
 * * the error bound returned first needs to be scaled by `γ === u/(1 - u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * * takes about 1.2 micro-seconds on a 3rd gen i7 and Chrome 79
 *
 *  * TODO
 * ```
 * errorBound: {
 *      vₓₓₓ_,  // <11>
 *      vₓₓᵧ_,  // <12>
 *      vₓᵧᵧ_,  // <12>
 *      vᵧᵧᵧ_,  // <11>
 *      vₓₓ_,   // <19>
 *      vₓᵧ_,   // <18>
 *      vᵧᵧ_,   // <19>
 *      vₓ_,    // <22>
 *      vᵧ_,    // <22>
 *      v_      // <24>
 * }
 * ```
 * @param ps
 *
 * @doc mdx
 */
declare function getImplicitForm3ErrorCounters(ps: number[][]): {
    vₓₓₓ_: number;
    vₓₓᵧ_: number;
    vₓᵧᵧ_: number;
    vᵧᵧᵧ_: number;
    vₓₓ_: number;
    vₓᵧ_: number;
    vᵧᵧ_: number;
    vₓ_: number;
    vᵧ_: number;
    v_: number;
};
export { getImplicitForm3ErrorCounters };
