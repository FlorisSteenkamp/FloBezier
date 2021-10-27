/**
 * Returns a refined root given a root bracketed in the interval (a,b) of the
 * given polynomial using Brent's Method - modified slightly to allow for
 * error certified bounds.
 *
 * * near exact implementation of the original Brent Dekker Method (also known
 * as Brent's Method), except that it is specialzed to polynomial evaluation
 *
 * * Brent's Method is an excellent root-refinement choice since:
 *  * guaranteed converge (unlike the Newton and other so-called single-point
 * methods),
 *  * converges in a reasonable number of iterations even for highly contrived
 * functions (unlike Dekker's Method) and
 *  * nearly always converges fast, i.e. super-linearly (unlike the Secant and
 * Regula-Falsi methods).
 * * unfortunately the algorithm given on [Wikipedia](https://en.wikipedia.org/wiki/Brent%27s_method)
 * works but is not precisely Brent's method and runs about 2x or more slower
 * due to it not implementing the critically important 'micro-step' (Aug 2020).
 *
 * * see [Brent (page 47)](https://maths-people.anu.edu.au/~brent/pd/rpb011i.pdf)
 * * [c++ implementation of Brent's Method](https://people.sc.fsu.edu/~jburkardt/cpp_src/brent/brent.cpp)
 *
 * @param p A polynomial with coefficients given densely as an array of double-double
 * floating point numbers from highest to lowest power, e.g. `[[0,5],[0,-3],[0,0]]`
 * represents the polynomial `5x^2 - 3x`. If `exact` is `true` then this is allowed
 * to be `undefined`.
 * @param pE An error polynomial that provides a coefficientwise error bound on
 * the input polynomial; all coefficients must be positive. If `exact` is `true`
 * then this is allowed to be `undefined`.
 * @param lb the lower limit of the search interval.
 * @param ub the upper limit of the search interval.
 * @param fa the result of evaluating the input polynomial at `a`
 * @param fb the result of evaluating the input polynomial at `b`
 * @param psExact
 * @param getPsExact
 * @param diffCount
 * @param exact set to true if you need to do exact evaluations from the start
 *
 * @internal
 */
declare function refineCertified(p: number[][] | undefined, pE: number[] | undefined, lb: number, ub: number, fa: number, fb: number, getPolyExact: () => number[][], exact?: boolean): number[];
/**
 * Refines exactly from the start
 * @param lb
 * @param ub
 * @param fa
 * @param fb
 * @param psExact
 * @param diffCount
 *
 * @internal
 */
declare function eRefineCertified(pExact: number[][], lb: number, ub: number, fa: number, fb: number): number[];
export { refineCertified, eRefineCertified };
