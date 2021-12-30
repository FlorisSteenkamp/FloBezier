import { expect, assert, use } from 'chai';
import { fromTo } from 'flo-vector2d';
import { describe } from 'mocha';
import { getInterfaceRotation } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomQuad } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';

use(nearly);

const 𝜋 = Math.PI;
const abs = Math.abs;


function getRotationAround(ps: number[][]) {
	let total = 0;
	for (let i=0; i<ps.length; i++) {
		const pa = ps[i];
		const pb = ps[(i+1)%ps.length];
		const pc = ps[(i+2)%ps.length];
		const v1 = fromTo(pa,pb);
		const v2 = fromTo(pb,pc);
		const r = getInterfaceRotation(v1,v2);
		total += r;
	}

	return total;
}


describe('getInterfaceRotation', function() {
	it('it should ...',
	function() {
		for (let seed=0; seed<5; seed++) {
			const ps = getRandomQuad(seed);  // representing a triangle
			const r = getRotationAround(ps);
			expect(abs(r)).to.be.nearly(2**4, 2*𝜋);
		}

		for (let seed=0; seed<5; seed++) {
			const ps = [...getRandomCubic(seed), ...getRandomCubic(seed)];
			const ps_ = randomRotateAndTranslate(seed)(ps);

			const r = getRotationAround(ps);
			const r_ = getRotationAround(ps_);
			
			expect(r).to.be.nearly([2**6], r_);
		}
	});
});
