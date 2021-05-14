/**
 * Returns the result of evaluating the given bezier curve at the parameter `t`
 * exactly (up to underflow / overflow).
 *
 * * **precondition:** none
 * * the result is returned as `[x,y]`, where `x` and `y` are Shewchuk floating
 * point expansions
 *
 * @param ps
 * @param t
 *
 * @doc
 */
declare function evaluate_anyBitlength_exact(ps: number[][], t: number): number[][];
export { evaluate_anyBitlength_exact };
