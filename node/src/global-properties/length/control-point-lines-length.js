import { distanceBetween } from "flo-vector2d";
/**
 * Returns an upper bound for the length of the given bezier curve - this bound
 * is not very strict as it uses the sum of the straight-line distances between
 * control points as a measure.
 *
 * @param ps
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