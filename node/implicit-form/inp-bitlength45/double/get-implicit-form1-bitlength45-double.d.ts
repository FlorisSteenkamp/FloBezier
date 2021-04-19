/**
 * Returns the implicit form of the given linear bezier and a coefficientwise
 * error bound.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * **precondition:** the coordinates of the given bezier must be 49-bit aligned
 * * intermediate calculations are done in double precision and will thus be
 * reflected in the output error bound (which is approximately
 * n * Number.EPSILON * the condition number, where roughly 1 < n < 100 and
 * depends on the specific calculation)
 * * the error bound returned needs first be multiplied by `γ === u/(1 - u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 */
declare function getImplicitForm1_bitlength45_double(ps: number[][]): {
    coeffs: {
        vₓ: number;
        vᵧ: number;
        v: number;
    };
    errorBound: {
        v_: number;
    };
};
export { getImplicitForm1_bitlength45_double };
