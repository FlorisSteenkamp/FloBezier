import { dkdtAt0 } from "./dkdt-at-0";
import { dsdtSquaredAt0 } from "./dsdt-squared-at-0";
import { ddkdttAt0 } from './ddk-dtt-at-0';
import { ddtdssAt0 } from "./ddtdss-at-0";


/**
 * Returns the 2nd derivative (w.r.t `s`, the arc length) of the signed 
 * curvature `k` of the given cubic bezier curve at `t === 0`.
 * 
 * @param ps an order 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 */
function ddkdssAt0(
        ps: number[][]): number {

        return ddkdttAt0(ps)/dsdtSquaredAt0(ps) + dkdtAt0(ps)*ddtdssAt0(ps);
}


export { ddkdssAt0 }
