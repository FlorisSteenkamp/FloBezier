/**
 * Constructs a double-double precision polynomial from the given roots by
 * multiplying out the factors (x - root1)(x - root2) in infinite precision
 * (bar overflow) and rounding back to double-double precision; also returns
 * a coefficient-wise error polynomial and a function that returns the exact
 * polynomial.
 *
 * * mostly for testing purposes.
 *
 * @param roots an array of roots
 *
 * @doc
 */
declare function eFromRoots(roots: number[][]): {
    pDd: number[][];
    pE: number[];
    getPExact: () => number[][];
};
export { eFromRoots };
