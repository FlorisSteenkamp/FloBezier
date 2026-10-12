import { toPowerBasis_1stDerivative } from "../../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js";


/**
 * Returns the polynomials whose zeros are the `t` values of the local 
 * minima / maxima of the absolute curvature for the given bezier curve. 
 * 
 * The polynomials are in the form `p1*p2` where the zeros
 * of `p1` are the inflection points and the zeros of `p2` are the other minima /
 * maxima.
 * 
 * * **precondition:** must be a `true` cubic bezier (not degenerate to line or
 * quadratic)
 * * see [MvG](https://math.stackexchange.com/a/1956264/130809)
 * * **non-exact:** due to floating point roundof during calculation
 * 
 * @param ps an order 1,2 or 3 bezier curve given as an array of its control 
 * points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @internal
 */
function getAbsCurvatureExtremaPolys(
        ps: number[][]): { inflectionPoly: number[], otherExtremaPoly: number[] } {

    // It is a real cubic - use the excellent answer from the description:
    // dd(kappa^2)/dt === (x′′y′ − x′y′′)*((x′′′y′ − x′y′′′)(x′2 + y′2) − 3(x′x′′ + y′y′′)(x′′y′ − x′y′′))
    // Inflection points at: (x′′y′ − x′y′′) === 0
    // Max abs curvature at: ((x′′′y′ − x′y′′′)(x′2 + y′2) − 3(x′x′′ + y′y′′)(x′′y′ − x′y′′)) === 0
    //
    // With the 1st derivative given by `x′ = a*t² + b*t + c` and 
    // `y′ = d*t² + e*t + f`, the 2nd and 3rd derivatives are `x′′ = 2a*t + b`, 
    // `x′′′ = 2a`, `y′′ = 2d*t + e` and `y′′′ = 2d` so that, after expanding 
    // and collecting terms (using sympy), the polynomials can be written in 
    // terms of only the 'cross products'
    //   P = ae - bd,  Q = af - cd,  R = bf - ce 
    // and the 'dot products'
    //   Saa = a² + d²,  Sab = ab + de,  Sac = ac + df,
    //   Sbb = b² + e²,  Sbc = bc + ef,  Scc = c² + f²
    // as:
    //   x′′y′ − x′y′′ = P*t² + 2Q*t + R  (the inflection polynomial)
    // and (the other extrema polynomial)
    //   t⁵: -4*Saa*P,  (t⁶ cancels, see https://math.stackexchange.com/a/1956264/130809)
    //   t⁴: -(10*Saa*Q + 5*Sab*P),
    //   t³: -(4*Saa*R + 16*Sab*Q + Sbb*P),
    //   t²: -(10*Sab*R + (8*Sac + 3*Sbb)*Q),
    //   t¹: -(8*Sac + 3*Sbb)*R,
    //   t⁰: 2*Scc*Q - 3*Sbc*R

    // `a,b,c` and `d,e,f` are the power basis coefficients of `x′` and `y′`
    const [[a,b,c],[d,e,f]] = toPowerBasis_1stDerivative(ps);

    const P = a*e - b*d;
    const Q = a*f - c*d;
    const R = b*f - c*e;

    const Saa = a*a + d*d;
    const Sab = a*b + d*e;
    const Sac = a*c + d*f;
    const Sbb = b*b + e*e;
    const Sbc = b*c + e*f;
    const Scc = c*c + f*f;

    const S8 = 8*Sac + 3*Sbb;

    const t5 = -4*Saa*P;
    const t4 = -(10*Saa*Q + 5*Sab*P);
    const t3 = -((4*Saa*R + 16*Sab*Q) + Sbb*P);
    const t2 = -(10*Sab*R + S8*Q);
    const t1 = -S8*R;
    const t0 = 2*Scc*Q - 3*Sbc*R;

    return {
        inflectionPoly: [P, 2*Q, R],
        otherExtremaPoly: [t5,t4,t3,t2,t1,t0]
    };
}


export { getAbsCurvatureExtremaPolys }
