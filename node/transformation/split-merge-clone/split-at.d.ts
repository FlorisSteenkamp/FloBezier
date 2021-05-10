/**
 * Returns 2 new beziers split at the given t parameter, i.e. for the ranges
 * [0,t] and [t,1].
 *
 * @param ps An order 1, 2 or 3 bezier curve
 * @param t The curve parameter
 *
 * @doc
 */
declare function splitAt(ps: number[][], t: number): number[][][];
/**
 * Returns 2 new beziers split at the given t parameter, i.e. for the ranges
 * [0,t] and [t,1].
 *
 * The result is precise, i.e. each returned coordinate is rounded to the
 * nearest ulp (unit in the last place)
 *
 * @param ps An order 1, 2 or 3 bezier curve
 * @param t The curve parameter
 *
 * @doc
 */
declare function splitAtPrecise(ps: number[][], t: number): number[][][];
declare function splitAtExact(ps: number[][][], t: number): number[][][][];
export { splitAt, splitAtPrecise, splitAtExact };
