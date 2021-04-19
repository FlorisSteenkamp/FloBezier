import { allRootsCertified, RootInterval } from "flo-poly";
import { getCoeffs1x1Quad } from './inp-bitlength45/double-double/get-coefficients-1x1';
import { getCoeffs2x1Quad } from './inp-bitlength45/double-double/get-coefficients-2x1';
import { getCoeffs3x1Quad } from './inp-bitlength45/double-double/get-coefficients-3x1';
import { getCoeffs1x2Quad } from './inp-bitlength45/double-double/get-coefficients-1x2';
import { getCoeffs2x2Quad } from './inp-bitlength45/double-double/get-coefficients-2x2';
import { getCoeffs3x2Quad } from './inp-bitlength45/double-double/get-coefficients-3x2';
import { getCoeffs1x3Quad } from './inp-bitlength45/double-double/get-coefficients-1x3';
import { getCoeffs2x3Quad } from './inp-bitlength45/double-double/get-coefficients-2x3';
import { getCoeffs3x3Quad } from './inp-bitlength45/double-double/get-coefficients-3x3';
import { getCoeffs1x1Exact } from './inp-bitlength45/exact/get-coefficients-1x1';
import { getCoeffs2x1Exact } from './inp-bitlength45/exact/get-coefficients-2x1';
import { getCoeffs3x1Exact } from './inp-bitlength45/exact/get-coefficients-3x1';
import { getCoeffs1x2Exact } from './inp-bitlength45/exact/get-coefficients-1x2';
import { getCoeffs2x2Exact } from './inp-bitlength45/exact/get-coefficients-2x2';
import { getCoeffs3x2Exact } from './inp-bitlength45/exact/get-coefficients-3x2';
import { getCoeffs1x3Exact } from './inp-bitlength45/exact/get-coefficients-1x3';
import { getCoeffs2x3Exact } from './inp-bitlength45/exact/get-coefficients-2x3';
import { getCoeffs3x3Exact } from './inp-bitlength45/exact/get-coefficients-3x3';
import { getIntervalBox } from '../../global-properties/bounds/get-interval-box/get-interval-box';
import { intersectBoxes } from '../../boxes/intersect-boxes';
import { getCoeffs1x1 } from "./inp-bitlength45/double/get-coefficients-1x1";
import { getCoeffs1x2 } from "./inp-bitlength45/double/get-coefficients-1x2";
import { getCoeffs1x3 } from "./inp-bitlength45/double/get-coefficients-1x3";
import { getCoeffs2x1 } from "./inp-bitlength45/double/get-coefficients-2x1";
import { getCoeffs2x2 } from "./inp-bitlength45/double/get-coefficients-2x2";
import { getCoeffs2x3 } from "./inp-bitlength45/double/get-coefficients-2x3";
import { getCoeffs3x1 } from "./inp-bitlength45/double/get-coefficients-3x1";
import { getCoeffs3x2 } from "./inp-bitlength45/double/get-coefficients-3x2";
import { getCoeffs3x3 } from "./inp-bitlength45/double/get-coefficients-3x3";
import { X } from './x';

// We *have* to do the below❗ The assignee is a getter❗ The assigned is a pure function❗ Otherwise code is too slow❗
import { operators as bigFloatOperators, eEstimate } from "big-float-ts";

const { eSign } = bigFloatOperators;



