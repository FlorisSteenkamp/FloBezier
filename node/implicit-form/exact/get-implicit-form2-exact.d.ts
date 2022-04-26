import type { ImplicitFormExact1, ImplicitFormExact2 } from '../implicit-form-types.js';
/**
 * Returns the exact implicit form of the given quadratic bezier curve
 * or `undefined` if the curve degenerates to a point.
 *
 * * returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * * returned coefficients are given *exactly* as [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) expansions
 * * the implicit form is given by: `vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 *
 * @doc mdx
 */
declare function getImplicitForm2Exact(ps: number[][]): ImplicitFormExact2 | ImplicitFormExact1 | undefined;
/**
 * The power basis version of [[getImplicitForm2Exact]].
 *
 * @param pspb the power basis representation of a quadratic bezier curve that
 * can be found via [[toPowerBasis2Exact]]
 *
 * @internal
 */
declare function getImplicitForm2ExactPb(pspb: [
    [
        number[],
        number[],
        number[]
    ],
    [
        number[],
        number[],
        number[]
    ]
]): ImplicitFormExact2 | ImplicitFormExact1 | undefined;
export { getImplicitForm2Exact, getImplicitForm2ExactPb };
