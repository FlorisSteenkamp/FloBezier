import { expect, use } from 'chai';
import { describe } from 'mocha';
import { toExpansion } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomCubic } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';
use(nearly);
describe('toExpansion', function () {
    it('it should convert some given bezier curves so their control point coordinates are Shewchuk expansions', function () {
        {
            let ps = getRandomCubic(0);
            ps = randomRotateAndTranslate(0)(ps);
            const r = toExpansion(ps);
            expect(r).to.be.eql(ps.map(p => p.map(c => [c])));
        }
    });
});
//# sourceMappingURL=to-expansion.spec.js.map