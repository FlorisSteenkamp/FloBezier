/**
 * Returns a string representing the given polynomial that is readable by a
 * human or a CAS (Computer Algebra System).
 * @param p a polynomial
 * @example
 * toCasStr([5,4,3,2,1]); //=> "x^4*5 + x^3*4 + x^2*3 + x*2 + 1"
 */
declare function toCasStr(p: number[] | number[][]): string;
export { toCasStr };
