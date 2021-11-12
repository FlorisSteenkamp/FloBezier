/**
 * Returns an approximation of the hodograph of the given bezier curve.
 * * **bitlength**: If the coordinates of the control points are bit-aligned then
 * * max bitlength increase === 3, max shift === 3 (for cubics)
 * * max bitlength increase === 1, max shift === 2 (for quadratics)
 * * max bitlength increase === 1, max shift === 1 (for lines)
 *
 * @param ps An order 1, 2 or 3 bezier curve.
 *
 * @doc
 */
declare function getHodograph(ps: number[][]): number[][] | undefined;
export { getHodograph };
