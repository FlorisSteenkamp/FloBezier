import type { ImplicitFormExact1, ImplicitFormExact2, ImplicitFormExact3 } from '../implicit-form-types.js';
/**
 * Returns the exact implicit form of the given cubic bezier curve
 * or `undefined` if the curve degenerates to a point.
 *
 * * returned coefficients are subscripted to match their monomial's variables,
 * e.g. `vₓᵧ` is the coefficient of the monomial `vₓᵧxy`
 * * returned coefficients are given *exactly* as [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) expansions
 * * the implicit form is given by: `vₓₓₓx³ + vₓₓᵧx²y + vₓᵧᵧxy² + vᵧᵧᵧy³ + vₓₓx² +vₓᵧxy + vᵧᵧy² + vₓx + vᵧy + v = 0`
 * * adapted from [Indrek Mandre](http://www.mare.ee/indrek/misc/2d.pdf)
 *
 * @param ps
 *
 * @doc mdx
 */
declare function getImplicitForm3Exact(ps: number[][]): {
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
} | {
    vₓₓ: number[];
    vₓᵧ: number[];
    vᵧᵧ: number[];
    vₓ: number[];
    vᵧ: number[];
    v: number[];
} | {
    vₓ: number[];
    vᵧ: number[];
    v: number[];
} | undefined;
/**
 * The power basis version of [[getImplicitForm3Exact]].
 *
 * @param pspb the power basis representation of a cubic bezier curve that can
 * be found via [[toPowerBasis3Exact]]
 *
 * @internal
 */
declare function getImplicitForm3ExactPb(pspb: [
    [
        number[],
        number[],
        number[],
        number[]
    ],
    [
        number[],
        number[],
        number[],
        number[]
    ]
]): ImplicitFormExact3 | ImplicitFormExact2 | ImplicitFormExact1 | undefined;
export { getImplicitForm3Exact, getImplicitForm3ExactPb };
