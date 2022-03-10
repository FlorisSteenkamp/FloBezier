import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomBezier } from '../../../helpers/get-random-bezier.js';
import { γγ, getXYExact, getXYDdWithRunningError } from '../../../../src/index.js';
import { allTrue, mapDouble, mapShewchukToAbsDouble, subtractShewchuk } from '../../../helpers/map.js';
import { squares } from 'squares-rng';

use(nearly);

const abs = Math.abs;
const γγ3 = γγ(3);
const compareErrors = mapDouble((eActual, eBound) => abs(eActual) <= eBound);
const getRandomBezier_ = getRandomBezier(128, 53);


describe('getXYDdWithRunningError', function() {
	it('it should get the the power basis representation (and a running error bound) of some bezier curves (in double-double precision)',
	function() {
		{
			let k = 0;
			for (let i=0; i<=3; i++) {
				for (let j=0; j<25; j++) {
					const _ps = getRandomBezier_(i as 0|1|2|3)(j);
					// shift bits to ensure better testing range
					const ps = _ps.map(p => p.map(c => c**((squares(k++) % 200) - 100)));
					const { coeffs: rDd, errorBound: _errorBound } = getXYDdWithRunningError(ps);
					const errorBound = _errorBound.map((err: number[]) => err.map(e => γγ3*e));
					const rE = getXYExact(ps);

					const errorActual = mapShewchukToAbsDouble(subtractShewchuk(rDd, rE)) as number[][];
					const allWithinBounds = allTrue(compareErrors(errorActual, errorBound));

					assert(allWithinBounds, 'Error not within error bound');
				}
			}
		}
		
		// some edge cases
		{
			const p = [1,1];
			const ps = [p,p,p,p,p];
			expect(() => getXYDdWithRunningError(ps)).to.throw();
		}
	});
});
