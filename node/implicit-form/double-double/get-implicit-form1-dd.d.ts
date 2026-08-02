declare const ddGetImplicitForm1: typeof getImplicitForm1Dd;
/**
 * * use `ddGetImplicitForm1` instead (it is the same function but with a better name)
 *
 * Returns a double-double precision implicit form of the given
 * linear bezier curve.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * intermediate calculations are performed in double-double precision
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps a line segment given as an array of its control points,
 * e.g. `[[1,2],[3,4]]`
 *
 * @doc mdx
 */
declare function getImplicitForm1Dd(ps: number[][]): {
    vₓ: number[];
    vᵧ: number[];
    v: number[];
};
export { ddGetImplicitForm1, getImplicitForm1Dd };
