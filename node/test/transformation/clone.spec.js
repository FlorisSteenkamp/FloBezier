import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { clone } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomBezier } from '../helpers/get-random-bezier.js';
use(nearly);
describe('clone', function () {
    it('should deep clone some bezier curves, i.e. create an identical bezier but with a different reference', function () {
        for (let order = 0; order <= 3; order++) {
            for (let j = 0; j < 5; j++) {
                let ps = getRandomBezier(111, 53)(order)(j);
                const ps_ = clone(ps);
                assert(ps_ !== ps);
                for (let i = 0; i < ps.length; i++) {
                    const p = ps[i];
                    const p_ = ps_[i];
                    assert(p !== p_);
                }
                expect(ps_).to.be.eql(ps);
            }
        }
    });
});
//# sourceMappingURL=clone.spec.js.map