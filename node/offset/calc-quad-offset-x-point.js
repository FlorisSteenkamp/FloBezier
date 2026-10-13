import { brent } from 'flo-poly';
import { getCurvatureExtrema } from '../get-curvature-extrema/double/get-curvature-extrema.js';
import { getQuadOffsetCurveFunctions } from './get-quad-offset-curve-functions.js';
import { normal } from '../local-properties-at-t/normal/double/normal.js';
const { sign, abs } = Math;
const { EPSILON: eps } = Number;
/**
 * Calculates and returns the parameter values `[tS, tE]` (with `tS < tE`) at
 * which the offset curve of the given *quadratic* bezier curve intersects
 * itself (if at all), i.e. the offset curve point at `tS` coincides with the
 * offset curve point at `tE`.
 *
 * * returns `undefined` if no such self-intersection exists (e.g. if `|D|` is
 * smaller than the minimum radius of curvature of the curve) or if the
 * self-intersection is not within the (slightly extended) parameter range
 * `[-0.125, 1.125]`
 * * offset is in the normal direction of the curve as `t` goes from `0` to `1`
 * * offset can be negative
 * * an error is thrown if the given curve is not quadratic
 *
 * * see [this Desmos graph (zoom out)](https://www.desmos.com/calculator/eynkl9vzwb)
 *
 * @param ps a quadratic bezier curve given as an ordered array of its
 * control points, e.g. `[[0,0],[1,1],[2,0]]`
 * @param D distance of offset curve (can be negative)
 *
 * @doc mdx
 */
function calcQuadOffsetCurveXPoint(ps, D) {
    if (ps.length !== 3) {
        throw new Error('The given bezier curve must be quadratic (order 2).');
    }
    const m = getCurvatureExtrema(ps).maxima?.[0];
    if (m === undefined) {
        // extrema not within [0,1] or curve is degenerate
        return undefined;
    }
    // cached values (values under sqrt)
    //----------------------------------
    // const T = (2*a*t + b)**2 + (2*d*t + e)**2;
    // const S = (2*a*s + b)**2 + (2*d*s + e)**2;
    // Offset curve (in terms of `t`)
    //-----------------------------------
    // const Oxt = D*( 2*d*t + e)/sqrt(T) + a*t**2 + b*t + c;
    // const Oyt = D*(-2*a*t - b)/sqrt(T) + d*t**2 + e*t + f;
    // Both these equations must vanish - one is numerically more stable than
    // the other depending on the orientation of the quadratic bezier curve.
    //--------------------------------------------------------------------
    // const X = D*( 2*d*t + e)/sqrt(T) + a*t**2 + b*t + c - (D*( 2*d*s + e)/sqrt(S) + a*s**2 + b*s + c);
    // const Y = D*(-2*a*t - b)/sqrt(T) + d*t**2 + e*t + f - (D*(-2*a*s - b)/sqrt(S) + d*s**2 + e*s + f);
    const n = normal(ps, m);
    const ratio = abs(n[1] / n[0]);
    const _O = getQuadOffsetCurveFunctions(ps, D);
    // for numerical stability
    const O = ratio < 1
        ? _O.X
        : _O.Y;
    function XY(t) {
        // s !== t at this point
        const s = 2 * m - t; // (due to symmetry of quadratic)
        const _v = O(t) - O(s);
        const v = _v / (s - t); // this division removes the unwanted trivial root at t === s
        if (Number.isFinite(v)) {
            return v;
        }
        return sign(s - t) * 4 * eps;
    }
    const F = 2 ** 16 * eps;
    const C = F * m; // assume some "large" error for now - improve precision later for guaranteed error bounds
    const _m = m - C;
    const m_ = m + C;
    const lb = -0.125;
    const ub = 1.125;
    // `brent` requires the root to be bracketed, i.e. a sign change over the
    // interval - if there is none there is no self-intersection (at least not
    // within the extended parameter range).
    if (sign(XY(lb)) === sign(XY(_m)) || sign(XY(m_)) === sign(XY(ub))) {
        return undefined;
    }
    const rS = brent(XY, lb, _m);
    const rE = brent(XY, m_, ub);
    return [rS, rE];
}
export { calcQuadOffsetCurveXPoint };
//# sourceMappingURL=calc-quad-offset-x-point.js.map