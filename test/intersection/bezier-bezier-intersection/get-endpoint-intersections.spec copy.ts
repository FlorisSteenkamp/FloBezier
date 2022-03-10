import { expect, use } from "chai";
import { fromTo } from "flo-vector2d";
import { evaluate, getEndpointIntersections, X } from "../../../src/index.js";
import { fromTo3 } from "../../../src/transformation/split/from-to/from-to-3.js";
import { nearly } from "../../helpers/chai-extend-nearly.js";
import { areIntersectionsInfinte } from "../../helpers/intersection/are-intersections-infinite.js";
import { swapIntersections } from "../../helpers/intersection/swap-intersections.js";

use(nearly);


describe('getEndpointIntersections', function() {
    it('it should find intersection intervals pairs of overlapping/non-overlapping algebraically identical bezier curves',
    function() {
        // TODO  - finish
        // lines (all cases really degenerate to this)
        {
            // All possible cases:
            //
            // Case 1
            // ******
            //       ******
            /*
            {
                const ps1 = [[0,0],[6,6]];
                const ps2 = [[6,6],[12,12]];

                const _r = getEndpointIntersections(ps1,ps2);
                const r = _r.map(mapXPair);
                const expected = [1,1];
                expect(r).to.eql(expected);

                const _rReverse = getEndpointIntersections(ps1.slice().reverse(),ps2);
                const rReverse = _rReverse.map(mapXPair);
                expect(rReverse).to.eql(expected.map(v => 1 - v).sort((a,b) => a - b));
            }
            // Case 2
            //       ******
            // ******
            {
                const ps1 = [[6,6],[12,12]];
                const ps2 = [[0,0],[6,6]];

                const _r = getEndpointIntersections(ps1,ps2);
                const r = _r.map(mapXPair);
                const expected = [0,0];
                expect(r).to.eql(expected);

                const _rReverse = getEndpointIntersections(ps1.slice().reverse(),ps2);
                const rReverse = _rReverse.map(mapXPair);
                expect(rReverse).to.eql(expected.map(v => 1 - v).sort((a,b) => a - b));
            }
            // Case 3
            // ******
            //    ******
            {
                const ps1 = [[0,0],[6,6]];
                const ps2 = [[3,3],[9,9]];

                const _r = getEndpointIntersections(ps1,ps2);
                const r = _r.map(mapXPair);
                const expected = [0.5,1];
                expect(r).to.eql(expected);

                const _rReverse = getEndpointIntersections(ps1.slice().reverse(),ps2);
                const rReverse = _rReverse.map(mapXPair);
                expect(rReverse).to.eql(expected.map(v => 1 - v).sort((a,b) => a - b));
            }
            // Case 4
            //    ******
            // ******
            {
                const ps1 = [[3,3],[9,9]];
                const ps2 = [[0,0],[6,6]];

                const _r = getEndpointIntersections(ps1,ps2);
                const r = _r.map(mapXPair);
                const expected = [0,0.5];
                expect(r).to.eql(expected);

                const _rReverse = getEndpointIntersections(ps1.slice().reverse(),ps2);
                const rReverse = _rReverse.map(mapXPair);
                expect(rReverse).to.eql(expected.map(v => 1 - v).sort((a,b) => a - b));
            }
            */
            // Case 5 ✓
            //   **
            // ******
            /*
            {
                const t0 = -1;
                const t1 = 2;
                const psA = [[0,0],[6,6],[2,1],[3,3]];
                const psB = fromTo3(psA,t0,t1).ps;
                // the below is a necessary precondition of `getEndpointIntersections`
                expect(areIntersectionsInfinte(psA,psB)).to.be.true;

                const r = getEndpointIntersections(psA,psB);
                const rA = r.map(mapXPairA);
                const rB = r.map(mapXPairB);

                const expectedA = [0,1];
                expect(rA).to.eql(expectedA);

                evaluate(psB,1/3);
                const expectedB = [1/3,2/3];
                expect(rB).to.eql(expectedB);

                const _rReverse = getEndpointIntersections(psA.slice().reverse(),psB);
                const rReverse = _rReverse.map(mapXPairA);
                expect(rReverse).to.eql(expectedA.map(v => 1 - v).sort((a,b) => a - b));
            }
            */
            // Case 6
            // ******
            //   **
            {
                const ps1 = [[0,0],[6,6]];
                const ps2 = [[2,2],[4,4]];

                const _r = getEndpointIntersections(ps1,ps2);
                const r = _r.map(mapXPair);
                const expected = [1/3,2/3];
                expect(r).to.be.nearly(2**4, expected);

                const _rReverse = getEndpointIntersections(ps1.slice().reverse(),ps2);
                const rReverse = _rReverse.map(mapXPair);
                expect(rReverse).to.be.nearly(2**4, expected.map(v => 1 - v).sort((a,b) => a - b));
            }
            /*
            // Case 7
            // ******
            //          ******
            {
                const ps1 = [[0,0],[6,6]];
                const ps2 = [[9,9],[15,15]];

                const _r = getEndpointIntersections(ps1,ps2);
                const r = _r.map(mapXPair);
                const expected = [];
                expect(r).to.be.eql(expected);

                const _rReverse = getEndpointIntersections(ps1.slice().reverse(),ps2);
                const rReverse = _rReverse.map(mapXPair);
                expect(rReverse).to.eql(expected.map(v => 1 - v).sort((a,b) => a - b));
            }
            // Case 8
            //          ******
            // ******
            {
                const ps1 = [[9,9],[15,15]];
                const ps2 = [[0,0],[6,6]];

                const _r = getEndpointIntersections(ps1,ps2);
                const r = _r.map(mapXPair);
                const expected = [];
                expect(r).to.be.eql(expected);

                const _rReverse = getEndpointIntersections(ps1.slice().reverse(),ps2);
                const rReverse = _rReverse.map(mapXPair);
                expect(rReverse).to.eql(expected.map(v => 1 - v).sort((a,b) => a - b));
            }
            */
            // Case 9
            // ******
            // ******
            /*
            {
                const ps1 = [[0,0],[6,6],[2,1],[3,3]];
                const ps2 = [[0,0],[6,6],[2,1],[3,3]];

                const _r = getEndpointIntersections(ps1,ps2);
                const r = _r.map(mapXPair);
                const expected = [0,1];
                expect(r).to.be.eql(expected);
            }
            */
            // Case 10
            // ***
            // ******
            // Case 11
            //    ***
            // ******
        }

        // cubics (by limiting endpoints appropriately)
        {
            // TODO
        }
    });
});


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