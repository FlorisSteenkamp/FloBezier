/**
 * Returns a random number from `-max` to `+max` using `squares` ~with a
 * bitlength limited to 31 bits~. (Note: division by `2**32 - 1` instead of
 * `2**32` was used in the implementation of this function and so the
 * bitlength could be anything)
 *
 * @param max
 * @param n
 */
/**
 * Returns a random number from `-max` to `+max` using `squares` internally
 * and with the full bitlength of double floats of 52 bits even when the
 * random number is close to zero.
 *
 * @param max the max absolute value possible; prefer a power of 2
 * @param n an index to the random number (starting from 0)
 */
declare function randomCenteredAt0v2(max: number, n: number): number;
declare function randomOnGrid(max: number, significantBits: number): (n: number) => number;
export { randomOnGrid, randomCenteredAt0v2 };
