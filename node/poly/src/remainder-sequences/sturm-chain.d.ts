/**
 * Returns an exact Sturm chain for the given polynomial using pseudo remainders.
 * * https://en.wikipedia.org/wiki/Sturm%27s_theorem
 * * https://en.wikipedia.org/wiki/Polynomial_greatest_common_divisor#Pseudo-remainder_sequences
 * @param p a polynomial
 * @example
 * sturmChain([[-3],[4],[2],[-2]]);
 */
declare function sturmChainExact(p: number[][]): number[][][];
/**
 * Returns an approximate Sturm chain for the given polynomial.
 * See https://en.wikipedia.org/wiki/Sturm%27s_theorem
 * @param p a polynomial
 * @example
 * sturmChain([-3,4,2,-2]); //=> [[-3, 4, 2, -2], [-9, 8, 2], [-2.5185185185185186, 1.7037037037037037], [-3.2932525951557086]]
 */
declare function sturmChain(p: number[]): number[][];
export { sturmChain, sturmChainExact };
