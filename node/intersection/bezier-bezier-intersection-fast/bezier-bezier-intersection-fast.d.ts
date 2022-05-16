/**
 * Accurate, fast (*eventually* cubically convergent) algorithm that returns
 * the intersections between two bezier curves (of order <= 3).
 *
 * * returns an array that contains the `t` paramater pairs at intersection
 * of the first and second bezier curves respectively.
 *
 * * Each returned `t` paramter value is mathematically guaranteed to be
 * accurate to within 2**-33 or about ten billionths of a unit.
 *
 * * the algorithm is based on a paper at http://scholarsarchive.byu.edu/cgi/viewcontent.cgi?article=2206&context=etd
 * that finds the intersection of a fat line and a so-called geometric interval
 * making it faster than the standard fat-line intersection algorithm (that
 * is *eventually* only *quadratically* convergent)
 * * *eventually* cubically convergent (usually converging in about 4 to 8
 * iterations for typical intersections) but for hard intersections can become
 * extremely slow due to sub-linear convergence (and similarly for *all* fatline
 * algorithms) in those cases; luckily this algorithm detects those cases and
 * reverts to implicitization with strict error bounds to guarantee accuracy
 * and efficiency (implicitization is roughly 5x slower but is very rare)
 *
 * @param ps1 an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param ps2 an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
declare function bezierBezierIntersectionFast(ps1: number[][], ps2: number[][]): number[][];
export { bezierBezierIntersectionFast };
