/**
 * Returns a 'curviness' measure of the given bezier curve. `0` is considered
 * the `flattest` (as is the case of e.g. a line).
 *
 * The returned flatness, say `f` is such that `0 <= f <= (order-1)*𝜋`, where
 * `order` is the order of the bezier curve (e.g. cubics are of order 3); thus,
 * for example, cubics can have a maximum value of `2𝜋` for curviness (the least
 * curvy) and a minimum value of `0` (the flattest)
 *
 * This function is useful as a heuristic to test the `flatness` of curves to
 * see if they should be subdivided (in which case they would become flatter)
 *
 * * curviness is calculated as the sum of the absolute rotation (in radians) of
 * consecutive vectors formed by the ordered control points of the curve
 *
 * @param ps An order 0,1,2 or 3 bezier curve.
 *
 * @doc mdx
 */
declare function curviness(ps: number[][]): number;
export { curviness };
