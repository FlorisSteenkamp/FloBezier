import { toPowerBasis_1stDerivativeExact } from "../../../to-power-basis/to-power-basis-1st-derivative/exact/to-power-basis-1st-derivative-exact.js";
import { eHorner } from 'flo-poly';


/**
 * Returns the *exact* result, `[x,y]`, of evaluating the 1st derivative of a 
 * linear, quadratic or cubic bezier curve's power basis at `t`.
 * 
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 * 
 * @doc mdx
 */
function evaluate1stDerivativeExact(ps: number[][], t: number): number[][] {
    const [dPsX, dPsY] = toPowerBasis_1stDerivativeExact(ps);

    return [eHorner(dPsX, t), eHorner(dPsY, t)];
}


export { evaluate1stDerivativeExact }
