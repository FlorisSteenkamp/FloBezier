import { toPowerBasis } from "../to-power-basis/to-power-basis/double/to-power-basis.js";
const { sqrt } = Math;
function getQuadOffsetCurveFunctions(ps, D) {
    const [[a, b, c], [d, e, f]] = toPowerBasis(ps);
    return {
        X: (t) => {
            const T = (2 * a * t + b) ** 2 + (2 * d * t + e) ** 2;
            return D * (2 * d * t + e) / sqrt(T) + a * t ** 2 + b * t + c;
        },
        Y: (t) => {
            const T = (2 * a * t + b) ** 2 + (2 * d * t + e) ** 2;
            return D * (-2 * a * t - b) / sqrt(T) + d * t ** 2 + e * t + f;
        }
    };
}
export { getQuadOffsetCurveFunctions };
//# sourceMappingURL=get-quad-offset-curve-functions.js.map