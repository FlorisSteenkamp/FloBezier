//import { allRoots } from 'flo-poly';
import { toHybridQuadratic as _toHybridQuadratic } from '../clip/to-hybrid-quadratic';

const toHybridQuadratic = _toHybridQuadratic;


/**
 * @param P 
 * @param dQ Distance to fat line's zero line
 * @param dMin 
 * @param dMax 
 */
function geoClip(
        P: number[][], 
        dQ: (p: number[]) => number, 
        dMin: number, 
        dMax: number) {

    let hq = toHybridQuadratic(P);
    let dH0   = dQ(hq[0]);
    let dH2   = dQ(hq[2]);
    let dH10  = dQ(hq[1][0]);
    let dH11  = dQ(hq[1][1]);
    let dHmin = Math.min(dH10,dH11);
    let dHmax = Math.max(dH10,dH11);

    let DyMin = [
        dH0 - 2*dHmin + dH2,
        -2*dH0 + 2*dHmin,
        dH0
    ];

    let DyMax = [
        dH0 - 2*dHmax + dH2,
        -2*dH0 + 2*dHmax,
        dH0
    ]

    let DyMinMin = DyMin.slice();
    DyMinMin[2] = DyMinMin[2] - dMin; 
    let DyMinMax = DyMin.slice();
    DyMinMax[2] = DyMinMax[2] - dMax; 

    let DyMaxMin = DyMax.slice();
    DyMaxMin[2] = DyMaxMin[2] - dMin; 
    let DyMaxMax = DyMax.slice();
    DyMaxMax[2] = DyMaxMax[2] - dMax; 


    let tMin = Number.POSITIVE_INFINITY;
    let tMax = Number.NEGATIVE_INFINITY;

    //let rootsMinMin = allRoots(DyMinMin,0,1);
    //let rootsMinMax = allRoots(DyMinMax,0,1);
    //let rootsMaxMin = allRoots(DyMaxMin,0,1);
    //let rootsMaxMax = allRoots(DyMaxMax,0,1);
    let rootsMinMin = quadraticRoots(DyMinMin);
    let rootsMinMax = quadraticRoots(DyMinMax);
    let rootsMaxMin = quadraticRoots(DyMaxMin);
    let rootsMaxMax = quadraticRoots(DyMaxMax);
    
    tMin = Number.POSITIVE_INFINITY;
    tMax = Number.NEGATIVE_INFINITY;
    for (let i=0; i<rootsMinMin.length; i++) {
        const r = rootsMinMin[i];
        if (r >= 0 && r <= 1) {
            if (r < tMin) { tMin = r; }
            if (r > tMax) { tMax = r; }
        }
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

    //tMin = Math.min(...rootsMinMin, ...rootsMinMax, ...rootsMaxMin, ...rootsMaxMax);
    //tMax = Math.max(...rootsMinMin, ...rootsMinMax, ...rootsMaxMin, ...rootsMaxMax);

    if (dH0 >= dMin && dH0 <= dMax) {
        tMin = 0;
    }
    if (dH2 >= dMin && dH2 <= dMax) {
        tMax = 1;
    }

    if (tMin < 0) { tMin = 0; } 
    if (tMax > 1) { tMax = 1; }

    return {tMin, tMax};
}


/**
 * Floating-point-stably calculates and returns the ordered quadratic roots of 
 * the given quadratic polynomial.
 * 
 * * **precondition:** the input polynomial must be quadratic (given as an array
 * of exactly 3 values with the first value *unequal* to zero)
 * * **non-exact:** it is important to note that even though the roots are
 * calculated in a stable way they are still subject to round-off
 * * might be slightly faster than calling [[allRoots]].
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
 function quadraticRoots(p: number[]): number[] {
	const [a,b,c] = p;
	
	const _D = b*b - 4*a*c;
	
	if (_D < 0) {
		// No real roots;
		return []; 
	}
	
	if (_D === 0) {
		return [-b / (2*a)];
	}
	
	const D = Math.sqrt(_D);
	
	if (b >= 0) {
		const root1 = (-b - D) / (2*a);
		const root2 = (2*c) / (-b - D);

		return root1 < root2
			? [root1, root2]
			: [root2, root1];
	}

	const root1 = (2*c) / (-b + D);
	const root2 = (-b + D) / (2*a);

	return root1 < root2
		? [root1, root2]
		: [root2, root1];
}


export { geoClip }
