/**
 * Returns a tight axis-aligned bounding box bound of the given bezier curve.
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @internal
 */
declare function getXBoundsTight(ps: number[][]): {
    minX: {
        ts: number[];
        box: number[][];
    };
    maxX: {
        ts: number[];
        box: number[][];
    };
};
/**
 * Returns a tight axis-aligned bounding box bound of the given bezier curve.
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @internal
 */
declare function getYBoundsTight(ps: number[][]): {
    minY: {
        ts: number[];
        box: number[][];
    };
    maxY: {
        ts: number[];
        box: number[][];
    };
};
/**
 * Returns the axis-aligned bounding box together with the t values where the
 * bounds on the bezier are reached.
 *
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 *
 * @doc mdx
 */
declare function getBounds(ps: number[][]): {
    ts: number[][];
    box: number[][];
};
export { getBounds, getXBoundsTight, getYBoundsTight };
