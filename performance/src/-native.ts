import { allRootsCertified, RootInterval } from "flo-poly";
import { closestPointOnBezierPrecise, getOtherTs, X } from "../../src/index";
import { settings } from './settings'; 
import { draw, ctx } from './draw-stuff';
import { unsquashp, untransp } from './affine';
import { distanceBetween } from "flo-vector2d";
import { operators as bigFloatOperators } from "big-float-ts";

import { getCoeffsBez1Bez1DdAnyBitlength, getCoeffsBez1Bez2DdAnyBitlength, getCoeffsBez1Bez3DdAnyBitlength, getCoeffsBez2Bez1DdAnyBitlength, getCoeffsBez2Bez2DdAnyBitlength, getCoeffsBez2Bez3DdAnyBitlength, getCoeffsBez3Bez1DdAnyBitlength, getCoeffsBez3Bez2DdAnyBitlength, getCoeffsBez3Bez3DdAnyBitlength } from "../../src/index";
import { getCoeffsBez1Bez1ExactAnyBitlength,getCoeffsBez1Bez2ExactAnyBitlength, getCoeffsBez1Bez3ExactAnyBitlength, getCoeffsBez2Bez1ExactAnyBitlength, getCoeffsBez2Bez2ExactAnyBitlength, getCoeffsBez2Bez3ExactAnyBitlength, getCoeffsBez3Bez1ExactAnyBitlength, getCoeffsBez3Bez2ExactAnyBitlength, getCoeffsBez3Bez3ExactAnyBitlength } from "../../src/index";
import { getCoeffsBez1Bez1Exact,getCoeffsBez1Bez2Exact, getCoeffsBez1Bez3Exact, getCoeffsBez2Bez1Exact, getCoeffsBez2Bez2Exact, getCoeffsBez2Bez3Exact, getCoeffsBez3Bez1Exact, getCoeffsBez3Bez2Exact, getCoeffsBez3Bez3Exact } from "../../src/index";
import { showResults } from "./show-results";

const { eSign } = bigFloatOperators;
const abs = Math.abs;


const { tc, num } = settings;
const { dot_, box_ } = draw(ctx);


const coeffFunctionsExact = [
    [getCoeffsBez1Bez1Exact, getCoeffsBez1Bez2Exact, getCoeffsBez1Bez3Exact],
    [getCoeffsBez2Bez1Exact, getCoeffsBez2Bez2Exact, getCoeffsBez2Bez3Exact],
    [getCoeffsBez3Bez1Exact, getCoeffsBez3Bez2Exact, getCoeffsBez3Bez3Exact]
];


const coeffFunctionsDdAnyBitlength = [
    [getCoeffsBez1Bez1DdAnyBitlength, getCoeffsBez1Bez2DdAnyBitlength, getCoeffsBez1Bez3DdAnyBitlength],
    [getCoeffsBez2Bez1DdAnyBitlength, getCoeffsBez2Bez2DdAnyBitlength, getCoeffsBez2Bez3DdAnyBitlength],
    [getCoeffsBez3Bez1DdAnyBitlength, getCoeffsBez3Bez2DdAnyBitlength, getCoeffsBez3Bez3DdAnyBitlength]
];

const coeffFunctionsExactAnyBitlength = [
    [getCoeffsBez1Bez1ExactAnyBitlength, getCoeffsBez1Bez2ExactAnyBitlength, getCoeffsBez1Bez3ExactAnyBitlength],
    [getCoeffsBez2Bez1ExactAnyBitlength, getCoeffsBez2Bez2ExactAnyBitlength, getCoeffsBez2Bez3ExactAnyBitlength],
    [getCoeffsBez3Bez1ExactAnyBitlength, getCoeffsBez3Bez2ExactAnyBitlength, getCoeffsBez3Bez3ExactAnyBitlength]
];


const { timingOnly, showNativeXs } = settings;


