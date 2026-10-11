import { evaluate1stDerivativeExact } from '../../evaluate-1st-derivative/exact/evaluate-1st-derivative-exact.js';


/**
 * Returns the *exact* tangent vector (not necessarily of unit length) of an
 * order 0,1,2 or 3 bezier curve at a specific parameter `t`, i.e.
 * returns the `[x,y]` value of the once differentiated (with respect to `t`)
 * bezier curve's power basis when evaluated at `t`.
 *
 * * **alias**: [[evaluate1stDerivativeExact]], `eTangent`
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 *
 * @doc
 */
const tangentExact = evaluate1stDerivativeExact;


/**
 * Returns the *exact* tangent vector (not necessarily of unit length) of an
 * order 0,1,2 or 3 bezier curve at a specific parameter `t`, i.e.
 * returns the `[x,y]` value of the once differentiated (with respect to `t`)
 * bezier curve's power basis when evaluated at `t`.
 *
 * * **alias**: [[evaluate1stDerivativeExact]], `tangentExact`
 *
 * @param ps a linear, quadratic or cubic bezier, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param t the t parameter
 *
 * @doc
 */
const eTangent = evaluate1stDerivativeExact;


export { tangentExact, eTangent }
