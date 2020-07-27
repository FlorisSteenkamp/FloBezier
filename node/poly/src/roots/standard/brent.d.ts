/**
 * Searches an interval (a,b) for a root (i.e. zero) of the
 * given function with respect to its first argument using the Brent's
 * Method root-finding algorithm. Any function can be supplied (it does
 * not even have to be continuous) as long as the root is bracketed.
 *
 * Brent's Method is an excellent root-finding choice since:
 * * guaranteed to converge (unlike the Newton and other so-called
 * single-point methods),
 * * converges in a reasonable number of iterations even for highly contrived
 * functions (unlike Dekker's Method) and
 * * nearly always converges fast, i.e. super-linearly (unlike the Secant and
 * Regula-Falsi methods).
 *
 * The max error, δ, is set equal to 2*Number.EPSILON*Math.abs(b)
 * after each iteration where b is the max of the current 2 best
 * guesses.
 *
 * See https://en.wikipedia.org/wiki/Brent%27s_method
 * See Brent (page 47) https://maths-people.anu.edu.au/~brent/pd/rpb011i.pdf
 * @param f the function for which the root is sought.
 * @param a the lower limit of the search interval.
 * @param b the upper limit of the search interval.
 * @example
 * let p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
 * let f = evaluate(p);
 * brent(f,2.2,3.8); //=> 3.000000000000003
 * brent(f,2.2,3.1); //=> 3.000000000000001
 */
declare function brent(f: (n: number) => number, a: number, b: number): number;
export { brent };
