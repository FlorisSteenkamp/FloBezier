import { controlPointLinesLength } from '../../global-properties/length/control-point-lines-length.js';
import { evalDeCasteljau } from '../../local-properties-at-t/evaluate/double/eval-de-casteljau.js';
import { furthestPointOnBezier } from '../closest-and-furthest-point-on-bezier/furthest-point-on-bezier.js';
import { maxAbsCoordinate } from '../../error-analysis/max-abs-coordinate.js';
import { fromTo } from '../../transformation/split/from-to.js';
import { Heap } from '../heap.js';
import { closestPointOnBeziers } from './closest-point-on-beziers.js';
import { newtonFoot } from './newton-foot.js';
import { maxDistanceToControlPoints } from './max-distance-to-control-points.js';
/** @internal */
const { max, min } = Math;
/** @internal */
function compareIntervals(a, b) {
    return (a.ub - b.ub) || (a.tS - b.tS);
}
/**
 * Returns certified lower and upper bounds on the one-sided Hausdorff distance
 * `h(A,B)` from the bezier curve `A` to the (piecewise) bezier curve `B`,
 * stopping as soon as a requested decision can be made, together with the
 * parameter values and points where the lower bound is achieved.
 *
 * * the bounds are guaranteed up to floating point roundoff
 * * this is the implementation backing `hausdorffDistanceOneSided` and
 * `hausdorffDistanceOneSidedExtra`
 * * with `lowerStop === upperStop === d` it answers whether `h(A,B) <= d`:
 * once it stops, either `lower >= d` or `upper <= d`, unless `maxIterations`
 * was reached first (in which case `lower < d < upper`, i.e. undecided);
 * a conservative check is thus `upper > d`
 * * with `upperStop === d` and `lowerStop === d - δ` (`δ > 0`) it is
 * guaranteed to stop (with `maxIterations` set to `Infinity`) since one of the
 * two rules fires once `upper - lower <= δ`
 * * `A` is bisected into parameter intervals, best-first (by upper bound) if
 * a `tolerance` is in use, else depth-first (cheaper, and when only the
 * thresholds matter all intervals with an upper bound above `upperStop` must
 * be refined anyway); the upper bound on an interval `[tS,tE]` is the
 * smaller of
 *     * `(hS + hE + len)/2` where `hS`, `hE` are (upper bounds on) the
 *       distances from its endpoints to `B` and `len` is the control polygon
 *       length of `A` restricted to the interval, and
 *     * the maximum distance from the foot (on `B`) of either endpoint to the
 *       control points of `A` restricted to the interval (the convex hull
 *       property)
 * * the distances from the sample points on `A` to `B` are first found
 * cheaply by Newton iteration from the feet of the neighbouring samples
 * (giving upper bounds); the exact closest point on `B` (which may raise the
 * lower bound) is only calculated when this could change the outcome, i.e.
 * when the cheap value is `>= lowerStop` or, if a `tolerance` is in use, when
 * it is larger than the current lower bound; if no `tolerance` is in use the
 * returned `lower` is thus only as large as needed to make the decision (and
 * `upper` may be far from tight if `maxIterations` was reached)
 * * partially based off [Computing the Hausdorff distance between two sets of parametric curves](https://www.semanticscholar.org/paper/COMPUTING-THE-HAUSDORFF-DISTANCE-BETWEEN-TWO-SETS-Kim-McLean/d2bd6529c4b118e389e1db209d8f1bf7467f9016)
 *
 * @param A a bezier curve (the 'from' curve) given by an ordered array of its
 * control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * @param B a bezier curve (the 'to' curve) given by an ordered array of its
 * control points e.g. `[[0,0],[1,1],[2,1],[2,0]]`, or a piecewise bezier
 * curve given as an array of such curves (the pieces need not be connected)
 * @param options optional; see `HausdorffDistanceOneSidedBoundsOptions`; with
 * no options given it behaves as `hausdorffDistanceOneSidedExtra`
 *
 * @doc mdx
 */
