/**
 * Returns the approximate result of multiplying 2 polynomials.
 * * See polynomial arithmetic https://en.wikipedia.org/wiki/Polynomial_arithmetic
 * * See polynomial multiplication https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication
 * * See polynomial multiplication http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf
 * @param p1 a polynomial.
 * @param p2 another polynomial.
 * @example
 * multiply([1,2,3], [2,5,3,5]); //=> [2, 9, 19, 26, 19, 15]
 */
declare function multiply(p1: number[], p2: number[]): number[];
/**
 * Returns the exact result of multiplying 1 or more polynomials.
 * * See polynomial arithmetic https://en.wikipedia.org/wiki/Polynomial_arithmetic
 * * See polynomial multiplication https://en.wikipedia.org/wiki/Discrete_Fourier_transform#Polynomial_multiplication
 * * See polynomial multiplication http://web.cs.iastate.edu/~cs577/handouts/polymultiply.pdf
 * @param p1 a polynomial.
 * @param p2 another polynomial.
 * @example
 * multiply([[1],[2],[3]], [[2],[5],[3],[5]]); //=> [[2], [9], [19], [26], [19], [15]]
 */
declare function multiplyExact(ps: number[][][]): number[][];
export { multiply, multiplyExact };
