import { grahamScan } from 'flo-graham-scan';
/**
 * Finds the convex hull of the given set of 2d points using the
 * Graham Scan algorithm and returns the hull as an array of points.
 *
 * * see https://en.wikipedia.org/wiki/Graham_scan
 *
 * **exact**: this algorithm is robust via adaptive infinite precision floating
 * point arithmetic.
 *
 * @param ps a set of points, e.g. a bezier curve, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param includeAllBoundaryPoints set this to `true` to if all boundary points
 * should be returned, even redundant ones; defaults to `false`
 *
 * @dox mdx
 */
declare const getBoundingHull: typeof grahamScan;
export { getBoundingHull };
