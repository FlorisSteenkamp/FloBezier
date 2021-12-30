import { eAdd } from 'big-float-ts';
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
        let p = evaluateExact(ps,t);
        if (p[0].length === 1 && p[1].length === 1) {
            return { ps, p: [p[0][0], p[1][0]], t };
        }
    }

    throw new Error('Couldn\'t find point exactly on curve');
}


describe('isPointOnBezierExtension', function() {
	it('it should ...',
	function() {
		{
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
		}
	});
});

