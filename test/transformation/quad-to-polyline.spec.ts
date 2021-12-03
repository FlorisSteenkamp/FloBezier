import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { quadToPolyline } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomBezier, getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';

use(nearly);

describe('quadToPolyline', function() {
	it('it should approximate some quadratic bezier curves with polylines',
	function() {
		{
			// let ps = getRandomQuad(0);
			const ps = [[0,0],[1,1],[2,0]];
			const r = quadToPolyline(ps, 0.01);
			expect(r).to.be.nearly(2**8, [
				[ 0, 0 ],
				[ 0.25, 0.21875 ],
				[ 0.5, 0.375 ],
				[ 0.75, 0.46875 ],
				[ 1, 0.5 ],
				[ 1.25, 0.46875 ],
				[ 1.5, 0.375 ],
				[ 1.75, 0.21875 ],
				[ 2, 0 ]
			]);

			const ps_ = randomRotateAndTranslate(0)(ps);
			const r_ = quadToPolyline(ps_, 0.01);
			expect(r_).to.be.nearly(2**8, [
				[ 6.925014568708141, -8.28029043932452 ],
				[ 7.252317237120159, -8.223505531555178 ],
				[ 7.547109473377675, -8.22009966275365 ],
				[ 7.809391277480687, -8.270072832919938 ],
				[ 8.039162649429198, -8.373425042054041 ],
				[ 8.236423589223206, -8.530156290155958 ],
				[ 8.40117409686271, -8.74026657722569 ],
				[ 8.533414172347715, -9.003755903263237 ],
				[ 8.633143815678215, -9.320624268268599 ]
			])
		}
	});
});
