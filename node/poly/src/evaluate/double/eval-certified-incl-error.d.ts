/**
 * Returns the result of evaluating the given polynomial (with specified
 * coefficient-wise error bounds) at `x` such that the sign is correct when
 * positive or negative and undecided when 0 - an additional `multiplier`
 * parameter can enforce additional bits (beyond the sign bit) to be correct.
 *
 * * designed to be fast in 'easy' cases (say condition number < 2^53) and
 * harder cases (condition number < 2^106) since nearly all typical
 * calculations will have condition number < 2^106
 * * a staggered approach is used - first double precision, then simulated
 * double-double precision (i.e. once compensated Horner evluation) is tried
 * before giving up and returning 0 - see point below
 * * if zero is returned then the calculated result is too close to 0 to
 * determine the sign; the caller of this function can then resort to a more
 * accurate (possibly exact) evaluation
 *
 * @param p an array of 2 polynomials with coefficients given densely as an
 * array of double precision floating point numbers from highest to
 * lowest power, e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`;
 * the first polynomial's coefficients represent the 'high part' (a double) of a
 * double-double precision value, while the second polynomial's coefficients
 * represent the 'low part', i.e. designating `hp` for high part and `lp` for
 * low part it must be that they are non-overlapping -> `twoSum(lp,hp)` will
 * equal `[lp,hp]`; put another way, if the given polynomial is given as e.g. a
 * linear polynomial with coefficients in double precision,
 * e.g. `[[1.7053025658242404e-13, 2354.33721613], [-7.105427357601002e-15,284.5673337]]`
 * then this parameter, `p`, should be `[[2354.33721613], 284.5673337], [1.7053025658242404e-13, -7.105427357601002e-15]]`
 * which is simply the result of transposing the original polynomial if it is
 * seen as a matrix
 * @param pE defaults to `undefined`; an error polynomial that provides a
 * coefficient-wise error bound on the input polynomial; all coefficients must
 * be positive; if `undefined` then the input polynomial will be assumed exact
 * @param x the value at which to evaluate the polynomial
 * @param multiplier defaults to 1; the final calculation error needs to be a
 * multiple of this number smaller than the evaluated value, otherwise zero is
 * returned - useful if not only the sign is important but also some bits, e.g.
 * if multiplier = 8 then 3 bits will have to be correct otherwise 0 is returned
 *
 * @doc
 */
declare function evalCertifiedInclError(p: number[][], x: number, pE?: number[] | undefined, multiplier?: number): {
    r̂: number;
    e: number;
};
export { evalCertifiedInclError };
