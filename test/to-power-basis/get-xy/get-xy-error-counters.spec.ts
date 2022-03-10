import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomBezier } from '../../helpers/get-random-bezier.js';
import { γ, getXYExact, getXYErrorCounters, getXY, getXYWithRunningError } from '../../../src/index.js';
import { allTrue, mapDouble, mapDoubleToShewchuk, mapShewchukToAbsDouble, subtractShewchuk } from '../../helpers/map.js';
import { squares4 } from 'squares-rng';

use(nearly);

const abs = Math.abs;
const γ1 = γ(1);
const compareErrors = mapDouble((eActual, eBound) => abs(eActual) <= eBound);
const getRandomBezier_ = getRandomBezier(128, 53);


describe('getXYWithRunningError', function() {
	it('it should get the the power basis representation error bound counters of some bezier curves (in double precision)',
	function() {
		{
			let k = 0;
			for (let i=0; i<=3; i++) {
				for (let j=0; j<25; j++) {
					const _ps = getRandomBezier_(i as 0|1|2|3)(j);
					// shift bits to ensure better testing range
					const ps = _ps.map(p => p.map(c => c**((squares4(k++) % 200) - 100)));
					const errorCounters = getXYErrorCounters(ps);
					let errorBound: number[][];
					switch (i) {
						case 3: errorBound = [
							[
								3*γ1*errorCounters[0][0],
								3*γ1*errorCounters[0][1],
								2*γ1*errorCounters[0][2],
								0
							],
							[
								3*γ1*errorCounters[1][0],
								3*γ1*errorCounters[1][1],
								2*γ1*errorCounters[1][2],
								0
							]
						]; break;
						case 2: errorBound = [
							[
								2*γ1*errorCounters[0][0],
								1*γ1*errorCounters[0][1],
								0
							],
							[
								2*γ1*errorCounters[1][0],
								1*γ1*errorCounters[1][1],
								0
							]
						]; break;
						case 1: errorBound = [
							[γ1*errorCounters[0][0], 0],
							[γ1*errorCounters[1][0], 0]
						]; break;
						case 0: errorBound = [[0],[0]]; break;
					}

					//--- Compare with running error bound (that is usually slightly better)
					// const { errorBound: _errorBound } = getXYWithRunningError(ps);
					// const errorBoundRunning = _errorBound.map((err: number[]) => err.map(e => γ1*e));
					//----------------------------------------------------------------------

					const xy = getXY(ps);
					const rD = mapDoubleToShewchuk(xy) as number[][][];
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
			expect(() => getXYErrorCounters(ps)).to.throw();
		}
	});
});
