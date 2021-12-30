import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { getTAtLength, length } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../helpers/random-rotate-and-translate.js';

use(nearly);


describe('getTAtLength', function() {
	it('it should ...',
	function() {
        {
            // test zero length
            const s = 0;
            const ps = getRandomCubic(0);
            const r = getTAtLength(ps,s);
            expect(r).to.be.eql(0);
        }
        {
            // test length is larger than bezier's length
            const s = 1000;
            const ps = getRandomCubic(0);
            const r = getTAtLength(ps,s);
            const tUpperLimit = 1.125;
            expect(r).to.be.eql(tUpperLimit);
        }
		{
			const ps = getRandomCubic(0);
            const s = 0.30001;
			const t = getTAtLength(ps,s);
			const expectedT = 0.0009136549141963331;
			expect(t).to.be.nearly(2**8, expectedT);

			const ps_ = randomRotateAndTranslate(0)(ps);
			const t_ = getTAtLength(ps_,s);
			expect(t_).to.be.nearly(2**10,t);

            const sReal = length([0,expectedT],ps);
            expect(sReal).to.be.nearly(2**10,s)
		}
		{
			const ps = getRandomQuad(0);
            const s = 0.30001;
			const t = getTAtLength(ps,s);
			const expectedT = 0.0013704781220274396;
			expect(t).to.be.nearly(2**8, expectedT);

			const ps_ = randomRotateAndTranslate(0)(ps);
			const t_ = getTAtLength(ps_,s);
			expect(t_).to.be.nearly(2**10,t);

            const sReal = length([0,expectedT],ps);
            expect(sReal).to.be.nearly(2**10,s)
		}
		{
			const ps = getRandomLine(0);
            const s = 0.30001;
			const t = getTAtLength(ps,s);
			const expectedT = 0.0027409356359999254;
			expect(t).to.be.nearly(2**8, expectedT);

			const ps_ = randomRotateAndTranslate(0)(ps);
			const t_ = getTAtLength(ps_,s);
			expect(t_).to.be.nearly(2**10,t);

            const sReal = length([0,expectedT],ps);
            expect(sReal).to.be.nearly(2**10,s)
		}
	});
});
