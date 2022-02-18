import { getXYExact } from "../../../to-power-basis/get-xy/exact/get-xy-exact.js";
import { eHorner } from 'flo-poly';
/**
 * Returns the result of evaluating the given bezier curve at the parameter `t`
 * exactly (up to underflow / overflow).
 *
 * * **precondition**: TODO underflow/overflow
 * * the result is returned as `[x,y]`, where `x` and `y` are Shewchuk floating
 * point expansions
 *
 * @param ps
 * @param t
 *
 * @doc
 */
function evaluateExact(ps, t) {
    if (t === 0) {
        return [[ps[0][0]], [ps[0][1]]];
    }
    if (t === 1) {
        return [[ps[ps.length - 1][0]], [ps[ps.length - 1][1]]];
    }
    const [X, Y] = getXYExact(ps);
    return [
        eHorner(X, t),
        eHorner(Y, t)
    ];
}
export { evaluateExact };
//# sourceMappingURL=evaluate-exact.js.map