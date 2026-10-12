import { Horner, roots } from 'flo-poly';
import { getMedialPointCoeffs } from './get-medial-point-coeffs.js';


const { abs } = Math;


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
 * * if `ps` is a point (an order 0 bezier curve), the single candidate is the
 * intersection of the ray with the perpendicular bisector of `p` and the
 * point, i.e. `t = -|p - P|² / (2v⋅(p - P))`; its bezier parameter value is
 * returned as `0` (since all parameter values give the same point)
 * * candidates are not filtered, e.g. `t` can be negative (the medial point
 * lies behind `p`) or `NaN` (no solution, e.g. the ray is parallel to the 
 * perpendicular bisector, or the solution is degenerate, e.g. `p` coincides
 * with the point)
 *
 * @param p base point
 * @param v ray direction from `p`
 * @param ps an order 0, 1, 2 or 3 bezier curve given as an array of control 
 * points, e.g. `[[0,0],[1,1],[2,1]]`
 */
function getMedialPoints(
        p: number[],
        v: number[],
        ps: number[][]) {

    // -----------------------------------------------------
    // See get-medial-points.md for implementation details.
    // -----------------------------------------------------
    const { A, B, C, D, H } = getMedialPointCoeffs(p,v,ps);

    if (ps.length === 1) {
        // a point: a single linear equation in `t` (and no `s` dependence)
        const t = chooseStableT(A[0], B[0], abs(A[0]));
        return {
            ts: [t],
            ss: [0],
            qs: [[p[0] + t*v[0], p[1] + t*v[1]]]
        };
    }

    /** the possible parameter values of the bezier curve */
    const ss = (roots(H, 0, 1) || []).map(r => r.t);
    /** the possible parameter values of the ray */
    const ts: number[] = [];
    /** the possible points on the ray */
    const qs: number[][] = [];
    /** the coefficient magnitudes (used to detect cancellation in `A(s)` and `C(s)`) */
    const _A = A.map(abs);
    const _C = C.map(abs);
    for (const s of ss) {
        const As = Horner(A, s);
        const Bs = Horner(B, s);
        const Cs = C.length ? Horner(C, s) : undefined;
        const Ds = D.length ? Horner(D, s) : undefined;
        // the magnitudes of the terms of `A(s)` and `C(s)` (`s` is in `[0,1]`)
        const _As = Horner(_A, s);
        const _Cs = C.length ? Horner(_C, s) : undefined;

        const t = chooseStableT(As, Bs, _As, Cs, Ds, _Cs);
        ts.push(t);

        const q = [p[0] + t*v[0], p[1] + t*v[1]];
        qs.push(q);
    }

    return { ts, ss, qs };
}


/**
 * The factor (times `Number.EPSILON`) below which `|A|` (or `|C|`) relative to 
 * the magnitude of its terms is considered to be zero (due to cancellation).
 * 
 * @internal
 */
const CANCELLATION_FACTOR = 8;


/**
 * Recovers a numerically stable ray parameter `t` from linear equations
 * `A*t + B = 0` and (optionally) `C*t + D = 0` evaluated at a fixed `s`.
 *
 * * if `C,D` are unavailable, this falls back to `-B/A`
 * * `A` (or `C`) is considered zero (i.e. that equation has no solution) if 
 * it is within a small multiple of `Number.EPSILON` of the magnitude of its 
 * terms (`_A` or `_C`), i.e. if it is zero up to cancellation - this is 
 * independent of the scale of the coordinates (unlike a fixed absolute 
 * threshold or one comparing `A` with `B` since, when scaling all coordinates
 * by `k`, `A` scales with `k` but `B` with `k²`)
 * 
 * @param A
 * @param B
 * @param _A the magnitude of the terms of `A` (e.g. `Σ|aᵢ|sⁱ`)
 * @param C
 * @param D
 * @param _C the magnitude of the terms of `C`
 * 
 * @internal
 */
function chooseStableT(
        A: number,
        B: number,
        _A: number,
        C?: number,
        D?: number,
        _C?: number) {

    const hasAB = abs(A) > CANCELLATION_FACTOR*Number.EPSILON*_A;

    // If only A,B are present, preserve existing behavior.
    if (C === undefined || D === undefined) {
        if (hasAB) {
            return -B / A;
        }
        return NaN;
    }

    const hasCD = abs(C) > CANCELLATION_FACTOR*Number.EPSILON*(_C ?? abs(C));

    if (!hasAB && !hasCD) {
        return NaN;
    }
    if (hasAB && !hasCD) {
        return -B / A;
    }
    if (!hasAB && hasCD) {
        return -D / C;
    }

    const tAB = -B / A;
    const tCD = -D / C;

    // Score each candidate by how well it satisfies the *other* equation.
    // (the denominators are non-zero since `A` and `C` are non-zero here)
    const scoreAB = abs(C*tAB + D) / (abs(C) + abs(D));
    const scoreCD = abs(A*tCD + B) / (abs(A) + abs(B));

    return scoreAB <= scoreCD ? tAB : tCD;
}


export { getMedialPoints }
