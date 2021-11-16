import type { ImplicitFormExact1 } from "../implicit-form-types.js";
/**
 * Returns the exact implicit form of the given linear bezier curve (a line)
 * or `undefined` if the line is really a point.
 *
 * Returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 *
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * **precondition:** underflow/overflow
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 *
 * @doc mdx
 */
declare function getImplicitForm1Exact(ps: number[][]): ImplicitFormExact1 | undefined;
/**
 * The power basis version of [[getImplicitForm1ExactAnyBitlength]].
 *
 * @param pspb the power basis representation of a linear bezier curve that
 * can be found via [[getXYExactAnyBitlength1]]
 *
 * @internal
 */
declare function getImplicitForm1ExactPb(pspb: [
    [
        number[],
        number
    ],
    [
        number[],
        number
    ]
]): ImplicitFormExact1 | undefined;
export { getImplicitForm1Exact, getImplicitForm1ExactPb };
