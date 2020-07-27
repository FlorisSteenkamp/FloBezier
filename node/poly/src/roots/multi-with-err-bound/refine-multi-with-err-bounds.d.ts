/**
 * Exact, original Brent Dekker Method - modified slightly to allow for error
 * bounds.
 * * returns a refined bound of max width 2*Number.EPSILON
 * * see https://people.sc.fsu.edu/~jburkardt/cpp_src/brent/brent.cpp
 * @param p
 * @param pE
 * @param a
 * @param b
 * @param fa
 * @param fb
 * @param psExact
 * @param getPsExact
 * @param diffCount
 */
declare function refineMultiWithErrBounds(p: number[][], pE: number[], lb: number, ub: number, fa: number, fb: number, psExact: {
    ps: number[][][];
}, getPsExact: () => number[][][], diffCount: number, δ?: number): number[];
export { refineMultiWithErrBounds };
