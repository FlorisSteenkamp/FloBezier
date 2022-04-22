import { expect, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomCubic } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';
import { fitQuadsToCubic, generateCuspAtHalf3 } from "../../src/index.js";
use(nearly);
describe('fitQuadsToCubic', function () {
    it('it should approximate the given cubic bezier curve to within a given tolerance to ordered piecewise quadratic bezier curves', function () {
        {
            const ps = getRandomCubic(0);
            const r = fitQuadsToCubic(ps, 1);
            expect(r.length).to.eql(6);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(r).to.be.nearly(2 ** 10, [
                [
                    [-108.49686506776892, -13.011161175008596],
                    [-90.71420319914073, -11.747373068660183],
                    [-76.97654826353694, -8.79702038629472]
                ],
                [
                    [-76.97654826353693, -8.79702038629472],
                    [-63.23889332793313, -5.846667703929259],
                    [-52.06325549496039, -2.833658458010661]
                ],
                [
                    [-52.06325549496039, -2.833658458010661],
                    [-40.88761766198763, 0.17935078790793713],
                    [-30.79100710125259, 1.6311085849157525]
                ],
                [
                    [-30.79100710125259, 1.6311085849157525],
                    [-20.694396540517545, 3.082866381923572],
                    [-10.193823421626846, 1.3494647175566925]
                ],
                [
                    [-10.193823421626846, 1.3494647175566925],
                    [10.065827900957858, -1.3053846049451003],
                    [40.839268438525266, -26.444319847729176]
                ],
                [
                    [40.839268438525266, -26.444319847729187],
                    [71.61270897609266, -51.583255090513255],
                    [124.76385737178956, -112.1975403532909]
                ]
            ]);
            const ps_ = randomRotateAndTranslate(0)(ps);
            const r_ = fitQuadsToCubic(ps_, 1);
            expect(r_.length).to.eql(r.length);
        }
        {
            const ps = [[1, 1], [2, 2], [3, 3], [4, 4]];
            const r = fitQuadsToCubic(ps, 2 ** -10);
            expect(r.length).to.eql(1);
            expect(r).to.eql([[[1, 1], [4, 4]]]);
        }
        {
            const ps = [[1, 1], [2, 2], [3, 3]];
            expect(() => fitQuadsToCubic(ps, 2 ** -10)).to.throw();
        }
        {
            const ps = [[0, 0], [1, 1], [2, 1], [3, 0]];
            expect(fitQuadsToCubic(ps, 2 ** -10)).to.eql([
                [[0, 0], [1.5, 1.5], [3, 0]]
            ]);
        }
        {
            const ps = [[0, 0], [1, 1], [2, 1], [0, 0]];
            const r = fitQuadsToCubic(ps, 2 ** 200);
            expect(r).to.eql([
                [[0, 0], [0.84375, 0.75], [1.125, 0.75]],
                [[1.125, 0.75], [1.40625, 0.75], [0, 0]]
            ]);
        }
        {
            // Cusp
            const ps = generateCuspAtHalf3([0, 0], [3, 3], [6, 0]);
            const r = fitQuadsToCubic(ps, 2 ** -4);
            expect(r).to.eql([
                [[0, 0], [2.15625, 1.5], [2.625, 2.25]],
                [[2.625, 2.25], [3.09375, 3], [3, 3]],
                [[3, 3], [2.90625, 3], [3.375, 2.25]],
                [[3.375, 2.25], [3.84375, 1.5], [6, 0]]
            ]);
        }
        {
            // Crunode and intersecting for `t in [0,1]`
            const ps = [[0, 0], [3, 3], [-3, 3], [1, 0]];
            const r = fitQuadsToCubic(ps, 2 ** -2);
            expect(r).to.eql([
                [[0, 0], [0.25, 0.2508225375630633], [0.4210526315789474, 0.4736842105263157]],
                [[0.42105263157894735, 0.47368421052631576], [1.3744859140230856, 2.25], [0.125, 2.25]],
                [[0.125, 2.25], [-1.1244859140230847, 2.2500000000000004], [0.4210526315789451, 0.473684210526315]],
                [[0.42105263157894735, 0.4736842105263155], [0.6663924874789791, 0.25082253756306294], [1, 0]]
            ]);
        }
        {
            // Crunode but not intersecting for `t in [0,1]`
            const ps = [[0, 0], [3, 3], [-3, 3], [0, 1]];
            const r = fitQuadsToCubic(ps, 2 ** -2);
            expect(r).to.eql([
                [[0, 0], [1.6875, 2.21875], [0, 2.375]],
                [[0, 2.375], [-1.6875, 2.53125], [0, 1]]
            ]);
        }
    });
});
//# sourceMappingURL=fit-quads-to-cubic.spec.js.map