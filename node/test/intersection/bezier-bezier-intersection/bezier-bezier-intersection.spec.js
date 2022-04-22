import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { bezierBezierIntersection, evaluateExact } from '../../../src/index.js';
import { getPss } from '../../helpers/intersection/get-pss.js';
import { sub1Ulp, add1Ulp } from "../../../src/index.js";
import { eAdd, eDiff, eEstimate, eMult } from 'big-float-ts';
const eps = Number.EPSILON;
const { sqrt, abs } = Math;
describe('bezierBezierIntersection', function () {
    it('it should ensure accuracy of calculated intersections', function () {
        //const pss = getPss([[1,1]]);         // linear-linear only
        //const pss = getPss([[2,2]]);         // quad-quad only
        //const pss = getPss([[2,3],[3,2]]);   // a mix of quad-cubic and cubic-quad
        //const pss = getPss([[1,3],[3,1]]);
        //const pss = getPss([[3,3],[2,3],[3,2],[2,2]]);
        //const pss = getPss([[3,3]]);        // cubic-cubic only
        const pss = getPss(); // a mix of all order (1,2 and 3) combinations
        testBezBezIntersection(pss);
    });
});
function testBezBezIntersection(pss) {
    let total = 0;
    const infos = [];
    let timing;
    const xss = [];
    const maxChecks = 20;
    let checkCount = 0;
    const timeStart = performance.now();
    for (let i = 0; i < pss.length; i++, i++) {
        const psA = pss[i];
        const psB = pss[i + 1];
        const xs = bezierBezierIntersection(psA, psB);
        total += xs.length;
        for (const x of xs) {
            const tSA = x[0].ri.tS;
            const tEA = x[0].ri.tE;
            const tSB = x[1].ri.tS;
            const tEB = x[1].ri.tE;
            const tA = tEA / 2 + tSA / 2;
            const tB = tEB / 2 + tSB / 2;
            assert(tEA - tSA <= 4 * eps || tEA - tSA === 1, `expected ${tEA - tSA} to be less than or equal to ${4 * eps} (or === 1)`);
            assert(tEB - tSB <= 4 * eps || tEB - tSB === 1, `expected ${tEB - tSB} to be less than or equal to ${4 * eps} (or === 1)`);
            const pA = evaluateExact(psA, tA);
            const pB = evaluateExact(psB, tB);
            const d = distanceBetweenPrecise(pA, pB);
            infos.push({ d, pss: [psA, psB] });
            if (checkCount++ < maxChecks) {
                checkTsAreAccurate(psA, psB, tSA, tEA, tSB, tEB);
            }
        }
        xss.push(xs);
    }
    timing = performance.now() - timeStart;
    ensureResultsAccurate(infos, total);
}
function getUlpRange(t, num) {
    const tsBack = [];
    {
        let prev = t;
        for (let i = 0; i < num; i++) {
            const t = sub1Ulp(prev);
            tsBack.push(t);
            prev = t;
        }
    }
    const tsForward = [];
    {
        let prev = t;
        for (let i = 0; i < num; i++) {
            const t = add1Ulp(prev);
            tsForward.push(t);
            prev = t;
        }
    }
    return [t, ...tsBack.reverse(), ...tsForward];
}
function checkTsAreAccurate(psA, psB, tSA, tEA, tSB, tEB) {
    const tA = tEA / 2 + tSA / 2;
    const tB = tEB / 2 + tSB / 2;
    const numToAddInBackAndFront = 20;
    const tAs = getUlpRange(tA, numToAddInBackAndFront);
    const tBs = getUlpRange(tB, numToAddInBackAndFront);
    let best = Number.POSITIVE_INFINITY;
    let bestI = undefined;
    let bestJ = undefined;
    for (let i = 0; i < 2 * numToAddInBackAndFront + 1; i++) {
        for (let j = 0; j < 2 * numToAddInBackAndFront + 1; j++) {
            const tA = tAs[i];
            const tB = tBs[j];
            const pA = evaluateExact(psA, tA);
            const pB = evaluateExact(psB, tB);
            const d = distanceBetweenPrecise(pA, pB);
            if (d < best) {
                best = d;
                bestI = i;
                bestJ = j;
            }
        }
    }
    const bestT1 = tAs[bestI];
    const bestT2 = tBs[bestJ];
    const eps1 = abs(tA - bestT1) / eps;
    const eps2 = abs(tB - bestT2) / eps;
    expect(eps1).to.be.lessThanOrEqual(8);
    expect(eps2).to.be.lessThanOrEqual(8);
}
/**
 * Assert that the results obtained via `bezierBezierIntersection` are accurate.
 *
 * @param infos
  * @param total
 */
function ensureResultsAccurate(infos, total) {
    if (total === 0) {
        return;
    }
    let sum = 0;
    let max = 0;
    let maxIdx = -1;
    for (let i = 0; i < infos.length; i++) {
        const d = infos[i].d;
        sum += d;
        if (d > max) {
            max = d;
            maxIdx = i;
        }
    }
    const mean = sum / total;
    let sumSquaredDiffs = 0;
    for (const info of infos) {
        sumSquaredDiffs += (mean - info.d) ** 2;
    }
    const stdDev = Math.sqrt(sumSquaredDiffs / total);
    //'millis: ' + timing.toFixed(3);
    //'xs: ' + total;
    //'max: ' + max;
    //'maxIdx: ' + maxIdx;
    //'max/eps: ' + max/eps;
    //'mean: ' + mean;
    //'stdDev: ' + stdDev;
    expect(mean / eps).to.be.lessThanOrEqual(2);
    expect(max / eps).to.be.lessThanOrEqual((2 ** 1) * 4);
}
function distanceBetweenPrecise(p1, p2) {
    const x = eDiff(p1[0], p2[0]);
    const y = eDiff(p1[1], p2[1]);
    const xx = eMult(x, x);
    const yy = eMult(y, y);
    return sqrt(eEstimate(eAdd(xx, yy)));
}
//# sourceMappingURL=bezier-bezier-intersection.spec.js.map