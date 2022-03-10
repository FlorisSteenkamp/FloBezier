import { eAdd, eCompress } from 'big-float-ts';
import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { squares } from 'squares-rng';
import { closestPointOnBezier, evaluateExact, isPointOnBezierExtension } from '../../../src/index.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomBezier } from '../../helpers/get-random-bezier.js';
import { randomRotateAndTranslate } from '../../helpers/random-rotate-and-translate.js';

use(nearly);

const eps = Number.EPSILON;


// get a random bezier curve with low number of significand bits to make it
// easier to get points *exactly* on the curve.
const getRandomBezier_ = getRandomBezier(1000_000, 37);


function getPointExactlyOnCurve(order: 0|1|2|3, seed: number) { 
    const ps = getRandomBezier_(order)(seed);
    for (let i=1; i<100; i++) {
        const t = (1 + squares(i+(101*seed))%63)/64;
        let p = evaluateExact(ps,t).map(eCompress);
        if (p[0].length === 1 && p[1].length === 1) {
            return { ps, p: [p[0][0], p[1][0]], t };
        }
    }

    throw new Error('Couldn\'t find point exactly on curve');
}


describe('isPointOnBezierExtension', function() {
	it('it should correctly check if some given points are exactly on some given bezier curves',
	function() {
		for (let order=0; order<=3; order++) {
			for (let seed=0; seed<25; seed++) {
				const { ps, p, t } = getPointExactlyOnCurve(order as 0|1|2|3, seed);
				const p1 = p.map(c => [c]);
				// add a small amount to x coordinate
				const p2 = [
					eAdd(p1[0], [eps**2]),
					p1[1]
				];

			
				expect(isPointOnBezierExtension(ps,p1)).to.be.true;
				expect(isPointOnBezierExtension(ps,p2)).to.be.false;
				

				const ps_ = randomRotateAndTranslate(0)(ps);
				const p_ = randomRotateAndTranslate(0)([p])[0];
				const p1_ = p_.map(c => [c]);
				const r_ = isPointOnBezierExtension(ps_,p1_);

				// just to test the test
				const $p1_ = p1_.map(c => c[0]);
				const $p1t_ = closestPointOnBezier(ps_,$p1_).p;
				expect($p1_).to.be.nearly(2**12,$p1t_);

				// the point is almost but not quite on the curve - it is 
				// actually possible that the point may be exactly on the
				// curve by accident
				expect(order > 0 && r_).to.be.false;  
			}
		}

		// some edge cases
		{
			const ps = [[1,1],[1,1]];
			const p = [[1],[1]];
			expect(isPointOnBezierExtension(ps,p)).to.be.true;
		}

		{
			const ps = [[1,1],[1,1],[1,1]];
			const p = [[1],[1]];
			expect(isPointOnBezierExtension(ps,p)).to.be.true;
		}

		{
			const ps = [[1,2],[3,4],[4,3],[2,1]];
			const p = [[3],[3]];
			expect(isPointOnBezierExtension(ps,p)).to.be.true;
		}

		{
			const ps = [[0,0],[1.5,1.5],[3,0]];
			const p = [[1.5],[0.7500000000001]];
			expect(isPointOnBezierExtension(ps,p)).to.be.false;
		}

		{
			const ps = [[0,0],[1.5,1.5],[3,3]];
			const p = [[1.5],[1.501]];
			expect(isPointOnBezierExtension(ps,p)).to.be.false;
		}

		{
			const ps = [[0,0],[1.5,1.5],[3,3]];
			const p = [[2],[2]];
			expect(isPointOnBezierExtension(ps,p)).to.be.true;
		}

		{
			const ps = [[1,2],[3,4],[4,3],[2,1]];
			const p = [[3],[3.01]];
			expect(isPointOnBezierExtension(ps,p)).to.be.false;
		}

		{
			const ps = [[1,1],[1,1],[1,1],[1,1]];
			const p = [[1],[1]];
			expect(isPointOnBezierExtension(ps,p)).to.be.true;
		}

		{
			const ps = [[1,1],[2,2],[3,3],[4,4]];
			const p = [[1.2],[1.2]];
			expect(isPointOnBezierExtension(ps,p)).to.be.true;
		}

		{
			const ps = [[1,1],[2,2],[3,3],[4,4],[5,6]];
			const p = [[1.2],[1.2]];
			expect(() => isPointOnBezierExtension(ps,p)).to.throw();
		}
	});
});
