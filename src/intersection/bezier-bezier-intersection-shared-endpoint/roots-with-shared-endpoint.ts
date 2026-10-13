import { roots, RootInterval } from "flo-poly";
import { orient2d, twoDiff } from "big-float-ts";
import { nextDown } from "../../next-down.js";
import { nextUp } from "../../next-up.js";
import { getSharedEndpoint } from "./get-shared-endpoint.js";
import { getCoeffsSharedStart } from "./get-coefficients/get-coeffs-shared-start.js";


/**
 * If an endpoint of `ps1` (exactly) coincides with an endpoint of `ps2`,
 * returns the root intervals of the parameter `t` values of `ps2` (in
 * `[lb,ub]`, ordered by `t` value) where it intersects `ps1` (or `undefined` if
 * there are an infinite number of intersections), else returns `null` (in
 * which case the general algorithm should be used).
 *
 * Since the curves then share an endpoint, `P`, the intersection polynomial
 * `f₁(ps2(t))` (where `f₁` is the implicit form of `ps1`) has a known (exact)
 * root at the parameter value of `P` which is divided out (see
 * [[getCoeffsSharedStart]]) so that the root finder doesn't have to resolve a
 * root on the boundary of the interval (which, especially if the curves are
 * also tangent at `P`, i.e. a double root, is the hardest and slowest case for
 * the certified root finder). The root at `P` is then added back *exactly*.
 *
 * * the curves are reversed as necessary so that both start at `P` (which is
 * exact) and the root intervals are mapped back afterwards
 * * if the `t` coefficient of `f₁(ps2(t))` is provably zero, i.e. if
 *   * `ps2′ = 0` at `P` or
 *   * `ps1′` and `ps2′` are parallel at `P` (i.e. the curves are tangent at
 *     `P`; note that `∇f₁(P)·ps1′ = 0` always since `f₁(ps1(s)) ≡ 0`)
 *
 * then the root is divided out twice
 * * root intervals containing the parameter value of `P` (from a root of even
 * higher multiplicity at `P`) are not returned (since they represent `P`
 * itself)
 *
 * * **precondition:** the curves must be of the lowest possible order and not
 * be points
 *
 * @param ps1 an order 1, 2 or 3 bezier curve
 * @param ps2 an order 1, 2 or 3 bezier curve
 * @param lb the lower bound of the root intervals of `ps2` to return
 * @param ub the upper bound of the root intervals of `ps2` to return
 *
 * @internal
 */
function rootsWithSharedEndpoint(
        ps1: number[][],
        ps2: number[][],
        lb: number,
        ub: number): RootInterval[] | undefined | null {

    const shared = getSharedEndpoint(ps1, ps2);
    if (shared === undefined) { return null; }

    const { reverse1, reverse2 } = shared;
    // orient the curves so that they start at the shared point
    const rs1 = reverse1 ? ps1.slice().reverse() : ps1;
    const rs2 = reverse2 ? ps2.slice().reverse() : ps2;

    const k = isTCoeffZero(rs1, rs2) ? 2 : 1;
    // nothing would be left after dividing out `t^k` (the polynomial is of
    // degree `(ps1.length - 1)*(ps2.length - 1)`), i.e. the polynomial is
    // (exactly) zero (collinear lines tangent at the shared point) - use the
    // general algorithm
    if ((ps1.length - 1)*(ps2.length - 1) + 1 - k <= 0) { return null; }

    const { coeffs, errBound, getPExact } = getCoeffsSharedStart(rs1, rs2, k === 2);

    // the bounds for the (possibly reversed) `ps2`
    const [lb_, ub_] = reverse2 ? [1 - ub, 1 - lb] : [lb, ub];
    const ris = roots(coeffs, lb_, ub_, errBound, getPExact);

    if (ris === undefined) { return undefined; }

    // the parameter value of the shared point (of `ps2`)
    const tP = reverse2 ? 1 : 0;

    // a root interval containing `0` (from a root of even higher multiplicity
    // at `t = 0`) represents the shared point itself
    const ris_ = ris
        .filter(ri => ri.tS > 0 || ri.tE < 0)
        .map(ri => reverse2 ? reverseRootInterval(ri) : ri);

    if (lb <= tP && tP <= ub) {
        ris_.push({ t: tP, tS: tP, tE: tP, multiplicity: k });
    }

    return ris_.sort((a,b) => a.t - b.t);
}


/**
 * Returns `true` if the `t` coefficient of the intersection polynomial
 * `f₁(ps2(t))` is provably zero (given that the curves start at the same
 * point), i.e. if `ps2′(0) = 0` or if `ps1′(0)` and `ps2′(0)` are parallel.
 *
 * @internal
 */
function isTCoeffZero(
        ps1: number[][],
        ps2: number[][]): boolean {

    const p = ps1[0];  // === ps2[0]
    const a = ps1[1];
    const b = ps2[1];

    // `ps2′(0) = 0`
    if (b[0] === p[0] && b[1] === p[1]) { return true; }

    // `ps1′(0) = 0` - the gradient of `f₁` at `p` is not necessarily normal
    // to `ps2′(0)` so nothing can be concluded
    if (a[0] === p[0] && a[1] === p[1]) { return false; }

    // `ps1′(0)` and `ps2′(0)` parallel (exact test)
    return orient2d(p, a, b) === 0;
}


/**
 * Returns the root interval for the reversed curve (i.e. with `t ↦ 1 - t`),
 * widened by an ulp if `1 - t` is not exact so that it is still guaranteed to
 * contain the root.
 *
 * @internal
 */
function reverseRootInterval(ri: RootInterval): RootInterval {
    const oneMinus = (t: number, down: boolean) => {
        const r = 1 - t;
        // (`twoDiff` gives the exact rounding error of `1 - t`)
        return twoDiff(1, t)[0] === 0 ? r : (down ? nextDown(r) : nextUp(r));
    };

    return {
        t: 1 - ri.t,
        tS: oneMinus(ri.tE, true),
        tE: oneMinus(ri.tS, false),
        multiplicity: ri.multiplicity
    };
}


export { rootsWithSharedEndpoint }
