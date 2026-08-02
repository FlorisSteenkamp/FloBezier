/**
 * Returns a double precision implicit form of the given line segment
 * and a coefficientwise error bound.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * intermediate calculations are done in double-double precision and this is
 *   reflected in the error bound
 * * the error bound returned still need to be scaled by `γ1`,
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps a line segment given as an array of its control points,
 * e.g. `[[1,2],[3,4]]`
 *
 * @doc mdx
 */
declare function getImplicitForm1WithRunningError(ps: number[][]): {
    coeffs: {
        vₓ: number;
        vᵧ: number;
        v: number;
    };
    errorBound: {
        vₓ_: number;
        vᵧ_: number;
        v_: number;
    };
};
export { getImplicitForm1WithRunningError };
