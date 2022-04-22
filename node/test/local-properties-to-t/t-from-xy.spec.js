import { eCompress, eEstimate } from 'big-float-ts';
import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { squares } from 'squares-rng';
import { evaluateExact, generateSelfIntersecting, isPointOnBezierExtension, tFromXY } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomBezier } from '../helpers/get-random-bezier.js';
use(nearly);
const eps = Number.EPSILON;
// get a random bezier curve with low number of significand bits to make it
// easier to get points *exactly* on the curve.
const getRandomBezier_ = getRandomBezier(1000000, 37);
function getPointExactlyOnCurve(order, seed) {
    const ps = getRandomBezier_(order)(seed);
    for (let i = 1; i < 100; i++) {
        const t = (squares(i + (101 * seed)) % 64) / 64;
        let p = evaluateExact(ps, t);
        if (p[0].length === 1 && p[1].length === 1) {
            return { ps, p: [p[0][0], p[1][0]], t };
        }
    }
    // ignore coverage
    throw new Error('Couldn\'t find point exactly on curve');
}
describe('tFromXY', function () {
    it('it should return the correct `t` value given `x` and `y` values for some bezier curves', function () {
        {
            for (let order = 1; order <= 3; order++) {
                for (let i = 0; i <= 25; i++) {
                    const { ps, p, t: tExact } = getPointExactlyOnCurve(order, i);
                    const ris = tFromXY(ps, p);
                    // it could be > 1 but would is unlikely as it would have to be at a crunode
                    expect(ris.length).to.eql(1);
                    const ri = ris[0];
                    // again, it could be > 1 but would is unlikely as it would have to be at a crunode
                    expect(ri.multiplicity).to.eql(1);
                    const span = ri.tE - ri.tS;
                    assert(span <= 4 * eps && ri.tS <= tExact && ri.tE >= tExact, 'The `t` value is incorrect since it is not within bounds');
                }
            }
        }
        {
            const ps = getRandomBezier_(0)(0);
            const p = ps[0];
            const ris = tFromXY(ps, p);
            expect(ris).to.eql([{ tS: 0, tE: 1, multiplicity: Number.POSITIVE_INFINITY }]);
        }
        {
            const ps = [[1, 2], [3, 4], [4, 3], [2, 1], [2, 1]];
            expect(() => tFromXY(ps, [1, 2])).to.throw();
        }
        // Lines
        {
            const ps = [[1, 1], [1, 1]];
            const r = tFromXY(ps, [1, 1]);
            expect(r).to.eql([{ tS: 0, tE: 1, multiplicity: Number.POSITIVE_INFINITY }]);
        }
        {
            const ps = [[1, 1], [10, 1]];
            const r = tFromXY(ps, [2, 1]);
            expect(r[0].tS).to.be.greaterThanOrEqual(1 / 9 - 2 * eps);
            expect(r[0].tE).to.be.lessThanOrEqual(1 / 9 + 2 * eps);
        }
        {
            const ps = [[1, 1], [10, 1]];
            // the precondition isn't met to guarantee certification
            expect(tFromXY(ps, [2, 1.1])).to.eql([]);
        }
        {
            const ps = [[1, 1], [3, 3]];
            const r = tFromXY(ps, [2, 2]);
            expect(r[0].tS).to.be.greaterThanOrEqual(0.5 - 2 * eps);
            expect(r[0].tE).to.be.lessThanOrEqual(0.5 + 2 * eps);
        }
        {
            const ps = [[1, 1], [1, 3]];
            const r = tFromXY(ps, [1, 2]);
            expect(r[0].tS).to.be.greaterThanOrEqual(0.5 - 2 * eps);
            expect(r[0].tE).to.be.lessThanOrEqual(0.5 + 2 * eps);
        }
        // quadratics
        {
            const ps = [[1, 1], [10, 1], [20, 1]];
            const r = tFromXY(ps, [2, 1]);
            expect(r.length).to.eql(1);
        }
        {
            const ps = [[1, 1], [1, 10], [1, 20]];
            const r = tFromXY(ps, [1, 2]);
            expect(r.length).to.eql(1);
        }
        {
            const ps = [[1, 1], [1, 1], [1, 1]];
            const r = tFromXY(ps, [1, 1]);
            expect(r).to.eql([{ tS: 0, tE: 1, multiplicity: Number.POSITIVE_INFINITY }]);
        }
        // cubics
        {
            const ps = [[1, 1], [10, 1], [20, 1], [30, 1]];
            const r = tFromXY(ps, [2, 1]);
            expect(r.length).to.eql(1);
        }
        {
            const ps = [[1, 1], [1, 10], [1, 20], [1, 30]];
            const r = tFromXY(ps, [1, 2]);
            expect(r.length).to.eql(1);
        }
        {
            const ps = [[1, 1], [1, 1], [1, 1], [1, 1]];
            const r = tFromXY(ps, [1, 1]);
            expect(r).to.eql([{ tS: 0, tE: 1, multiplicity: Number.POSITIVE_INFINITY }]);
        }
        // self-intersecting
        {
            const t1 = 0.25;
            const t2 = 0.75;
            const ps = generateSelfIntersecting([0, 0], [3, 3], [-3, 3], [t1, t2]);
            //=> [[0,0],[3,3],[-3,3],[4.153846153846153,0]]
            // bezierSelfIntersection(ps);  // (just an estimate)
            const p1e = evaluateExact(ps, t1);
            const p1 = p1e.map(eEstimate); //=> [0.9086538461538461, 1.6875]
            // isPointOnBezierExtension(ps,p1e);  //=> true
            // isPointOnBezierExtension(ps,[[p1[0]],[p1[1]]]);  //=> true
            const p2e = evaluateExact(ps, t2);
            const p2 = p2e.map(eEstimate); //=> [0.9086538461538459, 1.6875]
            isPointOnBezierExtension(ps, p2e); //=> true
            // isPointOnBezierExtension(ps,[[p2[0]],[p2[1]]]);  //=> true
            // The results below are *certified* due to the preconditions being met.
            {
                const r = tFromXY(ps, p1);
                // @ts-ignore - otherwise TypeScript gives an error on nearly
                expect(r).to.be.nearly(2 ** 4, [
                    { tS: 0.25, tE: 0.25, multiplicity: 1 },
                    { tS: 0.75, tE: 0.75, multiplicity: 1 }
                ]);
            }
            {
                const r = tFromXY(ps, p2);
                // @ts-ignore - otherwise TypeScript gives an error on nearly
                expect(r).to.be.nearly(2 ** 4, [
                    { tS: 0.75, tE: 0.75, multiplicity: 1 }
                ]);
            }
        }
        {
            const ps = generateSelfIntersecting([27, 27], [-45, 18], [63, 27], [0.125, 0.75]);
            // [[27,27], [-45,18], [63,27], [-30.767441860468807,23.860465116278824]]
            // the intersection point is *NOT exactly* at `t === 0.25` and  `t === 0.75`
            const p1e = evaluateExact(ps, 0.125).map(eCompress);
            const p1 = p1e.map(eEstimate);
            // isPointOnBezierExtension(ps,p1e);  //=> true
            // isPointOnBezierExtension(ps,[[p1[0]],[p1[1]]]);  //=> false
            const p2e = evaluateExact(ps, 0.75).map(eCompress);
            const p2 = p2e.map(eEstimate);
            // isPointOnBezierExtension(ps,p2e);  //=> true
            // isPointOnBezierExtension(ps,[[p2[0]],[p2[1]]]);  //=> false
            // The results below are *not* certified due to the preconditions not being met.
            tFromXY(ps, p1); //=> [{ tS: 0.125, tE: 0.125, multiplicity: 1 }]
            tFromXY(ps, p2); //=> [{ tS: 0.75,  tE: 0.75,  multiplicity: 1 }]
        }
    });
});
//# sourceMappingURL=t-from-xy.spec.js.map