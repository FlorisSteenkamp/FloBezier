/**
 * Returns the given order 1, 2 or 3 bezier curve's inflection point `t`
 * parameter values in ascending order.
 *
 * * see [Caffeine Owl](http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html)
 *
 * @param ps an order 1, 2 or 3 bezier curve
 *
 * @doc mdx
 */
declare function getInflections(ps: number[][]): number[];
export { getInflections };
