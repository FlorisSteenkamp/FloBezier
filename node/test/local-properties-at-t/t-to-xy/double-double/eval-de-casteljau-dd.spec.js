import { eDiff, eEstimate } from 'big-float-ts';
import { assert, use } from 'chai';
import { describe } from 'mocha';
import { evalDeCasteljauDd, evaluateExact } from '../../../../src/index.js';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
use(nearly);
const eps = Number.EPSILON;
describe('evalDeCasteljauDd', function () {
    it('it should evaluate some beziers correctly (in double-double precision) at some `t` values using De Casteljau\'s algorithm', function () {
        {
            const pss = [
                [[3, -1], [2, -1], [1, 1], [0, 0]],
                [[0, 0], [1, 1], [1, 2], [3, 2]],
                [[3, -1], [2, -1], [1, 1]],
                [[0, 0], [1, 1], [1.54, 2]],
                [[3.33, -1.1221], [2.542234, -1]],
                [[1.1111, 1.2223], [1.541, 12.3]],
            ];
            let ts = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
            for (let ps of pss) {
                for (let t of ts) {
                    let pExact = evaluateExact(ps, t);
                    let r = evalDeCasteljauDd(ps, [0, t]);
                    let rX = eEstimate(eDiff(pExact[0], r[0]));
                    let rY = eEstimate(eDiff(pExact[1], r[1]));
                    assert(rX < eps ** 2 * 2 ** 1);
                    assert(rY < eps ** 2 * 2 ** 1);
                }
            }
        }
    });
});
//# sourceMappingURL=eval-de-casteljau-dd.spec.js.map