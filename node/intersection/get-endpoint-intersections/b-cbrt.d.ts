/**
 * Returns the cube root of a bigint.
 *
 * * see https://stackoverflow.com/a/53684036/2010061
 *
 * * **precondition**: the given bigint must be a perfect cube
 *
 * @internal
 */
declare function bCbrt(n: bigint): bigint;
export { bCbrt };
