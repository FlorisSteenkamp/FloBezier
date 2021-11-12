import { ImplicitForm1Coeffs } from '../implicit-form-types.js';
/**
 * Returns the implicit form of the given linear bezier.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * intermediate calculations are done in **double** precision
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 *
 * @doc mdx
 */
declare function getImplicitForm1(ps: number[][]): ImplicitForm1Coeffs<number>;
export { getImplicitForm1 };
