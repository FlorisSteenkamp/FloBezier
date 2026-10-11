import { toPowerBasis } from "../../../to-power-basis/to-power-basis/double/to-power-basis.js";
import { Horner } from 'flo-poly';


/**
 * Returns the resulting point of evaluating the given bezier curve at the
 * given parameter `t`.
 *
 * * uses power bases conversion and subsequently [Horner's Method](https://en.wikipedia.org/wiki/Horner%27s_method)
 * to evaluate the polynomial in double precision floating point arithmetic.
 * * **curried:** if `t` is omitted a function of `t` is returned instead (the
 * power basis conversion is then only done once which is much faster if the
 * curve is to be evaluated at many `t` values)
 *
 * The resulting point `p` is returned as the pair `[x,y]`, where `x` and `y` are
 * double precision floating point numbers.
 *
 * @param ps an order 1, 2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated (may be
 * omitted, see above)
 *
 * @doc mdx
 */
function evaluate(ps: number[][]): (t: number) => number[];
function evaluate(ps: number[][], t: number): number[];
function evaluate(ps: number[][], t?: number): number[] | ((t: number) => number[]) {
    const len = ps.length;
    const [X,Y] = toPowerBasis(ps);

    const f = (t: number) => {
        if (t === 0) { return ps[0]; }
        if (t === 1) { return ps[len-1]; }

        return [
            Horner(X, t),
            Horner(Y, t)
        ];
    }

    return t === undefined ? f : f(t);
}


export { evaluate }
