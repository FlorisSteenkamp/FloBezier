import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { squares } from "squares-rng";
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomBezier } from '../../../helpers/get-random-bezier.js';
import { γ, getXYExact, getXYWithRunningError } from '../../../../src/index.js';
import { allTrue, mapDouble, mapDoubleToShewchuk, mapShewchukToAbsDouble, subtractShewchuk } from '../../../helpers/map.js';

use(nearly);

const abs = Math.abs;
const γ1 = γ(1);
const compareErrors = mapDouble((eActual, eBound) => abs(eActual) <= eBound);
const getRandomBezier_ = getRandomBezier(128, 53);


describe('getXYWithRunningError', function() {
	it('it should get the the power basis representation (and a running error bound) of some bezier curves (in double precision)',
	function() {
		{
			let k = 0;
			for (let i=0; i<=3; i++) {
				for (let j=0; j<25; j++) {
					const _ps = getRandomBezier_(i as 0|1|2|3)(j);
					// shift bits to ensure better testing range
					const ps = _ps.map(p => p.map(c => c**((squares(k++) % 200) - 100)));
					const { coeffs, errorBound: _errorBound } = getXYWithRunningError(ps);
					const errorBound = _errorBound.map((err: number[]) => err.map(e => γ1*e));
					const rD = mapDoubleToShewchuk(coeffs) as number[][][];
					const rE = getXYExact(ps);

					const errorActual = mapShewchukToAbsDouble(subtractShewchuk(rD, rE)) as number[][];
					const allWithinBounds = allTrue(compareErrors(errorActual, errorBound));

					assert(allWithinBounds, 'Error not within error bound');
				}
			}
		}

		// some edge cases
		{
			const p = [1,1];
			const ps = [p,p,p,p,p];
			expect(() => getXYWithRunningError(ps)).to.throw();
		}
	});
});
