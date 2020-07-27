/**
 * Finds an upper bound on the magnitude (absolute value) of the roots
 * of the given polynomial using the near-optimal Fujiwara bound. Note
 * that the bound includes complex roots. The bound is tight but slow
 * due to usage of Math.pow().
 * See https://en.wikipedia.org/wiki/Properties_of_polynomial_roots#cite_note-Fujiwara1916-4
 * @param p ahe polynomial.
 * @example
 * rootMagnitudeUpperBound_fujiwara([2,-3,6,5,-130]); //=> 6.753296750770361
 * allRoots([2,-3,6,5,-130]); //=> [-2.397918624065303, 2.8793785310848383]
 */
declare function rootMagnitudeUpperBound_fujiwara(p: number[]): number;
export { rootMagnitudeUpperBound_fujiwara };
