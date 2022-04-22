/**
 * Returns the result (`[x,y]`) of evaluating the derivative of a linear,
 * quadratic or cubic bezier curve at `t === 1`.
 *
 * Bitlength: If the coordinates of the control points are grid-aligned then
 * * max bitlength (incl bit shift) increase === 3 (for cubics)
 * * max bitlength (incl bit shift) increase === 2 (for quadratics)
 * * max bitlength (incl bit shift) increase === 1 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc mdx
 */
declare function evaluateDxyAt1(ps: number[][]): number[];
export { evaluateDxyAt1 };
