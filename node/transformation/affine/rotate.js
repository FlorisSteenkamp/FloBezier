import { rotate as rotateVec } from 'flo-vector2d';
const { sin, cos } = Math;
/**
 * Returns the given bezier curve rotated anti-clockwise about the origin by the
 * given angle (in radians).
 *
 * @param ps an order 0,1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param θ the rotation angle in radians (anti-clockwise)
 *
 * @doc mdx
 */
function rotate(ps, θ) {
    const rotateBy = rotateVec(sin(θ), cos(θ));
    return ps.map(rotateBy);
}
export { rotate };
//# sourceMappingURL=rotate.js.map