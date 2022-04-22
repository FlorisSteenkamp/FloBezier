import { expect, use } from 'chai';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { bezierSelfIntersection, generateCuspAtHalf3 } from '../../../src/index.js';
use(nearly);
describe('bezierSelfIntersection', function () {
    it('it should calculate bezier curve self intersections accurately - case 1: cubic - no self intersection', function () {
        // https://www.desmos.com/calculator/cc94mpusot
        const ps = [[1, 1], [3, 2], [-1, 4], [0.001, 1]];
        const xs = bezierSelfIntersection(ps);
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(xs).to.be.nearly(2 ** 4, []);
    });
    it('it should calculate bezier curve self intersections accurately - case 2: cubic - self intersection', function () {
        // https://www.desmos.com/calculator/jr48w35nwg
        const ps = [[-2, 1], [3, 2], [-1, 4], [0.001, 1]];
        const xs = bezierSelfIntersection(ps);
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(xs).to.be.nearly(2 ** 4, [0.1726145107444078, 0.927437990568125]);
    });
    it('it should calculate bezier curve self intersections accurately - case 3: cubic - cusp', function () {
        // https://www.desmos.com/calculator/qdtoxoblgw
        const ps = generateCuspAtHalf3([0, 0], [3, 3], [6, 0]); //=> [[0,0],[6,4],[-0,4],[6,0]]
        const xs = bezierSelfIntersection(ps);
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(xs).to.be.nearly(2 ** 4, [0.5, 0.5]);
    });
    it('it should calculate bezier curve self intersections accurately - case 4: order < cubic', function () {
        {
            const ps = [[-2, 1], [3, 2], [-1, 4]];
            const xs = bezierSelfIntersection(ps);
            expect(xs).to.eql([]);
        }
        {
            const ps = [[-2, 1], [3, 2]];
            const xs = bezierSelfIntersection(ps);
            expect(xs).to.eql([]);
        }
        {
            const ps = [[-2, 1]];
            const xs = bezierSelfIntersection(ps);
            expect(xs).to.eql([]);
        }
    });
    it('it should calculate bezier curve self intersections accurately - special cases', function () {
        // almost explicit cubic
        {
            const ps = [[0, 0], [1, 1], [2, -1], [3.000000000000001, 1]];
            const xs = bezierSelfIntersection(ps);
            expect(xs).to.eql([]);
        }
        // exact explicit cubic
        {
            const ps = [[0, 0], [1, 1], [2, -1], [3, 1]];
            const xs = bezierSelfIntersection(ps);
            expect(xs).to.eql([]);
        }
    });
});
//# sourceMappingURL=self-intersection.spec.js.map