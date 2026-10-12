declare const ddGetImplicitForm3: typeof getImplicitForm3Dd;
/**
 * * use `ddGetImplicitForm3` instead (it is the same function but with a better name)
 *
 * Returns a double-double precision implicit form of the given cubic bezier
 * curve.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * intermediate calculations are done in double-double precision
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * * **precondition**: the given curve must really be of order 3 (e.g. use
 * [[reduceOrderIfPossible]] first); for a degenerate curve (e.g. a cubic that
 * is really a quadratic, a line or a point) all returned coefficients are zero
 * (or, due to round-off, very nearly zero), i.e. the implicit form is
 * meaningless, unlike [[getImplicitForm3Exact]] which falls back to the
 * implicit form of the lower order curve
 *
 * @param ps a cubic bezier curve given as an array of its control points,
 * e.g. `[[1,2],[3,4],[5,7],[0,0]]`
 *
 * @doc mdx
 */
declare function getImplicitForm3Dd(ps: number[][]): {
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
export { ddGetImplicitForm3, getImplicitForm3Dd };
