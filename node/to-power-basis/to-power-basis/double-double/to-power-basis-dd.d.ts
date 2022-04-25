/**
 * Returns the power basis representation of a bezier curve of order cubic or
 * less (with intermediate calculations done in double-double precision).
 *
 * * returns the power basis x and y coordinate polynomials from highest power
 * to lowest, e.g. if `x(t) = at^3 + bt^2 + ct + d`
 * and `y(t) = et^3 + ft^2 + gt + h` then the result is returned
 * as `[[a,b,c,d],[e,f,g,h]]`, where the `a,b,c,...` are in double-double
 * precision
 *
 * @param ps an order 0,1,2 or 3 bezier curve given by an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc
 */
declare function toPowerBasisDd(ps: number[][]): number[][][];
/** @internal */
declare function toPowerBasis3Dd(ps: number[][]): [
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
];
/**
 * Only the quadratic monomial coefficient has an error, the others are exact.
 *
 * @internal
 */
declare function toPowerBasis2Dd(ps: number[][]): [
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
];
/**
 * Exact for any bitlength.
 *
 * @internal
 */
declare function toPowerBasis1Dd(ps: number[][]): [[number[], number[]], [number[], number[]]];
/**
 * Exact for any bitlength.
 *
 * @internal
 */
declare function toPowerBasis0Dd(ps: number[][]): [[number[]], [number[]]];
export { toPowerBasisDd, toPowerBasis0Dd, toPowerBasis1Dd, toPowerBasis2Dd, toPowerBasis3Dd };
