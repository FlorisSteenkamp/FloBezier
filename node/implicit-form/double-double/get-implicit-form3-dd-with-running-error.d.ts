/**
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
export { getImplicitForm3DdWithRunningError };
