import { expect, use } from 'chai';
import { describe } from 'mocha';
import { cubicThroughPointGiven013 } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
use(nearly);
describe('cubicThroughPointGiven013', function () {
    it('should create the correct cubic though a given point given control points 0, 1 and 3 at time `t`', function () {
        expect(cubicThroughPointGiven013([[1, 1], [10.53125, 4.8125], [18, 0.5]], [14.6875, 3.34375], 0.75
        // @ts-ignore
        )).to.be.nearly(2 ** 4, [[1, 1], [10.53125, 4.8125], [13.26736111111111, 5.784722222222222], [18, 0.5]]);
    });
});
//# sourceMappingURL=cubic-through-point-given013.spec.js.map