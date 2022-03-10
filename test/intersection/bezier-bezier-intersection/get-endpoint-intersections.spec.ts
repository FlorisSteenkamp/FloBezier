import { eEstimate } from "big-float-ts";
import { expect, use } from "chai";
import { reverse } from "dns";
import { fromTo } from "flo-vector2d";
import { 
    bezierSelfIntersection, evaluate, evaluateExact, generateSelfIntersecting, 
    getEndpointIntersections, isPointOnBezierExtension, X 
} from "../../../src/index.js";
import { fromTo3 } from "../../../src/transformation/split/from-to/from-to-3.js";
import { nearly } from "../../helpers/chai-extend-nearly.js";
import { areIntersectionsInfinte } from "../../helpers/intersection/are-intersections-infinite.js";
import { swapIntersections } from "../../helpers/intersection/swap-intersections.js";

use(nearly);


describe('getEndpointIntersections', function() {
    it('it should find intersection intervals pairs of overlapping/non-overlapping algebraically identical bezier curves',
    function() {
        // TODO - finish
        {
            // All possible cases:
            //
            // Case 1/2
            // ******      
            //       ******
            {
                const t0 = 1;  // 1 - (2**40)*Number.EPSILON
                const t1 = 3;
                const psA = [[0,0],[6,6],[2,1],[3,3]];
                const psB = fromTo3(psA,t0,t1).ps;

                testEndpointXs(psA,psB, [1,1], [0,0]);
            }
            // Case 3/4
            // ******
            //    ******
            {
                const t0 = 0.999755859375;  // 1 - (2**40)*Number.EPSILON
                const t1 = 13;
                const psA = [[0,0],[6,6],[2,1],[3,3]];
                const psB = fromTo3(psA,t0,t1).ps;

                testEndpointXs(psA,psB, [0.999755859375,1], [0,0.000020344638170610134]);
            }
            // Case 5/6
            //   **
            // ******
            {
                const t0 = -1;
                const t1 = 3;
                const psA = [[0,0],[6,6],[2,1],[3,3]];
                const psB = fromTo3(psA,t0,t1).ps;

                testEndpointXs(psA,psB, [0,1], [0.25,0.5]);
            }
            // Case 7/8
            // ******
            //          ******
            {
                const t0 = 2;
                const t1 = 3;
                const psA = [[0,0],[6,6],[2,1],[3,3]];
                const psB = fromTo3(psA,t0,t1).ps;

                testEndpointXs(psA,psB, [], []);
            }
            // Case 9
            // ******
            // ******
            {
                const psA = [[0,0],[6,6],[2,1],[3,3]];
                const psB = [[0,0],[6,6],[2,1],[3,3]].reverse();
                testEndpointXs(psA,psB, [0,1], [1,0]);
            }
            // Case 10/11
            // ***
            // ******
            {
                const t0 = 0;
                const t1 = 3;
                const psA = [[0,0],[6,6],[2,1],[3,3]];
                const psB = fromTo3(psA,t0,t1).ps;
                testEndpointXs(psA,psB, [0,1], [0,1/3]);
            }
        }

        // some special cases
        {
            const t1 = 0.25;
            const t2 = 0.75;
            const ps = generateSelfIntersecting([0,0],[3,3],[3,-3], [t1,t2]);
            //=> [[0,0],[3,3],[-3,3],[4.153846153846153,0]]
            //bezierSelfIntersection(ps);  //=> [0.25, 0.75]  (estimated)

            const psA = fromTo3(ps,0.25,0.5).ps;
            const psB = fromTo3(ps,0.5,1).ps;
            // areIntersectionsInfinte(ps,psA);  //=> true
            // areIntersectionsInfinte(ps,psB);  //=> true
            // areIntersectionsInfinte(psA,psB);  //=> true

            const p1e = evaluateExact(ps,t1);//?
            const p1 = p1e.map(eEstimate);  //=> [0.9086538461538461, 1.6875]
            // isPointOnBezierExtension(ps,p1e);  //=> true
            // isPointOnBezierExtension(ps,[[p1[0]],[p1[1]]]);  //=> true

            const p2e = evaluateExact(ps,t2);//?
            const p2 = p2e.map(eEstimate);  //=> [0.9086538461538459, 1.6875]
            // isPointOnBezierExtension(ps,p2e);  //=> true
            // isPointOnBezierExtension(ps,[[p2[0]],[p2[1]]]);  //=> true

            {
                const R = getEndpointIntersections(ps,psA);
                const rA = R.map(mapXPairA);
                expect(rA).to.be.nearly([2**1],[0.25,0.5]);
            }
            
            {
                const R = getEndpointIntersections(ps,psB);
                const rA = R.map(mapXPairA);
                expect(rA).to.be.nearly([2**1],[0.5,1]);
            }
       }
    });
});


