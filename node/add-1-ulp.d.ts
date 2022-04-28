/**
 * Add one unit in the last place (ulp) to the given number
 *
 * * subnormal numbers (and 0) are returned unaltered
 * @internal
 */
declare function add1Ulp(n: number): number;
export { add1Ulp };
