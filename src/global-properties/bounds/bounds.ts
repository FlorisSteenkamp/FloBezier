
/**
 * A bound used in specifying bounding boxes of bezier curves.
 */
interface Bound {
	/** a certified (max `4*eps` for `t ∈ [0,1]`) `t` range containing the bound */
	ts: number[];
	/** a certified `box` containing the bound */
	box: number[][];
}


/**
 * x-coordinate bounds used in specifying bounding boxes of bezier curves.
 */
interface XBounds {
	minX: Bound;
	maxX: Bound; 
};


/**
 * y-coordinate bounds used in specifying bounding boxes of bezier curves.
 */
interface YBounds {
	minY: Bound;
	maxY: Bound; 
};


export type { Bound, XBounds, YBounds }
