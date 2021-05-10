import { evalDeCasteljau } from "./eval-de-casteljau";


/**
 * Returns the result of evaluating the given hybrid quadratic bezier curve at 
 * the given `t` and `th` parameters. (see [[toHybridQuadratic]] for details).
 * 
 * The resulting point `p` is returned as the pair `[x,y]`, where `x` and `y` are 
 * double precision floating point numbers.
 * 
 * @param hq a hybrid quadratic bezier curve
 * @param t the bezier parameter value
 * @param th the parameter value of the hybrid quadratic point
 * 
 * @doc mdx
 */
function evaluateHybridQuadratic(
        hq: [number[], number[][], number[]], 
        t: number, th: number): number[] {

    let P0 = hq[0];
    let P1 = evalDeCasteljau(hq[1], th);
    let P2 = hq[2];

    return evalDeCasteljau([P0, P1, P2], t);
}


export { evaluateHybridQuadratic }
