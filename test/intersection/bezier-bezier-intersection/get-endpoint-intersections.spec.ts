import { expect, use } from "chai";
import { eEstimate } from "big-float-ts";
import { 
    bezierSelfIntersection, evaluateExact, fromPowerBasis, generateSelfIntersecting, 
    getEndpointIntersections, getXY, getXYExact, isPointOnBezierExtension, X 
} from "../../../src/index.js";
import { fromTo3 } from "../../../src/transformation/split/from-to/from-to-3.js";
import { nearly } from "../../helpers/chai-extend-nearly.js";
import { areIntersectionsInfinte } from "../../helpers/intersection/are-intersections-infinite.js";
import { reverse } from "dns";
import { fromTo2 } from "../../../src/transformation/split/from-to/from-to-2.js";

const { sqrt } = Math;

use(nearly);


describe('getEndpointIntersections', function() {
    it('it should find intersection intervals pairs of overlapping/non-overlapping algebraically identical bezier curves',
    function() {
        const psAsQuad = [
            [[1,1],[2,1.625],[3.5,5]],
            [[-1,1],[2,-1.625],[3.-5,5]],
            [[-1,-1],[2,1.625],[-3.5,5]],
            [[-1,-1],[2,1.625],[-3.5,-5]]
        ];

        // TODO - finish
        {
            // All possible cases:
            //
            // Case 1/2
            // ******      
            //       ******
            {
                // cubic
                const t0 = 1;
                const t1 = 3;
                const psA = [[-1,1],[6,2.5],[2,1],[3,3]];

                testEndpointXs(t0,t1, psA, [1], [0]);
            }
            {
                // quadratic
                const t0 = 1;
                const t1 = 3;
                // const t1 = 2**20;

                for (let psA of psAsQuad) { testEndpointXs(t0,t1, psA, [1], [0]); }
            }
            // Case 3/4
            // ******
            //    ******
            {
                // cubic
                const t0 = 0.999755859375;  // 1 - (2**40)*Number.EPSILON
                const t1 = 13;
                const psA = [[0,0],[6,6],[2,1],[3,3]];

                testEndpointXs(t0,t1, psA, [0.999755859375,1], [0,0.000020344638170610134]);
            }
            {
                // quadratic
                const t0 = 0.999755859375;  // 1 - (2**40)*Number.EPSILON
                const t1 = 13;
                const psA = [[0,0],[2,1],[3,5]];

                for (let psA of psAsQuad) { 
                    testEndpointXs(t0,t1, psA, [0.999755859375,1], [0,0.000020344638170610134]); 
                }
            }
            // Case 5/6
            //   **
            // ******
            {
                // cubic
                const t0 = -1;
                const t1 = 3;
                const psA = [[0,0],[6,6],[2,1],[3,3]];

                testEndpointXs(t0,t1, psA, [0,1], [0.25,0.5]);
            }
            {
                // quadratic
                const t0 = -1;
                const t1 = 3;
                // const t0 = -0.125;  // 1 - (2**40)*Number.EPSILON
                // const t1 = 6.125;
                for (let psA of psAsQuad) { testEndpointXs(t0,t1, psA, [0,1], [0.25,0.5]); }
            }
            // Case 7/8
            // ******
            //          ******
            {
                // cubic
                const t0 = 2;
                const t1 = 3;
                const psA = [[0,0],[6,6],[2,1],[3,3]];

                testEndpointXs(t0,t1, psA, [], []);
            }
            {
                // quadratic
                const t0 = 2;
                const t1 = 3;

                for (let psA of psAsQuad) { testEndpointXs(t0,t1, psA, [], []); }
            }
            // Case 9
            // ******
            // ******
            {
                // cubic
                const t0 = 1;
                const t1 = 0;
                const psA = [[0,0],[6,6],[2,1],[3,3]];
                testEndpointXs(t0,t1, psA, [0,1], [1,0]);
            }
            {
                // quadratic
                const t0 = 1;
                const t1 = 0;
                for (let psA of psAsQuad) { testEndpointXs(t0,t1, psA, [0,1], [1,0]); }
            }
            // Case 10/11
            // ***
            // ******
            {
                // cubic
                const t0 = 0;
                const t1 = 3;
                const psA = [[0,0],[6,6],[2,1],[3,3]];
                testEndpointXs(t0,t1, psA, [0,1], [0,1/3]);
            }
            {
                // quadratic
                const t0 = 0;
                const t1 = 3;
                for (let psA of psAsQuad) { testEndpointXs(t0,t1, psA, [0,1], [0,1/3]); }
            }
        }

        /*
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
                const rA = R.map(mapXPair(0));
                expect(rA).to.be.nearly(2**1,[0.25,0.5]);
            }
            
            {
                const R = getEndpointIntersections(ps,psB);
                const rA = R.map(mapXPair(0));
                expect(rA).to.be.nearly(2**1,[0.5,1]);
            }
       }
       */
    });
});


