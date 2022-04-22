/**
 * Split the given bezier curve into pieces (given as an array of parameter
 * `t` values) such that the longest curve length is guaranteed to be lower than
 * the given max length.
 *
 * @param ps
 * @param maxLength
 *
 * @doc
 */
declare function splitByLength(ps: number[][], maxLength: number): number[];
export { splitByLength };
