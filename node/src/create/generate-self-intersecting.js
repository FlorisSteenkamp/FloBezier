/**
 * Returns the cubic bezier curve with given starting, 2nd and 3rd control
 * points such that there is a self-intersection.
 *
 * **in-exact:** the result may not be exact due to floating point round-off
 *
 * @param ts the 2 t values where the self-intersection should occur
 * @param p0 the bezier's initial control point
 * @param p1 the bezier's 2nd control point
 * @param p2 the bezier's 3rd control point
  *
 * @doc mdx
 */
function generateSelfIntersecting(p0, p1, p2, ts) {
    const [x0, y0] = p0;
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    const [t1, t2] = ts;
    // power basis representation:
    //const a3 = (x3 - x0) + 3*(x1 - x2)
    const a2 = 3 * ((x2 + x0) - 2 * x1);
    const a1 = 3 * (x1 - x0);
    //const b3 = (y3 - y0) + 3*(y1 - y2)
    const b2 = 3 * ((y2 + y0) - 2 * y1);
    const b1 = 3 * (y1 - y0);
    // f4 = a2*b3 - a3*b2;
    // f5 = a1*b3 - a3*b1;
    // f6 = a2*b1 - a1*b2;
    // a = f4*f4;
    // b = f4*f5;
    // c = f4*f6 + f5*f5;
    // The self-intersection is given by the roots of `at^2 + bt + c = 0`
    const vₓ = b2 * (a1 * b2 - a2 * b1);
    const vᵧ = -a2 * (a1 * b2 - a2 * b1);
    // a3**2* (b1**2 + b1*b2*t1 + b2**2*t1**2) +
    // b3**2* (a1**2 + a1*a2*t1 + a2**2*t1**2) + 
    // a3*b3* (-2*a1*b1 + -a1*b2*t1 + -a2*b1*t1 + -2*a2*b2*t1**2) +
    // a3* (a1*b2**2 + -a2*b1*b2) +
    // b3* (a2**2*b1 + -a1*a2*b2) === 0
    const vₓₓ = b1 ** 2 + b1 * b2 * t1 + b2 ** 2 * t1 ** 2;
    const vₓᵧ = -2 * a1 * b1 + -a1 * b2 * t1 + -a2 * b1 * t1 + -2 * a2 * b2 * t1 ** 2;
    const vᵧᵧ = a1 ** 2 + a1 * a2 * t1 + a2 ** 2 * t1 ** 2;
    // implicit form 1 === {vₓₓ, vₓᵧ, vᵧᵧ, vₓ, vᵧ, v: 0};
    // a3**2* (b1**2 + b1*b2*t2 + b2**2*t2**2) +
    // a3*b3* (-2*a1*b1 + -a1*b2*t2 + -a2*b1*t2 + -2*a2*b2*t2**2) +
    // b3**2* (a1**2 + a1*a2*t2 + a2**2*t2**2) + 
    // a3* (a1*b2**2 + -a2*b1*b2) + 
    // b3* (a2**2*b1 + -a1*a2*b2) === 0
    const wₓₓ = b1 ** 2 + b1 * b2 * t2 + b2 ** 2 * t2 ** 2;
    const wₓᵧ = -2 * a1 * b1 + -a1 * b2 * t2 + -a2 * b1 * t2 + -2 * a2 * b2 * t2 ** 2;
    const wᵧᵧ = a1 ** 2 + a1 * a2 * t2 + a2 ** 2 * t2 ** 2;
    // implicit form 2 === {wₓₓ, wₓᵧ, wᵧᵧ, vₓ, vᵧ, v: 0};
    // The below are the coefficients as if we've called 
    // getImplicitCoeffsBez2Bez2, except there are now more constraints (e.g.
    // `vₓ === wₓ`, etc.) so we reproduce them here.
    const xx4 = vₓₓ * (wᵧᵧ * (vₓₓ * wᵧᵧ - vₓᵧ * wₓᵧ - 2 * vᵧᵧ * wₓₓ) + vᵧᵧ * wₓᵧ * wₓᵧ) +
        wₓₓ * (vₓᵧ * (vₓᵧ * wᵧᵧ - vᵧᵧ * wₓᵧ) + vᵧᵧ * vᵧᵧ * wₓₓ);
    const xx3 = vₓ * (wᵧᵧ * (2 * (vₓₓ * (wᵧᵧ - vᵧᵧ) - vᵧᵧ * wₓₓ) - vₓᵧ * (wₓᵧ - vₓᵧ)) +
        vᵧᵧ * (2 * vᵧᵧ * wₓₓ - wₓᵧ * (vₓᵧ - wₓᵧ))) +
        vᵧ * (vₓₓ * (2 * vᵧᵧ * wₓᵧ - wᵧᵧ * (vₓᵧ + wₓᵧ)) +
            wₓₓ * (2 * vₓᵧ * wᵧᵧ - vᵧᵧ * (vₓᵧ + wₓᵧ)));
    // Due to constraints, `x2`, `x1` and `x0` all vanish.
    // Solve for: xx4*x + xx3 = 0
    const a3 = -xx3 / xx4;
    const yy3 = vₓ * (vₓₓ * (wₓᵧ * (2 * vᵧᵧ - wᵧᵧ) - vₓᵧ * wᵧᵧ) +
        wₓₓ * (vₓᵧ * (2 * wᵧᵧ - vᵧᵧ) - vᵧᵧ * wₓᵧ)) +
        vᵧ * (vₓₓ * (2 * (wᵧᵧ * (vₓₓ - wₓₓ) - vᵧᵧ * wₓₓ) - wₓᵧ * (vₓᵧ - wₓᵧ)) +
            wₓₓ * (2 * vᵧᵧ * wₓₓ + vₓᵧ * (vₓᵧ - wₓᵧ)));
    // Due to constraints, `y2`, `y1` and `y0` all vanish.
    // Solve for: yy4*y + yy3 = 0
    const b3 = -yy3 / xx4; // note: yy4 === xx4
    const x3 = a3 + x0 - 3 * (x1 - x2); //note: a3 === (x3 - x0) + 3*(x1 - x2)
    const y3 = b3 + y0 - 3 * (y1 - y2); //note: b3 === (y3 - y0) + 3*(y1 - y2)
    // Note: A self-intersection occurs when:
    // `3*(a1*b3 - a3*b1)**2 + 4*(a2*b1 - a1*b2)*(a2*b3 - a3*b2) <= 0`
    return [[x0, y0], [x1, y1], [x2, y2], [x3, y3]];
}
export { generateSelfIntersecting };
//# sourceMappingURL=generate-self-intersecting.js.map