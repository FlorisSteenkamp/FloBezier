import { expect } from 'chai';
import { describe } from 'mocha';
import { isCubicReallyQuad } from '../../../src/index.js';
import { getRandomCubic } from '../../helpers/get-random-bezier.js';
describe('isCubicReallyQuad', function () {
    it('it should check correctly if a cubic is really a quadratic bezier curve in disguise', function () {
        for (let i = 0; i < 100; i++) {
            const ps = getRandomCubic(i);
            expect(isCubicReallyQuad(ps)).to.be.false;
        }
        {
            const ps = [[0, 0], [1, 1], [2, 1], [3, 0]];
            expect(isCubicReallyQuad(ps)).to.be.true;
        }
        {
            const ps = [[0, 0], [1, 1], [2, 1], [3, 0.0000000000000000000000000000000000000000000000000000000000000000000001]];
            expect(isCubicReallyQuad(ps)).to.be.false;
        }
    });
});
//# sourceMappingURL=is-cubic-really-quad.spec.js.map