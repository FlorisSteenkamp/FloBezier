import { expect, use } from 'chai';
import { bigintToExpansion } from '../../../src/intersection/get-endpoint-intersections/bigint-to-expansion.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';

use(nearly);


describe('bigintToExpansion', function() {
    it('it should ensure the bigint to Shewchuk expansion helper function return correct results',
    function() {
        {
            expect(bigintToExpansion(1n)).to.eql([1]);
            expect(bigintToExpansion(-0n)).to.eql([0]);
        }
    });
});
