const { sqrt, abs, asinh } = Math;


/**
 * Returns the curve length of the given quadratic bezier curve within the
 * specified parameter interval.
 *
 * * calculated using the closed form expression for the arc length of a
 * parabola (evaluated in a numerically stable way so that the result is
 * accurate to within a few ulps for all inputs, including degenerate cases
 * such as collinear control points, very short intervals, etc.)
 *
 * @param interval the paramter interval over which the length is
 * to be calculated (often `[0,1]`)
 * @param ps a quadratic bezier curve given by an ordered array of its control
 * points, e.g. `[[0,0],[1,1],[2,1]]`
 *
 * @internal
 */
 function lengthBez2(
        interval: number[],
        ps: number[][]): number {

    let tS = interval[0];
    let tE = interval[1];

    if (tS === tE) { return 0; }
    if (tS > tE) { [tS,tE] = [tE,tS]; }

    const [[x0, y0], [x1, y1], [x2, y2]] = ps;

    // The derivative is `B'(t) = 2*(A*t + B)` where:
    const Ax = x2 - 2*x1 + x0;
    const Ay = y2 - 2*y1 + y0;
    const Bx = x1 - x0;
    const By = y1 - y0;

    const a = Ax*Ax + Ay*Ay;

    if (a === 0) {
        // The curve is really a line (or a point) - the speed is constant
        return 2*sqrt(Bx*Bx + By*By)*(tE - tS);
    }

    // Complete the square: |B'(t)|² = 4*(u² + k²) where `u = (a*t + A·B)/√a`
    // and `k = |A×B|/√a` so that the length is `(1/√a)*∫ 2√(u² + k²) du`, i.e.
    // `(1/√a)*[u√(u² + k²) + k²*asinh(u/k)]` evaluated between `u1` and `u2`.
    const sa = sqrt(a);
    const AdotB = Ax*Bx + Ay*By;
    const AcrossB = Ax*By - Ay*Bx;
    const k = abs(AcrossB)/sa;
    const kk = k*k;

    const u1 = (a*tS + AdotB)/sa;
    const u2 = (a*tE + AdotB)/sa;
    const s1 = sqrt(u1*u1 + kk);
    const s2 = sqrt(u2*u2 + kk);

    let term1: number;  // u2*s2 - u1*s1
    let term2: number;  // k²*(asinh(u2/k) - asinh(u1/k))
    if (u1*u2 > 0) {
        // `u1` and `u2` have the same sign (and are non-zero) - use
        // cancellation-free forms of the differences (otherwise catastrophic
        // cancellation occurs for e.g. very short intervals)
        // Note: `u2 - u1` must be calculated as below (and not directly) to 
        // avoid cancellation for short intervals (`tE - tS` is exact for 
        // close values by Sterbenz's lemma).
        const d = sa*(tE - tS);
        const p = u2 + u1;
        term1 = d*p*(u2*u2 + u1*u1 + kk)/(u2*s2 + u1*s1);
        // using `asinh(x) - asinh(y) === asinh(x√(1+y²) - y√(1+x²))`
        term2 = k === 0 ? 0 : kk*asinh(d*p/(u2*s1 + u1*s2));
    } else {
        // `u1` and `u2` have opposite signs (or one is zero) - there is no
        // cancellation in the direct differences
        term1 = u2*s2 - u1*s1;
        term2 = k === 0 ? 0 : kk*(asinh(u2/k) - asinh(u1/k));
    }

    return (term1 + term2)/sa;
}


export { lengthBez2 }
