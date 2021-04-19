/**
 * * the returned errors still need to be multiplied by 3*γ1*γ1
 * * precondition: 53-4-2 === 47-bit bit-aligned coefficient bitlength (this is
 * to improve speed considerably due to simpler error bound calculations)
 * @param ps1
 * @param ps2
 */
declare function getCoeffs3x3Quad(ps1: number[][], ps2: number[][]): {
    coeffs: number[][];
    errBound: number[];
};
export { getCoeffs3x3Quad };
