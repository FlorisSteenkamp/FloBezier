import { expect, use } from "chai";
import { eEstimate } from "big-float-ts";
import { 
    bezierSelfIntersection, evaluateExact, generateSelfIntersecting, 
    isPointOnBezierExtension, X 
} from "../../../src/index.js";
import { fromTo3 } from "../../../src/transformation/split/from-to/from-to-3.js";
import { nearly } from "../../helpers/chai-extend-nearly.js";
import { areIntersectionsInfinte } from "../../helpers/intersection/are-intersections-infinite.js";
import { fromTo2 } from "../../../src/transformation/split/from-to/from-to-2.js";
import { fromTo1 } from "../../../src/transformation/split/from-to/from-to-1.js";
import { getEndpointIntersections } from "../../../src/intersection/get-endpoint-intersections/get-endpoint-intersections.js";

use(nearly);


describe('getEndpointIntersections', function() {
    it('it should find intersection intervals pairs of overlapping/non-overlapping algebraically identical bezier curves',
    function() {
        const psCubic = [
            [[-1,1],[6,2.5],[2,1],[3,3]],
            [[1,1],[6,-2.5],[2,1],[3,3]],
            [[1,1],[6,2.5],[2,1],[-3,-3]],
            [[-1,-1],[6,2.5],[-2,-1],[-3,-3]],
            [[-1,-1],[-6,-2.5],[-2,-1],[-3,-3]],
        ];

        const psQuad = [
            [[1,1],[2,1.625],[3.5,5]],
            [[-1,1],[2,-1.625],[3.-5,5]],
            [[-1,-1],[2,1.625],[-3.5,5]],
            [[-1,-1],[2,1.625],[-3.5,-5]],
            [[-1,-1],[2,1.625],[5,-5]],
            [[-1,-1],[1.625,2],[-5,5]],
        ];

        const psLine = [
            [[1,1],[2,1.625]],
            [[1,1],[2,1]],
            [[1,1],[1,2]],
            [[1,1],[1,2]],
        ]

        const pss = [
            ...psLine,
            ...psQuad,
            ...psCubic
        ];

        {
            // All possible cases:
            //
            // Case 1/2
            // ******      
            //       ******
            for (let psA of pss) {
                testEndpointXs(1,3, psA, [1], [0]);
            }
            // Case 3/4
            // ******
            //    ******
            for (let psA of pss) {
                testEndpointXs(0.999755859375,13, psA, [0.999755859375,1], [0,0.000020344638170610134]);
            }
            // Case 5/6
            //   **
            // ******
            for (let psA of pss) {
                testEndpointXs(-1,3, psA, [0,1], [0.25,0.5]);
            }
            // Case 7/8
            // ******
            //          ******
            for (let psA of pss) {
                testEndpointXs(2,3, psA, [], []);
            }
            // Case 9
            // ******
            // ******
            for (let psA of pss) {
                testEndpointXs(1,0, psA, [0,1], [1,0]);
            }
            // Case 10/11
            // ***
            // ******
            for (let psA of pss) {
                testEndpointXs(0,3, psA, [0,1], [0,1/3]);
            }
        }

        // some special cases
        {
            const t1 = 0.25;
            const t2 = 0.75;
            const ps = generateSelfIntersecting([0,0],[3,3],[3,-3], [t1,t2]);
            //=> [[0,0],[3,3],[-3,3],[4.153846153846153,0]]
            //bezierSelfIntersection(ps);  //=> [0.25, 0.75]  (estimated)

            const psA = fromTo3(ps,0.25,0.5);
            const psB = fromTo3(ps,0.5,1);
            // areIntersectionsInfinte(ps,psA);  //=> true
            // areIntersectionsInfinte(ps,psB);  //=> true
            // areIntersectionsInfinte(psA,psB);  //=> true

            const p1e = evaluateExact(ps,t1);
            const p1 = p1e.map(eEstimate);  //=> [0.9086538461538461, 1.6875]
            // isPointOnBezierExtension(ps,p1e);  //=> true
            // isPointOnBezierExtension(ps,[[p1[0]],[p1[1]]]);  //=> true

            const p2e = evaluateExact(ps,t2);
            const p2 = p2e.map(eEstimate);  //=> [0.9086538461538459, 1.6875]
            // isPointOnBezierExtension(ps,p2e);  //=> true
            // isPointOnBezierExtension(ps,[[p2[0]],[p2[1]]]);  //=> true

            {
                const R = getEndpointIntersections(ps,psA);
                const rA = R.map(mapX(0));
                // @ts-ignore - otherwise TypeScript gives an error on nearly
                expect(rA).to.be.nearly(2**1,[0.25,0.5]);
            }
            
            {
                const R = getEndpointIntersections(ps,psB);
                const rA = R.map(mapX(0));
                // @ts-ignore - otherwise TypeScript gives an error on nearly
                expect(rA).to.be.nearly(2**1,[0.5,1]);
            }
       }
    });
});


