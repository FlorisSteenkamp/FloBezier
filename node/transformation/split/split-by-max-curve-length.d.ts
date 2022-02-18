/**
 * Split the order 1, 2 or 3 bezier into pieces (given as an array of parameter
 * `t` values) such that the longest curve length is guaranteed to be lower than
 * the given max length.
 *
 * @param ps
 * @param maxLength
 *
 * @doc
 */
declare function splitByMaxCurveLength(ps: number[][], maxLength: number): number[];
export { splitByMaxCurveLength };
