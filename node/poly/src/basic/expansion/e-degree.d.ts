/**
 * Returns the degree of the given polynomial - the zero polynomial degree is
 * returned as -1 (and not -∞ as is conventional).
 *
 * @param p a polynomial with coefficients given densely as an array of Shewchuk
 * floating point expansions from highest to lowest power, e.g. `[[5],[-3],[0]]`
 * represents the polynomial `5x^2 - 3x`
 *
 * @example
 * ```typescript
 * eDegree([[9],[8],[7],[6],[5],[4],[3],[2],[1]]); //=> 8
 * ```
 *
 * @doc
 */
declare function eDegree(p: number[][]): number;
export { eDegree };
