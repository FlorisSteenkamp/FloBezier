/**
 * Returns the approximate result of differentiating the given polynomial.
 * @param p a polynomial
 * @example
 * differentiate([5, 4, 3, 2, 1]); //=> [20, 12, 6, 2]
 */
declare function differentiate(p: number[]): number[];
/**
 * Returns the result of differentiating the given polynomial in quad precision.
 * @param p a polynomial
 * @example
 * differentiate([5, 4, 3, 2, 1]); //=> [20, 12, 6, 2]
 */
declare function differentiateQuad(p: number[][]): number[][];
/**
 * * precondition: max degree of p === 9
 * @param p a quad precision polynomial
 * @param pE
 */
declare function differentiateQuadWithError({ p, pE }: {
    p: number[][];
    pE: number[];
}): {
    p: number[][];
    pE: number[];
};
/**
 * Returns the exact result of differentiating the given polynomial.
 * @param p a polynomial
 * @example
 * differentiate([[5], [4], [3], [2], [1]]); //=> [[20], [12], [6], [2]]
 */
declare function differentiateExact(p: number[][]): number[][];
export { differentiate, differentiateQuad, differentiateExact, differentiateQuadWithError };
