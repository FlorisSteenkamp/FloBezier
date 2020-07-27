/**
 * Get self-intersection coefficients
 * * **precondition**: max bit-aligned bitlength: 47
 */
declare function getCoeffs3(ps: number[][]): {
    coeffs: number[];
    errBound: number[];
};
export { getCoeffs3 };
