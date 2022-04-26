import { toPowerBasis1 } from '../../to-power-basis/to-power-basis/double/to-power-basis.js';


/**
 * Returns the implicit form of the given linear bezier curve, i.e. line 
 * segment.
 * 
 * * returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * intermediate calculations are done in **double** precision
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps a line segment given as an array of its control points, 
 * e.g. `[[1,2],[3,4]]`
 * 
 * @doc mdx
 */
function getImplicitForm1(ps: number[][]) {
    // The implicit form is given by:
    // vₓx + vᵧy + v = 0

    const [[a1,a0], [b1,b0]] = toPowerBasis1(ps);

    const vₓ = -b1;
    const vᵧ = a1;
    const v = a0*b1 - a1*b0;

    return { vₓ, vᵧ, v };
}


export { getImplicitForm1 }
