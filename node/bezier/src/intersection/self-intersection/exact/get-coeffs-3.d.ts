/**
 * Returns the self-intersection poly to solve of the given cubic bezier curve.
 * see http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps An order 3 bezier curve.
 */
declare function getCoeffs3Exact(ps: number[][]): number[][];
export { getCoeffs3Exact };
