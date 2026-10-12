import { eMultBy2, eMultDouble1, eMult, eAdd, eDiff, eNegativeOf } from "big-float-ts";
import { toPowerBasis_1stDerivativeExact } from "../to-power-basis/to-power-basis-1st-derivative/exact/to-power-basis-1st-derivative-exact.js";
const em2 = eMultBy2;
const emd = eMultDouble1;
const eme = eMult;
const eae = eAdd;
const ede = eDiff;
const eno = eNegativeOf;
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
function getAbsCurvatureExtremaPolysE(ps) {
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
    const [[a, b, c], [d, e, f]] = toPowerBasis_1stDerivativeExact(ps);
    const P = ede(eme(a, e), eme(b, d));
    const Q = ede(eme(a, f), eme(c, d));
    const R = ede(eme(b, f), eme(c, e));
    const Saa = eae(eme(a, a), eme(d, d));
    const Sab = eae(eme(a, b), eme(d, e));
    const Sac = eae(eme(a, c), eme(d, f));
    const Sbb = eae(eme(b, b), eme(e, e));
    const Sbc = eae(eme(b, c), eme(e, f));
    const Scc = eae(eme(c, c), eme(f, f));
    const S8 = eae(emd(Sac, 8), emd(Sbb, 3));
    const t5 = emd(eme(Saa, P), -4);
    const t4 = eno(eae(emd(eme(Saa, Q), 10), emd(eme(Sab, P), 5)));
    const t3 = eno(eae(eae(emd(eme(Saa, R), 4), emd(eme(Sab, Q), 16)), eme(Sbb, P)));
    const t2 = eno(eae(emd(eme(Sab, R), 10), eme(S8, Q)));
    const t1 = eno(eme(S8, R));
    const t0 = ede(emd(eme(Scc, Q), 2), emd(eme(Sbc, R), 3));
    return {
        inflectionPoly: [P, em2(Q), R],
        otherExtremaPoly: [t5, t4, t3, t2, t1, t0]
    };
}
export { getAbsCurvatureExtremaPolysE };
//# sourceMappingURL=get-abs-curvature-extrema-polys-e.js.map