import type { HausdorffFoot } from './hausdorff-foot.js';

const { sqrt } = Math;


/**
 * Returns a point on piece `k` of the piecewise bezier curve `Bs` close to `p`,
 * found by a few Newton iterations on the squared distance starting from the
 * parameter `t0`, as a `HausdorffFoot`.
 *
 * * the returned distance is an *upper bound* on the distance from `p` to the
 * piecewise curve (any point on the curve gives one); it is not certified to
 * be the minimum
 *
 * @param Bs the pieces of the piecewise bezier curve
 * @param k the index of the piece
 * @param p the point
 * @param t0 the starting parameter
 *
 * @internal
 */
function newtonFoot(
        Bs: number[][][],
        k: number,
        p: number[],
        t0: number): HausdorffFoot {

    const ps = Bs[k];
    if (ps.length === 1) {
        const q = ps[0];
        return { d: sqrt((q[0] - p[0])**2 + (q[1] - p[1])**2), q, k, t: 0 };
    }

    let t = t0;
    let [q, dq, ddq] = evalWithDerivatives(ps, t);
    let rx = q[0] - p[0];
    let ry = q[1] - p[1];
    let best: HausdorffFoot = { d: sqrt(rx*rx + ry*ry), q, k, t };

    for (let i=0; i<4; i++) {
        // minimize g(t) = |B(t) - p|²/2: g' = r·B', g'' = B'·B' + r·B''
        const g1 = rx*dq[0] + ry*dq[1];
        const g2 = dq[0]*dq[0] + dq[1]*dq[1] + rx*ddq[0] + ry*ddq[1];
        if (g2 <= 0) { break; }

        let t_ = t - g1/g2;
        if (t_ < 0) { t_ = 0; } else if (t_ > 1) { t_ = 1; }
        if (t_ === t) { break; }
        t = t_;

        [q, dq, ddq] = evalWithDerivatives(ps, t);
        rx = q[0] - p[0];
        ry = q[1] - p[1];
        const d = sqrt(rx*rx + ry*ry);
        if (d < best.d) { best = { d, q, k, t }; }
    }

    return best;
}


/**
 * Evaluates the bezier curve `ps` (of order 1, 2 or 3) and its first two
 * derivatives at `t`, returned as `[B, B', B'']`.
 *
 * @internal
 */
function evalWithDerivatives(
        ps: number[][],
        t: number): [number[], number[], number[]] {

    const [p0, p1] = ps;

    if (ps.length === 2) {
        return [
            [p0[0] + t*(p1[0] - p0[0]), p0[1] + t*(p1[1] - p0[1])],
            [p1[0] - p0[0], p1[1] - p0[1]],
            [0, 0]
        ];
    }

    const s = 1 - t;

    if (ps.length === 3) {
        const p2 = ps[2];
        return [
            [s*s*p0[0] + 2*s*t*p1[0] + t*t*p2[0],
             s*s*p0[1] + 2*s*t*p1[1] + t*t*p2[1]],
            [2*(s*(p1[0] - p0[0]) + t*(p2[0] - p1[0])),
             2*(s*(p1[1] - p0[1]) + t*(p2[1] - p1[1]))],
            [2*(p2[0] - 2*p1[0] + p0[0]),
             2*(p2[1] - 2*p1[1] + p0[1])]
        ];
    }

    const p2 = ps[2];
    const p3 = ps[3];
    return [
        [s*s*s*p0[0] + 3*s*s*t*p1[0] + 3*s*t*t*p2[0] + t*t*t*p3[0],
         s*s*s*p0[1] + 3*s*s*t*p1[1] + 3*s*t*t*p2[1] + t*t*t*p3[1]],
        [3*(s*s*(p1[0] - p0[0]) + 2*s*t*(p2[0] - p1[0]) + t*t*(p3[0] - p2[0])),
         3*(s*s*(p1[1] - p0[1]) + 2*s*t*(p2[1] - p1[1]) + t*t*(p3[1] - p2[1]))],
        [6*(s*(p2[0] - 2*p1[0] + p0[0]) + t*(p3[0] - 2*p2[0] + p1[0])),
         6*(s*(p2[1] - 2*p1[1] + p0[1]) + t*(p3[1] - 2*p2[1] + p1[1]))]
    ];
}


export { newtonFoot }
