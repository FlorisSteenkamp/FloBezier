/**
 * Returns the exact implicit form of the given linear bezier.
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * **precondition**: 47-bit bit-aligned coefficient bitlength
 *
 * Adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 */
declare function getImplicitForm1Exact(ps: number[][]): {
    vₓ: number;
    vᵧ: number;
    v: number[];
};
export { getImplicitForm1Exact };
