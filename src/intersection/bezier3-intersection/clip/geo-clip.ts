//import { allRoots } from 'flo-poly';
import { toHybridQuadratic as _toHybridQuadratic } from './to-hybrid-quadratic';
import { __debug__ } from '../debug';


const toHybridQuadratic = _toHybridQuadratic;

const min = Math.min;
const max = Math.max;


/**
 * @param G the bezier curve to be geo clipped
 * @param dF distance to fat line's zero line
 * @param dMin fat line min signed distance
 * @param dMax fat line max signed distance
 */
function geoClip(
        G: number[][], 
        dF: (p: number[]) => number, 
        dMin: number, 
        dMax: number) {

    let hq = toHybridQuadratic(G);
    /** distance (from line) to hybrid quadratic (and cubic) first control point */
    let dH0   = dF(hq[0]);
    /** distance (from line) to hybrid quadratic (and cubic) last control point */
    let dH2   = dF(hq[3]);
    /** distance (from line) to hybrid quadratic's moving control point start */
    let dH10  = dF(hq[1]);
    /** distance (from line) to hybrid quadratic's moving control point end */
    let dH11  = dF(hq[2]);

    let dHmin = min(dH10, dH11);
    let dHmax = max(dH10, dH11);

    if (typeof __debug__ !== 'undefined' && !__debug__.already) {
        //if (__debug__.tree.name !== 'r') {
            __debug__.currentIter.hq = hq;
        //}
    }

    const a = dH0 - 2*dHmin + dH2;
    const b = -2*dH0 + 2*dHmin;

    const d = dH0 - 2*dHmax + dH2;
    const e = -2*dH0 + 2*dHmax;

    //console.log(hq);
    //console.log(dH0, dH2, dH10, dH11);
    //console.log(a,b,d,e,dH0);

    let rootsMinMin = quadraticRoots(a, b, dH0 - dMin);
    let rootsMinMax = quadraticRoots(a, b, dH0 - dMax);
    let rootsMaxMin = quadraticRoots(d, e, dH0 - dMin);
    let rootsMaxMax = quadraticRoots(d, e, dH0 - dMax);
    
    let tMin = Number.POSITIVE_INFINITY;
    let tMax = Number.NEGATIVE_INFINITY;

    for (let i=0; i<rootsMinMin.length; i++) {
        const r = rootsMinMin[i];
        if (r >= 0 && r <= 1) {
            if (r < tMin) { tMin = r; }
            if (r > tMax) { tMax = r; }
        }
        //if (r < 0) { tMin = 0; } if (r > 1) { tMax = 1; }
    }

    for (let i=0; i<rootsMinMax.length; i++) {
        const r = rootsMinMax[i];
        if (r >= 0 && r <= 1) {
            if (r < tMin) { tMin = r; }
            if (r > tMax) { tMax = r; }
        }
    }

    for (let i=0; i<rootsMaxMin.length; i++) {
        const r = rootsMaxMin[i];
        if (r >= 0 && r <= 1) {
            if (r < tMin) { tMin = r; }
            if (r > tMax) { tMax = r; }
        }
    }

    for (let i=0; i<rootsMaxMax.length; i++) {
        const r = rootsMaxMax[i];
        if (r >= 0 && r <= 1) {
            if (r < tMin) { tMin = r; }
            if (r > tMax) { tMax = r; }
        }
    }

    if (dH0 >= dMin && dH0 <= dMax) {
        tMin = 0;
    }
    if (dH2 >= dMin && dH2 <= dMax) {
        tMax = 1;
    }

    if (tMin < 0) { tMin = 0; } 
    if (tMax > 1) { tMax = 1; }


    // ADDED!!!! CHECK CORRECTNESS!!!!
    //if (tMin === Number.POSITIVE_INFINITY) {
    //    tMin = 0;
    //}
    //if (tMax === Number.NEGATIVE_INFINITY) {
    //    tMax = 1;
    //}


    return {tMin, tMax};
}


/**
 * Floating-point-stably calculates and returns the quadratic roots of 
 * the given quadratic polynomial.
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
                // TODO - handle this case when this function is called
                return undefined;
            }

            // no roots
            return [];
        }

        // degenerate linear
        return [-c/b];
    }

	const _D = b*b - 4*a*c;
	
	if (_D < 0) {
		// no real roots
		return []; 
	}
	
	if (_D === 0) {
		return [-b / (2*a)];
	}
	
	const D = Math.sqrt(_D);
	
	return b >= 0 ? [
            (-b - D) / (2*a), 
            (2*c) / (-b - D)
        ] : [
            (2*c) / (-b + D), 
            (-b + D) / (2*a)
        ];
}


export { geoClip }



// unrolled toHybridQuadratic(P);
    //const p0 = P[0];
    //const p1 = P[1];
    //const p2 = P[2];
    //const p3 = P[3];
    //const x0 = p0[0];
    //const y0 = p0[1];
    //const x1 = p1[0];
    //const y1 = p1[1];
    //const x2 = p2[0];
    //const y2 = p2[1];
    //const x3 = p3[0];
    //const y3 = p3[1];
    //let dH0   = dQ([x0,y0]);
    //let dH2   = dQ([x3,y3]);
    //let dH10  = dQ([(3*x1 - x0)/2, (3*y1 - y0)/2]);
    //let dH11  = dQ([(3*x2 - x3)/2, (3*y2 - y3)/2]);