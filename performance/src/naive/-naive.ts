import { closestPointOnBezier, closestPointOnBezierPrecise, evaluate, getCoeffsBez1Bez1, getIntervalBox, intersectBoxes } from "../../../src/index";
import { getCoeffsBez1Bez2 } from "../../../src/index";
import { getCoeffsBez1Bez3 } from "../../../src/index";
import { getCoeffsBez2Bez1 } from "../../../src/index";
import { getCoeffsBez2Bez2 } from "../../../src/index";
import { getCoeffsBez2Bez3 } from "../../../src/index";
import { getCoeffsBez3Bez1 } from "../../../src/index";
import { getCoeffsBez3Bez2 } from "../../../src/index";
//import { getCoeffsBez3Bez3InclError } from "../src/index";
import { getCoeffsBez3Bez3 } from "../../../src/index";
import { X } from '../../../src/index';
import { settings } from '../settings'; 
import { draw, ctx } from '../draw-stuff';
import { getCoeffsBez1Bez1Dd, getCoeffsBez1Bez2Dd, getCoeffsBez1Bez3Dd, getCoeffsBez2Bez1Dd, getCoeffsBez2Bez2Dd, getCoeffsBez2Bez3Dd, getCoeffsBez3Bez1Dd, getCoeffsBez3Bez2Dd, getCoeffsBez3Bez3Dd } from "../../../src/index";

import { allRoots as _allRoots } from '../roots/all-roots';
import { unsquashp, untransp } from '../affine';
import { distanceBetween } from "flo-vector2d";

import { getCoeffsBez3Bez3DdAnyBitlength } from './get-coeffs-bez3-bez3-dd-any-bitlength';
import { showResults } from "../show-results";
import { updDs } from "../upd-ds";

const allRoots = _allRoots;

const { tc, num, timingOnly, showNaiveXs } = settings;
const { dot_, box_ } = draw(ctx);;

const eps = Number.EPSILON;
const abs = Math.abs;

const coeffFunctionsDouble = [
    [getCoeffsBez1Bez1, getCoeffsBez1Bez2, getCoeffsBez1Bez3],
    [getCoeffsBez2Bez1, getCoeffsBez2Bez2, getCoeffsBez2Bez3],
    [getCoeffsBez3Bez1, getCoeffsBez3Bez2, getCoeffsBez3Bez3]
];