function testEndpointXs(
        psA: number[][],
        psB: number[][],
        expectedA: number[],
        expectedB: number[]) {

    // the below is a necessary precondition of `getEndpointIntersections`
    expect(areIntersectionsInfinte(psA,psB)).to.be.true;

    for (let i=1; i<2; i++) {
    // for (let i=0; i<2; i++) { //TODO - change back
        const [A,B,expectedA_,expectedB_] = i === 0 
            ? [psA,psB,expectedA,expectedB]
            : expectedB[0] > expectedB[1]  // required since we always order by the `t` values of `psA`
                ? [psB,psA,expectedB.slice().reverse(),expectedA.slice().reverse()]
                : [psB,psA,expectedB,expectedA]

        const AR = A.slice().reverse();
        const BR = B.slice().reverse();

        // ⇒ ⇒
        {
            const R = getEndpointIntersections(A,B);
            if (R.length === 0) {
                expect(expectedA.length).to.eql(0);
                expect(expectedB.length).to.eql(0);
            } else {
                const rA = R.map(mapXPairA);
                const rB = R.map(mapXPairB);
                expect(rA).to.be.nearly([2**1],expectedA_);
                expect(rB).to.be.nearly([2**1],expectedB_);
                expect(
                    evaluateExact(B,expectedB_[0]).map(eEstimate)).to.be.nearly(2**2,
                    evaluateExact(A,expectedA_[0]).map(eEstimate)
                );
                expect(
                    evaluateExact(B,expectedB_[1]).map(eEstimate)).to.be.nearly(2**2,
                    evaluateExact(A,expectedA_[1]).map(eEstimate)
                );
            }
        }

        // ⇐ ⇒  (A reversed)
        {
            const R = getEndpointIntersections(AR,B);
            if (R.length === 0) {
                expect(expectedA.length).to.eql(0);
                expect(expectedB.length).to.eql(0);
            } else {
                const RA = R.map(mapXPairA);
                const RB = R.map(mapXPairB);
                const expectedAR = expectedA_.map(v => 1 - v).reverse();
                const expectedBR = expectedB_.slice().reverse();
                expect(RA).to.nearly([2**1], expectedAR);
                expect(RB).to.nearly([2**1], expectedBR);
                expect(
                    evaluateExact(B,expectedBR[0]).map(eEstimate)).to.be.nearly(2**2,
                    evaluateExact(AR,expectedAR[0]).map(eEstimate)
                );
                expect(
                    evaluateExact(B,expectedBR[1]).map(eEstimate)).to.be.nearly(2**2,
                    evaluateExact(AR,expectedAR[1]).map(eEstimate)
                );
            }
        }

        // ⇒ ⇐ (B reversed)
        {
            const R = getEndpointIntersections(A,BR);
            if (R.length === 0) {
                expect(expectedA.length).to.eql(0);
                expect(expectedB.length).to.eql(0);
            } else {
                const RA = R.map(mapXPairA);
                const RB = R.map(mapXPairB);
                const expectedAR = expectedA_;
                const expectedBR = expectedB_.map(v => 1 - v);
                expect(RA).to.nearly([2**1], expectedAR);
                expect(RB).to.nearly([2**1], expectedBR);
                expect(
                    evaluateExact(BR,expectedBR[0]).map(eEstimate)).to.be.nearly(2**2,
                    evaluateExact(A,expectedAR[0]).map(eEstimate)
                );
                expect(
                    evaluateExact(BR,expectedBR[1]).map(eEstimate)).to.be.nearly(2**2,
                    evaluateExact(A,expectedAR[1]).map(eEstimate)
                );
            }
        }

        // ⇐ ⇐ (A and B reversed)
        {
            const R = getEndpointIntersections(AR,BR);
            if (R.length === 0) {
                expect(expectedA.length).to.eql(0);
                expect(expectedB.length).to.eql(0);
            } else {
                const RA = R.map(mapXPairA);
                const RB = R.map(mapXPairB);
                const expectedAR = expectedA_.map(v => 1 - v).reverse();
                const expectedBR = expectedB_.map(v => 1 - v).reverse();
                expect(RA).to.nearly([2**1], expectedAR);
                expect(RB).to.nearly([2**1], expectedBR);
                expect(
                    evaluateExact(BR,expectedBR[0]).map(eEstimate)).to.be.nearly(2**2,
                    evaluateExact(AR,expectedAR[0]).map(eEstimate)
                );
                expect(
                    evaluateExact(BR,expectedBR[1]).map(eEstimate)).to.be.nearly(2**2,
                    evaluateExact(AR,expectedAR[1]).map(eEstimate)
                );
            }
        }
    }
}


/**
 * Maps the given pair of intersections to the first bezier curve intersection
 * details.
 * 
 * @param xPair 
 */
function mapXPairA(xPair: X[]): number {
    const ri = xPair[0].ri;
    const t = ri.tE/2 + ri.tS/2;
    return t;
}

function mapXPairB(xPair: X[]): number {
    const ri = xPair[1].ri;
    const t = ri.tE/2 + ri.tS/2;
    return t;
}


function changeVariablesLinearCubic(
        p: number[],
        a: number, 
        b: number): number[] {

    const [p0,p1,p2,p3] = p;

    const bb = b*b;
    const aa = a*a;

    const r0 = p0*a*aa;
    const r1 = aa*(3*p0*b + p1);
    const r2 = a*(3*p0*bb + 2*p1*b + p2);
    const r3 = bb*(p0*b + p1) + p2*b + p3;

    return [r0,r1,r2,r3];
}


function changeVariablesQuadratic(
        p: number[], 
        a: number, 
        b: number): number[] {

    const [p0,p1,p2] = p;

    const r2 = p2 + b*p1 + b*b*p0;
    const r1 = a*p1 + 2*a*b*p0;
    const r0 = a*a*p0;

    return [r0,r1,r2];
}


function changeVariablesLinear(
        p: number[], 
        a: number, 
        b: number): number[] {

    const [p0,p1] = p;

    const r1 = p1 + b*p0;
    const r0 = a*p0;

    return [r0,r1];
}