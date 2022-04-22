/**
 * Returns the result of evaluating the given bezier curve at the parameter `t`
 * exactly.
 *
 * * the result is returned as `[x,y]`, where `x` and `y` are Shewchuk floating
 * point expansions
 *
 * @param ps
 * @param t
 *
 * @doc
 */
declare function evaluateExact(ps: number[][], t: number): number[][];
export { evaluateExact };
