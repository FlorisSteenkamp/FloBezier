import { toPowerBasis2 } from "../to-power-basis/to-power-basis/double/to-power-basis.js";


/**
 * Returns the polynomial coefficients for the ray parameter `t` and the
 * curve parameter `s` that encode the medial condition for `q(t) = p + t⋅v`
 * and a quadratic bezier curve `ps`.
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
 * @param ps quadratic bezier control points, i.e. an order 2 bezier curve
 * given as an array of control points, e.g. `[[0,0],[1,1],[2,1]]`
 */
function getMedialPointCoeffsBez2(
        p: number[],
        v: number[],
        ps: number[][]) {

    // -----------------------------------------------------
    // See get-medial-points.md for implementation details.
    // -----------------------------------------------------
    const [px, py] = p;
    const [vx, vy] = v;
    const [[x0, y0]] = ps;

    // Quadratic bezier in power basis: b(s) = a⋅s² + b⋅s + c
    const [[ax, bx], [ay, by]] = toPowerBasis2(ps);

    // u(s) = p - b(s) = u2⋅s² + u1⋅s + u0
    const u0x = px - x0;
    const u0y = py - y0;

    // Shared dot products.
    const c1 = 2*(vx*ax + vy*ay);
    const c0 = vx*bx + vy*by;
    const vu0 = vx*u0x + vy*u0y;
    const b4 = ax*ax + ay*ay;
    const ab = ax*bx + ay*by;
    const bb = bx*bx + by*by;
    const u0a = u0x*ax + u0y*ay;
    const d0 = u0x*bx + u0y*by;
    const b0 = u0x*u0x + u0y*u0y;

    // -----------------------------------------------------
    // E1(s,t): (u(s) + t⋅v) ⋅ b'(s) = 0
    // => C(s)⋅t + D(s) = 0
    // -----------------------------------------------------

    // -----------------------------------------------------
    const d3 = -2*b4;
    const d2 = -3*ab;
    const d1 = 2*u0a - bb;
    // -----------------------------------------------------

    // -----------------------------------------------------
    // E2(s,t): |t⋅v|² - |u(s) + t⋅v|² = 0
    //         => 2⋅(v⋅u(s))⋅t + |u(s)|² = 0
    //         => A(s)⋅t + B(s) = 0
    const a2 = -c1;
    const a1 = -2*c0;
    const a0 = 2*vu0;
    // -----------------------------------------------------

    // -----------------------------------------------------
    const b3 = 2*ab;
    const b2 = -d1;
    const b1 = -2*d0;
    // -----------------------------------------------------


    // Eliminate t from:
    //   A(s)⋅t + B(s) = 0
    //   C(s)⋅t + D(s) = 0
    // by taking A(s)⋅D(s) - B(s)⋅C(s) = 0 (degree ≤ 5 in s)

    // Using:
    //   a2 = -c1, d3 = -2*b4, d1 = -b2, b1 = -2*d0
    // we can compute H = A⋅D - B⋅C directly.
    const H5 = b4*c1;
    const H4 = ab*c1 + 3*b4*c0;
    const H3 = 4*(ab*c0 - vu0*b4);
    const H2 = c1*d0 + c0*b2 - 6*vu0*ab;
    const H1 = -2*vu0*b2 - c1*b0;
    const H0 = 2*vu0*d0 - c0*b0;

    return {
        A: [a2, a1, a0],
        B: [b4, b3, b2, b1, b0],
        C: [c1, c0],
        D: [d3, d2, d1, d0],
        H: [H5, H4, H3, H2, H1, H0]
    };
}


export { getMedialPointCoeffsBez2 }
