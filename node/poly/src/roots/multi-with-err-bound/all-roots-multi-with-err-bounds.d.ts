import { RootInterval } from "./root-interval";
/**
 * Finds and returns all root intervals within [0,1] of a given polynomial,
 * including their multiplicities (see points below).
 * * **precondition** interval must be a subset of [0,1]
 * * specialized for the interval [0,1]
 * * multiplicities are positive integers - in extremely rare cases a
 * multiplicity may be an even number higher than the one returned ????
 * * the returned intervals are of max width 2*Number.EPSILON; if an interval
 * is of higher width then it contains multiple roots; the max width
 * * the highest degree coefficient of the input polynomial's exact value should
 * be !== 0
 * @param p a polynomial with quad-precision coefficients.
 * @param pE error bound polynomial (given as absolute errors on each coefficient)
 * @param lb lower limit of root values to be returned - defaults to 0
 * @param ub upper limit of root values to be returned - defaults to 1
 * @param getPsExact a function returning the exact polynomial and its
 * derivatives if required when the error bounds are too high during calculation
 */
declare function allRootsMultiWithErrBounds(p: number[][], pE: number[], getPsExact?: () => number[][][], lb?: number, ub?: number): RootInterval[];
export { allRootsMultiWithErrBounds };
