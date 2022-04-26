/**
 * Returns a double-double precision implicit form of the given line segment
 * and a coefficientwise error bound.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * intermediate calculations are done in double-double precision and this is
 * reflected in the error bound
 * * the error bound returned first needs to be scaled by `γγ3 === (3*u*u) / (1 - 3*u*u)`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps a line segment given as an array of its control points,
 * e.g. `[[1,2],[3,4]]`
 *
 * @doc mdx
 */
declare function getImplicitForm1DdWithRunningError(ps: number[][]): {
    coeffs: {
        vₓ: number[];
        vᵧ: number[];
        v: number[];
    };
    errorBound: {
        v_: number;
    };
};
export { getImplicitForm1DdWithRunningError };
