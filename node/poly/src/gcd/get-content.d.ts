/**
 * Returns cont(p), i.e. the content of the given polynomial defined as the
 * greatest common divisor of its coefficients.
 * * see e.g. https://en.wikipedia.org/wiki/Factorization_of_polynomials
 * * example: let p = -10x² + 5x + 5 = (-5)(2x² - x - 1) so that -5 is the
 * content of p and 2x² - x - 1 is its primitive part.
 * * **precondition** p must have integer coefficients
 * @param p a polynomial
 */
declare function getContent(p: number[]): number;
export { getContent };
