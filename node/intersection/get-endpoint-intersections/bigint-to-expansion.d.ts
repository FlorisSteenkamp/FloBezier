/**
 * Returns the [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) expansion of the given bigint.
 *
 * * it is assumed that the given bigint doesn't cause floating point overflow
 *
 * @internal
 */
declare function bigintToExpansion(b: bigint): number[];
export { bigintToExpansion };
