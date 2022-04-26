/**
 * Returns the implicit form of the given cubic bezier curve.
 *
 * * returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * * the implicit form is given by: `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * * takes about 1.2 micro-seconds on a 3rd gen i7 and Chrome 79
 *
 * @param ps a cubic bezier curve given as an array of its control points,
 * e.g. `[[1,2],[3,4],[5,7],[0,0]]`
 *
 * @doc mdx
 */
declare function getImplicitForm3(ps: number[][]): {
    vₓₓₓ: number;
    vₓₓᵧ: number;
    vₓᵧᵧ: number;
    vᵧᵧᵧ: number;
    vₓₓ: number;
    vₓᵧ: number;
    vᵧᵧ: number;
    vₓ: number;
    vᵧ: number;
    v: number;
};
export { getImplicitForm3 };
