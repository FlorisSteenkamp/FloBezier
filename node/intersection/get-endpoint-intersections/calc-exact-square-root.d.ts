/**
 * * **precondition**: the given value must be a perfect square
 *
 * @param a the rational value for which the square root is sought given as
 * `[N,D]` to represent the value `N/D` where `N` and `D` are [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * expansions
 *
 * @internal
 */
declare function calcExactSquareRoot(a: number[][]): number[][];
export { calcExactSquareRoot };
