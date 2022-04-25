import { allRootsCertifiedSimplified } from 'flo-poly';
import { toPowerBasis_1stDerivative } from '../../to-power-basis/to-power-basis-1st-derivative/double/to-power-basis-1st-derivative.js'
import { YBounds } from "./bounds.js";
import { getIntervalBox } from './get-interval-box/get-interval-box.js';


/**
 * Returns tight y-coordinate bounds of the given bezier curve.
 * 
 * @param ps an order 1, 2 or 3 bezier curve given as an array of control 
 * points, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * 
 * @doc mdx
 */
 function getYBoundsTight(ps: number[][]): YBounds {
	const pS = ps[0];
	const pE = ps[ps.length-1];

	let minY: { ts: number[]; box: number[][]; };
	let maxY: { ts: number[]; box: number[][]; };
	if (pS[1] < pE[1]) {
		minY = { ts: [0,0], box: [pS,pS] };
		maxY = { ts: [1,1], box: [pE,pE] };
	} else {
		minY = { ts: [1,1], box: [pE,pE] };
		maxY = { ts: [0,0], box: [pS,pS] };
	}

	if (ps.length === 2) { return { minY, maxY }; }

	const [,dy] = toPowerBasis_1stDerivative(ps);
    const rootsY = allRootsCertifiedSimplified(dy,0,1);


	// Test points
	for (let i=0; i<rootsY.length; i++) {
		const r = rootsY[i];
        const ts = [r.tS, r.tE];
		const box = getIntervalBox(ps, ts);

		if (box[0][1] < minY.box[0][1]) { 
            minY = { ts, box } 
        }
		if (box[1][1] > maxY.box[0][1]) { 
            maxY = { ts, box } 
        }
	}

	return { minY, maxY };
}


export { getYBoundsTight }
