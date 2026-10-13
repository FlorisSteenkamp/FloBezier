import { RootInterval } from "flo-poly";
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
declare function rootsWithSharedEndpoint(ps1: number[][], ps2: number[][], lb: number, ub: number): RootInterval[] | undefined | null;
export { rootsWithSharedEndpoint };
