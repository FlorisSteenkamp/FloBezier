import { dddkdtttAt0 } from './dddk-dttt-at-0';
import { ddkdttAt0 } from './ddk-dtt-at-0';
import { ddtdssAt0 } from './ddtdss-at-0';
import { dkdtAt0 } from './dkdt-at-0';
import { dtdsAt0 } from './dtds-at-0';


/**
 * Returns the 3rd derivative (w.r.t `s`, the arc length) of the signed 
 * curvature `k` of the given cubic bezier curve at `t === 0`.
 * 
 * @param ps an order 3 bezier curve, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @internal
 */
function dddkdsssAt0(
        ps: number[][]): number {

    const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps;
    
    const xa = x1 - x0;
    const ya = y1 - y0;
    const xb = x0 - 2*x1;
    const yb = y0 - 2*y1;
    const xc = x0 - 3*x1;
    const yc = y0 - 3*y1;


    // d(dt/ds) / dt
    const d__dt_ds__dt = 
        -2/3*(xa*(xb + x2) + ya*(yb + y2)) * 
             (xa*xa + ya*ya)**(-1.5);

    // d(d²t/ds²) / dt
    const d__ddt_dss__dt = 
        16/9*(xa*(xb + x2) + ya*(yb + y2))**2 *
             (xa*xa + ya*ya)**(-3) 
        + 
        2/9*(xa*xa + ya*ya)**(-2) * 
              (xa*(xc + 3*x2 - x3) + 
               ya*(yc + 3*y2 - y3) + 
               -2*(xb + x2)*(xb + x2) + 
               -2*(yb + y2)*(yb + y2));
        
    const dtds = dtdsAt0(ps);

    return (
        dddkdtttAt0(ps)*dtds**3 + 
        ddkdttAt0(ps)*(2*dtds**2*d__dt_ds__dt + dtds*ddtdssAt0(ps)) + 
        dtds*dkdtAt0(ps)*d__ddt_dss__dt
    );
}


export { dddkdsssAt0 }
