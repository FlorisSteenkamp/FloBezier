import { expect, use } from 'chai';
import { distanceBetween } from 'flo-vector2d';
import { describe } from 'mocha';
import { closestPointOnBezier, evalDeCasteljau } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomBezier, getRandomPoint } from '../../helpers/get-random-bezier.js';
use(nearly);
const getRandomBezier_ = getRandomBezier(200, 37);
describe('closestPointOnBezier', function () {
    it('it should find the closest point on some bezier curves from a given point', function () {
        for (let order = 0; order <= 3; order++) {
            for (let i = 0; i <= 0; i++) {
                const ps = getRandomBezier_(order)(i);
                const p = getRandomPoint((i + 97) * 93)[0]; // some randomish point
                const { p: bp, t } = closestPointOnBezier(ps, p);
                let pp = evalDeCasteljau(ps, t);
                // @ts-ignore - otherwise TypeScript gives an error on nearly
                expect(pp).to.be.nearly(2 ** 4, bp);
                const dClosest = distanceBetween(bp, p);
                // check against 16 other points on the bezier in [0,1]
                for (let k = 0; k < 16 + 1; k++) {
                    const t_ = k / 16;
                    const p_ = evalDeCasteljau(ps, t_);
                    const d = distanceBetween(p_, p);
                    expect(d).to.be.greaterThanOrEqual(dClosest);
                }
            }
        }
        {
            const p = [1, 1];
            const ps = [p, p, p, p, p];
            expect(() => closestPointOnBezier(ps, p)).to.throw();
        }
    });
});
//# sourceMappingURL=closest-point-on-bezier.spec.js.map