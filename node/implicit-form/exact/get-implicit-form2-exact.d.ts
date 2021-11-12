import type { ImplicitFormExact2 } from '../implicit-form-types';
/**
 * Returns the exact implicit form of the given quadratic bezier curve
 * or `undefined` if the curve is really a point.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * **precondition:** TODO - add underflow / overflow conditions
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 *
 * @doc mdx
 */
declare function getImplicitForm2Exact(ps: number[][]): ImplicitFormExact2 | undefined;
/**
 * The power basis version of [[getImplicitForm2ExactAnyBitlength]].
 *
 * @param pspb the power basis representation of a quadratic bezier curve that
 * can be found via [[getXYExactAnyBitlength2]]
 *
 * @internal
 */
declare function getImplicitForm2ExactPb(pspb: [
    [
        number[],
        number[],
        number
    ],
    [
        number[],
        number[],
        number
    ]
]): ImplicitFormExact2 | undefined;
export { getImplicitForm2Exact, getImplicitForm2ExactPb };
