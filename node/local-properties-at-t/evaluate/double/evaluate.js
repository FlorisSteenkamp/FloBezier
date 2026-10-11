import { toPowerBasis } from "../../../to-power-basis/to-power-basis/double/to-power-basis.js";
import { Horner } from 'flo-poly';
function evaluate(ps, t) {
    const len = ps.length;
    const [X, Y] = toPowerBasis(ps);
    const f = (t) => {
        if (t === 0) {
            return ps[0];
        }
        if (t === 1) {
            return ps[len - 1];
        }
        return [
            Horner(X, t),
            Horner(Y, t)
        ];
    };
    return t === undefined ? f : f(t);
}
export { evaluate };
//# sourceMappingURL=evaluate.js.map