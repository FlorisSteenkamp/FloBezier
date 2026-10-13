/**
 * Returns a polynomial in 1 variable (exactly)
 * whose roots are the parameter values of the intersection points of an order
 * 2 and 1 bezier curve (i.e. a quadratic bezier curve and a line) *starting
 * at the same point*, with the (known) root at `t = 0` divided out.
 *
 * The returned polynomial degree will be 1 (i.e. one less than given by
 * [Bézout's theorem](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_theorem))
 *
 * The returned polynomial coefficients are given densely as an array of
 * [Shewchuk](https://people.eecs.berkeley.edu/~jrs/papers/robustr.pdf)
 * expansions from highest to lowest power.
 * * with the implicit form of `ps1` relative to its start point, `P`, (see
 * [[getImplicitForm2AtStartExact]]) and `ps2(t) - P = t(u(t), w(t))` the polynomial is
 * given by `F₁(u,w) + tF₂(u,w)` where `Fₖ` is the degree `k` part
 * of the implicit form:
 *   * `F₁ = vₓu + vᵧw`
 *   * `F₂ = vₓₓu² + vₓᵧuw + vᵧᵧw²`
 * * if the curves are tangent at `P` the constant term is exactly zero
 * * this code was generated (see `research/gen-shared-start.py`)
 *
 * * **precondition:** `ps1[0]` and `ps2[0]` must be exactly equal
 *
 * @param ps1
 * @param ps2
 *
 * @internal
 */
declare function getCoeffsBez2Bez1SharedStartExact(ps1: number[][], ps2: number[][]): number[][];
export { getCoeffsBez2Bez1SharedStartExact };
