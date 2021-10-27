/**
 * Returns a refined root given a root bracketed in the interval (a,b) of the
 * given polynomial using Brent's Method.
 *
 * * near exact implementation of the original Brent Dekker Method (also known
 * as Brent's Method), except that it is specialzed to polynomial evaluation
 *
 * * the algorithm stops once the interval width becomes equal or less than
 * `2 * Number.EPSILON/2 * max(1,abs(a),abs(b))` where `a` and `b` are the current
 * lower and upper interval limits
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
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param lb the lower limit of the search interval.
 * @param ub the upper limit of the search interval.
 * @param fa (may be left out - will be calculated automatically) the result of
 * evaluating the input polynomial at `a`
 * @param fb (may be left out - will be calculated automatically) the result of
 * evaluating the input polynomial at `b`
 *
 * @example
 * ```typescript
 * const p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
 * const a = 2.2;
 * const b = 3.8;
 * brent(p,a,b); //=> 3.000000000000003
 * b = 3.1;
 * brent(p,a,b); //=> 3.000000000000001
 * ```
 *
 * @doc
 */
declare function brentPoly(p: number[], lb: number, ub: number, fa?: number, fb?: number): number;
export { brentPoly };