function testEndpointXs(
        t0: number,
        t1: number,
        psA: number[][],
        expectedA: number[],
        expectedB: number[]) {

    const psB = 
          psA.length === 4 
        ? fromTo3(psA,t0,t1)
        : psA.length === 3 
        ? fromTo2(psA,t0,t1)
        : psA.length === 2 
        ? fromTo1(psA,t0,t1)
        : [];

    // the below is a necessary precondition of `getEndpointIntersections`
    expect(areIntersectionsInfinte(psA,psB)).to.be.true;

    for (let i=0; i<2; i++) {
        const [A,B,expectedA_,expectedB_] = i === 0 
            ? [psA,psB,expectedA,expectedB]
            : expectedB[0] > expectedB[1]  // required since we always order by the `t` values of `psA`
                ? [psB,psA,expectedB.slice().reverse(),expectedA.slice().reverse()]
                : [psB,psA,expectedB,expectedA]

        const AR = A.slice().reverse();
        const BR = B.slice().reverse();
        // ⇒ ⇒
        {
            const r = getEndpointIntersections(A,B);
            const rA = r.map(mapX(0));
            const rB = r.map(mapX(1));
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(rA).to.be.nearly(2**1,expectedA_);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(rB).to.be.nearly(2**1,expectedB_);
            for (let j=0; j<r.length; j++) {
                expect(
                    // @ts-ignore - otherwise TypeScript gives an error on nearly
                    evaluateExact(B,expectedB_[j]).map(eEstimate)).to.be.nearly(2**4,
                    evaluateExact(A,expectedA_[j]).map(eEstimate)
                );
            }
        }
        // ⇐ ⇒  (A reversed)
        {
            const r = getEndpointIntersections(AR,B);
            const rA = r.map(mapX(0));
            const rB = r.map(mapX(1));
            const expectedAR = expectedA_.map(v => 1 - v).reverse();
            const expectedBR = expectedB_.slice().reverse();
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(rA).to.be.nearly(2**1, expectedAR);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(rB).to.be.nearly(2**1, expectedBR);
            for (let j=0; j<r.length; j++) {
                expect(
                    // @ts-ignore - otherwise TypeScript gives an error on nearly
                    evaluateExact(B,expectedBR[j]).map(eEstimate)).to.be.nearly(2**4,
                    evaluateExact(AR,expectedAR[j]).map(eEstimate)
                );
            }
        }
        // ⇒ ⇐ (B reversed)
        {
            const r = getEndpointIntersections(A,BR);
            const rA = r.map(mapX(0));
            const rB = r.map(mapX(1));
            const expectedAR = expectedA_;
            const expectedBR = expectedB_.map(v => 1 - v);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(rA).to.be.nearly(2**1, expectedAR);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(rB).to.be.nearly(2**1, expectedBR);
            for (let j=0; j<r.length; j++) {
                expect(
                    // @ts-ignore - otherwise TypeScript gives an error on nearly
                    evaluateExact(BR,expectedBR[j]).map(eEstimate)).to.be.nearly(2**4,
                    evaluateExact(A,expectedAR[j]).map(eEstimate)
                );
            }
        }
        // ⇐ ⇐ (A and B reversed)
        {
            const r = getEndpointIntersections(AR,BR);
            const rA = r.map(mapX(0));
            const rB = r.map(mapX(1));
            const expectedAR = expectedA_.map(v => 1 - v).reverse();
            const expectedBR = expectedB_.map(v => 1 - v).reverse();
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(rA).to.be.nearly(2**1, expectedAR);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(rB).to.be.nearly(2**1, expectedBR);
            for (let j=0; j<r.length; j++) {
                expect(
                    // @ts-ignore - otherwise TypeScript gives an error on nearly
                    evaluateExact(BR,expectedBR[j]).map(eEstimate)).to.be.nearly(2**4,
                    evaluateExact(AR,expectedAR[j]).map(eEstimate)
                );
            }
        }
    }
}


/**
 * Maps the given intersection to the first bezier curve intersection details.
 * 
 * @param bezIdx
 */
function mapX(bezIdx: number) {
    return (x: X): number => bezIdx === 0 ? x.t1 : x.t2;
}


/*
function changeVariablesCubic(
        p: number[],
        c: number, 
        d: number): number[] {

    const [p3,p2,p1,p0] = p;

    const r3 = p3*c*c*c;
    const r2 = c*c*(3*p3*d + p2);
    const r1 = c*(3*p3*d*d + 2*p2*d + p1);
    const r0 = d*d*d*p3 + d*d*p2 + p1*d + p0;

    return [r3,r2,r1,r0];
}
*/


/*
function changeVariablesQuadratic  (
        p: number[], 
        c: number, 
        d: number): number[] {

    const [p2,p1,p0] = p;

    const r2 = c*c*p2;
    const r1 = c*p1 + 2*c*d*p2;
    const r0 = d*d*p2 + d*p1 + p0;
    
    return [r2,r1,r0];
}
*/


/*
function changeVariablesLinear(
        p: number[], 
        c: number, 
        d: number): number[] {

    const [p1,p0] = p;

    const r1 = c*p1;
    const r0 = d*p1 + p0;

    return [r1,r0];
}
*/