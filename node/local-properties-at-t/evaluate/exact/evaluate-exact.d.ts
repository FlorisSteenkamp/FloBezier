/**
 * Returns the *exact* result of evaluating the given bezier curve at the
 * given `t` parameter.
 *
 * * the result is returned as `[x,y]`, where `x` and `y` are [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) floating
 * point expansions
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param t
 *
 * @doc
 */
declare function evaluateExact(ps: number[][], t: number): number[][];
export { evaluateExact };