function hausdorffDistanceOneSidedBounds(A, B, options = {}) {
    const Bs = (typeof B[0][0] === 'number' ? [B] : B);
    const lowerStop = options.lowerStop ?? Infinity;
    const upperStop = options.upperStop ?? -Infinity;
    const maxIterations = options.maxIterations ?? 50;
    let tolerance = options.tolerance;
    if (tolerance === undefined &&
        options.lowerStop === undefined && options.upperStop === undefined) {
        let l = maxAbsCoordinate(A);
        for (const ps of Bs) {
            l = max(l, maxAbsCoordinate(ps));
        }
        tolerance = l / 1000_000;
    }
    // if a tolerance is in use the lower bound must converge, so any sample
    // that may raise it gets its exact distance
    const refine = tolerance !== undefined;
    const tol = tolerance ?? -Infinity;
    if (A.length === 1) {
        const f = closestPointOnBeziers(Bs, A[0]);
        return result(f.d, f.d, 0, A[0], f);
    }
    if (Bs.length === 1 && Bs[0].length === 1) {
        const f = furthestPointOnBezier(A, Bs[0][0]);
        return { lower: f.d, upper: f.d, tA: f.t, pA: f.p, kB: 0, tB: 0, pB: Bs[0][0] };
    }
    const pS = A[0];
    const pE = A[A.length - 1];
    // if `B` is a line (a convex set) the distance is convex along the line
    // `A` and thus maximal at an endpoint
    const convex = A.length === 2 && Bs.length === 1 && Bs[0].length === 2;
    // the feet of the endpoints of `A`; like those of the other sample points
    // they are first found cheaply and only made exact if needed
    let fS = cheapFoot(Bs, pS);
    let fE = cheapFoot(Bs, pE);
    const exactS = fS.d === 0 || refine || convex || fS.d >= lowerStop;
    const exactE = fE.d === 0 || refine || convex || fE.d >= lowerStop;
    if (exactS && fS.d !== 0) {
        fS = closestPointOnBeziers(Bs, pS);
    }
    if (exactE && fE.d !== 0) {
        fE = closestPointOnBeziers(Bs, pE);
    }
    // the max (over `A`) lower bound so far, where it is achieved and its foot
    let L = -Infinity;
    let tA = 0;
    let pA = pS;
    let fA = fS;
    if (exactS) {
        L = fS.d;
    }
    if (exactE && fE.d > L) {
        L = fE.d;
        tA = 1;
        pA = pE;
        fA = fE;
    }
    if (convex) {
        return result(L, L, tA, pA, fA);
    }
    // If a tolerance is in use the intervals are refined best-first (a
    // max-heap on their upper bounds) so that the upper bound drops as fast
    // as possible. Otherwise only the thresholds matter and, since every
    // interval with an upper bound above `upperStop` must then be refined
    // anyway, the cheaper depth-first order (a stack) is used.
    const heap = refine ? new Heap(compareIntervals) : undefined;
    const stack = [];
    // the largest upper bound of the dropped intervals that was larger than
    // `L` at the time
    let D = -Infinity;
    /**
     * Returns the interval `[tS,tE]` with its upper bound, or `undefined`
     * if that bound shows that refining it can't change the outcome, i.e. if
     * it is `<= max(L, upperStop)`.
     */
    function interval(tS, tE, fS, fE) {
        const drop = max(L, upperStop);
        const ub = intervalUpperBound(A, tS, tE, fS, fE, drop);
        if (ub > drop) {
            return { tS, tE, fS, fE, ub };
        }
        if (ub > L && ub > D) {
            D = ub;
        }
        return undefined;
    }
    const i01 = interval(0, 1, fS, fE);
    if (i01 !== undefined) {
        heap ? heap.insert(i01) : stack.push(i01);
    }
    let j = 0;
    while (true) {
        let top;
        if (heap !== undefined) {
            top = heap.heap[0]; // peek max
            const U = max(L, D, top === undefined ? -Infinity : top.ub);
            if (L >= lowerStop || U <= upperStop || U <= L || U - L < tol) {
                break;
            }
        }
        else {
            // intervals stacked before `L` grew may have become irrelevant
            while (stack.length > 0 && stack[stack.length - 1].ub <= L) {
                stack.pop();
            }
            top = stack[stack.length - 1];
            if (L >= lowerStop || top === undefined) {
                break;
            }
        }
        if (j++ >= maxIterations) {
            break;
        }
        heap !== undefined ? heap.popMax() : stack.pop();
        const { tS, tE, fS, fE } = top;
        const tM = (tS + tE) / 2;
        const pM = evalDeCasteljau(A, tM);
        // a cheap upper bound on the distance from `pM` to `B` - by Newton
        // iteration from the feet of the endpoints
        let fM = newtonFoot(Bs, fS.k, pM, fS.k === fE.k ? (fS.t + fE.t) / 2 : fS.t);
        if (fS.k !== fE.k) {
            const fM_ = newtonFoot(Bs, fE.k, pM, fE.t);
            if (fM_.d < fM.d) {
                fM = fM_;
            }
        }
        if (fM.d >= lowerStop || (refine && fM.d > L)) {
            // the lower bound may change - get the exact closest point
            fM = closestPointOnBeziers(Bs, pM);
            if (fM.d > L) {
                L = fM.d;
                tA = tM;
                pA = pM;
                fA = fM;
            }
        }
        const iL = interval(tS, tM, fS, fM);
        const iR = interval(tM, tE, fM, fE);
        if (heap !== undefined) {
            if (iL !== undefined) {
                heap.insert(iL);
            }
            if (iR !== undefined) {
                heap.insert(iR);
            }
        }
        else {
            // the half with the larger upper bound is refined first
            if (iL !== undefined && iR !== undefined && iL.ub > iR.ub) {
                stack.push(iR, iL);
            }
            else {
                if (iL !== undefined) {
                    stack.push(iL);
                }
                if (iR !== undefined) {
                    stack.push(iR);
                }
            }
        }
    }
    if (L === -Infinity) {
        // no exact distance was needed yet - get one for a lower bound
        if (fS.d >= fE.d) {
            fA = closestPointOnBeziers(Bs, pS);
            tA = 0;
            pA = pS;
        }
        else {
            fA = closestPointOnBeziers(Bs, pE);
            tA = 1;
            pA = pE;
        }
        L = fA.d;
    }
    let U = max(L, D);
    for (const i of heap !== undefined ? heap.heap : stack) {
        if (i.ub > U) {
            U = i.ub;
        }
    }
    return result(L, U, tA, pA, fA);
}
/** @internal */
function result(lower, upper, tA, pA, fA) {
    return { lower, upper, tA, pA, kB: fA.k, tB: fA.t, pB: fA.q };
}
/**
 * Returns a point on the piecewise bezier curve `Bs` close to `p` found by a
 * few Newton iterations starting from the piece endpoint closest to `p`, as a
 * `HausdorffFoot`.
 *
 * * the returned distance is an *upper bound* on the distance from `p` to
 * `Bs` (and is exact if it is `0`)
 *
 * @internal
 */
