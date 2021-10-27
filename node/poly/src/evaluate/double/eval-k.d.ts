/**
 * Returns the result of evaluating the given polynomial at `x` such that at least
 * the sign bit is correct *up to 3-times compensated evaluation (K = 4)*, i.e.
 * as if evaluating in double-double-double-double precision.
 *
 * * uses a staggered algorithm, first trying in double precision, then in
 * double-double and finally in double-double-double-double
 *
 * * see [Algorithms for Accurate, Validated and Fast Polynomial Evaluation, *Stef Graillat, Philippe Langlois and Nicolas Louvet*](https://projecteuclid.org/download/pdf_1/euclid.jjiam/1265033778)
 * * see also [*Philippe Langlois, Nicolas Louvet.* Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141–149. ffhal-00107222f](https://hal.archives-ouvertes.fr/hal-00107222/document)
 * * see also [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 *
 * @param p a polynomial with coefficients given densely as an array of double
 * floating point numbers from highest to lowest power, e.g. `[5,-3,0]`
 * represents the polynomial `5x^2 - 3x`
 * @param x the value at which to evaluate the polynomial
 *
 * @doc
 */
declare function evalK(p: number[], x: number): number;
declare function evalK2(p: number[], x: number): number;
declare function evalK4(p: number[], x: number): number;
export { evalK, evalK2, evalK4 };
