import { evalDeCasteljau } from "../../../local-properties-at-t/evaluate/double/eval-de-casteljau.js";
import { evalDeCasteljauError } from "../../../local-properties-at-t/evaluate/eval-de-casteljau-error.js";
import { γ } from '../../../error-analysis/error-analysis.js';
import { fromTo3InclErrorBound } from "../../../transformation/split/from-to/from-to-3-incl-error-bound.js";
import { fromTo2InclErrorBound } from "../../../transformation/split/from-to/from-to-2-incl-error-bound.js";
import { fromTo1InclErrorBound } from "../../../transformation/split/from-to/from-to-1-incl-error-bound.js";

const eps = Number.EPSILON;
const u = eps/2;
const abs = Math.abs;
const γ1 = γ(1);


/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire 
 * given bezier curve from t1 to t2. The returned box is given as a pair
 * of points (the box corners) in double precision, e.g. `[[1,1], [2,2]]`.
 * 
 * * **precondition:** t1 < t2
 * * **precondition:** t1,t2 >= 0 && t1,t2 <= 1
  * evalDeCasteljauWithErr - can easily be relaxed)
 * 
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control 
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param ts [first, second] parameter values, e.g. [0.11, 0.12]
 * 
 * @doc mdx
 */
function getIntervalBox(
        ps: number[][], 
        ts: number[]): number[][] {

    if (ts[0] !== ts[1]) {
        if (ps.length === 4) {
            return getIntervalBox3(ps, ts);
        }
        if (ps.length === 3) {
            return getIntervalBox2(ps, ts);
        }
        return getIntervalBox1(ps, ts);
    } 
    
    // ts[0] === ts[1]
    return getIntervalBoxAtT(ps, ts[0]);
}


/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire given 
 * bezier curve from t1 to t2.
 * 
 * This is achieved by calculating the error bounds of a new curve calculated
 * form t1 to t2 using a splitting algorithm and then taking its extreme 
 * control points and finally finding a box that engulfs the control points.
 * @internal
 * 
 * @param ps 
 * @param ts 
 */
 function getIntervalBox3(
        ps: number[][],
        ts: number[]): number[][] {

    const { ps: psI, _ps: _psI } = fromTo3InclErrorBound(ps, ts[0], ts[1]);

    const x0 = psI[0][0];
    const x1 = psI[1][0];
    const x2 = psI[2][0];
    const x3 = psI[3][0];
    const _x0 = 9*u*_psI[0][0];
    const _x1 = 9*u*_psI[1][0];
    const _x2 = 9*u*_psI[2][0];
    const _x3 = 9*u*_psI[3][0];

    const y0 = psI[0][1];
    const y1 = psI[1][1];
    const y2 = psI[2][1];
    const y3 = psI[3][1];
    const _y0 = 9*u*_psI[0][1];
    const _y1 = 9*u*_psI[1][1];
    const _y2 = 9*u*_psI[2][1];
    const _y3 = 9*u*_psI[3][1];

    const minX = Math.min(x0 - _x0, x1 - _x1, x2 - _x2, x3 - _x3);
    const maxX = Math.max(x0 + _x0, x1 + _x1, x2 + _x2, x3 + _x3);
    const minY = Math.min(y0 - _y0, y1 - _y1, y2 - _y2, y3 - _y3);
    const maxY = Math.max(y0 + _y0, y1 + _y1, y2 + _y2, y3 + _y3);

    return [[minX,minY],[maxX,maxY]];
}


/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire given 
 * bezier curve from t1 to t2.
 * 
 * This is achievied by calculating the error bounds of a new curve calculated
 * form t1 to t2 using a splitting algorithm and then taking its extreme 
 * control points and finally finding a box that engulfs the control points
 *
 * @param param0 
 * @param param1 
 * 
 * @internal
 */
function getIntervalBox2(
        ps: number[][], 
        ts: number[]): number[][] {

    const { ps: psI, _ps: _psI } = fromTo2InclErrorBound(ps, ts[0], ts[1]);

    const x0 = psI[0][0];
    const x1 = psI[1][0];
    const x2 = psI[2][0];
    const _x0 = 5*u*_psI[0][0];
    const _x1 = 5*u*_psI[1][0];
    const _x2 = 5*u*_psI[2][0];

    const y0 = psI[0][1];
    const y1 = psI[1][1];
    const y2 = psI[2][1];
    const _y0 = 5*u*_psI[0][1];
    const _y1 = 5*u*_psI[1][1];
    const _y2 = 5*u*_psI[2][1];

    const minX = Math.min(x0 - _x0, x1 - _x1, x2 - _x2);
    const maxX = Math.max(x0 + _x0, x1 + _x1, x2 + _x2);
    const minY = Math.min(y0 - _y0, y1 - _y1, y2 - _y2);
    const maxY = Math.max(y0 + _y0, y1 + _y1, y2 + _y2);

    return [[minX,minY],[maxX,maxY]];
}


/**
 * Returns an axis-aligned-box that is guaranteed to engulf the entire given 
 * bezier curve from t1 to t2.
 * 
 * This is achievied by calculating the error bounds of a new curve calculated
 * form t1 to t2 using a splitting algorithm and then taking its extreme 
 * control points and finally finding a box that engulfs the control points
 *
 * @param param0 
 * @param param1 
 * 
 * @internal
 */
function getIntervalBox1(
        ps: number[][], 
        ts: number[]): number[][] {

    // Implementation for lines kept for symmetry - there are obviously much
    // simpler ways to calculate the required box in the case of a line.

    const { ps: psI, _ps: _psI } = fromTo1InclErrorBound(ps, ts[0], ts[1]);

    const x0 = psI[0][0];
    const x1 = psI[1][0];
    const _x0 = 3*u*_psI[0][0];
    const _x1 = 3*u*_psI[1][0];

    const y0 = psI[0][1];
    const y1 = psI[1][1];
    const _y0 = 3*u*_psI[0][1];
    const _y1 = 3*u*_psI[1][1];

    const minX = Math.min(x0 - _x0, x1 - _x1);
    const maxX = Math.max(x0 + _x0, x1 + _x1);
    const minY = Math.min(y0 - _y0, y1 - _y1);
    const maxY = Math.max(y0 + _y0, y1 + _y1);

    return [[minX,minY],[maxX,maxY]];
}


/**
 * @param ps 
 * @param t 
 * 
 * @internal
 */
function getIntervalBoxAtT(
        ps: number[][], 
        t: number): number[][] {

    const _pS = ps[0];
    const _pE = ps[ps.length-1];

    if (t === 0) {
        return [_pS,_pS];
    } else if (t === 1) {
        return [_pE,_pE];
    }

    const p = evalDeCasteljau(ps, t);
    let pE: number[];
    if (ps.length === 4) {
        pE = evalDeCasteljauError(ps, [0,t]).map(c_ => 8*γ1*c_)
    } else if (ps.length === 3) {
        pE = evalDeCasteljauError(ps, [0,t]).map(c_ => 5*γ1*c_)
    } else if (ps.length === 2) {
        pE = evalDeCasteljauError(ps, [0,t]).map(c_ => 2*γ1*c_)
    } else if (ps.length === 1) {
        return [p,p];
    }

    return [
        [p[0] - pE![0], p[1] - pE![1]],
        [p[0] + pE![0], p[1] + pE![1]]
    ];
}


export { getIntervalBox }

// 416