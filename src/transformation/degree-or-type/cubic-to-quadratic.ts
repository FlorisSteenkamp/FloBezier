import { expansionProduct, twoDiff, eSign, eEstimate, eDiff, scaleExpansion, twoSum } from 'big-float-ts';
import { isCollinear } from '../..';

// We *have* to do the below to improve performance with bundlers❗ The assignee is a getter❗ The assigned is a pure function❗
const epr = expansionProduct;
const td = twoDiff;
const ediff = eDiff;
const esign = eSign;
const estimate = eEstimate;
const sce = scaleExpansion;
const ts = twoSum;


/**
 * Returns a quadratic approximation to the given cubic bezier curve.
 * 
 * * the initial and final control points of the resulting bezier coincide with
 * that of the curve being approximated
 * 
 * * if `preserveTangents` is `true` and the cubic's initial and final tangents
 * are parallel (and not coincident) then `undefined` is returned
 * 
 * @param ps a cubic bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * @param preserveTangents defaults to `false`; if `true` then the approximation
 * must also preserve the tangents of the cubic at the initial and final control 
 * points
 * 
 * @doc mdx
 */
function cubicToQuadratic(
        ps: number[][],
        preserveTangents = false): number[][] | undefined {

    // Note: if cubic is really a quad then
    //   x3 + 3*(x1 - x2) === x0 && 
    //   y3 + 3*(y1 - y2) === y0


    // Take the midpoint of the moving line of the hybrid quadratic version of 
    // the cubic as the new quadratic's middle control point.

    if (!preserveTangents) {
        const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = ps;
        
        return [
            [x0,y0],
            [
                // [
                //   (3*(x1 + x2) - (x0 + x3)) / 4, 
                //   (3*(y1 + y2) - (y0 + y3)) / 4
                // ]
                estimate(ediff(
                    sce(ts(x1/4, x2/4), 3),
                    ts(x0/4, x3/4)
                )),
                estimate(ediff(
                    sce(ts(y1/4, y2/4), 3),
                    ts(y0/4, y3/4)
                ))
            ],
            [x3,y3]
        ];
    }

    // At this point: `preserveTangents === true`
    const [p0,p1,p2,p3] = ps;

    const l1 = [p0, p1];
    const l2 = [p3, p2];

    const pM = llIntersection(l1,l2);
    if (pM === undefined) {
        return undefined;
        //return [
        //    p0,
        //    [(p0[0] + p3[0])/2, (p0[1] + p3[1])/2],
        //    p3
        //];
    }

    return [p0,pM,p3];
}


/**
 * Returns the point of intersection of the given two lines or `undefined` if
 * the lines are parallel.
 * 
 * * returns `undefined` *iff* the lines are *exactly* parallel
 * 
 * @param l1
 * @param l2
 * 
 * @internal
 */
function llIntersection(
        l1: number[][], 
        l2: number[][]): number[] | undefined {

    const [[x1, y1], [x2, y2]] = l1; 
	const [[x3, y3], [x4, y4]] = l2;
	
	const x1_ = td(x2,x1);
	const y1_ = td(y2,y1);
	const x2_ = td(x4,x3);
	const y2_ = td(y4,y3);
	
	const denom = ediff(epr(x2_,y1_), epr(y2_,x1_));
	if (esign(denom) === 0) {
		// definitely parallel
		return undefined;
	}

    const x3_ = td(x3,x1);
    const y3_ = td(y3,y1);
	
	const b = ediff(epr(y3_,x1_), epr(x3_,y1_));

    const bb = estimate(b) / estimate(denom);
	
	return [
		x3 + bb*estimate(x2_), 
		y3 + bb*estimate(y2_)
	];    
}


export { cubicToQuadratic }
