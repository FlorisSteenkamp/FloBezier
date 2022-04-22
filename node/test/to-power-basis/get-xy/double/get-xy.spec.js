import { expect, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';
import { getXY } from '../../../../src/index.js';
use(nearly);
describe('getXY', function () {
    it('it should get the the power basis representation of some bezier curves (in double precision)', function () {
        {
            const ps = getRandomCubic(0);
            const r = getXY(ps);
            const expected = [
                [253.09693105379824, -306.3361182861487, 286.49990967190894, -108.49686506776892],
                [-277.14696746050817, 159.90518926393648, 18.05539901828938, -13.011161175008596]
            ];
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(r).to.be.nearly(2 ** 8, expected);
        }
        {
            const ps = getRandomQuad(0);
            const r = getXY(ps);
            const expected = [
                [-102.11203942871623, 190.99993978127262, -108.49686506776892],
                [53.30172975464549, 12.036932678859586, -13.011161175008596]
            ];
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(r).to.be.nearly(2 ** 8, expected);
        }
        {
            const ps = getRandomLine(0);
            const r = getXY(ps);
            const expected = [
                [95.49996989063631, -108.49686506776892],
                [6.018466339429793, -13.011161175008596]
            ];
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(r).to.be.nearly(2 ** 8, expected);
        }
        {
            const ps = getRandomPoint(0);
            const r = getXY(ps);
            const expected = [[-108.49686506776892], [-13.011161175008596]];
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(r).to.be.nearly(2 ** 8, expected);
        }
        // some edge cases
        {
            const p = [1, 1];
            const ps = [p, p, p, p, p];
            expect(() => getXY(ps)).to.throw();
        }
    });
});
//# sourceMappingURL=get-xy.spec.js.map