import { Horner } from 'flo-poly';
import { getDxy } from '../../../to-power-basis/get-dxy/double/get-dxy.js';
/**
 * Returns the `[x,y]` value of the once differentiated (with respect to `t`)
 * bezier curve when evaluated at `t`.
 *
 * * uses double precision calculations internally
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 *
 * @doc mdx
 */
function evaluateDxy(ps, t) {
    const [dX, dY] = getDxy(ps);
    return [Horner(dX, t), Horner(dY, t)];
}
export { evaluateDxy };
//# sourceMappingURL=evaluate-dxy.js.map