/**
 * Evaluates the given bezier curve at the parameter t given as a double-double,
 * including error.
 * * **precondition**: 49-bit aligned bezier coordinates
 *
 * @param ps an order 1, 2 or 3 bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t the parameter value where the bezier should be evaluated
 *
 * @doc
 **/
declare function evalDeCasteljauWithErrDd(ps: number[][], t: number[]): {
    p: number[][];
    pE: number[];
};
export { evalDeCasteljauWithErrDd };
