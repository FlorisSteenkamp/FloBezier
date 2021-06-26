import { allRootsCertified, RootInterval } from "flo-poly";
import { getIntervalBox } from '../../../src/global-properties/bounds/get-interval-box/get-interval-box';
import { intersectBoxes } from '../../../src/boxes/intersect-boxes';
import { X } from './x';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { getCoeffsBezBez47 } from "./get-coefficients/get-coeffs-bez-bez";


/**
 * Returns the intersection between any of two linear, quadratic or cubic bezier 
 * curves. 
 * 
 * The algorithm employed uses advanced techniques such 
 * as floating point error bounding, adaptive multi-precision floating 
 * point arithmetic, pre-filtering of easy cases, certified root finding and 
 * algebraic implicitization of the curves in order to find *guaranteed* accurate
 * results (see points below)
 *
 * * if the two curves have an infinite number of intersections `undefined` is returned
 * * the second bezier curve's parameter `t` values are retuned; call [[getOtherTs]] to
 * get the first bezier's `t` values.
 * * * **precondition:** the coordinates of the given bezier curves must be 
 * 47-bit aligned
 * * this algorithm is mathematically guaranteed accurate to within 
 * `4 * Number.EPSILON` in the t values of the *second* bezier curve (provided
 * the precondition is met).
 * * before calling this function, ensure the two given beziers are really cubic
 * or quadratic if given as such (check with [[isReallyQuadratic]]), else convert
 * them (cubics can be converted with [[toQuadraticFromCubic]])
 * 
 * @param ps 
 * 
 * @doc mdx
 */
function bezierBezierIntersection(
        ps1: number[][], 
        ps2: number[][]): RootInterval[] {

    let _coeffs = getCoeffsBezBez47(ps1,ps2);
    if (_coeffs === undefined) { return undefined; }
    
    let { coeffs, errBound, getPExact } = _coeffs;

    return allRootsCertified(coeffs, 0, 1, errBound, getPExact);
}



/**
 * Returns the ordered (first ps1, then ps2) intersection pairs given the two
 * curves that intersect and the t values of the **second** curve. The `t`
 * values of the second curve can be found using bezierBezierIntersection
 * 
 * * If the t values given is undefined, undefined is returned 
 * * if it is an empty array, an empty array is returned. 
 * * If the t values given is not an empty array and it turns out the curves 
 * are in the same k family then undefined is returned.
 * @param ps1 the first bezier
 * @param ps2 the second bezier
 * @param ts2 the t values of the second bezier
 */
function getOtherTs(
        ps1: number[][], 
        ps2: number[][],
        ts2: RootInterval[]): X[][] {

    if (ts2 === undefined) { return undefined; } 
    if (ts2.length === 0) { return []; }
    let ts1 = bezierBezierIntersection(ps2, ps1);
    if (ts1 === undefined) { return undefined; } 
    if (ts1.length === 0) { return []; }

    let is1 = ts1.map(ri => getIntervalBox(ps1, [ri.tS, ri.tE]));
    let is2 = ts2.map(ri => getIntervalBox(ps2, [ri.tS, ri.tE]));

    let xPairs: X[][] = [];
    for (let i=0; i<ts1.length; i++) {
        let box1 = is1[i];
        for (let j=0; j<ts2.length; j++) {
            let box2 = is2[j];
            let box = intersectBoxes(box1,box2);
            if (box !== undefined) {
                // TODO important - combine boxes to make sense, i.e. combine better
                // e.g. two odd multiplicity boxes should combine to a single even, etc. etc.
                let x1: X = { ri: ts1[i], box, kind: 1 };
                let x2: X = { ri: ts2[j], box, kind: 1 };
                xPairs.push([x1, x2]);
            }
        }
    }

    return xPairs;
}


export { 
    bezierBezierIntersection, 
    getOtherTs
}
