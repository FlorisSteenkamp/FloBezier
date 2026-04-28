import { brent } from 'flo-poly';
import { getCurvatureExtrema } from '../get-curvature-extrema/get-curvature-extrema.js';
import { toPowerBasis } from '../to-power-basis/to-power-basis/double/to-power-basis.js';
import { getQuadOffsetCurveFunctions } from './get-quad-offset-curve-functions.js';
import { normal } from '../local-properties-at-t/normal/normal.js';

const { sign, abs } = Math;
const { EPSILON: eps} = Number;


/**
 * Calculates and returns the point (as the `t` value) of intersection of the
 * offset curves of a quadratic bezier curve (if any).
 * 
 * * returns `undefined` if no such point exist
 * * offset is in normal direction of curve as `t` goes from `0` to `1`
 * * offset can be negative
 * 
 * * see [this Desmos graph (zoom out)](https://www.desmos.com/calculator/eynkl9vzwb)
  * 
 * @param ps an order 1,2 or 3 bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param D distance of offset curve (can be negative)
 * 
 * @doc mdx
 */
function calcQuadOffsetCurveXPoint(
        ps: number[][],
        D: number) {

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
    const ratio = abs(n[1]/n[0]);

    const _O = getQuadOffsetCurveFunctions(ps, D);

    // for numerical stability
    const O = ratio < 1
        ? _O.X
        : _O.Y;

    function XY(t: number) {
        // s !== t at this point
        const s = 2*m - t;  // (due to symmetry of quadratic)

        const _v = O(t) - O(s);
        const v = _v/(s - t);  // this division removes the unwanted trivial root at t === s
        if (Number.isFinite(v)) {
            return v;
        }

        return sign(s - t)*4*eps;
    }

    const F = 2**16*eps;
    const C = F*m;  // assume some "large" error for now - improve precision later for guaranteed error bounds 
    const _m = m - C;
    const m_ = m + C;

    // if (_m < F || m_ > 1 - F) {
    //     // intersection is very close to endpoint
    //     return undefined;
    // }

    const rS = brent(XY, -0.125, _m);
    const rE = brent(XY, m_, 1.125);

    return [rS,rE];
}


export { calcQuadOffsetCurveXPoint }


// Quokka tests
// import { rotate90Degrees } from 'flo-vector2d';

// const ps = [[-175,200],[-160,125],[-120,200]];
// calcQuadOffsetCurveXPoint(ps, -20);//?
// const ps90 = ps.map(rotate90Degrees);
// calcQuadOffsetCurveXPoint(ps90, -20);//?

