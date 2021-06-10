import { toString } from '../../..';
import type { __Debug__ } from '../debug';
import { toHybridQuadratic as _toHybridQuadratic } from './to-hybrid-quadratic';

declare var __debug__: __Debug__;

const toHybridQuadratic = _toHybridQuadratic;

const min = Math.min;
const max = Math.max;
const abs = Math.abs;
const eps = Number.EPSILON;
const u = eps/2;
const onemin = 1 - eps;
const onemax = 1 + eps;


const noIntersection: undefined = undefined;
const noClip: number[] = [0,1];

/**
 * Performs geometric clipping of the given bezier curve and returns the new
 * minimum and maximum `t` parameter values.
 * 
 * * helper function to the geometric interval bezier-bezier intersection 
 * algorithm
 * * the returned min and max `t` values has the following guarantees:
 *   * `Number.EPSILON | t`
 *   * `0 <= t <= 1`
 * 
 * @param G the bezier curve to be geo clipped - coordinate error bounds are 
 * assumed to have counters of `[[<6>,<6>], [<6>,<6>], [<10>,<10>], [<11>,<11>]]`
 * @param dF function to calculate a min and max distance to the fat line's 'baseline'
 * @param dMin fat line min signed distance
 * @param dMax fat line max signed distance
 * 
 * @internal
 */
