/**
 * Returns the implicit form of the given quadratic bezier curve.
 *
 * * returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * * the implicit form is given by: `vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * intermediate calculations are done in **double** precision
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps a quadratic bezier curve given as an array of its control points,
 * e.g. `[[1,2],[3,4],[5,7]]`
 *
 * @doc mdx
 */
declare function getImplicitForm2(ps: number[][]): {
    vₓₓ: number;
    vₓᵧ: number;
    vᵧᵧ: number;
    vₓ: number;
    vᵧ: number;
    v: number;
};
export { getImplicitForm2 };
