import { distanceBetween } from "flo-vector2d";
/**
 * Returns the curve length of the given line within the specified parameter
 * interval.
 *
 * @param interval the paramter interval over which the length is
 * to be calculated (often `[0,1]`)
 * @param ps a linear bezier curve given by an ordered array of its control
 * points, e.g. `[[0,0],[1,1]]`
 *
 * @internal
 */
function lengthBez1(interval, ps) {
    let [t1, t2] = interval;
    let [[x0, y0], [x1, y1]] = ps;
    let p1 = [x0 + t1 * (x1 - x0), y0 + t1 * (y1 - y0)];
    let p2 = [x0 + t2 * (x1 - x0), y0 + t2 * (y1 - y0)];
    return distanceBetween(p1, p2);
}
export { lengthBez1 };
//# sourceMappingURL=length-bez1.js.map