function native(
        pss: number[][][]) {

    let total = 0;
    const ds: number[] = [];
    let timing: number;
    const xss: X[][][] = [];

    const timeStart = performance.now();
    for (let i=0; i<num; i++) {
        const ps1 = pss[i];
        const ps2 = pss[i+1];

        const rs = bezierBezierIntersection2(ps1, ps2);
        //console.log(rs)

        const xs = getOtherTs(ps1, ps2, rs);
        if (!xs) { continue; } 

        //if (ts.length) { total1++ }
        total += xs.length;

        if (showNativeXs && i < 1) {
            //console.log()
            drawIntersections(xs);
        }
        if (!timingOnly) {
            for (const x of xs) {
                const box = x[0].box;
                const px = (box[1][0] + box[0][0])/2;
                const py = (box[1][1] + box[0][1])/2;
                const p = [px,py];
                const bp = closestPointOnBezierPrecise(ps2, p);
                const d = distanceBetween(p, bp.p);
                ds.push(d);
            }
            xss.push(xs);
        }
    }
    timing = performance.now() - timeStart;

    //showResults('native', timingOnly, timing, ds, total);
    showResults('native', true, timing, ds, total);

    ///////////////////////////////
    /*
    if (ds.length !== 0) {
        let sum = 0;
        let max = 0;
        for (const d of ds) {
            sum += d;
            if (d > max) { max = d; }
        }
        const meanNative = sum / total;
        let sumSquaredDiffs = 0;
        for (let i=0; i<total; i++) {
            sumSquaredDiffs += (meanNative - ds[i])**2;
        }
        const stdDevNative = Math.sqrt(sumSquaredDiffs / total);

        console.log('-------------------------');
        console.log('native');
        console.log('-------------------------');
        console.log('millis: ' + timing.toFixed(3));
        console.log('xs: ' + total)
        console.log('max: ' + max);
        console.log('max/eps: ' + max/Number.EPSILON);
        console.log('mean: ' + meanNative);
        console.log('stdDev: ' + stdDevNative);
    } else {
        console.log('-------------------------');
        console.log('native');
        console.log('-------------------------');
        console.log('millis: ' + timing.toFixed(3));        
    }
    */

    return xss;
}


function bezierBezierIntersection2(
        ps1: number[][], 
        ps2: number[][]): RootInterval[] {

    let _coeffs = getCoeffs(ps1,ps2);
    if (_coeffs === undefined) { return undefined; }

    let { coeffs, errBound, getPExact } = _coeffs;

    return allRootsCertified(coeffs, 0, 1, errBound, getPExact);
}


/** this for testing new any bitlength way */
function getCoeffs(
    ps1: number[][], 
    ps2: number[][]): {
        coeffs: number[][];
        errBound: number[];
        getPExact: () => number[][];
    } {

    const { coeffs, errBound } = coeffFunctionsDdAnyBitlength[ps1.length-2][ps2.length-2](ps1, ps2);
    

    const getPExactAnyBitlength = () => coeffFunctionsExactAnyBitlength[ps1.length-2][ps2.length-2](ps1, ps2);

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
        const poly = getPExactAnyBitlength();
        for (let i=0; i<poly.length; i++) {
            if (eSign(poly[i]) !== 0) {
                sameKFamily = false; break;
            }
        }        
    }
    
    if (sameKFamily) {
        return undefined;
    }

    return { coeffs, errBound, getPExact: getPExactAnyBitlength };
}


function drawIntersections(xs: X[][]) {
    //if (!ris) { return; }
    //ris.map(t => dot_1(tc(evaluate(ps2, mid(t)))));

    xs.map(x => {
        const x0 = x[0];
        const tl = tc(unsquashp(untransp(x0.box[0])));
        const br = tc(unsquashp(untransp(x0.box[1])));
        //dot_(tc(unsquashp(untransp(p))));
        box_([tl,br]);
        //console.log(tl,br)
        dot_(tl);
        dot_(br);
    });
}

function preFilter() {
    //const b1 = getControlPointBox(ps1);
    //const b2 = getControlPointBox(ps2);
    //if (!areBoxesIntersecting_(b1,b2)) {
    //    //console.log('cc')
    //    continue;
    //}
    //const b1 = getBoundingBoxTight(ps1);
    //const b2 = getBoundingBoxTight(ps2);
    //if (!doConvexPolygonsIntersect(b1,b2,true)) {
    //    //console.log('cc')
    //    continue;
    //}
}

export { native }