function naive(
        pss: number[][][], 
        xss: X[][][]) {

    let total = 0;
    let timing = 0;
    const ds: number[] = [];

    const timeStart = performance.now();
    for (let i=0; i<2*num; i++, i++) {
        const ps1 = pss[i];
        const ps2 = pss[i+1];
        const ts = bbi(ps1, ps2);

        total += ts.length;

        if (showNaiveXs && i < 1) {
            //const ps = ts.map(t => evaluate(ps2, t));
            drawIntersections(ts);
        }
        if (!timingOnly) {
            const xs = xss[i];

            updDs(ds, xs, ts.map(x => (x[0].ri.tE + x[0].ri.tS) / 2));
        }
    }
    timing = performance.now() - timeStart;
    
    showResults('naive', timingOnly, timing, ds, total);
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



let ii = 0;
function bbi(
        ps1: number[][], 
        ps2: number[][]) {

    let coeffs = getCoeffs2(ps1,ps2);

    const rs = allRoots(coeffs);

    //console.log(toCasStr(scaleForViewingOnDesmos(coeffs)));
    //console.log(rs);
    //console.log(allRootsCertifiedSimplified(coeffs,0,1));

    let xs = getOtherTs2(ps1, ps2, rs)

    return xs;
}


function scaleForViewingOnDesmos(coeffs: number[]): number[] {
    //const max = Math.max(...coeffs);
    const valAt0 = coeffs[coeffs.length-1];
    const valAt1 = coeffs.reduce((prev, cur) => { return prev + cur}, 0);
    const max = Math.max(abs(valAt0), abs(valAt1));

    const scale = 1/(2**(Math.floor(Math.log2(max))));

    return coeffs.map(c => c*(scale*8));
}


function getOtherTs(
        ps1: number[][], 
        ps2: number[][],
        ts2: number[]): X[][] {

    if (ts2.length === 0) { return []; }

    let xPairs: X[][] = [];
    for (const t2 of ts2) {
        const p = evaluate(ps2, t2);
        const pt = closestPointOnBezier(ps1, p);
        const p1 = pt.p;
        const t1 = pt.t;

        //console.log('p, p1', p, p1)
        //console.log('d', distanceBetween(p, p1), (2**30)*eps);
        if (distanceBetween(p, p1) < (2**10)*eps) {
            const box = [p,p];

            let x1: X = { ri: { tS: t1, tE: t1, multiplicity: 1 }, box, kind: 1 };
            let x2: X = { ri: { tS: t2, tE: t2, multiplicity: 1 }, box, kind: 1 };
            xPairs.push([x1, x2]);
        }
    }
    
    return xPairs;
}


function getOtherTs2(
        ps1: number[][], 
        ps2: number[][],
        ts2: number[]): X[][] {

    if (ts2.length === 0) { return []; }

    let coeffs = getCoeffs2(ps2,ps1);
    const ts1 = allRoots(coeffs);

    if (ts1.length === 0) { return []; }

    const delta = (2**30)*eps;

    let is1 = ts1.map(ri => getIntervalBox(ps1, [ri-delta, ri+delta]));
    let is2 = ts2.map(ri => getIntervalBox(ps2, [ri-delta, ri+delta]));

    let xPairs: X[][] = [];
    for (let i=0; i<ts1.length; i++) {
        let box1 = is1[i];
        for (let j=0; j<ts2.length; j++) {
            let box2 = is2[j];
            let box = intersectBoxes(box1,box2);
            if (box !== undefined) {
                // TODO important - combine boxes to make sense, i.e. combine better
                // e.g. two odd multiplicity boxes should combine to a single even, etc. etc.
                let x1: X = { ri: { tS: ts1[i], tE: ts1[i], multiplicity: 1 }, box, kind: 1 };
                let x2: X = { ri: { tS: ts2[j], tE: ts2[j], multiplicity: 1 }, box, kind: 1 };
                xPairs.push([x1, x2]);
            }
        }
    }

    return xPairs;
}


const coeffFunctionsDd = [
    [getCoeffsBez1Bez1Dd, getCoeffsBez1Bez2Dd, getCoeffsBez1Bez3Dd],
    [getCoeffsBez2Bez1Dd, getCoeffsBez2Bez2Dd, getCoeffsBez2Bez3Dd],
    [getCoeffsBez3Bez1Dd, getCoeffsBez3Bez2Dd, getCoeffsBez3Bez3DdAnyBitlength]
];


function getCoeffs2(
    ps1: number[][], 
    ps2: number[][]): number[] {

    //const coeffs = coeffFunctionsDouble[ps1.length-2][ps2.length-2](ps1, ps2);
    const coeffs = getCoeffsBez3Bez3(ps1, ps2);

    return coeffs;
}


// TODO - remember to use getClosestPoint as opposed to a new set of t values
function getCoeffs(
    ps1: number[][], 
    ps2: number[][]) {

    //const coeffs = coeffFunctionsDd[ps1.length-2][ps2.length-2](ps1, ps2);
    //const coeffs = getCoeffsBez3Bez3Dd(ps1, ps2);

    //const cs = coeffs.coeffs.map(c => {
    //    return c[c.length-1];
    //})


    const coeffs = getCoeffsBez3Bez3DdAnyBitlength(ps1, ps2);

    const cs = coeffs.map(c => {
        return c[c.length-1];
    })

    return cs;

    /*
    return {
        coeffs: cs,
        errBound: coeffs.errBound
    };
    */


}


export { naive }




/*
    // signChanges bNumRootsIn01
    if (ii++ < 10) {
        //console.log('------------');
        const cTrans = changeVariablesTranslateX(coeffs, 1);
        //console.log(signChanges(coeffs));
        const sTrans = signChanges(cTrans);
        const cs = [coeffs];
	    for (let i=1; i<=coeffs.length-1; i++) {
		    cs.push(differentiate(cs[i-1])); 
	    }

        const cFlip = changeVariablesScale(coeffs, -1);
        const s = signChanges(coeffs);
        const sFlip = signChanges(cFlip);
        const numRoots = bNumRootsIn01(scaleFloatsToBigints(coeffs));

        const dd = cs.map(c => signChanges(c));
        //console.log(numRoots, s, sFlip, sTrans, `[${dd}]`);
        console.log(numRoots, s, sTrans, `[${dd}]`, toCasStr(coeffs));
        //console.log('------------');
    }
    */

    //{
    //    const numRoots = bNumRootsIn01(scaleFloatsToBigints(coeffs));
    //    if (numRoots === 0 || numRoots === 1) { return []; }
    //}



    /*
            for (const x of xs) {
                const box = x[0].box;
                const px = (box[1][0] + box[0][0])/2;
                const py = (box[1][1] + box[0][1])/2;
                const p = [px,py];
                const bp = closestPointOnBezierPrecise(ps2, p);
                const d = distanceBetween(p, bp.p);
                dsNaive.push(d);
            }
            */