function testEndpointXs(
        t0: number,
        t1: number,
        psA: number[][],
        // psB: number[][],
        expectedA: number[],
        expectedB: number[]) {

    const psB = 
          psA.length === 4 
        ? fromTo3(psA,t0,t1).ps
        :  psA.length === 3 
        ? fromTo2(psA,t0,t1).ps
        : [];

    // the below is a necessary precondition of `getEndpointIntersections`
    expect(areIntersectionsInfinte(psA,psB)).to.be.true;

    // for (let i=0; i<2; i++) {
    for (let i=0; i<2; i++) { // TODO
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
            const rA = r.map(mapXPair(0));
            const rB = r.map(mapXPair(1));
            expect(rA).to.be.nearly(2**1,expectedA_);
            expect(rB).to.be.nearly(2**1,expectedB_);
            for (let j=0; j<r.length; j++) {
                expect(
                    evaluateExact(B,expectedB_[j]).map(eEstimate)).to.be.nearly(2**4,
                    evaluateExact(A,expectedA_[j]).map(eEstimate)
                );
            }
        }
        // ⇐ ⇒  (A reversed)
        {
            const r = getEndpointIntersections(AR,B);
            const rA = r.map(mapXPair(0));
            const rB = r.map(mapXPair(1));
            const expectedAR = expectedA_.map(v => 1 - v).reverse();
            const expectedBR = expectedB_.slice().reverse();
            expect(rA).to.be.nearly(2**1, expectedAR);
            expect(rB).to.be.nearly(2**1, expectedBR);
            for (let j=0; j<r.length; j++) {
                expect(
                    evaluateExact(B,expectedBR[j]).map(eEstimate)).to.be.nearly(2**4,
                    evaluateExact(AR,expectedAR[j]).map(eEstimate)
                );
            }
        }
        // ⇒ ⇐ (B reversed)
        {
            const r = getEndpointIntersections(A,BR);
            const rA = r.map(mapXPair(0));
            const rB = r.map(mapXPair(1));
            const expectedAR = expectedA_;
            const expectedBR = expectedB_.map(v => 1 - v);
            expect(rA).to.be.nearly(2**1, expectedAR);
            expect(rB).to.be.nearly(2**1, expectedBR);
            for (let j=0; j<r.length; j++) {
                expect(
                    evaluateExact(BR,expectedBR[j]).map(eEstimate)).to.be.nearly(2**4,
                    evaluateExact(A,expectedAR[j]).map(eEstimate)
                );
            }
        }
        // ⇐ ⇐ (A and B reversed)
        {
            const r = getEndpointIntersections(AR,BR);
            const rA = r.map(mapXPair(0));
            const rB = r.map(mapXPair(1));
            const expectedAR = expectedA_.map(v => 1 - v).reverse();
            const expectedBR = expectedB_.map(v => 1 - v).reverse();
            expect(rA).to.be.nearly(2**1, expectedAR);
            expect(rB).to.be.nearly(2**1, expectedBR);
            for (let j=0; j<r.length; j++) {
                expect(
                    evaluateExact(BR,expectedBR[j]).map(eEstimate)).to.be.nearly(2**4,
                    evaluateExact(AR,expectedAR[j]).map(eEstimate)
                );
            }
        }
    }
}


/**
 * Maps the given pair of intersections to the first bezier curve intersection
 * details.
 * 
 * @param bezIdx
 */
function mapXPair(bezIdx: number) {
    return (xPair: X[]): number => {
        const ri = xPair[bezIdx].ri;
        const t = ri.tE/2 + ri.tS/2;
        return t;
    }
}


function changeVariablesLinearCubic(
        p: number[],
        c: number, 
        d: number): number[] {

    const [p0,p1,p2,p3] = p;

    const dd = d*d;
    const cc = c*c;
    const ccc = cc*c;

    const r0 = p0*ccc;
    const r1 = cc*(3*p0*d + p1);
    const r2 = c*(3*p0*dd + 2*p1*d + p2);
    const r3 = dd*(p0*d + p1) + p2*d + p3;

    return [r0,r1,r2,r3];
}


function changeVariablesQuadratic  (
        p: number[], 
        c: number, 
        d: number): number[] {

    const [p0,p1,p2] = p;

    const r0 = c*c*p0;
    const r1 = c*p1 + 2*c*d*p0;
    const r2 = p2 + d*p1 + d*d*p0;
    
    return [r0,r1,r2];
}


function changeVariablesLinear(
        p: number[], 
        c: number, 
        d: number): number[] {

    const [p0,p1] = p;

    const r1 = p1 + d*p0;
    const r0 = c*p0;

    return [r0,r1];
}



// sub1Ulp(1);//?
// add1Ulp(1);//?
// sub1Ulp(0);//?
// add1Ulp(0);//?
// sub1Ulp(Number.EPSILON);//?
// Number.EPSILON
// add1Ulp(Number.EPSILON);//?
// sub1Ulp(Number.MIN_VALUE*2**100);//?
// Number.MIN_VALUE*2**104          //?
// add1Ulp(Number.MIN_VALUE*2**104);//?