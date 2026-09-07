import { toPowerBasis_1stDerivative } from "../../../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js";
import { Horner } from 'flo-poly';
/**
 * Returns the `[x,y]` value of the once differentiated (with respect to `t`)
 * bezier curve's power basis when evaluated at `t`.
 *
 * * uses double precision calculations internally
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 *
 * @doc mdx
 */
function evaluate1stDerivative(ps, t) {
    const [dPsX, dPsY] = toPowerBasis_1stDerivative(ps);
    return [
        Horner(dPsX, t),
        Horner(dPsY, t)
    ];
}
export { evaluate1stDerivative };
//# sourceMappingURL=evaluate-1st-derivative.js.map