const abs = Math.abs;
const coeffFunctionsDouble = [
    [getCoeffs1x1, getCoeffs1x2, getCoeffs1x3],
    [getCoeffs2x1, getCoeffs2x2, getCoeffs2x3],
    [getCoeffs3x1, getCoeffs3x2, getCoeffs3x3]
];
// TODO - remove - testing
//function getCoeffs3x3Quad_(ps1: number[][], ps2: number[][]) {
//    let r = getCoeffs3x3(ps1,ps2);
//    return {
//        coeffs: r.coeffs.map(coeff => [0,coeff]),
//        errBound: r.errBound
//    }
//}
const coeffFunctionsQuad = [
    [getCoeffs1x1Quad, getCoeffs1x2Quad, getCoeffs1x3Quad],
    [getCoeffs2x1Quad, getCoeffs2x2Quad, getCoeffs2x3Quad],
    [getCoeffs3x1Quad, getCoeffs3x2Quad, getCoeffs3x3Quad]
];
const coeffFunctionsExact = [
    [getCoeffs1x1Exact, getCoeffs1x2Exact, getCoeffs1x3Exact],
    [getCoeffs2x1Exact, getCoeffs2x2Exact, getCoeffs2x3Exact],
    [getCoeffs3x1Exact, getCoeffs3x2Exact, getCoeffs3x3Exact]
];


/**
 * Returns the intersection polynomial coefficients between two bezier curves
 * unless all coefficients are exactly zero in which case undefined is returned
 * so that is easy to check if the two curves are actually identical 
 * algebraically when endpoints are ignored.
 * 
 * @param ps1 
 * @param ps2 
 * 
 * @doc
 */
function getIntersectionCoeffs(
        ps1: number[][], 
        ps2: number[][]): { 
            coeffs: number[][], 
            errBound: number[], 
            getPExact: () => number[][] } {

    let { coeffs, errBound } = coeffFunctionsQuad[ps1.length-2][ps2.length-2](ps1, ps2);
    //let { coeffs, errBound } = coeffFunctionsDouble[ps1.length-2][ps2.length-2](ps1, ps2);

    let getPExact = () => coeffFunctionsExact[ps1.length-2][ps2.length-2](ps1, ps2);

    // check if all coefficients are zero, 
    // i.e. the two curves are possibly in the same k-family
    let possiblySameKFamily = true;
    for (let i=0; i<coeffs.length; i++) {
        if (abs(coeffs[i][1]) - errBound[i] > 0) {
            possiblySameKFamily = false; break;
        }
    }
    let sameKFamily = false;
    if (possiblySameKFamily) {
        sameKFamily = true;
        let poly = getPExact();
        for (let i=0; i<poly.length; i++) {
            if (eSign(poly[i]) !== 0) {
                sameKFamily = false; break;
            }
        }        
    }
    
    if (sameKFamily) {
        return undefined;
    }

    return { coeffs, errBound, getPExact };
}


/**
 * Returns the intersection between two linear, quadratic or cubic bezier curves
 * in any combination.
 * * Returns **undefined** only in the case that the two beziers are in the same
 * k-family.
 * * The second bezier's t values are retuned. Call getOtherTs to get the first
 * bezier's t values.
 * * this algorithm is always accurate to within `4 * Number.EPSILON` in the t 
 * values for the **second** bezier.
 * * Before calling this function, ensure the two given beziers are really cubic
 * or quadratic if given as such (check with isReallyQuadratic), else convert
 * them (cubics can be converted with toQuadraticFromCubic)
 * * algorithm adapted from [Indrek](http://www.mare.ee/indrek/misc/2d.pdf)
 * 
 * @param ps 
 * 
 * @doc
 */
function bezierBezierIntersectionImplicit(
        ps1: number[][], 
        ps2: number[][]): RootInterval[] {

    let _coeffs = getIntersectionCoeffs(ps1,ps2);
    if (_coeffs === undefined) { return undefined; }
    
    let { coeffs, errBound, getPExact } = _coeffs;

    return allRootsCertified(coeffs, 0, 1, errBound, getPExact);
}



/**
 * Returns the ordered (first ps1, then ps2) intersection pairs given the two
 * curves that intersect and the t values of the **second** curve. 
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
    let ts1 = bezierBezierIntersectionImplicit(ps2, ps1);
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
    getIntersectionCoeffs,
    bezierBezierIntersectionImplicit, 
    getOtherTs
}
