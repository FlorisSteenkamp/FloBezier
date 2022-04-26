/**
 * Returns the given order 1,2 or 3 bezier curve's inflection point `t`
 * parameter values in ascending order.
 *
 * * see [Caffeine Owl](http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html)
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[1,2],[3,4],[5,6],[7,8]]`
 *
 * @doc mdx
 */
declare function getInflections(ps: number[][]): number[];
export { getInflections };
