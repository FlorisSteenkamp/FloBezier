

import { evalDeCasteljauWithErr } from "../../../local-properties-at-t/t-to-xy/eval-de-casteljau-with-err";
import { γ } from '../../../error-analysis/error-analysis';

const γ1 = γ(1);

const eps = Number.EPSILON;
const u = eps/2;
const abs = Math.abs;


/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire given 
 * bezier curve from t1 to t2.
 * 
 * * **precondition:** t1 < t2
 * * **precondition:** t1,t2 >= 0 && t1,t2 <= 1
 * * **precondition**: 49-bit aligned coordinates (inherited from 
 * evalDeCasteljauWithErr - can easily be relaxed)
 * 
 * @param ps an order 1,2 or 3 bezier curve
 * @param ts [first, second] parameter values, e.g. [0.11, 0.12]
 */
function getIntervalBox(
        ps: number[][], 
        ts: number[]): number[][] {

    // For cubics:
    // if x0,x1,x2,x3 <= X (for some X) and t is an element of [0,1], then
    // max(dx)(t) <= 6*X for all t.
    // A tight bound occurs when -x0,x1,-x2,x3 === X and t === 1.
    // e.g. for X === 1,    max(dx)(t) === 6
    //      for x === 1024, max(dx)(t) === 6*1024 === 6144

    // For quadratics:
    // if x0,x1,x2 <= X (for some X) and t is an element of [0,1], then
    // max(dx)(t) <= 4*X for all t.

    // For lines
    // if x0,x1 <= X (for some X) and t is an element of [0,1], then
	// max(dx)(t) <= 2*X for all t.

    const [t1, t2] = ts;
    const Δt = t2 - t1;
    const tMid = t1 + Δt/2;

    let dxMaxΔt = 0;  // if t1 === t2
    let dyMaxΔt = 0;  // if t1 === t2
    if (ts[0] !== ts[1]) {
        // multiplier === 6x, 4x, 2x - see above comments
        const multiplier = 2*(ps.length - 1);  

        const xs: number[] = [];
        const ys: number[] = [];
        for (let i=0; i<ps.length; i++) {
            xs.push(abs(ps[i][0]));
            ys.push(abs(ps[i][1]));
        }

        let dxMax = 0;
        for (let i=0; i<xs.length; i++) {
            if (dxMax < xs[i]) { dxMax = xs[i]; }
        }
        let dyMax = 0;
        for (let i=0; i<ys.length; i++) {
            if (dyMax < ys[i]) { dyMax = ys[i]; }
        }
        //const dxMax = multiplier*max(...xs);
        //const dyMax = multiplier*max(...ys);

        const ΔtMax = Δt*(1 + γ1);  // <= this is probably not necessary

        dxMaxΔt = dxMax * ΔtMax;
        dyMaxΔt = dyMax * ΔtMax;
    }
    
    let { p, pE } = evalDeCasteljauWithErr(ps, tMid);
    
    const minX = p[0] - pE[0] - dxMaxΔt;
    const maxX = p[0] + pE[0] + dxMaxΔt;
    const minY = p[1] - pE[1] - dyMaxΔt;
    const maxY = p[1] + pE[1] + dyMaxΔt;

    return [[minX,minY],[maxX,maxY]];
}


export { getIntervalBox }
