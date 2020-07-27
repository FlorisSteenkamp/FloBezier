/**
 * Returns the self-intersection poly to solve of the given cubic bezier curve.
 * see http://www.mare.ee/indrek/misc/2d.pdf
 * * precondition: max 47 bit bit-aligned coefficient bitlength
 * @param ps An order 3 bezier curve.
 */
declare function getCoeffs3Exact_(ps: number[][]): number[][];
export { getCoeffs3Exact_ };
