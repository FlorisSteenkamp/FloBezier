import { toPowerBasis3 } from "../to-power-basis/to-power-basis/double/to-power-basis.js";
/**
 * Returns the polynomial coefficients for the ray parameter `t` and the
 * curve parameter `s` that encode the medial condition for `q(t) = p + t⋅v`
 * and a cubic bezier curve `ps`.
 *
 * The returned coefficients describe the equations whose common solutions
 * satisfy:
 * * `q(t)` is equidistant from `p` and the nearest point on `ps`
 * * that common distance is locally minimal among such candidates
 *
 * More specifically, this function returns:
 * * `A` and `B`: the coefficients of `E2(s,t) = A(s)⋅t + B(s)`
 * * `C` and `D`: the coefficients of `E1(s,t) = C(s)⋅t + D(s)`
 * * `H`: the eliminated polynomial `A(s)⋅D(s) - B(s)⋅C(s)` whose roots are
 *   candidate `s` values for medial points
 *
 * @param p base point
 * @param v ray direction from `p`
 * @param ps cubic bezier control points, i.e. an order 3 bezier curve
 * given as an array of control points, e.g. `[[0,0],[1,1],[2,1],[3,0]]`
 */
function getMedialPointCoeffsBez3(p, v, ps) {
    // -----------------------------------------------------
    // See get-medial-points.md for implementation details.
    // -----------------------------------------------------
    const [px, py] = p;
    const [vx, vy] = v;
    // Cubic bezier in power basis: b(s) = a*s^3 + b*s^2 + c*s + d
    const [[ax, bx, cx, dx], [ay, by, cy, dy]] = toPowerBasis3(ps);
    const u0x = px - dx;
    const u0y = py - dy;
    // Reuse dot products across A, B, C, D, and H.
    const va = vx * ax + vy * ay;
    const vb = vx * bx + vy * by;
    const vc = vx * cx + vy * cy;
    const vu0 = vx * u0x + vy * u0y;
    const b6 = ax * ax + ay * ay;
    const ab = ax * bx + ay * by;
    const ac = ax * cx + ay * cy;
    const bb = bx * bx + by * by;
    const bc = bx * cx + by * cy;
    const cc = cx * cx + cy * cy;
    const au0 = ax * u0x + ay * u0y;
    const bu0 = bx * u0x + by * u0y;
    const d0 = cx * u0x + cy * u0y;
    const b0 = u0x * u0x + u0y * u0y;
    // -----------------------------------------------------
    // E1(s,t): (u(s) + t*v) * b'(s) = 0
    // => C(s)*t + D(s) = 0
    const c2 = 3 * va;
    const c1 = 2 * vb;
    const c0 = vc;
    // -----------------------------------------------------
    // -----------------------------------------------------
    const d5 = -3 * b6;
    const d4 = -5 * ab;
    const d3 = -4 * ac - 2 * bb;
    const d2 = 3 * au0 - 3 * bc;
    const d1 = 2 * bu0 - cc;
    // -----------------------------------------------------
    // -----------------------------------------------------
    // E2(s,t): |t*v|^2 - |u(s) + t*v|^2 = 0
    //         => 2*(v*u(s))*t + |u(s)|^2 = 0
    //         => A(s)*t + B(s) = 0
    const a3 = -2 * va;
    const a2 = -2 * vb;
    const a1 = -2 * vc;
    const a0 = 2 * vu0;
    // -----------------------------------------------------
    // -----------------------------------------------------
    const b5 = 2 * ab;
    const b4 = 2 * ac + bb;
    const b3 = 2 * bc - 2 * au0;
    const b2 = cc - 2 * bu0;
    const b1 = -2 * d0;
    // -----------------------------------------------------
    // Eliminate t from:
    //   A(s)*t + B(s) = 0
    //   C(s)*t + D(s) = 0
    // by taking H(s) = A(s)*D(s) - B(s)*C(s) = 0 (degree <= 8 in s).
    // Using:
    //   a2 = -c1, a1 = -2*c0,
    //   d5 = -3*b6, d4 = -(5/2)*b5, d3 = -2*b4, d2 = -(3/2)*b3,
    //   d1 = -b2, d0 = -(1/2)*b1,
    // we can compute H directly with fewer operations.
    const H8 = 3 * va * b6;
    const H7 = 4 * (va * ab + vb * b6);
    const H6 = va * b4 + 6 * vb * ab + 5 * vc * b6;
    const H5 = 2 * vb * b4 + 8 * vc * ab - 6 * vu0 * b6;
    const H4 = -va * b2 + vb * b3 + 3 * vc * b4 - 10 * vu0 * ab;
    const H3 = -2 * va * b1 + 2 * vc * b3 - 4 * vu0 * b4;
    const H2 = vc * b2 - vb * b1 - 3 * vu0 * b3 - 3 * va * b0;
    const H1 = -2 * vu0 * b2 - 2 * vb * b0;
    const H0 = -vu0 * b1 - vc * b0;
    return {
        A: [a3, a2, a1, a0],
        B: [b6, b5, b4, b3, b2, b1, b0],
        C: [c2, c1, c0],
        D: [d5, d4, d3, d2, d1, d0],
        H: [H8, H7, H6, H5, H4, H3, H2, H1, H0]
    };
}
export { getMedialPointCoeffsBez3 };
//# sourceMappingURL=get-medial-point-coeffs-bez3.js.map