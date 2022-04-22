import { expect } from 'chai';
import { describe } from 'mocha';
import { equal } from '../../src/index.js';
import { getRandomBezier } from '../helpers/get-random-bezier.js';
const getRandomBezier_ = getRandomBezier(200, 37);
describe('equal', function () {
    it('it should correctly test whether two bezier curves are identical or not', function () {
        for (let order = 0; order <= 3; order++) {
            for (let i = 0; i <= 3; i++) {
                const ps1 = getRandomBezier_(order)(i);
                const ps2 = getRandomBezier_(order)(i);
                const ps3 = getRandomBezier_(order)(i + 1);
                expect(ps1).to.eql(ps2);
                expect(equal(ps1, ps2)).to.be.true;
                expect(ps1).not.to.eql(ps3);
                expect(equal(ps1, ps3)).to.be.false;
            }
        }
        // some edge cases
        {
            const ps1 = getRandomBezier_(3)(10);
            const ps2 = ps1;
            expect(equal(ps1, ps2)).to.be.true;
        }
        {
            const ps1 = getRandomBezier_(3)(10);
            const ps2 = ps1;
            expect(equal(ps1, [...ps2, [1, 1]])).to.be.false;
        }
    });
});
//# sourceMappingURL=equal.spec.js.map