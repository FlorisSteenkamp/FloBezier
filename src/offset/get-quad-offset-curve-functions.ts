import { toPowerBasis } from "../to-power-basis/to-power-basis/double/to-power-basis.js";

const { sqrt } = Math;


/**
 * Returns the `x` and `y` coordinate functions (of the parameter `t`) of the
 * offset curve (at a distance `D` in the normal direction) of the given
 * quadratic bezier curve.
 *
 * @param ps a quadratic bezier curve given as an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,0]]`
 * @param D distance of offset curve (can be negative)
 *
 * @internal
 */
function getQuadOffsetCurveFunctions(
        ps: number[][],
        D: number) {

    const [[a,b,c],[d,e,f]] = toPowerBasis(ps);

    return {
        X: (t: number) => {
            const T = (2*a*t + b)**2 + (2*d*t + e)**2;

            return D*( 2*d*t + e)/sqrt(T) + a*t**2 + b*t + c;
        },
        Y: (t: number) => {
            const T = (2*a*t + b)**2 + (2*d*t + e)**2;

            return D*(-2*a*t - b)/sqrt(T) + d*t**2 + e*t + f;
        }
    }
}


export { getQuadOffsetCurveFunctions }
