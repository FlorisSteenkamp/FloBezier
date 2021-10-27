import { RootInterval } from "./root-interval";
/**
 * :::tip Heads up!
 * Simplified version of `allRootsCertified` - following are the changes:
 * * input polynomial coefficients are double precision numbers (as opposed
 * to double-double precision)
 * * the input polynomial coefficients are assumed exact; neither an error
 * polynomial nor a function to return a polynomial with exact coefficients can
 * be specified
 * * the search range lower and upper bounds defaults to
 * `Number.NEGATIVE_INFINITY` and `Number.POSITIVE_INFINITY` respectively
 * :::
 *
 * Finds and returns all *certified* root intervals (bar underflow / overflow)
 * of the given polynomial, including their multiplicities (see points below).
 *
 * * returns an empty array for a constant or the zero polynomial
 *
 * * Let `W = m * Number.EPSILON * max(1, 2^⌈log₂r⌉)`, where
 *   * `r` is a root
 *   * `m` is the number of roots (the 'multiplicity') within the
 *      interval, where multiplicity here includes roots seperated by less than
 *     `2*Number.EPSILON` and not necessarily only exact multiple roots;
 *
 * * the returned intervals are of max width `W`
 *
 * * the retuned root intervals will contain *all* roots hence the *certified*
 * in the function name.
 *
 * * the reported multiplicities will be correct *up to a multiple of 2* in cases
 * where *more* than 1 root is reported in the interval `W` described above
 * (else if a multiplicity of 0 or 1 is reported the result is guaranteed correct)
 * * [[refineK1]] can then be used to resolve them further; note however
 * that root seperation is a function of polynomial height and can be very small
 * (see e.g. [Improving Root Separation Bounds, *Aaron Herman, Hoon Hong, Elias Tsigaridas*](https://hal.inria.fr/hal-01456686/document)
 *
 * * optimized for polynomials of degree 1 to about 30
 *   * this is due to [Rolle's Theorem](https://en.wikipedia.org/wiki/Rolle%27s_theorem)
 *     being used and not [Descartes' rule of signs](https://en.wikipedia.org/wiki/Descartes%27_rule_of_signs)
 *   * Descartes' methods are asymptotically faster and thus better suited for higher
 *     degree polynomials but for lower degrees Rolle's Theorem is faster
 *
 * * **precondition:** the coefficient magnitudes and degree of the polynomial
 *  must be such that overflow won't occur at evaluation points where roots
 * are searched for, e.g. a 20th degree polynomial with coefficients of
 * magnitude around `Number.MAX_SAFE_INTEGER (= 9007199254740991)` evaluated at
 * `x = 1000000` will evaluate to about `10^136` (10 the the power of 136) which
 * is way too small for overflow to occur, however when evaluated at `x = 10^15`
 * overflow will occur; to prevent this unlikely possibility (roots are
 * typically not that large in applications) limit the bounds `lb` and `ub`
 * where roots are to be searched for to the range of interest, i.e. don't set
 * them to infinity for automatic calculation
 *
 * @param p a polynomial with coefficients given densely as an array of
 * double precision floating point numbers from highest to lowest power,
 * e.g. `[5,-3,0]` represents the polynomial `5x^2 - 3x`
 * @param lb defaults to Number.NEGATIVE_INFINITY; lower bound of roots to be
 * returned
 * @param ub defaults to Number.POSITIVE_INFINITY; upper bound of roots to be
 * returned
 * @param returnUndefinedForZeroPoly if the given polynomial is the zero
 * polynomial and `returnUndefinedForZeroPoly` is `true` then `undefined` will
 * be returned (and not `[]`) to differentiate between the cases of a
 * constant polynomial (returns `[]`, i.e. no roots) and the zero polynomial
 * in which case there is an infinite number of roots.
 *
 * @example
 * ```typescript
 *
 * // -------------------------------------------------------
 * // 1. example of an order 11 polynomial (with 10 roots) --
 * // -------------------------------------------------------
 * const p = [
 *     3.033321234234234,
 *     31.78342995971597,
 *     -115.09145437671532,
 *     -48.18962838294827,
 *     241.04136127393173,
 *     -26.63962334942254,
 *     -81.82713958224285,
 *     13.96128683321424,
 *     7.3963444329341455,
 *     -1.50733058206533,
 *     -0.0015147128834111722
 * ];
 * //console.log(toCasStr(p))
 * // => 3.033321234234234*x^10 + 31.78342995971597*x^9 - 115.09145437671532*x^8 -
 * //    48.18962838294827*x^7 + 241.04136127393173*x^6 - 26.63962334942254*x^5 -
 * //    81.82713958224285*x^4 + 13.96128683321424*x^3 + 7.3963444329341455*x^2 -
 * //    1.50733058206533*x - 0.0015147128834111722
 * const roots = allRootsCertifiedSimplified(p);
 * //console.log(roots);
 * // => [
 * //   { tS: -13.222221, tE: -13.222220999999996, multiplicity: 1 },
 * //   { tS: -1.3498348570000003, tE: -1.3498348569999998, multiplicity: 1 },
 * //   { tS: -0.4444777699999987, tE: -0.4444777699999985, multiplicity: 1 },
 * //   { tS: -0.43554300000000135, tE: -0.4355430000000011, multiplicity: 1 },
 * //   { tS: -0.001000000000000222, tE: -0.001, multiplicity: 1 },
 * //   { tS: 0.22999999999999984, tE: 0.23000000000000007, multiplicity: 1 },
 * //   { tS: 0.345347, tE: 0.34534700000000024, multiplicity: 1 },
 * //   { tS: 0.5429999999999989, tE: 0.5429999999999993, multiplicity: 1 },
 * //   { tS: 1.3221000000000016, tE: 1.322100000000002, multiplicity: 1 },
 * //   { tS: 2.534533999999997, tE: 2.534533999999998, multiplicity: 1 }
 * // ]
 * ```
 *
 * @doc
 */
declare function allRootsCertifiedSimplified(p: number[], lb?: number, ub?: number, returnUndefinedForZeroPoly?: boolean): RootInterval[] | undefined;
export { allRootsCertifiedSimplified };
