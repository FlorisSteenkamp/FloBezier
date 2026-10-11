/**
 * A bound used in specifying bounding boxes of bezier curves.
 */
interface Bound {
    /** a certified (max `4*eps` for `t ∈ [0,1]`) `t` range containing the bound */
    readonly ts: number[];
    /** a certified `box` containing the bound */
    readonly box: number[][];
}
/**
 * x-coordinate bounds used in specifying bounding boxes of bezier curves.
 */
interface XBounds {
    readonly minX: Bound;
    readonly maxX: Bound;
}
/**
 * y-coordinate bounds used in specifying bounding boxes of bezier curves.
 */
interface YBounds {
    minY: Bound;
    maxY: Bound;
}
export type { Bound, XBounds, YBounds };
