import { Horner } from 'flo-poly';
import { toPowerBasis_1stDerivative } from "../../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js";
import { toPowerBasis_2ndDerivative } from "../../to-power-basis/to-power-basis-2nd-derivative/double/to-power-basis-2nd-derivative.js";
const { sqrt } = Math;
function curvature(ps, t) {
    const ND = curvatureNDOf(ps);
    const f = (t) => { const [N, D] = ND(t); return N / D; };
    return t === undefined ? f : f(t);
}
/**
 * Alias for [[curvature]].
 *
 * Returns the curvature `κ` of the given linear, quadratic or cubic bezier
 * curve at a specific given parameter value `t`.
 *
 * * **alias**: [[curvature]]
 *
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the curvature should be evaluated
 *
 * @doc
 */
const κ = curvature;
function radiusOfCurvature(ps, t) {
    const ND = curvatureNDOf(ps);
    const f = (t) => { const [N, D] = ND(t); return D / N; };
    return t === undefined ? f : f(t);
}
function curvatureND(ps, t) {
    const f = curvatureNDOf(ps);
    return t === undefined ? f : f(t);
}
/**
 * Returns a function of `t` that returns the numerator and denominator of the
 * curvature `[N,D]` of the given bezier curve (the power basis conversion is
 * done once up front).
 *
 * @internal
 */
function curvatureNDOf(ps) {
    const [dX, dY] = toPowerBasis_1stDerivative(ps);
    const [ddX, ddY] = toPowerBasis_2ndDerivative(ps);
    return (t) => {
        const dx = Horner(dX, t);
        const dy = Horner(dY, t);
        const ddx = Horner(ddX, t);
        const ddy = Horner(ddY, t);
        const a = dx * ddy - dy * ddx;
        const b = sqrt((dx * dx + dy * dy) ** 3);
        return [a, b];
    };
}
export { κ, curvature, radiusOfCurvature, curvatureND };
//# sourceMappingURL=curvature.js.map