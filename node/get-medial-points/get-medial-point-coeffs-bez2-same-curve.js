import { toPowerBasis2 } from '../to-power-basis/to-power-basis/double/to-power-basis.js';
/**
 * Returns polynomial coefficients for the same-curve quadratic medial-point
 * case, where `p = b(t)` on the same quadratic bezier `ps` and `v` is normal
 * to the curve at that parameter `t`.
 *
 * The returned coefficients encode:
 * * `A`, `B`: `E2(s, τ) = (s - t)^2⋅(A(s)⋅τ + B(s))`
//  * * `C`, `D`: `E1(s, τ) = C(s)⋅τ + D(s)`
 * * `H`: the reduced eliminant in `s`
 *
 * Here `τ` is the ray parameter in `q(τ) = p + τ⋅v`.
 * For a candidate root `s` of `H`, recover `τ` from
 * `A(s)⋅τ + B(s) = 0`, i.e. `τ = -B(s)/A(s)` when `A(s) ≠ 0`.
 *
 * In this same-curve setup, the full eliminant has the form
 * `H_full(s) = (s - t)^4*(l1*s + l0)`. This function returns only the reduced
 * factor `H(s) = l1*s + l0` (the repeated `(s - t)^4` factor is omitted).
 *
 * @param t parameter on `ps` where `p = b(t)`
 * @param v ray direction from `p`; assumed normal to `ps` at `t`
 * @param ps order 2 bezier control points, e.g. `[[0,0],[1,1],[2,1]]`
 */
function getMedialPointCoeffsBez2_SameCurve(t, v, ps) {
    // -----------------------------------------------------
    // See get-medial-points.md for implementation details.
    // -----------------------------------------------------
    // Quadratic bezier in power basis: b(s) = a⋅s² + b⋅s + c
    const [[ax, bx], [ay, by]] = toPowerBasis2(ps);
    const [vx, vy] = v;
    // Same-curve assumption with explicit parameter `t`:
    // p = b(t) => u0 = p - c = t*(a*t + b).
    const g0x = ax * t + bx;
    const g0y = ay * t + by;
    // Reuse core quadratic-form terms to reduce repeated multiplications.
    const br2 = ax * ax + ay * ay;
    const ab = ax * bx + ay * by;
    // const bb = bx*bx + by*by;
    const ag = ax * g0x + ay * g0y;
    // -----------------------------------------------------
    // E1(s,t): (u(s) + t⋅v) ⋅ b'(s) = 0
    // => C(s)⋅t + D(s) = 0
    const c1 = 2 * (vx * ax + vy * ay);
    // v is normal at parameter t, so C(t) = v⋅w(t) = 0.
    // Since C(s) = c1*s + c0, enforce c0 = -c1*t exactly.
    // const c0 = -c1*t;
    // const d3 = -2*br2;
    // const d2 = -3*ab;
    // const d1 = 2*t*ag - bb;
    // p = b(t) => D(t) = u(t)⋅w(t) = 0.
    // const d0 = -t*(t*(d3*t + d2) + d1);
    // -----------------------------------------------------
    // -----------------------------------------------------
    // E2(s,t): |t⋅v|² - |u(s) + t⋅v|² = 0
    //         => 2⋅(v⋅u(s))⋅t + |u(s)|² = 0
    //         => (s - t)^2⋅(A(s)⋅t + B(s)) = 0
    // Return only the reduced constant A(s) = ar0.
    const ar0 = -c1;
    // Full B(s) factorizes as: B_full(s) = (s - t)^2*B_reduced(s).
    // Return only B_reduced(s) = br2*s^2 + br1*s + br0.
    const br1 = 2 * ag;
    const br0 = g0x * g0x + g0y * g0y;
    // -----------------------------------------------------
    // Eliminate t from:
    //   A(s)⋅t + B(s) = 0
    //   C(s)⋅t + D(s) = 0
    // by taking A(s)⋅D(s) - B(s)⋅C(s) = 0 (degree ≤ 5 in s)
    // For this same-curve quadratic case:
    //   d3 = -2*b4, d2 = -(3/2)*b3, a2 = -c1, a1 = -2*c0.
    // Therefore H5 and H4 reduce to:
    //   H5 = b4*c1
    //   H4 = 3*b4*c0 + (1/2)*b3*c1
    const H5 = br2 * c1;
    // In the same-curve quadratic case the full eliminant has the form
    // H_full(s) = (s - t)^4*(l1*s + l0).
    // Match the leading coefficients of H_full(s):
    //   H5 = l1
    //   H4 = l0 - 4*t*l1
    // const l1 = H5;
    // const l0 = H4 + 4*t*l1;
    // Using c0 = -c1*t and b3 = 2*ab, this simplifies to l0 = c1*(br2*t + ab).
    const l0 = c1 * (br2 * t + ab);
    return {
        A: [ar0],
        B: [br2, br1, br0],
        // C: [c1, c0],
        // D: [d3, d2, d1, d0],
        H: [H5, l0]
    };
}
export { getMedialPointCoeffsBez2_SameCurve };
//# sourceMappingURL=get-medial-point-coeffs-bez2-same-curve.js.map