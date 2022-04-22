import { expect, use } from 'chai';
import { bSqrt } from '../../../src/intersection/get-endpoint-intersections/b-sqrt.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';

use(nearly);


describe('bSqrt', function() {
    it('it should ensure the bigint square root helper function return correct results',
    function() {
        {
            const a = 10n**100n + 1238972352348781232353532498239072359872359082358907532039482390230942332453245345555592341987234789234n;
            for (let i=0n+a; i<3n+a; i++) {
                const c = bSqrt(i**2n);
                expect(c).to.eql(i);
            }
        }
        {
            expect(bSqrt(11113n**2n)).to.eql(11113n);
            const c = 1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111n;
            expect(bSqrt(c**2n)).to.eql(c);
        }
        {
            expect(() =>bSqrt(-11113n)).to.throw();
        }
    });
});
