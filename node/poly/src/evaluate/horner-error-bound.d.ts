/**
 * Classic rule of thumb error bound when using Horner's method to evaluate
 * polynomials.
 * see for instance compensated horner evaluation http://www-pequan.lip6.fr/~jmc/polycopies/Compensation-horner.pdf"
 * @param p The polynomial
 * @param x Value at which polynomial is evaluated.
 */
declare function hornerErrorBound(p: number[], x: number): number;
export { hornerErrorBound };
