import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { bezierBezierIntersection, evaluateExact } from '../../../src/index.js';
import { getPss } from '../../helpers/intersection/get-pss.js';
import { X } from "../../../src/index.js";
import { eAdd, eDiff, eEstimate, eMult } from 'big-float-ts';
import { add1Ulp } from '../../../src/add-1-ulp.js';
import { sub1Ulp } from '../../../src/sub-1-ulp.js';

const eps = Number.EPSILON;
const { sqrt, abs } = Math;


describe('bezierBezierIntersection', function() {
    it('it should ensure accuracy of calculated intersections', 
    function() {
        //const pss = getPss([[1,1]]);         // linear-linear only
        //const pss = getPss([[2,2]]);         // quad-quad only
        //const pss = getPss([[2,3],[3,2]]);   // a mix of quad-cubic and cubic-quad
        //const pss = getPss([[1,3],[3,1]]);
        //const pss = getPss([[3,3],[2,3],[3,2],[2,2]]);
        //const pss = getPss([[3,3]]);        // cubic-cubic only
        
        const pss = getPss();  // a mix of all order (1,2 and 3) combinations

        testBezBezIntersection(pss);
    });
});


function testBezBezIntersection(
        pss: number[][][]): void {

    let total = 0;
    const infos: { d: number; pss: number[][][]; }[] = [];
    let timing: number;
    const xss: X[][] = [];
    const maxChecks = 20;
    let checkCount = 0;

    const timeStart = performance.now();
    for (let i=0; i<pss.length; i++, i++) {
        const psA = pss[i];
        const psB = pss[i+1];

        const xs = bezierBezierIntersection(psA, psB);

        total += xs.length;

        for (const x of xs) {
            const tSA = x.ri1.tS;
            const tEA = x.ri1.tE;
            const tSB = x.ri2.tS;
            const tEB = x.ri2.tE;
            
            const tA = tEA/2 + tSA/2;
            const tB = tEB/2 + tSB/2;

            assert(tEA - tSA <= 4*eps, `expected ${tEA - tSA} to be less than or equal to ${4*eps}`);
            assert(tEB - tSB <= 4*eps, `expected ${tEB - tSB} to be less than or equal to ${4*eps}`);

            const pA = evaluateExact(psA,tA);
            const pB = evaluateExact(psB,tB);
            const d = distanceBetweenPrecise(pA,pB);

            infos.push({ d, pss: [psA,psB] });

            if (checkCount++ < maxChecks) {
                checkTsAreAccurate(psA, psB, tSA, tEA, tSB, tEB);
            }
        }
        xss.push(xs);
    }
    timing = performance.now() - timeStart;

    ensureResultsAccurate(infos, total);
}


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
        psA: number[][],
        psB: number[][],
        tSA: number,
        tEA: number,
        tSB: number,
        tEB: number) {

    const tA = tEA/2 + tSA/2;
    const tB = tEB/2 + tSB/2;

    const numToAddInBackAndFront = 20;
    const tAs = getUlpRange(tA,numToAddInBackAndFront);
    const tBs = getUlpRange(tB,numToAddInBackAndFront);

    let best = Number.POSITIVE_INFINITY;
    let bestI: number | undefined = undefined;
    let bestJ: number | undefined = undefined;
    for (let i=0; i<2*numToAddInBackAndFront + 1; i++) {
        for (let j=0; j<2*numToAddInBackAndFront + 1; j++) {
            const tA = tAs[i];
            const tB = tBs[j];

            const pA = evaluateExact(psA,tA);
            const pB = evaluateExact(psB,tB);
            const d = distanceBetweenPrecise(pA,pB);

            if (d < best) {
                best = d;
                bestI = i;
                bestJ = j;
            }
        }
    }

    const bestT1 = tAs[bestI!];
    const bestT2 = tBs[bestJ!];
    const eps1 = abs(tA - bestT1)/eps;
    const eps2 = abs(tB - bestT2)/eps;

    expect(eps1).to.be.lessThanOrEqual(8);
    expect(eps2).to.be.lessThanOrEqual(8);
}


/**
 * Assert that the results obtained via `bezierBezierIntersection` are accurate.
 * 
 * @param infos
  * @param total 
 */
function ensureResultsAccurate(
        infos: { d: number; pss: number[][][]; }[],
        total: number) {

    if (total === 0) { 
        // ignore coverage
        return; 
    }

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

    //'millis: ' + timing.toFixed(3);
    //'xs: ' + total;
    //'max: ' + max;
    //'maxIdx: ' + maxIdx;
    //'max/eps: ' + max/eps;
    //'mean: ' + mean;
    //'stdDev: ' + stdDev;

    expect(mean/eps).to.be.lessThanOrEqual(2);
    expect(max/eps).to.be.lessThanOrEqual((2**1)*4);
}


function distanceBetweenPrecise(
        p1: number[][],
        p2: number[][]) {

    const x = eDiff(p1[0],p2[0]);
    const y = eDiff(p1[1],p2[1]);
    const xx = eMult(x,x);
    const yy = eMult(y,y);

    return sqrt(eEstimate(eAdd(xx,yy)));
}
