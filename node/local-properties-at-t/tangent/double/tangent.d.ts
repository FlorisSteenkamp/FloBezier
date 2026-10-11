import { evaluate1stDerivative } from '../../evaluate-1st-derivative/double/evaluate-1st-derivative.js';
/**
 * Returns the tangent vector (not necessarily of unit length) of an
 * order 0,1,2 or 3 bezier curve at a specific given parameter value `t`, i.e.
 * returns the `[x,y]` value of the once differentiated (with respect to `t`)
 * bezier curve's power basis when evaluated at `t`.
 *
 * * **alias**: [[evaluate1stDerivative]]
 * * uses double precision calculations internally
 * * **curried:** if `t` is omitted a function of `t` is returned instead (the
 * power basis conversion is then only done once which is much faster if the
 * tangent is to be evaluated at many `t` values for the same curve)
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter (may be omitted, see above)
 *
 * @doc mdx
 */
declare const tangent: typeof evaluate1stDerivative;
export { tangent };
