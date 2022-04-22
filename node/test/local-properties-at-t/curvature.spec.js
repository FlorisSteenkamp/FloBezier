import { expect, use } from 'chai';
import { describe } from 'mocha';
import { curvature, generateCuspAtHalf3 } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomBezier } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';
const abs = Math.abs;
const sqrt = Math.sqrt;
const 𝜋 = Math.PI;
use(nearly);
function radToDeg(rad) {
    return rad / (2 * 𝜋) * 360;
}
describe('curvature', function () {
    const getRandomBezier_ = getRandomBezier(128, 53)(3);
    it('it should calculate curvature accurately for some bezier curves', function () {
        {
            // let ps = [[0,0], [100,0], [90,30], [50,-100]];
            let ps = [
                [-109.39121907516179, -80.01709704474013],
                [114.4912909833927, -80.87119017934222],
                [-33.456974424761015, -83.89310877488299],
                [-127.9450032710901, -69.024121628847]
            ];
            const t = 0.35919822461037054;
            const r1 = curvature(ps, t);
            ps = randomRotateAndTranslate(0)(ps);
            const r2 = curvature(ps, t);
            const expected = 0.04118299445542509;
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(r1).to.be.nearly(2 ** 8, expected);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(r2).to.be.nearly(2 ** 8, expected);
            const r3 = curvature(ps);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(r3(t)).to.be.nearly(2 ** 8, expected);
        }
        {
            {
                const ps = generateCuspAtHalf3([0, 0], [6, 2], [3, 0]);
                const t = 0.5;
                let r = curvature(ps, t);
                // at cusp the curvature is infinite
                expect(r).to.be.NaN;
            }
        }
        {
            const ps = generateCuspAtHalf3([0, 0], [6, 2], [3, 0]);
            const t = 0.7;
            expect(curvature(ps, t)).to.eql(curvature(ps)(t));
        }
    });
});
//# sourceMappingURL=curvature.spec.js.map