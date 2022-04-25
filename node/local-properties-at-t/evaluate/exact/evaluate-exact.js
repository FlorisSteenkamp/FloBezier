import { toPowerBasisExact } from "../../../to-power-basis/to-power-basis/exact/to-power-basis-exact.js";
import { eHorner } from 'flo-poly';
/**
 * Returns the *exact* result of evaluating the given bezier curve at the
 * given `t` parameter.
 *
 * * the result is returned as `[x,y]`, where `x` and `y` are [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf) floating
 * point expansions
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
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
    const [X, Y] = toPowerBasisExact(ps);
    return [
        eHorner(X, t),
        eHorner(Y, t)
    ];
}
export { evaluateExact };
//# sourceMappingURL=evaluate-exact.js.map