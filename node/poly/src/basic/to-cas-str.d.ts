/**
 * Returns a string representing the given polynomial that is readable by a
 * human or a CAS (Computer Algebra System).
 *
 * * **note:** if the polynomial coefficients are given as Shewchuk expansions
 * then the coefficients are first down-converted to double precision
 *
 * @param p a polynomial (with coefficients given densely as an array of Shewchuk
 * floating point expansions **or** double precision floating point numbers **or**
 * bigints) from highest to lowest power, e.g. `[5,-3,0]` represents the
 * polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * toCasStr([5,4,3,2,1]); //=> "x^4*5 + x^3*4 + x^2*3 + x*2 + 1"
 * toCasStr([[5],[4],[3],[2],[1]]); //=> "x^4*5 + x^3*4 + x^2*3 + x*2 + 1"
 * toCasStr([5n,4n,3n,2n,1n]); //=> "x^4*5 + x^3*4 + x^2*3 + x*2 + 1"
 * ```
 *
 * @doc
 */
declare function toCasStr(p: number[] | number[][] | bigint[]): string;
export { toCasStr };
