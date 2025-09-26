import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { quadraticToPolyline } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';

use(nearly);

describe('quadToPolyline', function() {
	it('it should approximate some quadratic bezier curves with polylines',
	function() {
		{
			// let ps = getRandomQuad(0);
			const ps = [[0,0],[1,1],[2,0]];
			const r = quadraticToPolyline(ps, 0.01);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r).to.be.nearly(2**8, [
				[0, 0],
				[0.25, 0.21875],
				[0.5, 0.375],
				[0.75, 0.46875],
				[1, 0.5],
				[1.25, 0.46875],
				[1.5, 0.375],
				[1.75, 0.21875],
				[2, 0]
			]);

			const ps_ = randomRotateAndTranslate(0)(ps);
			const r_ = quadraticToPolyline(ps_, 0.01);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(r_).to.be.nearly(2**8, [
				[-8.476317583419448, -1.0164969667975465],
				[-8.638609461980927, -1.306346770407945],
				[-8.821835062293783, -1.5373065978455183],
				[-9.025994384358015, -1.7093764491102665],
				[-9.251087428173626, -1.8225563242021898],
				[-9.497114193740614, -1.8768462231212881],
				[-9.764074681058982, -1.8722461458675614],
				[-10.051968890128727, -1.8087560924410098],
				[-10.360796820949847, -1.6863760628416329]
			])
		}
	});
});
