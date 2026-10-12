declare const ddGetImplicitForm3_WithRunningError: typeof getImplicitForm3DdWithRunningError;
/**
 * * use `ddGetImplicitForm3_WithRunningError` instead (it is the same function but with a better name)
 *
 * Returns a double-double precision implicit form of the given cubic
 * bezier curve curve and a coefficientwise error bound.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * intermediate calculations are done in double-double precision and this is
 * reflected in the error bound
 * * the error bound returned first needs to be scaled by `γγ3 === (3*u*u) / (1 - 3*u*u) === 3.697785493223493e-32`,
 * where `u === Number.EPSILON / 2` before use
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * * **precondition**: the given curve must really be of order 3 (e.g. use
 * [[reduceOrderIfPossible]] first); for a degenerate curve (e.g. a cubic that
 * is really a quadratic, a line or a point) all returned coefficients are zero
 * (or, due to round-off, very nearly zero), i.e. the implicit form is
 * meaningless, unlike [[getImplicitForm3Exact]] which falls back to the
 * implicit form of the lower order curve; the returned error bound remains
 * valid though, so that certified algorithms relying on it will correctly fall
 * back to exact arithmetic
 *
 * @param ps a cubic bezier curve given as an array of its control points,
 * e.g. `[[1,2],[3,4],[5,7],[0,0]]`
 *
 * @doc mdx
 */
declare function getImplicitForm3DdWithRunningError(ps: number[][]): {
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
        v: number[];
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
        v_: number;
    };
};
export { ddGetImplicitForm3_WithRunningError, getImplicitForm3DdWithRunningError };
