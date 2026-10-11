import { toPowerBasis_1stDerivative } from "../../../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js";
import { Horner } from 'flo-poly';


/**
 * Returns the `[x,y]` value of the once differentiated (with respect to `t`)
 * bezier curve's power basis when evaluated at `t`.
 *
 * * uses double precision calculations internally
 * * **curried:** if `t` is omitted a function of `t` is returned instead (the
 * power basis conversion is then only done once which is much faster if the
 * derivative is to be evaluated at many `t` values for the same curve)
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter (may be omitted, see above)
 *
 * @doc mdx
 */
function evaluate1stDerivative(ps: number[][]): (t: number) => number[];
function evaluate1stDerivative(ps: number[][], t: number): number[];
function evaluate1stDerivative(ps: number[][], t?: number): number[] | ((t: number) => number[]) {
    const [dPsX, dPsY] = toPowerBasis_1stDerivative(ps);

    const f = (t: number) => [
        Horner(dPsX, t),
        Horner(dPsY, t)
    ];

    return t === undefined ? f : f(t);
}


export { evaluate1stDerivative }
