import { expect, use } from 'chai';
import { 
    bezierBezierIntersectionFast, bezierBezierIntersection, 
    generateSelfIntersecting, evaluateExact
} from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { fromTo3 } from '../../../src/transformation/split/from-to/from-to-3.js';
import { eEstimate } from 'big-float-ts';

use(nearly);


describe('bezierBezierIntersectionFast', function() {
    const psA = [[1,1],[2,2],[3,1],[1,0.5]];
    const psB = [[1,1],[2,2],[3,1],[1,0.5]];
    const xs = bezierBezierIntersectionFast(psA, psB);

    ////////////////////////////////////////////////////////////////
    // Order of any bezier < 2 -> handled by implicit version
    ////////////////////////////////////////////////////////////////
    it('it should find intersections between two coinciding points',
    function() {
        {
            const psA = [[1.021,1]];
            const psB = [[1.021,1]];
            const xs = bezierBezierIntersectionFast(psA, psB);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xs).to.be.nearly(2**4, [[0.5,0.5]]);
        }
    });

    ////////////////////////////////////////////////////////////////
    // Order 2/2
    ////////////////////////////////////////////////////////////////
    it('it should find intersections between two generic quadratic bezier curves',
    function() {
        // coinciding points
        {
            // https://www.desmos.com/calculator/bzzmvze8pz
            const psA = [[1,1],[3,2],[-1,4]];
            const psB = [[0,0],[2,1],[3,5]];
            const xs = bezierBezierIntersectionFast(psA, psB);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xs).to.be.nearly(2**4, [
                [(0.16142255626725333 + 0.16142255626730329)/2,
                 (0.4154959056656018 + 0.4154959056658596)/2],
                [(0.23384178251805765 + 0.2338417825181156)/2,
                 (0.4531565219986007 +  0.4531565219988556)/2]
            ]);
        }
    });


    ////////////////////////////////////////////////////////////////
    // Order 2/3 and 3/2
    ////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////
    // Order 3/3 and 3/3
    ////////////////////////////////////////////////////////////////
    it('it should find intersections between two generic cubic bezier curves',
    function() {
        {
            // https://www.desmos.com/calculator/5l0qqsyp1a
            const psA1 = [[-2.2355817696,1.1],[1,1],[2,1],[3,0]];
            const psB = [[2.1,3.47],[7.77,3.33],[-13.3,7.001],[6.31,-9.999]];
            const xsA1 = bezierBezierIntersectionFast(psA1, psB);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xsA1).to.be.nearly([2**20],xToTs(psA1, psB));

            // https://www.desmos.com/calculator/pjdhbdt60d
            const psA2 = [[-2.2355817695,1.1],[1,1],[2,1],[3,0]];
            expect(bezierBezierIntersectionFast(psA2, psB)).to.eql([]);

            // https://www.desmos.com/calculator/imobftrknc
            const psA3 = [[-2.2355817696,1.1],[1,1],[2,1],[3,4]];
            const xsA3 = bezierBezierIntersectionFast(psA3, psB);
            const xsA3_ = xToTs(psA3, psB);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xsA3).to.be.nearly([2**20], xsA3_);
        }

        {
            const psA = [[-2.2355817695,1.1],[1,1],[2,1],[3,0]];
            const psB = [[2.1,3.47],[7.77,3.33],[-13.3,7.001],[6.31,-9.999]];
            const xs = bezierBezierIntersectionFast(psA, psB);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xs).to.be.nearly(2**4, []);
        }

        {
            const psA = [[1,1],[2,2],[3,1],[1,0.5]];
            const psB = [[1,1],[2,2],[3,1],[1,0.5]];
            const xs = bezierBezierIntersectionFast(psA, psB);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xs).to.be.nearly(2**4, [[0,0],[1,1]]);
        }
    });

    it('it should find intersections between two cubic bezier curves with overlapping self-intersections',
    function() {
        // both bezier curves are algebraically identical and overlap at self-intersections
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

            const xs = bezierBezierIntersectionFast(psA, psB);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xs).to.be.nearly([2**4], [[0,0.5],[1,0]]);
        }
    });
});


function xToTs(
        psA: number[][],
        psB: number[][]) {

    return bezierBezierIntersection(psA, psB).map(
        x => [x.t1, x.t2]
    );
}
