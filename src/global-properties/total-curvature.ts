import { gaussQuadrature } from "flo-gauss-quadrature";
import { evaluateDxy } from "../local-properties-at-t/t-to-dxy/double/evaluate-dxy.js";
import { evaluateDdxy } from "../local-properties-at-t/t-to-ddxy/double/evaluate-ddxy.js";
import { getInterfaceRotation } from '../simultaneous-properties/get-interface-rotation.js';
import { fromTo2 } from "../intersection/bezier3-intersection/from-to/from-to-2.js";
import { fromTo3 } from "../intersection/bezier3-intersection/from-to/from-to-3.js";
import { classify } from '../global-properties/classification/classify.js';

const 𝜋 = Math.PI;
const abs = Math.abs;


/**
 * TODO - replace this function with a more sane version where total curvature 
 * is tallied by looking for inflection points and adding curvature over those 
 * pieces by looking at tangent at beginning and end of the pieces.
 * Returns the total absolute curvature of the bezier over [0,1] using Gaussian 
 * Quadrature integration with 16 wieghts and abscissas which is generally very 
 * accurate and fast. Returns the result in radians. 
 * 
 * @param ps a cubic bezier
 * @param interval
 * 
 * @doc mdx
 */
function totalAbsoluteCurvature(
		ps: number[][], 
		interval: number[]): number {
	
	// Numerically integrate the absolute curvature
	return gaussQuadrature(
			t => Math.abs(κds(ps, t)),
			interval
	);
}


// TODO - replace this function by simply checking tangents at beginning and
// end of curve.
/**
 * Returns the total curvature of the bezier over the given interval using 
 * Gaussian Quadrature integration with 16 weights and abscissas which is 
 * generally very accurate and fast.
 * @param ps a cubic bezier, e.g. [[0,0],[1,1],[2,1],[2,0]]
 * @param interval the interval of integration (often === [0,1])
 * 
 * @doc mdx
 */
function totalCurvature(
		ps: number[][], 
		interval = [0,1]): number {

	//return gaussQuadrature(t => κds(ps,t), interval);

	if (ps.length <= 2) { return 0; }

	const [tS,tE] = interval;

	if (ps.length === 3) {
		const ps_ = fromTo2(ps, tS, tE).ps;
		const [[x0,y0],[x1,y1],[x2,y2]] = ps_;
		const tanS = [x1 - x0, y1 - y0];
		const tanE = [x2 - x1, y2 - y1];

		// guaranteed: |θ| <= 𝜋, curvature = θ
		return getInterfaceRotation(tanS, tanE);
	}


	if (ps.length === 4) {
		// guaranteed: curvature <= 2𝜋
		const ps_ = fromTo3(ps, tS, tE).ps;

		const bezClass = classify(ps_);

		const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps_;
		const tanS = [x1 - x0, y1 - y0];
		const tanM = [x2 - x1, y2 - y1];
		const tanE = [x3 - x2, y3 - y2];

		if ((tanM[0] === 0 && tanM[1] === 0) ||
			bezClass.realOrder <= 2) {

			return getInterfaceRotation(tanS, tanE);
		}

		const cpθ =
			getInterfaceRotation(tanS, tanM) + 
			getInterfaceRotation(tanM, tanE);

		if (bezClass.nodeType === 'acnode' || 
			bezClass.nodeType === 'cusp') {

			return cpθ <= -𝜋
				? cpθ + 2*𝜋 
				: cpθ >= +𝜋 
					? cpθ - 2*𝜋
					: cpθ;
		}

		return cpθ;
	}

	throw new Error('Only bezier curves of order <= 3 are supported');
}


function κds(ps: number[][], t: number): number {
	const [dx, dy] = evaluateDxy(ps, t); 
	const [ddx, ddy] = evaluateDdxy(ps, t);

	const a = dx*ddy - dy*ddx;
	const b = dx*dx + dy*dy;
	
	return a / b; 
}


export { totalCurvature, totalAbsoluteCurvature }
