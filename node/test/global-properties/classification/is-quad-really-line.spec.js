import { expect } from 'chai';
import { describe } from 'mocha';
import { getRandomQuad } from '../../helpers/get-random-bezier.js';
import { isQuadReallyLine } from '../../../src/index.js';
describe('isQuadReallyLine', function () {
    it('it should check correctly if a quadratic bezier is really a line in disguise', function () {
        for (let i = 0; i < 100; i++) {
            const ps = getRandomQuad(i);
            expect(isQuadReallyLine(ps)).to.be.false;
        }
        {
            const ps = [[0, 0], [1, 1], [2, 2]];
            expect(isQuadReallyLine(ps)).to.be.true;
        }
        {
            const ps = [[0, 0], [1, 1], [3, 3]];
            expect(isQuadReallyLine(ps)).to.be.false;
        }
        {
            const ps = [[0, 0], [1, 1], [2, 2.000000000000001]];
            expect(isQuadReallyLine(ps)).to.be.false;
        }
    });
});
//# sourceMappingURL=is-quad-really-line.spec.js.map