/**
 * Subtract one unit in the last place (ulp) from the given number
 *
 * * subnormal numbers (and 0) are returned unaltered
 * @internal
 */
declare function sub1Ulp(n: number): number;
export { sub1Ulp };
