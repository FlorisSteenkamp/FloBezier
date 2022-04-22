import { expect } from 'chai';
import { describe } from 'mocha';
import { getControlPointBox } from '../../../src/index.js';
import { getRandomCubic } from '../../helpers/get-random-bezier.js';
describe('getControlPointBox', function () {
    it('it should get the correct control point bounding box for some cubic beziers', function () {
        const ps0 = getRandomCubic(0);
        const box = getControlPointBox(ps0);
        expect(box).to.be.eql([
            [-108.49686506776892, -112.1975403532909],
            [124.76385737178956, 52.32750125849648]
        ]);
    });
});
//# sourceMappingURL=get-control-point-box.spec.js.map