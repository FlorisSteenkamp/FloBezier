import type { ImplicitFormExact3 } from '../implicit-form-types';
/**
 * Returns the exact implicit form of the given cubic bezier curve
 * or `undefined` if the curve is really a point.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * **precondition:** none
 *
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 * * takes about 155 micro-seconds on a 3rd gen i7 and Chrome 79
 *
 * @param ps
 *
 * @doc mdx - TODO - remove mdx from these functions - they will become too many?
 */
declare function getImplicitForm3Exact(ps: number[][]): ImplicitFormExact3 | undefined;
/**
 * The power basis version of [[getImplicitForm3ExactAnyBitlength]].
 *
 * @param pspb the power basis representation of a cubic bezier curve that can
 * be found via [[getXYExactAnyBitlength3]]
 *
 * @internal
 */
declare function getImplicitForm3ExactPb(pspb: [
    [
        number[],
        number[],
        number[],
        number
    ],
    [
        number[],
        number[],
        number[],
        number
    ]
]): ImplicitFormExact3 | undefined;
export { getImplicitForm3Exact, getImplicitForm3ExactPb };
