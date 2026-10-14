import { dkdtAt0 } from "./dkdt-at-0";
import { dsdtSquaredAt0 } from "./dsdt-squared-at-0";

const sqrt = Math.sqrt;


/**
 * Returns the derivative (w.r.t `t`) of the signed curvature `k` of the given 
 * cubic bezier curve at `t === 0`.
 * 
 * @param ps an order 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 */
function dkdsAt0(
        ps: number[][]): number {

	return dkdtAt0(ps) / sqrt(dsdtSquaredAt0(ps));
}


export { dkdsAt0 }
