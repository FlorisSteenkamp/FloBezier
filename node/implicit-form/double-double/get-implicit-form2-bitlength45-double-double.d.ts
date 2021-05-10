/**
 * Returns a double-double precision implicit form of the given quadratic
 * bezier and a coefficientwise error bound.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * **precondition:** the coordinates of the given bezier must be 47-bit aligned
 * * intermediate calculations are done in double-double precision and this is
 * reflected in the output error bound (which is approximately
 * n * (Number.EPSILON**2) * the condition number, where roughly 1 < n < 100 and
 * depends on the specific calculation)
 * * the error bound returned first needs to be multiplied by `γγ3 === (3*u*u) / (1 - 3*u*u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 *
 * @doc
 */
declare function getImplicitForm2_bitlength45_doubleDouble(ps: number[][]): {
    coeffs: {
        vₓₓ: number[];
        vₓᵧ: number[];
        vᵧᵧ: number[];
        vₓ: number[];
        vᵧ: number[];
        v: number[];
    };
    errorBound: {
        vₓ_: number;
        vᵧ_: number;
        v_: number;
    };
};
export { getImplicitForm2_bitlength45_doubleDouble };
