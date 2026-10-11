import { Horner } from 'flo-poly';
import { toPowerBasis_1stDerivative } from "../../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js";
import { toPowerBasis_2ndDerivative } from "../../to-power-basis/to-power-basis-2nd-derivative/double/to-power-basis-2nd-derivative.js";

const { sqrt } = Math;


/**
 * Returns the curvature `κ` of the given linear, quadratic or cubic bezier
 * curve at a specific given parameter value `t`.
 *
 * * returns `Number.NaN` at a cusp - this can be tested for with `Number.isNaN`
 * * **curried:** if `t` is omitted a function of `t` is returned instead (the
 * power basis conversion is then only done once which is much faster if the
 * curvature is to be evaluated at many `t` values for the same curve)
 *
 * @param ps an order 1,2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the curvature should be evaluated (may
 * be omitted, see above)
 *
 * @doc mdx
 */
function curvature(ps: number[][]): (t: number) => number;
function curvature(ps: number[][], t: number): number;
function curvature(ps: number[][], t?: number): number | ((t: number) => number) {
    const ND = curvatureNDOf(ps);
    const f = (t: number) => { const [N,D] = ND(t); return N/D; };

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


/**
 * Returns the radius of curvature of the given linear, quadratic or cubic
 * bezier curve at a specific given parameter value `t`.
 *
 * * **curried:** if `t` is omitted a function of `t` is returned instead (see
 * [[curvature]])
 *
 * @param ps an order 1,2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the radius of curvature should be
 * evaluated (may be omitted, see above)
 */
function radiusOfCurvature(ps: number[][]): (t: number) => number;
function radiusOfCurvature(ps: number[][], t: number): number;
function radiusOfCurvature(ps: number[][], t?: number): number | ((t: number) => number) {
    const ND = curvatureNDOf(ps);
    const f = (t: number) => { const [N,D] = ND(t); return D/N; };

    return t === undefined ? f : f(t);
}


/**
 * Returns the numerator and denominator of curvature `[N,D]`, i.e. `κ = N/D`
 * of the given linear, quadratic or cubic bezier curve at a specific given
 * parameter value `t`.
 *
 * * **curried:** if `t` is omitted a function of `t` is returned instead (see
 * [[curvature]])
 *
 * @param ps an order 1,2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value (may be omitted, see above)
 */
function curvatureND(ps: number[][]): (t: number) => [number,number];
function curvatureND(ps: number[][], t: number): [number,number];
function curvatureND(ps: number[][], t?: number): [number,number] | ((t: number) => [number,number]) {
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
function curvatureNDOf(ps: number[][]): (t: number) => [number,number] {
    const [dX,dY] = toPowerBasis_1stDerivative(ps);
    const [ddX,ddY] = toPowerBasis_2ndDerivative(ps);

    return (t: number): [number,number] => {
        const dx  = Horner(dX, t);
        const dy  = Horner(dY, t);
        const ddx = Horner(ddX, t);
        const ddy = Horner(ddY, t);

        const a = dx*ddy - dy*ddx;
        const b = sqrt((dx*dx + dy*dy)**3);

        return [a,b];
    }
}


export { κ, curvature, radiusOfCurvature, curvatureND }
