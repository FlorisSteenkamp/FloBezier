import { gaussQuadrature } from "flo-gauss-quadrature";
import { classify } from "./classification/classify.js";
import { splitByCurvature } from '../transformation/split/split-by-curvature.js';
import { fromTo } from "../transformation/split/from-to.js";
import { isSelfOverlapping } from "./classification/is-self-overlapping.js";

const { sqrt } = Math;

 
 /**
  * Returns an accurate approximation of the bending energy of the given bezier
  * curve.
  * 
  * @param maxCurviness defaults to 1.125
  * @param gaussOrder defaults to 4
  * @param ps a cubic bezier curve given by an ordered array of its
  * control points, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
  * 
  * @doc mdx
  */
function getBendingEnergy(
        ps: number[][],
        maxCurviness = 1.125,
        gaussOrder: 4|16|64 = 4) {
 
    // return getBendingEnergyByGauss(ps, maxCurviness, gaussOrder);

    const c = classify(ps);

    if (c.collinear) {
        if (isSelfOverlapping(ps)) {
            return Number.POSITIVE_INFINITY;
        }
        return 0;
    }

    if (c.realOrder === 3) {
        if (c.nodeType === 'cusp') {
            return Number.POSITIVE_INFINITY;
        }

        // it is a well behaved 'acnode', 'crunode' or 'explicit'
        return getBendingEnergyByGauss(κi3, ps, maxCurviness, gaussOrder);
    }

    if (c.realOrder === 2) {
        // it is a well behaved 'quadratic'
        return getBendingEnergyByGauss(κi2, ps, maxCurviness, gaussOrder);
    }

    return 0;
 }


/**
 * Returns an estimate of the bending energy of the given bezier curve.
 * 
 * @param ps 
 * @param maxCurviness maximum curviness (must be > 0) as calculated using the
 * curviness function (which measures the total angle in radians formed by the
 * vectors formed by the ordered control points)
 * @param gaussOrder 
 */
function getBendingEnergyByGauss(
        κi: (ps: number[][]) => (n: number) => number,
        ps: number[][],
        maxCurviness: number,
        gaussOrder: number): number {

    const ts = splitByCurvature(ps, maxCurviness);

    let total = 0;
    for (let i=0; i<ts.length-1; i++) {
        const tS = ts[i];
        const tE = ts[i+1];

        const ps_ = fromTo(ps,tS,tE);
        total += gaussQuadrature(κi(ps_), [0,1], gaussOrder as 4|16|64);
    }

    return total;
}


/**
 * * For insight: https://faculty.sites.iastate.edu/jia/files/inline-files/curvature.pdf
 * * cubic version
 * 
 * @param ps 
 */
function κi3(ps: number[][]) {
    /*
	return (t: number): number => {
		const [dx, dy] = tangent(ps, t); 
		const [ddx, ddy] = evaluate2ndDerivative(ps, t);

		const a = (dx*ddy - dy*ddx)**2;
		const b = sqrt((dx*dx + dy*dy)**5);

		return a/b;
	}
    */
    const p0 = ps[0];
    const p1 = ps[1];
    const p2 = ps[2];
    const p3 = ps[3];

    const x0 = p0[0];
    const y0 = p0[1];
    const x1 = p1[0];
    const y1 = p1[1];
    const x2 = p2[0];
    const y2 = p2[1];
    const x3 = p3[0];
    const y3 = p3[1];

    const A = ((x3 - x0) + 3*(x1 - x2));
    const B = ((y3 - y0) + 3*(y1 - y2));
    const C = ((x2 + x0) - 2*x1);
    const D = ((y2 + y0) - 2*y1);

	return (t: number): number => {
        const tt = t*t;

        const dx_3 = tt*A + 2*t*C + (x1 - x0);
        const dy_3 = tt*B + 2*t*D + (y1 - y0);
    
        const ddx_6 = t*A + C;
        const ddy_6 = t*B + D;
    
		const a = dx_3*ddy_6 - dy_3*ddx_6;
        const c = dx_3*dx_3 + dy_3*dy_3;
		const b = c*c*sqrt(c);

        return (4/3)*a*a/b;
	}
}


/**
 * * For insight: https://faculty.sites.iastate.edu/jia/files/inline-files/curvature.pdf
 * * quadratic version
 * 
 * @param ps 
 */
function κi2(ps: number[][]) {
    /*
	return (t: number): number => {
		const [dx, dy] = tangent(ps, t); 
		const [ddx, ddy] = evaluate2ndDerivative(ps, t);

		const a = (dx*ddy - dy*ddx)**2;
		const b = sqrt((dx*dx + dy*dy)**5);

		return a/b;
	}
    */
    const p0 = ps[0];
    const p1 = ps[1];
    const p2 = ps[2];

    const x0 = p0[0];
    const y0 = p0[1];
    const x1 = p1[0];
    const y1 = p1[1];
    const x2 = p2[0];
    const y2 = p2[1];

    const A = x2 - 2*x1 + x0;
    const B = y2 - 2*y1 + y0;

	return (t: number): number => {
        const dx = A*t + (x1 - x0);
        const dy = B*t + (y1 - y0);
        const ddx = A;
        const ddy = B;

        const a = dx*ddy - dy*ddx;
        const c = dx*dx + dy*dy;
		const b = c*c*sqrt(c);

		return 0.5*a*a/b;
	}
}


export { getBendingEnergy }
