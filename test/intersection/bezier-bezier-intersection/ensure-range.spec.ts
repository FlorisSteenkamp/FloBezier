import { expect, use } from 'chai';
import { ensureRange } from '../../../src/intersection/get-endpoint-intersections/ensure-range.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';

use(nearly);


describe('ensureRange', function() {
    it('it should ensure the `ensureRange` helper function return correct results',
    function() {
        expect(ensureRange(1,-1)).to.eql(0.9999999999999999);
        expect(ensureRange(1.0001,-1)).to.eql(0.9999999999999999);
        expect(ensureRange(1.0001,1)).to.eql(1.0001);
        expect(ensureRange(0.9999999999999,1)).to.eql(1.0000000000000002);
        expect(ensureRange(0.9999999999999,0)).to.eql(1);
        expect(ensureRange(1.0000000000000002,0)).to.eql(1);
    });
});
