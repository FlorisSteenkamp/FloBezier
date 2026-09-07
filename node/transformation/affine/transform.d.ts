/**
 * Returns the given bezier curve transformed by the given `2x3` affine
 * transformation matrix `[[a,b,c], [d,e,f]]`, i.e. each control point `[x,y]`
 * is mapped to `[a*x + b*y + c, d*x + e*y + f]`.
 *
 * * this is the general affine case - translation, scaling, rotation, reflection
 * and shearing can all be expressed by an appropriate matrix
 * * uses double precision calculations internally
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param m a `2x3` affine transformation matrix `[[a,b,c], [d,e,f]]`
 *
 * @doc mdx
 */
declare function transform(ps: number[][], m: number[][]): number[][];
export { transform };
