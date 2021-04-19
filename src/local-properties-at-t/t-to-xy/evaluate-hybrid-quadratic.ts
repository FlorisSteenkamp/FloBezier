
import { evalDeCasteljau } from "./eval-de-casteljau";


/**
 * Evaluates the given hybrid quadratic at the given t and th parameters. (see 
 * toHybridQuadratic for details).
 * 
 * @param hq A hybrid quadratic 
 * @param t The bezier parameter value
 * @param th The parameter value for the hybrid quadratic point.
 * 
 * @doc
 */
function evaluateHybridQuadratic(
        hq: [number[], number[][], number[]], 
        t: number, th: number) {

    let P0 = hq[0];
    let P1 = evalDeCasteljau(hq[1], th);
    let P2 = hq[2];

    return evalDeCasteljau([P0, P1, P2], t);
}


export { evaluateHybridQuadratic }
