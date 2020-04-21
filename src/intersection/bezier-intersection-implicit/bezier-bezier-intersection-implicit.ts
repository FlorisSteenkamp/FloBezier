
import { sign } from 'flo-numerical';
import { allRootsMultiWithErrBounds } from "flo-poly";
import { areBoxesIntersecting } from '../../geometry/are-boxes-intersecting';
import { getCoeffs1x1Quad } from './quad/get-coefficients-1x1';
import { getCoeffs2x1Quad } from './quad/get-coefficients-2x1';
import { getCoeffs3x1Quad } from './quad/get-coefficients-3x1';
import { getCoeffs1x2Quad } from './quad/get-coefficients-1x2';
import { getCoeffs2x2Quad } from './quad/get-coefficients-2x2';
import { getCoeffs3x2Quad } from './quad/get-coefficients-3x2';
import { getCoeffs1x3Quad } from './quad/get-coefficients-1x3';
import { getCoeffs2x3Quad } from './quad/get-coefficients-2x3';
import { getCoeffs3x3Quad } from './quad/get-coefficients-3x3';
import { getCoeffs1x1Exact_ } from './exact/get-coefficients-1x1-';
import { getCoeffs2x1Exact_ } from './exact/get-coefficients-2x1-';
import { getCoeffs3x1Exact_ } from './exact/get-coefficients-3x1-';
import { getCoeffs1x2Exact_ } from './exact/get-coefficients-1x2-';
import { getCoeffs2x2Exact_ } from './exact/get-coefficients-2x2-';
import { getCoeffs3x2Exact_ } from './exact/get-coefficients-3x2-';
import { getCoeffs1x3Exact_ } from './exact/get-coefficients-1x3-';
import { getCoeffs2x3Exact_ } from './exact/get-coefficients-2x3-';
import { getCoeffs3x3Exact_ } from './exact/get-coefficients-3x3-';
import { differentiateExact } from 'flo-poly/node/calculus/differentiate';
import { rootIntervalToExp } from 'flo-poly';
import { RootInterval } from 'flo-poly/node/roots/multi-with-err-bound/root-interval';
import { getIntervalBox } from '../../global-properties/bounds/get-interval-box/get-interval-box';
import { intersectBoxes } from '../../geometry/intersect-boxes';
import { X } from './x';


const abs = Math.abs;


function getIntersectionCoeffs(
        ps1: number[][], 
        ps2: number[][]): { 
            coeffs: number[][], 
            errBound: number[], 
            getPsExact: () => number[][][] } {

    let { coeffs, errBound } = [
        [getCoeffs1x1Quad, getCoeffs1x2Quad, getCoeffs1x3Quad],
        [getCoeffs2x1Quad, getCoeffs2x2Quad, getCoeffs2x3Quad],
        [getCoeffs3x1Quad, getCoeffs3x2Quad, getCoeffs3x3Quad]
    ][ps1.length-2][ps2.length-2](ps1, ps2);


    function getPExact() {
        return [
            [getCoeffs1x1Exact_, getCoeffs1x2Exact_, getCoeffs1x3Exact_],
            [getCoeffs2x1Exact_, getCoeffs2x2Exact_, getCoeffs2x3Exact_],
            [getCoeffs3x1Exact_, getCoeffs3x2Exact_, getCoeffs3x3Exact_]
        ][ps1.length-2][ps2.length-2](ps1, ps2);
    }

    function getPsExact() {
        let poly = getPExact();
        let psExact = [poly];
        while (poly.length > 1) {
            poly = differentiateExact(psExact[psExact.length-1]);
            psExact.push(poly);
        }

        return psExact;
    }

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
            if (sign(poly[i]) !== 0) {
                sameKFamily = false; break;
            }
        }        
    }
    
    if (sameKFamily) {
        return undefined;
    }

    //if (ps1.length === 4 && ps2.length === 2 &&
    //    ps2[0][0] > 376 && ps2[0][0] < 377) {
    //    console.log(ps1,ps2)
    //    console.log(coeffs);
    //    console.log(errBound);
    //    console.log('------');
    //}

    return { coeffs, errBound, getPsExact };
}


/**
 * Returns the intersection between two linear, quadratic or cubic bezier curves
 * in any combination.
 * * Returns **undefined** only in the case that the two beziers are in the same
 * k-family.
 * * The second bezier's t values are retuned. Call getOtherTs to get the first
 * bezier's t values.
 * * this algorithm is nearly always accurate to 1 u in the t values for the **second**
 * bezier (except if there are several extremely close intersections) and
 * a few u accurate for the second t values.
 * * Before calling this function, ensure the two given beziers are really cubic
 * or quadratic if given as such (check with isReallyQuadratic), else convert
 * them (cubics can be converted with toQuadraticFromCubic)
 * See http://www.mare.ee/indrek/misc/2d.pdf
 * @param ps 
 */
function bezierBezierIntersectionImplicit(
        ps1: number[][], 
        ps2: number[][]): RootInterval[] {

    
    let _coeffs = getIntersectionCoeffs(ps1,ps2);
    if (_coeffs === undefined) { return undefined; }
    
    let { coeffs, errBound, getPsExact } = _coeffs;

    return allRootsMultiWithErrBounds(coeffs, errBound, getPsExact);
}


/**
 * Returns the ordered (first ps1, then ps2) intersection pairs given the two
 * curves that intersect and the t values of the **second** curve.
 * @param ps1 the first bezier
 * @param ps2 the second bezier
 * @param ts2 the t values of the second bezier
 */
function getOtherTs(
        ps1: number[][], 
        ps2: number[][],
        ts2: RootInterval[]): X[][] {

    if (ts2 === undefined || ts2.length === 0) { return []; }
    let ts1 = bezierBezierIntersectionImplicit(ps2, ps1);
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
                //console.log(box1)
                //console.log(box2)
                //console.log(box)
                //console.log('---------')
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
