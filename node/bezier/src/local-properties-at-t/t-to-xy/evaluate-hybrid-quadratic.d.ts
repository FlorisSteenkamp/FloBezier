/**
 * Evaluates the given hybrid quadratic at the given t and th parameters. (see
 * toHybridQuadratic for details).
 * @param hq A hybrid quadratic
 * @param t The bezier parameter value
 * @param th The parameter value for the hybrid quadratic point.
 */
declare function evaluateHybridQuadratic(hq: [number[], number[][], number[]], t: number, th: number): number[];
export { evaluateHybridQuadratic };
