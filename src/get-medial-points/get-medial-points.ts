import { Horner, roots } from 'flo-poly';
import { getMedialPointCoeffs } from './get-medial-point-coeffs.js';


/**
 * Returns candidate ray parameter values `t`, bezier parameter values `s` and
 * medial points for points `q(t)` and b(s) that satisfy the medial condition with
 * respect to `p` and `ps`:
 * 
 * Let `p` be a fixed point in the plane.
 * Let `v` be a direction vector defining the ray `q(t) = p + t⋅v`.
 * Let `ps` be a bezier curve.
 *
 * * `q(t)` is equidistant from `p` and the nearest point on `ps`
 * * that common distance is locally minimal among such candidates
 *
 * In other words, this function returns candidate ray parameters for the
 * sought medial point(s). Selecting physically valid solutions (if needed)
 * is done by the caller or by a later stage of this routine.
 *
 * @param p base point
 * @param v ray direction from `p`
 * @param ps bezier curve given as an array of control points, e.g. `[[0,0],[1,1],[2,1]]`
 */
function getMedialPoints(
        p: number[],
        v: number[],
        ps: number[][]) {

    // -----------------------------------------------------
    // See get-medial-points.md for implementation details.
    // -----------------------------------------------------
    const len = ps.length;
    if (len <= 1) {
        throw new Error(`Bezier curve must be of order 1, 2 or 3. Found: ${len-1}`);
    }

    const { A, B, H } = getMedialPointCoeffs(p,v,ps);

    /** the possible parameter values of the bezier curve */
    const ss = (roots(H, 0, 1) || []).map(r => r.t);//?
    /** the possible parameter values of the ray */
    const ts: number[] = [];
    /** the possible points on the ray */
    const qs: number[][] = [];
    for (const s of ss) {
        const As = Horner(A, s);
        const Bs = Horner(B, s);

        const t = -Bs / As;
        ts.push(t);

        const q = [p[0] + t*v[0], p[1] + t*v[1]];
        qs.push(q);
    }

    return { ts, ss, qs };
}


export { getMedialPoints }
