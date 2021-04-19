/**
 * Evaluates the given bezier curve at the parameter t, including error.
 *
 * * **precondition**: 49-bit aligned coordinates
 *
 * @param ps An order 1, 2 or 3 bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t The parameter value where the bezier should be evaluated
 **/
declare function evalDeCasteljauWithErr(ps: number[][], t: number): {
    p: number[];
    pE: number[];
};
export { evalDeCasteljauWithErr };
