import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { toString } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';
import { getRandomBezier, getRandomCubic } from '../helpers/get-random-bezier.js';

use(nearly);


describe('toString', function() {
	it('should correctly convert some bezier curves to a string representation',
	function() {
        {
            let ps = getRandomBezier(111,53)(3)(111);//?
            const str = toString(ps);//?

            expect(str).to.be.eql('[[-14.878605829961458,89.67146996556471],[-61.585825159466665,49.30543474305688],[98.8187776673874,-6.765616949577037],[-103.41331953825963,-14.77320899071367]]');
        }
        {
            let ps = getRandomBezier(111,53)(2)(111);
            const str = toString(ps);

            expect(str).to.be.eql('[[-14.878605829961458,89.67146996556471],[-61.585825159466665,49.30543474305688],[98.8187776673874,-6.765616949577037]]');
        }
        {
            let ps = getRandomBezier(111,53)(1)(111);
            const str = toString(ps);

            expect(str).to.be.eql('[[-14.878605829961458,89.67146996556471],[-61.585825159466665,49.30543474305688]]');
        }
        {
            let ps = getRandomBezier(111,53)(0)(111);
            const str = toString(ps);

            expect(str).to.be.eql('[[-14.878605829961458,89.67146996556471]]');
        }
	});
});
