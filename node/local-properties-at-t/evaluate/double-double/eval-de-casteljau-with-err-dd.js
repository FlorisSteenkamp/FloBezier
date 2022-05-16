import { evalDeCasteljauError as evalDeCasteljauError_ } from "../eval-de-casteljau-error.js";
import { evalDeCasteljauDd as evalDeCasteljauDd_ } from "./eval-de-casteljau-dd.js";
import { γγ } from '../../../error-analysis/error-analysis.js';
// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const evalDeCasteljauDd = evalDeCasteljauDd_;
const evalDeCasteljauError = evalDeCasteljauError_;
const γγ3 = γγ(3);
/**
 * Returns the resulting point (in double-double precision) of evaluating the
 * given bezier curve at the given parameter `t` (including a coordinate-wise
 * error bound).
 *
 * * uses [De Casteljau's algorithm](https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm)
 * in double-double precision floating point arithmetic.
 *
 * The resulting point is returned as `{ p: number[][], pE: number[] }`,
 * where `p` is the point `[x,y]` (with `x` and `y` in double-double precision)
 * and `pE` is the corresponding coordinate-wise absolute error bound of the
 * calculation.
 *
 * @param ps an order 1,2 or 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the parameter value where the bezier should be evaluated
 *
 * @doc mdx
 **/
function evalDeCasteljauWithErrDd(ps, t) {
    const p = evalDeCasteljauDd(ps, t);
    const pE = evalDeCasteljauError(ps, t);
    if (ps.length === 4) {
        return { p, pE: pE.map(e => 2 * 9 * γγ3 * e) };
    }
    if (ps.length === 3) {
        return { p, pE: pE.map(e => 2 * 6 * γγ3 * e) };
    }
    if (ps.length === 2) {
        return { p, pE: pE.map(e => 2 * 3 * γγ3 * e) };
    }
    if (ps.length === 1) {
        return { p: [ps[0]], pE: [0, 0] };
    }
    throw new Error('The given bezier curve must be of order <= 3.');
}
export { evalDeCasteljauWithErrDd };
//# sourceMappingURL=eval-de-casteljau-with-err-dd.js.map