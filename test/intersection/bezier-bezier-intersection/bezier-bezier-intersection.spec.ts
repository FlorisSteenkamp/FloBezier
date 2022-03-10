import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { bezierBezierIntersection, evaluateExact } from '../../../src/index.js';
import { getPss } from '../../helpers/intersection/get-pss.js';
import { closestPointOnBezierCertified, X, sub1Ulp, add1Ulp } from "../../../src/index.js";
import { settings } from '../../helpers/intersection/settings.js';
import { eAdd, eDiff, eEstimate, eMult } from 'big-float-ts';

const eps = Number.EPSILON;
const u = eps/2;
const { sqrt, abs } = Math;

const { num } = settings;


describe('bezierBezierIntersection', function() {
    it('it should ensure accuracy of found intersections', 
    function() {
        //const pss = getPss([[1,1]]);         // linear-linear only
        //const pss = getPss([[2,2]]);         // quad-quad only
        //const pss = getPss([[2,3],[3,2]]);   // a mix of quad-cubic and cubic-quad
        //const pss = getPss([[1,3],[3,1]]);
        //const pss = getPss([[3,3],[2,3],[3,2],[2,2]]);
        // const pss = getPss([[3,3]]);        // cubic-cubic only
        const pss = getPss();                  // a mix of all order (1,2 and 3) combinations

        native(pss);
    });
});


function native(
        pss: number[][][]): (X[][] | undefined)[] {

    let total = 0;
    const infos: { d: number; pss: number[][][]; }[] = [];
    let timing: number;
    const xss: (X[][] | undefined)[] = [];
    const maxChecks = 20;
    let checkCount = 0;

    const timeStart = performance.now();
    for (let i=0; i<pss.length; i++, i++) {
        const ps1 = pss[i];
        const ps2 = pss[i+1];

        const xs = bezierBezierIntersection(ps1, ps2);

        if (!xs) { 
            xss.push(undefined)
            continue; 
        } 

        total += xs.length;

        for (const x of xs) {
            const tS1 = x[0].ri.tS;
            const tE1 = x[0].ri.tE;
            const tS2 = x[1].ri.tS;
            const tE2 = x[1].ri.tE;
            
            const t1 = tE1/2 + tS1/2;
            const t2 = tE2/2 + tS2/2;

            expect(tE1 - tS1).lessThanOrEqual(4*eps);
            expect(tE2 - tS2).lessThanOrEqual(4*eps);
            
            //const p = evaluateExact(ps1,t1).map(eEstimate);
            //const _bp = closestPointOnBezierCertified(ps2, p)[0].intervalBox;
            //const bpX = _bp[0][0]/2 + _bp[1][0]/2;
            //const bpY = _bp[0][1]/2 + _bp[1][1]/2;
            //const dA = distanceBetween(p, [bpX,bpY]);

            const p1 = evaluateExact(ps1,t1);
            const p2 = evaluateExact(ps2,t2);
            const d = distanceBetweenPrecise(p1,p2);

            infos.push({ d, pss: [ps1,ps2] });

            if (checkCount++ < maxChecks) {
                checkTsAreAccurate(ps1, ps2, tS1, tE1, tS2, tE2);
            }
        }
        xss.push(xs);
    }
    timing = performance.now() - timeStart;

    ensureResultsAccurate(timing, infos, total);

    return xss;
}


// function sub1Ulp(n: number) {
    // return n - n*(u + eps**2);
// }
// 
// function add1Ulp(n: number) {
    // return n + n*(u + eps**2);
// }

//add1Ulp(1);//?
//sub1Ulp(1);//?
//add1Ulp(1.0000000000000002);//?
//sub1Ulp(0.9999999999999999);//?
//add1Ulp(0.9507205064711641);//?
//sub1Ulp(0.9507205064711642);//?

function getUlpRange(
        t: number,
        num: number) {

    const tsBack = [];
    {
        let prev = t;
        for (let i=0; i<num; i++) {
            const t = sub1Ulp(prev);
            tsBack.push(t);
            prev = t;
        }
    }
    const tsForward = [];
    {
        let prev = t;
        for (let i=0; i<num; i++) {
            const t = add1Ulp(prev);
            tsForward.push(t);
            prev = t;
        }
    }

    return [...tsBack.reverse(), t, ...tsForward];
}


function checkTsAreAccurate(
        ps1: number[][],
        ps2: number[][],
        tS1: number,
        tE1: number,
        tS2: number,
        tE2: number) {

    const t1 = tE1/2 + tS1/2;
    const t2 = tE2/2 + tS2/2;

    const numToAddInBackAndFront = 20;
    const t1s = getUlpRange(t1,numToAddInBackAndFront);
    const t2s = getUlpRange(t2,numToAddInBackAndFront);

    let best = Number.POSITIVE_INFINITY;
    let bestI: number | undefined = undefined;
    let bestJ: number | undefined = undefined;
    for (let i=0; i<2*numToAddInBackAndFront + 1; i++) {
        for (let j=0; j<2*numToAddInBackAndFront + 1; j++) {
            const t1 = t1s[i];
            const t2 = t2s[j];

            const p1 = evaluateExact(ps1,t1);
            const p2 = evaluateExact(ps2,t2);
            const d = distanceBetweenPrecise(p1,p2);

            if (d < best) {
                best = d;
                bestI = i;
                bestJ = j;
            }
        }
    }

    const bestT1 = t1s[bestI];
    const bestT2 = t2s[bestJ];
    const eps1 = abs(t1 - bestT1)/eps;
    const eps2 = abs(t2 - bestT2)/eps;

    expect(eps1).to.be.lessThanOrEqual(4);
    expect(eps2).to.be.lessThanOrEqual(4);
}



/**
 * Assert that the results obtained via `bezierBezierIntersection` are accurate.
 * 
 * @param timing 
 * @param ds 
 * @param total 
 */
function ensureResultsAccurate(
        timing: number,
        infos: { d: number; pss: number[][][]; }[],
        total: number) {


    let sum = 0;
    let max = 0;
    let maxIdx = -1;
    for (let i=0; i<infos.length; i++) {
        const d = infos[i].d;
        sum += d;
        if (d > max) { max = d; maxIdx = i; }
    }
    const mean = sum / total;
    let sumSquaredDiffs = 0;
    for (const info of infos) {
        sumSquaredDiffs += (mean - info.d)**2;
    }
    const stdDev = Math.sqrt(sumSquaredDiffs / total);

    // console.log('millis: ' + timing.toFixed(3));
    // console.log('xs: ' + total);
    // console.log('max: ' + max);
    // console.log('maxIdx: ' + maxIdx);
    // console.log('max/eps: ' + max/eps);
    // console.log('mean: ' + mean);
    // console.log('stdDev: ' + stdDev);

    expect(mean/eps).to.be.lessThanOrEqual(2);
    expect(max/eps).to.be.lessThanOrEqual((2**1)*4);
}


function distanceBetweenPrecise(
        p1: number[][],
        p2: number[][]) {

    //const p1_ = p1.map(eEstimate);
    //const p2_ = p2.map(eEstimate);
    //return sqrt(p1_[0] - p2_[0])**2 + (p1_[1] - p2_[1])**2;//?

    const x = eDiff(p1[0],p2[0]);
    const y = eDiff(p1[1],p2[1]);
    const xx = eMult(x,x);
    const yy = eMult(y,y);

    return sqrt(eEstimate(eAdd(xx,yy)));
}