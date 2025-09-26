import { assert, expect, use } from 'chai';
import { describe } from 'mocha';
import { generateCuspAtHalf3 } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';

use(nearly);


describe('generateCuspAtHalf3', function() {
    it('it should generate the correct cubic curve with a cusp at `t === 0.5`', 
	function() {
        // @ts-ignore - otherwise TypeScript gives an error on nearly
        expect(generateCuspAtHalf3([0,0], [2,2], [3,0])).to.be.nearly(2**4,
            [
                [0,0],
                [3.6666666666666666, 2.6666666666666666],
                [0.6666666666666666, 2.6666666666666666],
                [3,0]
            ]
        );
    });
});
