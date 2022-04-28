import { distanceBetween } from "flo-vector2d";
import { closestPointOnBezier, evaluate, getIntervalBox, intersectBoxes } from "../../../src/index.js";
import { getCoeffsBez1Bez1 } from './double/get-coeffs-bez1-bez1.js';
import { getCoeffsBez1Bez2 } from './double/get-coeffs-bez1-bez2.js';
import { getCoeffsBez1Bez3 } from './double/get-coeffs-bez1-bez3.js';
import { getCoeffsBez2Bez1 } from './double/get-coeffs-bez2-bez1.js';
import { getCoeffsBez2Bez2 } from './double/get-coeffs-bez2-bez2.js';
import { getCoeffsBez2Bez3 } from './double/get-coeffs-bez2-bez3.js';
import { getCoeffsBez3Bez1 } from './double/get-coeffs-bez3-bez1.js';
import { getCoeffsBez3Bez2 } from './double/get-coeffs-bez3-bez2.js';
import { getCoeffsBez3Bez3 } from './double/get-coeffs-bez3-bez3.js';
import { X } from '../../../src/index.js';
import { settings } from '../settings.js'; 
import { draw, ctx } from '../draw-stuff.js';
import { allRoots as _allRoots } from '../roots/all-roots.js';
import { unsquashp, untransp } from '../affine.js';
import { showResults } from "../show-results.js";
import { updDs } from "../upd-ds.js";
import { getPFromBox } from "../../../src/intersection/bezier-bezier-intersection/x.js";

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
        xss: X[][]) {

    let total = 0;
    let timing = 0;
    const ds: number[] = [];

    const timeStart = performance.now();
    for (let i=0; i<2*num; i++, i++) {
        const ps1 = pss[i];
        const ps2 = pss[i+1];
        const xs_ = bbi(ps1, ps2);

        total += xs_.length;

        if (showNaiveXs && i < 1) {
            //const ps = ts.map(t => evaluate(ps2, t));
            drawIntersections(xs_);
        }
        if (!timingOnly) {
            const xs = xss[i/2];

            updDs(ds, xs, xs_.map(x => (x.ri1.tE + x.ri1.tS) / 2));
        }
    }
    timing = performance.now() - timeStart;
    
    showResults('naive', timingOnly, timing, ds, total);
}


function drawIntersections(xs: X[]) {
    //if (!ris) { return; }
    //ris.map(t => dot_1(tc(evaluate(ps2, mid(t)))));

    xs.map(x => {
        const tl = tc(unsquashp(untransp(x.box[0])));
        const br = tc(unsquashp(untransp(x.box[1])));
        //dot_(tc(unsquashp(untransp(p))));
        box_([tl,br]);
        //console.log(tl,br)
        dot_(tl);
        dot_(br);
    });
}


function bbi(
        ps1: number[][], 
        ps2: number[][]) {

    let coeffs = getCoeffs2(ps1,ps2);

    const rs = allRoots(coeffs);

    //console.log(toCasStr(scaleForViewingOnDesmos(coeffs)));
    //console.log(rs);
    //console.log(allRootsCertifiedSimplified(coeffs,0,1));

    return getOtherTs2(ps1, ps2, rs);
}


function scaleForViewingOnDesmos(coeffs: number[]): number[] {
    //const max = Math.max(...coeffs);
    const valAt0 = coeffs[coeffs.length-1];
    const valAt1 = coeffs.reduce((prev, cur) => { return prev + cur}, 0);
    const max = Math.max(abs(valAt0), abs(valAt1));

    const scale = 1/(2**(Math.floor(Math.log2(max))));

    return coeffs.map(c => c*(scale*8));
}


function getOtherTs2(
        ps1: number[][], 
        ps2: number[][],
        ts2: number[]): X[] {

    if (ts2.length === 0) { return []; }

    let coeffs = getCoeffs2(ps2,ps1);
    const ts1 = allRoots(coeffs);

    if (ts1.length === 0) { return []; }

    const delta = (2**30)*eps;

    const is1 = ts1.map(ri => getIntervalBox(ps1, [ri-delta, ri+delta]));
    const is2 = ts2.map(ri => getIntervalBox(ps2, [ri-delta, ri+delta]));

    const xs: X[] = [];
    for (let i=0; i<ts1.length; i++) {
        const box1 = is1[i];
        for (let j=0; j<ts2.length; j++) {
            const box2 = is2[j];
            const box = intersectBoxes(box1,box2);
            if (box !== undefined) {
                // TODO important - combine boxes to make sense, i.e. combine better
                // e.g. two odd multiplicity boxes should combine to a single even, etc. etc.
                const t1 = ts1[i];
                const t2 = ts2[j];
                const x: X = { 
                    p: getPFromBox(box), t1, t2,
                    box, kind: 1,
                    ri1: { tS: t1, tE: t1, multiplicity: 1 }, 
                    ri2: { tS: t2, tE: t2, multiplicity: 1 }
                };
                xs.push(x);
            }
        }
    }

    return xs;
}


function getCoeffs2(
    ps1: number[][], 
    ps2: number[][]): number[] {

    //const coeffs = coeffFunctionsDouble[ps1.length-2][ps2.length-2](ps1, ps2);
    const coeffs = getCoeffsBez3Bez3(ps1, ps2);

    return coeffs;
}


export { naive }
