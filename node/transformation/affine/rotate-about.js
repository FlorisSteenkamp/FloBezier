import { rotate as rotateVec, translate as translateVec } from 'flo-vector2d';
const { sin, cos } = Math;
/**
 * Returns the given bezier curve rotated anti-clockwise about the given point
 * by the given angle (in radians).
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param θ the rotation angle in radians (anti-clockwise)
 * @param center the point to rotate about, e.g. `[1,2]`
 *
 * @doc mdx
 */
function rotateAbout(ps, θ, center) {
    const rotateBy = rotateVec(sin(θ), cos(θ));
    const toOrigin = translateVec([-center[0], -center[1]]);
    const back = translateVec(center);
    return ps.map(p => back(rotateBy(toOrigin(p))));
}
export { rotateAbout };
//# sourceMappingURL=rotate-about.js.map