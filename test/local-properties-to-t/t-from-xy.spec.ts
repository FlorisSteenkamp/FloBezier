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
	it('it should return the correct `t` value given `x` and `y` values for some bezier curves',
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

        {
            const ps = [[1,2],[3,4],[4,3],[2,1],[2,1]];
            expect(() => tFromXY(ps,[1,2])).to.throw();
        }

        // Lines
        {
            const ps = [[1,1],[1,1]];
            const r = tFromXY(ps,[1,1]);
            expect(r).to.be.undefined;
        }

        {
            const ps = [[1,1],[10,1]];
            const r = tFromXY(ps,[2,1]);
            expect(r[0].tS).to.be.greaterThanOrEqual(1/9 - 2*eps);
            expect(r[0].tE).to.be.lessThanOrEqual(1/9 + 2*eps);
        }

        {
            const ps = [[1,1],[10,1]];
            // the precondition isn't met to guarantee certification
            expect(tFromXY(ps,[2,1.1])).to.eql([]);
        }
        
        {
            const ps = [[1,1],[3,3]];
            const r = tFromXY(ps,[2,2]);
            expect(r[0].tS).to.be.greaterThanOrEqual(0.5 - 2*eps);
            expect(r[0].tE).to.be.lessThanOrEqual(0.5 + 2*eps);
        }

        {
            const ps = [[1,1],[1,3]];
            const r = tFromXY(ps,[1,2]);
            expect(r[0].tS).to.be.greaterThanOrEqual(0.5 - 2*eps);
            expect(r[0].tE).to.be.lessThanOrEqual(0.5 + 2*eps);
        }

        // quadratics
        {
            const ps = [[1,1],[10,1], [20,1]];
            const r = tFromXY(ps,[2,1]);
            expect(r.length).to.eql(1);
        }

        {
            const ps = [[1,1],[1,10],[1,20]];
            const r = tFromXY(ps,[1,2]);
            expect(r.length).to.eql(1);
        }
        
        {
            const ps = [[1,1],[1,1],[1,1]];
            const r = tFromXY(ps,[1,1]);
            expect(r).to.undefined;
        }

        // cubics
        {
            const ps = [[1,1],[10,1],[20,1],[30,1]];
            const r = tFromXY(ps,[2,1]);
            expect(r.length).to.eql(1);
        }

        {
            const ps = [[1,1],[1,10],[1,20],[1,30]];
            const r = tFromXY(ps,[1,2]);
            expect(r.length).to.eql(1);
        }
        
        {
            const ps = [[1,1],[1,1],[1,1],[1,1]];
            const r = tFromXY(ps,[1,1]);
            expect(r).to.undefined;
        }
	});
});
