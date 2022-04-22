/**
 * Returns the result (`[x,y]`) of evaluating the 2nd derivative of a linear,
 * quadratic or cubic bezier curve at `t === 0`.
 *
 * Bitlength: If the coordinates of the control points are bit-aligned then the
 * * max bitlength (incl bit shift) increase === 5 (for cubics)
 * * max bitlength (incl bit shift) increase === 3 (for quadratics)
 * * max bitlength (incl bit shift) increase === 0 (for lines)
 *
 * @param ps An order 1,2 or 3 bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc mdx
 */
declare function evaluateDdxyAt0(ps: number[][]): number[];
export { evaluateDdxyAt0 };
