import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { squares } from 'squares-rng';
import { evaluateExact, tFromXY } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomBezier } from '../helpers/get-random-bezier.js';

use(nearly);

const eps = Number.EPSILON;


// get a random bezier curve with low number of significand bits to make it
// easier to get points *exactly* on the curve.
const getRandomBezier_ = getRandomBezier(1000_000, 37);


function getPointExactlyOnCurve(order: 0|1|2|3, seed: number) { 
    const ps = getRandomBezier_(order)(seed);
    for (let i=1; i<100; i++) {
        const t = (squares(i+(101*seed)) % 64)/64;
        let p = evaluateExact(ps,t);
        if (p[0].length === 1 && p[1].length === 1) {
            return { ps, p: [p[0][0], p[1][0]], t };
        }
    }

    throw new Error('Couldn\'t find point exactly on curve');
}


describe('tFromXY', function() {
	it('it should ...',
	function() {
		{
            for (let order=1;order<=3;order++) {
                for (let i=0;i<=25;i++) {
                    const { ps, p, t: tExact } = getPointExactlyOnCurve(order as 0|1|2|3,i);
                    const ris = tFromXY(ps, p);
                    // it could be > 1 but would is unlikely as it would have to be at a crunode
                    expect(ris.length).to.eql(1);  
                    const ri = ris[0];
                    // again, it could be > 1 but would is unlikely as it would have to be at a crunode
                    expect(ri.multiplicity).to.eql(1);
                    const span = ri.tE - ri.tS;
                    assert(
                        span <= 4*eps && ri.tS <= tExact && ri.tE >= tExact,
                        'The `t` value is incorrect since it is not within bounds'
                    );
                }
            }
		}
		{
			const { ps, p, t: tExact } = getPointExactlyOnCurve(0,0);
			const ris = tFromXY(ps, p);
            expect(ris).to.be.undefined;
		}
	});
});
