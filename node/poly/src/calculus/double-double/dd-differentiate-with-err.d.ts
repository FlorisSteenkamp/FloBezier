/**
 * Returns the result (and resulting coefficient-wise error bound) of
 * differentiating the given polynomial (with coefficients given in
 * double-double precision) in double-double precision.
 *
 * @param pWithErr an object with 2 properties: `p`: a polynomial with
 * coefficients given densely as an array of double-double precision floating
 * point numbers from highest to lowest power, e.g. `[[5],[-3],[0]]` represents
 * the polynomial `5x^2 - 3x` **and** `pE`: the coefficient-wise error bound of
 * the input polynomial
 *
 * @doc
 */
declare function ddDifferentiateWithError(pWithErr: {
    p: number[][];
    pE: number[];
}): {
    p: number[][];
    pE: number[];
};
export { ddDifferentiateWithError };
