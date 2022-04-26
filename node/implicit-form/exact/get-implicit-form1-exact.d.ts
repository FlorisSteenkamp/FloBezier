import type { ImplicitFormExact1 } from "../implicit-form-types.js";
/**
 * Returns the *exact* implicit form of the given linear bezier curve (a line
 * segment) or `undefined` if the line degenerates to a point.
 *
 * * returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * * returned coefficients are given *exactly* as [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) expansions
 * * the implicit form is given by: `vₓx + vᵧy + v = 0`
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 *
 * @doc mdx
 */
declare function getImplicitForm1Exact(ps: number[][]): ImplicitFormExact1 | undefined;
/**
 * The power basis version of [[getImplicitForm1Exact]].
 *
 * @param pspb the power basis representation of a linear bezier curve that
 * can be found via [[toPowerBasis1Exact]]
 *
 * @internal
 */
declare function getImplicitForm1ExactPb(pspb: [
    [
        number[],
        number[]
    ],
    [
        number[],
        number[]
    ]
]): ImplicitFormExact1 | undefined;
export { getImplicitForm1Exact, getImplicitForm1ExactPb };
