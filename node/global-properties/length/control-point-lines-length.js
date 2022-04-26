import { distanceBetween } from "flo-vector2d";
/**
 * Returns an upper bound for the length of the given bezier curve - this bound
 * is not very strict as it uses the sum of the straight-line distances between
 * control points as a measure.
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an array of its control
 * points, e.g. `[[1,2],[3,4],[5,6],[7,8]]`
 *
 * @doc mdx
 */
function controlPointLinesLength(ps) {
    let totalLength = 0;
    for (let i = 0; i < ps.length - 1; i++) {
        totalLength += distanceBetween(ps[i], ps[i + 1]);
    }
    return totalLength;
}
export { controlPointLinesLength };
//# sourceMappingURL=control-point-lines-length.js.map