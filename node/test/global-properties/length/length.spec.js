import { describe } from 'mocha';
import { expect, use } from 'chai';
import { distanceBetween } from 'flo-vector2d';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomBezier } from '../../helpers/get-random-bezier.js';
import { evalDeCasteljau, length, totalLength } from '../../../src/index.js';
use(nearly);
function approxLengthByLineSegs(ps, pieceCount) {
    let total = 0;
    let prevP = ps[0];
    for (let i = 0; i < pieceCount; i++) {
        const t = (i + 1) / pieceCount;
        const p = evalDeCasteljau(ps, t);
        const l = distanceBetween(prevP, p);
        prevP = p;
        total += l;
    }
    return total;
}
describe('length', function () {
    it('it should return a reasonable approximate length (between two `t` values) of some cubic bezier curves', function () {
        const count = 15;
        const getRandomBezier_ = getRandomBezier(128, 53);
        for (let order = 0; order <= 3; order++) {
            for (let i = 0; i < count; i++) {
                const ps = getRandomBezier_(order)(i);
                const l1 = length([0, 0.3], ps, 1.01, 64);
                const l2 = length([0.3, 1], ps, 1.01, 64);
                const l = l1 + l2;
                const tl = totalLength(ps);
                const ll = approxLengthByLineSegs(ps, 2 ** 6);
                // @ts-ignore - otherwise TypeScript gives an error on nearly
                expect(tl).to.be.nearly(2 ** 4, l);
                // @ts-ignore - otherwise TypeScript gives an error on nearly
                expect(ll).to.be.nearly(2 ** 40, l);
            }
        }
        {
            expect(length([0, 1], [[1, 1], [1, 1]])).to.eql(0);
            expect(length([0, 1], [[1, 1], [1, 1], [1, 1]])).to.eql(0);
            expect(length([0, 1], [[1, 1], [1, 1], [1, 1], [1, 1]])).to.eql(0);
            const p = [2, 3];
            expect(() => length([0, 1], [p, p, p, p, p, p])).to.throw();
            expect(() => totalLength([p, p, p, p, p, p])).to.throw();
        }
    });
});
//# sourceMappingURL=length.spec.js.map