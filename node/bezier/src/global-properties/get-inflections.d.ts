/**
 * Returns the given order 1, 2 or 3 bezier curve's inflection points.
 *
 * * see [Caffeine Owl](http://www.caffeineowl.com/graphics/2d/vectorial/cubic-inflexion.html)
 *
 * @param ps an order 1, 2 or 3 bezier curve
 **/
declare function getInflections(ps: number[][]): number[];
export { getInflections };
