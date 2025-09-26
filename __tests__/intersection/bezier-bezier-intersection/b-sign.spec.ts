import { expect, use } from 'chai';
import { bSign } from '../../../src/intersection/get-endpoint-intersections/b-sign.js';
import { nearly } from '../../helpers/chai-extend-nearly.js';

use(nearly);


describe('bSign', function() {
    it('it should ensure the bigint sign helper function return correct results',
    function() {
        expect(bSign(2n)).to.eql(1n);
        expect(bSign(-2n)).to.eql(-1n);
        expect(bSign(-0n)).to.eql(0n);
        expect(bSign(0n)).to.eql(0n);
    });
});
