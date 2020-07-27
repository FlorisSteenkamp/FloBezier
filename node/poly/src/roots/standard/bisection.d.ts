/**
 * Searches an interval (a,b) for a root (i.e. zero) of the
 * given function with respect to its first argument using the Bisection
 * Method root-finding algorithm. Any function can be supplied (it does
 * not even have to be continuous) as long as the root is bracketed.
 *
 * Note: This function has no advantages above the Brent method except
 * for its simpler implementation and can be much slower. Use brent
 * instead.
 * @param f the function for which the root is sought.
 * @param a the lower limit of the search interval.
 * @param b the upper limit of the search interval.
 * @example
 * let p = fromRoots([-10,2,3,4]);  //=> [1, 1, -64, 236, -240]
 * let f = evaluate(p);
 * bisection(f,2.2,3.8); //=> 3
 * bisection(f,2.2,3.1); //=> 3.0000000000000044
 */
declare function bisection(f: (n: number) => number, a: number, b: number): number;
export { bisection };