function geoClip(
        G: { ps: number[][], _ps: number[][] }, 
        dF: (p: number[], _p: number[]) => { dMin: number; dMax: number; },
        dMin: number, 
        dMax: number): number[] | undefined {

    const _hq_ = toHybridQuadratic(G);
    // estimated hybrid coordinates
    const hq = _hq_.hq;     
    // hybrid coordinate error bounds with error counters of <8> and <12> for
    // the two points respectively (both x and y coordinates have same error
    // counters)
    const _hq = _hq_._hq;
    
    // estimated bezier control points
    const Gps = G.ps;
    // coordinate error bounds are assumed to have counters 
    // of `[[<6>,<6>], [<6>,<6>], [<10>,<10>], [<11>,<11>]]`
    const G_ps = G._ps;

    /** min/max distance (from line) to hybrid quadratic (and cubic) first control point */
    const dH0   = dF(Gps[0], G_ps[0]);
    /** min/max distance (from line) to hybrid quadratic (and cubic) last control point */
    const dH2   = dF(Gps[3], G_ps[3]);
    /** min/max distance (from line) to hybrid quadratic's moving control point start */
    const dH10  = dF(hq[0], _hq[0]);
    /** min/max distance (from line) to hybrid quadratic's moving control point end */
    const dH11  = dF(hq[1], _hq[1]);

    const dH1min = min(dH10.dMin, dH11.dMin);
    const dH1max = max(dH10.dMax, dH11.dMax);

    if (typeof __debug__ !== 'undefined' && !__debug__.already) {
        const currentIter = __debug__.currentIter;
        // just for drawing purposes (not perfectle accurate)
        currentIter.hq = [G.ps[0], ...hq, G.ps[3]];
        if (currentIter.geo) {
            // we already did the first geoclip - assume this to be the perpendicular clip
            currentIter.geoPerp = { dH0, dH10, dH11, dH2, dMin, dMax };
        } else {
            currentIter.geo = { dH0, dH10, dH11, dH2, dMin, dMax };
        }
    }

    const dH0Min = dH0.dMin;
    const dH0Max = dH0.dMax;
    const dH2Min = dH2.dMin;
    const dH2Max = dH2.dMax;

    //--------------------------------------------------------------------------
    // see the paper at https://scholarsarchive.byu.edu/cgi/viewcontent.cgi?referer=&httpsredir=1&article=2206&context=etd)
    // After writing eq. (3.16) and (3.17) in power basis (by simply multiplying 
    // out and collecting terms) and taking error bounds into account:
    //--------------------------------------------------------------------------
    
    /** the quadratic term coefficient of the *lower* Bernstein basis polynomial */
    const a = dH0Min - 2*dH1min + dH2Min;  // t^2 
    /** the linear term coefficient of the *lower* Bernstein basis polynomial */
    const b = -2*(dH0Min - dH1min);  // t^1
    /** 
     * the constant term coefficient of the *lower* Bernstein basis polynomial's
     * intersection with the lower fat line (dMin)
     */ 
    const c1 = dH0Min - dMin;  // t^0 - dMin
    /** 
     * the constant term coefficient of the *lower* Bernstein basis polynomial's
     * intersection with the upper fat line (dMax)
     */ 
    const c2 = dH0Min - dMax;  // t^0 - dMax


    /** the quadratic term coefficient of the *upper* Bernstein basis polynomial */
    const d = dH0Max - 2*dH1max + dH2Max;
    /** the linear term coefficient of the *upper* Bernstein basis polynomial */
    const e = -2*(dH0Max - dH1max);
    /** 
     * the constant term coefficient of the *upper* Bernstein basis polynomial's
     * intersection with the *lower* fat line (dMin)
     */ 
    const f1 = dH0Max - dMin;
    /** 
     * the constant term coefficient of the *upper* Bernstein basis polynomial's
     * intersection with the *upper* fat line (dMax)
     */ 
    const f2 = dH0Max - dMax;
    //--------------------------------------------------------------------------

    
    let tMin = Number.POSITIVE_INFINITY;
    let tMax = Number.NEGATIVE_INFINITY;

    /** *lower* Bernstein *lower* fatline roots */
    let rootsMinBMinF = quadraticRoots(a, b, c1);
    /** *lower* Bernstein *upper* fatline roots */
    let rootsMinBMaxF = quadraticRoots(a, b, c2);
    /** *upper* Bernstein *lower* fatline roots */
    let rootsMaxBMinF = quadraticRoots(d, e, f1);
    /** *upper* Bernstein *upper* fatline roots */
    let rootsMaxBMaxF = quadraticRoots(d, e, f2);

    // if there are an infinite number of roots, i.e. if the quadratic is
    // really the zero polynomial (of negative infinite degree)
    if (rootsMinBMinF === undefined || rootsMinBMaxF === undefined || 
        rootsMaxBMinF === undefined || rootsMaxBMaxF === undefined) { 
        // no clipping could happen
        return noClip; 
    }
    
   
    for (let i=0; i<rootsMinBMinF.length; i++) {
        const r = rootsMinBMinF[i];
        if (r < tMin) { tMin = r; }
        if (r > tMax) { tMax = r; }
    }

    for (let i=0; i<rootsMinBMaxF.length; i++) {
        const r = rootsMinBMaxF[i];
        if (r < tMin) { tMin = r; }
        if (r > tMax) { tMax = r; }
    }

    for (let i=0; i<rootsMaxBMinF.length; i++) {
        const r = rootsMaxBMinF[i];
        if (r < tMin) { tMin = r; }
        if (r > tMax) { tMax = r; }
    }

    for (let i=0; i<rootsMaxBMaxF.length; i++) {
        const r = rootsMaxBMaxF[i];
        if (r < tMin) { tMin = r; }
        if (r > tMax) { tMax = r; }
    }

   
    if (dH0Max >= dMin && dH0Min <= dMax) {
        tMin = 0;
    }
    if (dH2Max >= dMin && dH2Min <= dMax) { 
        tMax = 1;
    }

    if (tMin === Number.POSITIVE_INFINITY) {
        // will have here also: `tMax === Number.NEGATIVE_INFINITY`
        return noIntersection;
    }

    return [tMin, tMax];
}


/**
 * Floating-point-stably calculates and returns the (ordered) quadratic roots of 
 * the given quadratic polynomial in [0,1].
 * 
 * * **precondition:** the input polynomial must be quadratic (given as an array
 * of exactly 3 values with the first value *unequal* to zero)
 * 
 * @param p a quadratic polynomial with coefficients given as an array 
 * of double floating point numbers from highest to lowest power, e.g. `[5,-3,0]` 
 * represents the quadratic `5x^2 - 3x`
 * 
 * @example
 * ```typescript 
 * quadraticRoots([1, -3, 2]); //=> [1,2]
 * ```
 * 
 * @doc
 */
