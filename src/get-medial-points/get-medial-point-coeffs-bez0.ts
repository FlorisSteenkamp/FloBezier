/**
 * Returns polynomial coefficients for ray parameter values `t`, bezier
 * parameter values `s` and medial points for points `q(t)` and b(s) (an order
 * 0 bezier curve) that satisfy the medial condition with respect to `p` and `ps`:
 * 
 * Let `p` be a fixed point in the plane.
 * Let `v` be a direction vector defining the ray `q(t) = p + t⋅v`.
 * Let `ps` be an order 0 bezier curve (a single point).
 *
 * * `q(t)` is equidistant from `p` and the nearest point on `ps`
 * * that common distance is locally minimal among such candidates
 *
 * In other words, this function returns candidate ray parameters for the
 * sought medial point(s). Selecting physically valid solutions (if needed)
 * is done by the caller or by a later stage of this routine.
 *
 * @param p base point
 * @param v ray direction from `p`
 * @param ps order 0 bezier control point
 * given as an array of control points, e.g. `[[1,2]]`
 */
function getMedialPointCoeffsBez0(
        p: number[],
        v: number[],
        ps: number[][]) {

    // -----------------------------------------------------
    // See get-medial-points.md for implementation details.
    // -----------------------------------------------------

    const [px, py] = p;
    const [vx, vy] = v;
    const [[x0, y0]] = ps;

    // Constant bezier in power basis: b(s) = c
    // u(s) = p - b(s) = u0
    const u0x = px - x0;
    const u0y = py - y0;

    // E2(s,t): |t⋅v|² - |u(s) + t⋅v|² = 0
    //         => 2⋅(v⋅u(s))⋅t + |u(s)|² = 0
    //         => A(s)⋅t + B(s) = 0
    const a0 = 2*(vx*u0x + vy*u0y);
    const b0 = u0x*u0x + u0y*u0y;

    // const A = [a0];  // degree 0 in s
    // const B = [b0];  // degree 0 in s


    return {
        A: [a0],
        B: [b0],
        // C: [],  // the zero, i.e. -1 degree polynomial
        // D: [],  // ...
        // H: []   // ...
    };
}


export { getMedialPointCoeffsBez0 }
