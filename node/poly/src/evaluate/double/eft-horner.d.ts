/**
 * Returns an EFT (error free transformation) for the Horner evaluation of a
 * polymial at a specified x. The result is returned as an object with
 * properties: r̂ -> the calculated evaluation, pπ and pσ -> two polynomials
 * with coefficients around 2^53 times smaller than the input polynomial.
 *
 * * r̂ + pπ(x) + pσ(x) = the *exact* evaluation (no error)
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
declare function EFTHorner(p: number[], x: number): {
    r̂: number;
    pπ: number[];
    pσ: number[];
};
export { EFTHorner };
