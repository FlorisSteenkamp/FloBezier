/**
 * Evaluates the given bezier curve at the parameter t.
 *
 * @param ps An order 1, 2 or 3 bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param t The parameter value where the bezier should be evaluated
 *
 * @doc
 **/
declare function evalDeCasteljau(ps: number[][], t: number): number[];
export { evalDeCasteljau };
