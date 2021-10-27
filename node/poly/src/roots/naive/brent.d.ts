/**
 * Returns a refined root given a root bracketed in the interval (a,b) of the
 * given function using Brent's Method. Any function can be supplied (it
 * does not even have to be continuous) as long as the root is bracketed.
 *
 * * near exact implementation of the original Brent Dekker Method (also known
 * as Brent's Method)
 *
 * * Brent's Method is an excellent root-refinement choice since:
 *   * guaranteed converge (unlike the Newton and other so-called single-point
 * methods),
 *   * converges in a reasonable number of iterations even for highly contrived
 * functions (unlike Dekker's Method) and
 *   * nearly always converges fast, i.e. super-linearly (unlike the Secant and
 * Regula-Falsi methods).
 * * unfortunately the algorithm given on [Wikipedia](https://en.wikipedia.org/wiki/Brent%27s_method)
 * works but is not precisely Brent's method and runs about 2x or more slower
 * due to it not implementing the critically important 'micro-step' (Aug 2020).
 *
 * * the algorithm stops once the interval width becomes equal or less than
 * `2 * Number.EPSILON * max(1,abs(a),abs(b))` where `a` and `b` are the current
 * lower and upper interval limits
 *
 * * see [Brent (page 47)](https://maths-people.anu.edu.au/~brent/pd/rpb011i.pdf)
 *
 * @param f the function for which the root is sought.
 * @param lb the lower limit of the search interval.
 * @param ub the upper limit of the search interval.
 *
 * @example
 * ```typescript
 * let p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
 * let f = t => Horner(p,t);
 * brent(f,2.2,3.8); //=> 3.000000000000003
 * brent(f,2.2,3.1); //=> 3.000000000000001
 * ```
 *
 * @doc
 */
declare function brent(f: (n: number) => number, lb: number, ub: number): number;
export { brent };
