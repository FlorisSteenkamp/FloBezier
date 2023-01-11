import { len, reverse, rotate, scale, translate } from "flo-vector2d";
const { cos, sin, atan2 } = Math;
/**
 * For the given bernstein cubic bezier curve basis return the angles-and-speeds
 * basis coefficients, i.e.
 * * α   -> initial tangent angle in degrees
 * * β   -> terminal tangent angle in degrees
 * * s0  -> inital speed
 * * s1  -> terminal speed
 * * L   -> distance between initial and final point (cannot be 0)
 * * rot -> rotation of entire curve
 * * p   -> initial position offset
 *
 * @param ps an order 3 (cubic) bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 */
function cubicToAnglesAndSpeeds(ps) {
    // [_x1,_y1],[_x2,_y2],[_x3,_y3]
    const p = ps[0];
    // move ps to origin
    ps = ps.map(translate(reverse(p)));
    const [x, y] = [ps[3][0], ps[3][1]];
    const rot = atan2(y, x);
    ps = ps.map(rotate(sin(-rot), cos(-rot)));
    const L = ps[3][0];
    ps = ps.map(p => scale(p, 1 / L));
    // TS -> tangent vector at `t === 0`
    const TS = ps[1];
    // TE -> tangent vector at `t === 1`
    const TE = [1 - ps[2][0], -ps[2][1]];
    // const h2 = sqrt(x1**2 + y1**2);
    const α = atan2(TS[1], TS[0]);
    const β = atan2(TE[1], TE[0]);
    const s0 = 3 * len(TS);
    const s1 = 3 * len(TE);
    return { α, β, s0, s1, L, rot, p };
}
export { cubicToAnglesAndSpeeds };
//# sourceMappingURL=cubic-to-angles-and-speeds.js.map