import { toPowerBasis2 } from '../../to-power-basis/to-power-basis/double/to-power-basis.js';
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
function getImplicitForm2(ps) {
    // The implicit form is given by:
    // vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0
    const [[a2, a1, a0], [b2, b1, b0]] = toPowerBasis2(ps);
    const q1 = a2 * b1 - a1 * b2;
    const q2 = a2 * b0 - a0 * b2;
    const vₓₓ = -b2 * b2;
    const vₓᵧ = 2 * a2 * b2;
    const vᵧᵧ = -a2 * a2;
    const vₓ = b1 * q1 - 2 * b2 * q2;
    const vᵧ = 2 * a2 * q2 - a1 * q1;
    const v = q1 * (a1 * b0 - a0 * b1) - q2 * q2;
    return { vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v };
}
export { getImplicitForm2 };
//# sourceMappingURL=get-implicit-form2.js.map