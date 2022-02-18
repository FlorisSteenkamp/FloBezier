/**
 * Returns the *absolute* area between the two given curves.
 *
 * * **precondition**: the first and last control points of each curve must equal
 * * can be used as an error measure of the similarity between the two curves
 */
declare function getAbsAreaBetween(ps1: number[][], ps2: number[][]): number;
export { getAbsAreaBetween };
