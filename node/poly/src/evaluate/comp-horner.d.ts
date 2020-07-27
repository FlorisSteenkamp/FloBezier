/**
 * Returns a result of evaluating a univariate polynomial using once compensated
 * Horner's method.
 *
 * see https://hal.archives-ouvertes.fr/hal-00107222/document
 * (Faithful Polynomial Evaluation with Compensated Horner Algorithm)
 * Philippe Langlois, Nicolas Louvet. Faithful Polynomial Evaluation with Compensated Horner Algorithm. ARITH18: 18th IEEE International Symposium on Computer Arithmetic, Jun 2007, Montpellier, France. pp.141–149. ffhal-00107222f
 *
 * See https://en.wikipedia.org/wiki/Horner%27s_method
 * @param p a polynomial
 * @param x the value at which to evaluate the polynomial
 */
declare function compHorner(p: number[], x: number): number;
export { compHorner };
