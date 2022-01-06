import { type HausdorffResult } from './hausdorff-result.js';
import { distanceBetween } from 'flo-vector2d';
import { allRoots } from 'flo-poly';
import { evalDeCasteljau } from '../../local-properties-at-t/t-to-xy/double/eval-de-casteljau.js';
import { getXY } from '../../to-power-basis/get-xy/double/get-xy.js';


/**
 * 
 * @param A 
 * @param B 
 * @param bestResult the largest distance found so far (including details)
 * 
 * @internal
 */
function hausdorffDistanceLC_TypeI(
        A: number[][],
        B: number[][],
        bestResult: HausdorffResult): HausdorffResult {

    const [[ax1,ax0],[ay1,ay0]] = getXY(A);
    const [[bx3,bx2,bx1,bx0],[by3,by2,by1,by0]] = getXY(B);

    //--------------------------------------------------------------------------
    // Candidate points of type I (see [1], eqs (9) and (10))
    //--------------------------------------------------------------------------
    // "For the fourth type of possible candidate points we observe that the Hausdorff
    //  distance can occur between two interior points P ∈ a and Q ∈ b without one of
    //  them lying on the medial axis of the other curve..."
    //--------------------------------------------------------------------------
    // (xa(t) - xb(s)) · x′b(s) + (ya(t) - yb(s)) · y′b(s) = 0
    // (xa(t) - xb(s)) · x′a(t) + (ya(t) - yb(s)) · y′a(t) = 0

    // e1 = t*(a*s**2 + b*s + c) + (d*s**5 + e*s**4 + f*s**3 + g*s**2 + h*s + i)
    const a = /*t*ss */3*ax1*bx3 + 3*ay1*by3;
    const b = /*t*s  */2*ax1*bx2 + 2*ay1*by2;
    const c = /*t    */ax1*bx1 + ay1*by1;
    const d = /*sssss*/-3*bx3**2 - 3*by3**2;
    const e = /*ssss */-5*bx2*bx3 - 5*by2*by3;
    const f = /*sss  */-4*bx1*bx3 - 2*bx2**2 - 4*by1*by3 - 2*by2**2;
    const g = /*ss   */3*ax0*bx3 + 3*ay0*by3 - 3*bx0*bx3 - 3*bx1*bx2 - 3*by0*by3 - 3*by1*by2;
    const h = /*s    */2*ax0*bx2 + 2*ay0*by2 - 2*bx0*bx2 - bx1**2 - 2*by0*by2 - by1**2;
    const i = /*     */ax0*bx1 + ay0*by1 - bx0*bx1 - by0*by1;

    // e2 = j*s**2 + k*s + l
    const s2 = /*ss */3*ax1*by3 - 3*ay1*bx3;
    const s1 = /*s  */2*ax1*by2 - 2*ay1*bx2;
    const s0 = /*   */ax1*by1 - ay1*bx1;

    const poly = [s2,s1,s0];
    const sRoots = allRoots(poly,0,1);
    for (let ii=0; ii<sRoots.length; ii++) {
        const s = sRoots[ii];

        // e1 = t*(a*s**2 + b*s + c) + (d*s**5 + e*s**4 + f*s**3 + g*s**2 + h*s + i)
        const ss = s*s;
        const ssss = ss*ss;
        const t1 = a*ss + b*s + c;
        const t0 = d*ssss*s + e*ssss + f*ss*s + g*ss + h*s + i;

        // All roots of the polynomial [t1,t0]
        const t = -t0/t1;

        if (t >= 0 && t <= 1) {
            const pB = evalDeCasteljau(B,s);
            const pA = evalDeCasteljau(A,t);
            const d = distanceBetween(pA,pB);
            
            if (d > bestResult.d) { 
                bestResult = { d, pA, pB, t, s }; 
            }
        }
    }

    return bestResult;
}


export { hausdorffDistanceLC_TypeI }