function quadraticRoots(
        a: number, 
        b: number, 
        c: number): number[] {

    if (a === 0) {
        if (b === 0) {
            // degenerate constant (degree 0 polynomial)
            if (c === 0) {
                // degenerate zero polynomial (degree -infinity polynomial)
                // infinite number of roots
                return undefined;
            }

            // no roots
            return [];
        }

        // degenerate linear
        //return [-c/b];

        const r = -c/b;
        const E = abs(r*u);
        const Emin = r-E;
        const Emax = r+E;
        if (Emax < 0 || Emin > 1) { return []; }

        if (Emin < 0 && Emax > 0) { return [0,Emax]; }
        if (Emin < 1 && Emax > 1) { return [Emin,1]; }

        // we return the root interval pairs inline to account for error
        return [Emin, Emax];  
    }

    if (c === 0) {
        const r = -b/a;
        const E = abs(r*u);
        const Emin = r-E;
        const Emax = r+E;
        if (Emax < 0 || Emin > 1) { return []; }

        if (Emin < 0 && Emax > 0) { return [0,Emax]; }
        if (Emin < 1 && Emax > 1) { return [0,Emin,1]; }

        // we return the root interval pairs inline to account for error
        return [Emin, Emax];  
    }

    const D1 = b*b;  // <1>D1 (error counters)
    const D2 = 4*a*c;  // <1>D2
	const D = D1 - D2;
    // <2>D <= D1 - D2;  // <2>(<1>D1 + <1>D2)
    const _D = D1 + abs(D2);
    const D_ = 2*u*_D;
	
	if (D + D_ < 0) {
		// no real roots possible
		return []; 
	}

    // at this point `D + D_ >= 0`

	if (D + D_ === 0) {
        const r = -b/(2*a);
        const E = abs(r*u);  // single division error

        const Emin = r-E;
        const Emax = r+E;
        if (Emax < 0 || Emin > 1) { return []; }

        if (Emin < 0 && Emax > 0) { return [0,Emax]; }
        if (Emin < 1 && Emax > 1) { return [Emin,1]; }

        // we return the root interval pairs inline to account for error
        return [Emin, Emax];  
	}

    // at this point `D + D_ > 0`

    const Dmin = D - D_ < 0 ? 0 : D - D_;
    const DDmin = Math.sqrt(Dmin)*(1 - eps);
    const DDmax = Math.sqrt(D + D_)*(1 + eps);

    // at this point DDMax > 0

    // at this point `DDmax > 0` and `DDmin >= 0`
    let numerMaxAbs: number;
    let numerMinAbs: number;
    if (b >= 0) {
        numerMaxAbs = -b - DDmax;
        numerMinAbs = -b - DDmin;
    } else {
        numerMinAbs = -b + DDmin;
        numerMaxAbs = -b + DDmax;
    }
    const a2 = 2*a;
    const c2 = 2*c;

    //const r1 = numerMin / a2;
    //const r2 = c2 / numerMin;

    // at this point `numerMin` and `numerMax` have the same sign (or numerMin is zero)
    let r1min: number;
    let r1max: number;
    let r2min: number;
    let r2max: number;
    if (numerMaxAbs*a2 >= 0) {
        // same signs - `r1min >= 0` and `r1max > 0`
        r1min = (numerMaxAbs/a2)*(1 - eps);
        r1max = (numerMinAbs/a2)*(1 + eps);
    } else {
        // opposite signs - `r1min <= 0` and `r1max < 0`
        r1min = (numerMaxAbs/a2)*(1 + eps);
        r1max = (numerMinAbs/a2)*(1 - eps);
    }
    if (numerMaxAbs*c2 > 0) {
        // same signs - `r2min > 0` and `r2Max >= 0`
        r2min = (c2/numerMaxAbs)*(1 - eps);
        // TODO - check if below can be a `NaN`
        r2max = (c2/numerMinAbs)*(1 + eps);  // could be +-inf
    } else if (numerMaxAbs*c2 < 0) {
        // opposite signs - `r2min < 0` and `r2Max <= 0`
        // TODO - check if below can be a `NaN`
        r2min = (c2/numerMinAbs)*(1 + eps);  // could be +-inf 
        r2max = (c2/numerMaxAbs)*(1 - eps);
    }

    const rs: number[] = [];
    if (r1max < 0 || r1min > 1) {
        // root is outside of range
    } else {
        // we return the root interval pairs inline
        // at this stage r1min might be (slightly) < 0 and r1max > 1
        rs.push(r1min < 0 ? 0 : r1min, r1max > 1 ? 1 : r1max);
    }

    if (r2max < 0 || r2min > 1) {
        // root is outside of range
    } else {
        // we return the root interval pairs inline
        // at this stage r2min might be (slightly) < 0 and r2max > 1
        rs.push(r2min < 0 ? 0 : r2min, r2max > 1 ? 1 : r2max);
    }

    return rs;  // not ordered
}


export { geoClip }
