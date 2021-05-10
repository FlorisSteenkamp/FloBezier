/**
 * Returns the curvature, κ, at a specific t.
 *
 * * this function is curried.
 * * **alias**: curvature
 *
 * @param ps An order 1, 2 or 3 bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t The parameter value where the curvature should be evaluated
 *
 * @doc
 */
declare function κ(ps: number[][], t: number): number;
declare function κ(ps: number[][]): (t: number) => number;
/**
 * Compare the curvature, κ, between two curves at t === 0.
 *
 * Returns a positive number if κ for psI > κ for psO, negative if κ for psI < κ
 * for psO or zero if the curve extensions are identical (i.e. in same K-family).
 *
 * Precondition: The point psI evaluated at zero must === the point psO
 * evaluated at zero.
 *
 * Exact: Returns the exact result if the bithlength of all
 * coordinates <= 53 - 5 === 48 and are bit-aligned.
 *
 * @param psI An order 1, 2 or 3 bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * representing the incoming curve
 * @param psO Another bezier representing the outgoing curve
 */
declare function compareCurvaturesAtInterface(psI: number[][], psO: number[][]): number;
export { κ, κ as curvature, compareCurvaturesAtInterface };
