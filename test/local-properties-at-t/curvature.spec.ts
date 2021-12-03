import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { getDxy, getDdxy, curvature } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { Horner } from 'flo-poly';
import { getRandomBezier } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate';


const abs = Math.abs;
const sqrt = Math.sqrt;
const 𝜋 = Math.PI;

use(nearly);


function radToDeg(rad: number): number {
	return rad / (2*𝜋) * 360;
}


describe('curvature', function() {
    const getRandomBezier_ = getRandomBezier(128, 53)(3);

	it('it should calculate curvature accurately for some bezier curves',
	function() {
        // let ps = [[0,0], [100,0], [90,30], [50,-100]];
        let ps = [ 
            [-109.39121907516179, -80.01709704474013],
            [114.4912909833927, -80.87119017934222],
            [-33.456974424761015, -83.89310877488299],
            [-127.9450032710901, -69.024121628847]
        ];

        const t = 0.35919822461037054;

        const c = curvature(ps, t);

        ps = randomRotateAndTranslate(0)(ps);

        const d = curvature(ps, t);

        expect(c).to.be.nearly(2**8, 0.04118299445542509);
        expect(d).to.be.nearly(2**8, 0.04118299445542509);
	});
});
