import { expect } from 'chai';
import { describe } from 'mocha';
import { isCollinear, isHorizontal, isVertical } from '../../../src/index.js';
import { getRandomBezier, getRandomLine } from '../../helpers/get-random-bezier.js';
const eps = Number.EPSILON;
const u = eps / 2;
function getCollinearQuad(seed) {
    const ps = getRandomBezier(128, 52)(2)(seed);
    ps[1][0] = (ps[0][0] + ps[2][0]) / 2;
    ps[1][1] = (ps[0][1] + ps[2][1]) / 2;
    return ps;
}
describe('isCollinear', function () {
    it('it should correctly check that some beziers have all control points collinear', function () {
        {
            const ps = [[1, 1]];
            expect(isCollinear(ps)).to.be.true;
            ps[0][0] = ps[0][0] * (1 + eps);
            expect(isCollinear(ps)).to.be.true;
        }
        {
            const ps = [[1, 1], [2, 2]];
            expect(isCollinear(ps)).to.be.true;
            ps[0][0] = ps[0][0] * (1 + eps);
            expect(isCollinear(ps)).to.be.true;
        }
        {
            const ps = [[1, 1], [2, 2], [4, 4]];
            expect(isCollinear(ps)).to.be.true;
            ps[0][0] = ps[0][0] * (1 + eps);
            expect(isCollinear(ps)).to.be.false;
        }
        {
            const ps = [[1, 1], [2, 2], [4, 4], [8.5, 8.5]];
            expect(isCollinear(ps)).to.be.true;
            ps[0][0] = ps[0][0] * (1 + eps);
            expect(isCollinear(ps)).to.be.false;
        }
        {
            const ps = getCollinearQuad(11);
            expect(isCollinear(ps)).to.be.true;
            ps[0][0] = ps[0][0] * (1 + eps);
            expect(isCollinear(ps)).to.be.false;
        }
        {
            const ps = [[1, 1], [2, 2], [4, 4], [8.5, 8.5], [1, 1]];
            expect(() => isCollinear(ps)).to.throw();
        }
        // actual lines
        for (let i = 0; i < 10; i++) {
            const ps = getRandomLine(i);
            expect(isCollinear(ps)).to.be.true;
        }
        // points
        for (let i = 0; i < 10; i++) {
            const ps = getRandomLine(i);
            expect(isCollinear([ps[0]])).to.be.true;
        }
        // quadratic curves
        for (let i = 0; i < 100; i++) {
            const ps = getCollinearQuad(i);
            const res = isCollinear(ps);
            expect(res).to.be.true;
        }
    });
});
describe('isVertical', function () {
    it('it should correctly check that some bezier control points are collinear and vertical', function () {
        expect(isVertical([[1, 0], [1, 20]])).to.be.true;
        expect(isVertical([[1, 0], [1.0000000001, 20]])).to.be.false;
        expect(isVertical([[1, 0], [1, 1], [1, 20]])).to.be.true;
    });
});
describe('isHorizontal', function () {
    it('it should correctly check that some bezier control points are collinear and horizontal', function () {
        expect(isHorizontal([[0, 1], [20, 1]])).to.be.true;
        expect(isHorizontal([[0, 1], [20, 1.00001]])).to.be.false;
        expect(isHorizontal([[0, 1], [1, 1], [20, 1]])).to.be.true;
    });
});
//# sourceMappingURL=is-collinear.spec.js.map