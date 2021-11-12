/**
 * Returns the implicit form of the given quadratic bezier.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * intermediate calculations are done in **double** precision
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
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
