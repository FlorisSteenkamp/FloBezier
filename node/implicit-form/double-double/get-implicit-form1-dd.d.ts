/**
 * Returns the error-free double-double precision implicit form of the given
 * linear bezier.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * **precondition:** the coordinates of the given bezier must be 48-bit aligned
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 *
 * @doc mdx
 */
declare function getImplicitForm1Dd(ps: number[][]): {
    coeffs: {
        vₓ: number;
        vᵧ: number;
        v: number[];
    };
    errorBound: {};
};
export { getImplicitForm1Dd };