function cheapFoot(Bs, p) {
    let dd = Infinity;
    let k = 0;
    let t = 0;
    for (let i = 0; i < Bs.length; i++) {
        const ps = Bs[i];
        const q0 = ps[0];
        const q1 = ps[ps.length - 1];
        const dd0 = (q0[0] - p[0]) ** 2 + (q0[1] - p[1]) ** 2;
        const dd1 = (q1[0] - p[0]) ** 2 + (q1[1] - p[1]) ** 2;
        if (dd0 < dd) {
            dd = dd0;
            k = i;
            t = 0;
        }
        if (dd1 < dd) {
            dd = dd1;
            k = i;
            t = 1;
        }
    }
    return newtonFoot(Bs, k, p, t);
}
/**
 * Returns an upper bound on the distance from the interval `[tS,tE]` of `A`
 * to `B`.
 *
 * * `A` is split from the *original* curve so as not to accumulate roundoff
 * * once a bound `<= drop` is found it is returned as is
 *
 * @internal
 */
function intervalUpperBound(A, tS, tE, fS, fE, drop) {
    const ps = tS === 0 && tE === 1 ? A : fromTo(A, tS, tE);
    // any point on the interval is within `len` (arc length) of both
    // endpoints, so its distance to `B` is at most
    // `min(hS + l, hE + (len - l))` <= `(hS + hE + len)/2`
    const ub = (fS.d + fE.d + controlPointLinesLength(ps)) / 2;
    if (ub <= drop) {
        return ub;
    }
    return min(ub, maxDistanceToControlPoints(ps, fS.q), maxDistanceToControlPoints(ps, fE.q));
}
export { hausdorffDistanceOneSidedBounds };
//# sourceMappingURL=hausdorff-distance-one-sided-bounds.js.map