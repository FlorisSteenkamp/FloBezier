import { expect, use } from 'chai';
import { eEstimate } from 'big-float-ts';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { bezierBezierIntersectionFast, circleBezierIntersection, evaluateExact } from '../../src/index.js';

use(nearly);


describe('circleBezierIntersection', function() {
    it('it should find intersections between a circle and a generic cubic bezier curve',
    function() {
        // https://www.desmos.com/calculator/we4pdcrct1
        const ps = [[1,1],[3,2],[-1,4],[0.001,1]];
        const xs = circleBezierIntersection({ center: [1,1], radius: 1}, ps);
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(xs).to.be.nearly(2**4, [
            { 
                p: [1.5490437968684103,1.8357935804493355],
                t: 0.2476449840688787,
                ri: { tS: 0.24764498406887858, tE: 0.2476449840688788, multiplicity: 1 },
                box: [[1.5490437968684045,1.83579358044933],[1.549043796868416,1.835793580449341]]
            },
            { 
                p: [0.000004460905447700725, 1.0029869367239488],
                t: 0.9996679343869085,
                ri: { tS: 0.9996679343869084, tE: 0.9996679343869086, multiplicity: 1 },
                box: [[0.000004460905395998172,1.0029869367238924],[0.000004460905499403278,1.0029869367240052]]
            }
        ]);
    });

    it('it should find intersections between a circle and a generic quadratic bezier curve',
    function() {
        {
            // https://www.desmos.com/calculator/q5gfcyfcgu
            const ps = [[1,1],[3,2],[-1,4]];
            const xs = circleBezierIntersection({ center: [1,1], radius: 1}, ps);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xs).to.be.nearly(2**4, [
                {
                    p: [1.665813344405709,1.7461183487968142],
                    t: 0.32140771482416214,
                    ri: { tS: 0.321407714824162, tE: 0.32140771482416225, multiplicity: 1 },
                    box: [[1.6658133444057064,1.7461183487968117],[1.6658133444057117,1.7461183487968168]]
                }
            ]);
        }
        {
            // https://www.desmos.com/calculator/uw0onkhvxx
            const ps = [[1,1],[2,1.5],[3,2]];
            const xs = circleBezierIntersection({ center: [1,1], radius: 1}, ps);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xs).to.be.nearly(2**4, [
                { 
                    p: [1.894427190999916,1.4472135954999579],
                    t: 0.4472135954999579,
                    ri: { tS: 0.4472135954999579, tE: 0.44721359549995815, multiplicity: 1 },
                    box: [[1.8944271909999129,1.4472135954999554],[1.894427190999919,1.4472135954999605]]
                }
            ]);
        }
    });

    it('it should find intersections between a circle and line',
    function() {
        // https://www.desmos.com/calculator/uw0onkhvxx
        const ps = [[1,1],[3,2]];
        const xs = circleBezierIntersection({ center: [1,1], radius: 1}, ps);
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(xs).to.be.nearly(2**4, [
            {
                p: [1.894427190999916,1.4472135954999579],
                t: 0.44721359549995804,
                ri: { tS: 0.4472135954999579, tE: 0.44721359549995815, multiplicity: 1 },
                box: [[1.8944271909999149,1.447213595499957],[1.894427190999917,1.447213595499959]]
            }
        ]);
    });

    it('it should throw when the given bezier curve is a point',
    function() {
        {
            // Points are not currently supported.
            const ps = [[1,1]];
            expect(() => circleBezierIntersection({ center: [1,1], radius: 1}, ps)).to.throw();
        }
        {
            // Degenerate points are supported.
            const ps = [[1,1],[1,1]];
            const xs = circleBezierIntersection({ center: [1,1], radius: 1}, ps);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xs).to.be.nearly(2**4, []);
        }
        {
            // Degenerate points are supported.
            const ps = [[2,1],[2,1]];
            const xs = circleBezierIntersection({ center: [1,1], radius: 1}, ps);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xs).to.be.nearly(2**4, [
                {
                    p: [2,1],
                    t: 0.5,
                    ri: { tS: 0, tE: 1, multiplicity: Number.POSITIVE_INFINITY },
                    box: [[2,1],[2,1]]
                }
            ]);
        }
    });
});
