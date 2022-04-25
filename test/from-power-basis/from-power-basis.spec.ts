import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { fromPowerBasis, toPowerBasis } from '../../src/index.js';


/**
 * Test `fromPowerBasis` by converting to power basis and then back to 
 * Bernstein basis and checking the error is small enough.
 * 
 * @param ps a bezier curve
 */
function testFromPowerBasis(ps: number[][]) {
    const xy = toPowerBasis(ps);
    const ps_ = fromPowerBasis(xy);

    let maxAbsCoeff = 0;
    for (let i=0; i<ps.length; i++) {
        const p = ps[i];
        for (let j=0; j<ps.length; j++) {
            let c = p[j];
            if (Math.abs(c) > maxAbsCoeff) {
                maxAbsCoeff = Math.abs(c);
            }
        }
    }

    for (let i=0; i<ps.length; i++) {
        const p = ps[i];
        const p_ = ps_[i];
        for (let j=0; j<p.length; j++) {
            let c = p[j];
            let c_ = p_[j];

            let relError = Math.abs(c - c_) / maxAbsCoeff;

            // less than 5 ulps of error
            assert(relError < Number.EPSILON * 2**5);
        }
    }
}


describe('fromPowerBasis', function() {
    it('it should correctly convert from power basis to Bernstein basis', 
	function() {
        {
            const pss = [
                [[3,3]],  // a point
                [[3,5],[7,1]],  // line
                [[1,1],[5,7],[3,4]], // quadratic 
                [[1,1],[5,7],[3,5],[4,7]], // cubic
                [[3.11,5.11],[7.11,1.11]],  // line
                [[1.33,1.33],[5.33,7.33],[3.33,4.33]], // quadratic 
                [[1.31,1.31],[5.31,7.21],[3.27,5.27],[4.27,7.27]], // cubic
            ];

            for (let ps of pss) {
                testFromPowerBasis(ps);
            }
        }
    });

    it('it should throw for invalid input', 
    function() {
        expect(() => fromPowerBasis([[]])).to.throw();
    });
});
