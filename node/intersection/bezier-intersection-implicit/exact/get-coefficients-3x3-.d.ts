/**
 * * **precondition**: 47-bit bit-aligned coefficient bitlength (this is to
 * improve speed considerably)
 * @param ps1
 * @param ps2
 */
declare function getCoeffs3x3Exact_(ps1: number[][], ps2: number[][]): number[][];
export { getCoeffs3x3Exact_ };
