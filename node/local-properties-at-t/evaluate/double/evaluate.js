import { toPowerBasis } from "../../../to-power-basis/to-power-basis/double/to-power-basis.js";
import { Horner } from 'flo-poly';
/**
 * Returns the resulting point of evaluating the given bezier curve at the
 * given parameter `t`.
 *
 * * uses power bases conversion and subsequently [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 * to evaluate the polynomial in double precision floating point arithmetic.
 *
 * The resulting point `p` is returned as the pair `[x,y]`, where `x` and `y` are
 * double precision floating point numbers.
 *
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated
 *
 * @doc mdx
 */
function evaluate(ps, t) {
    const len = ps.length;
    if (t === 0) {
        return ps[0];
    }
    if (t === 1) {
        return ps[len - 1];
    }
    const [X, Y] = toPowerBasis(ps);
    return [
        Horner(X, t),
        Horner(Y, t)
    ];
}
export { evaluate };
//# sourceMappingURL=evaluate.js.map