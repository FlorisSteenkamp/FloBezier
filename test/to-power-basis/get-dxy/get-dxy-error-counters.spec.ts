import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomQuad } from '../../helpers/get-random-bezier.js';
import { γ, γγ } from '../../../src/error-analysis/error-analysis.js';
import { getDxy, getDxyDd, getDxyErrorCounters, getDxyExact } from '../../../src/index.js';
import { eDiff, eEstimate } from 'big-float-ts';

use(nearly);

const γ1 = γ(1);
const γγ3 = γγ(3);


describe('getDxyErrorCounters', function() {
	it('it should get tight error bounds when calculating the derivative of the power basis representation of a bezier curve of order <= 3 ',
	function() {
		const count = 15;
		const D = 0;   // double precision
		const DD = 1;  // double-double precision

		{
			// lines
			for (let i=0; i<count; i++) {
				const ps = getRandomLine(i);

				const r = getDxy(ps);
				const rDd = getDxyDd(ps);
				const rExact = getDxyExact(ps);
				const rE = getDxyErrorCounters(ps);

				// for both coordinates
				for (let coord=0; coord<=1; coord++) {
					{
						const cE = rE[coord];

						// double precision
						const c = r[coord];
						const cE0 = D*γ1*cE[0];
						const realError0 = eEstimate(eDiff(rExact[coord][0], [c[0]]));

						// double-double precision
						const cDd = rDd[coord];
						const cE0Dd = DD*γγ3*cE[0];
						const realError0Dd = eEstimate(eDiff(rExact[coord][0], cDd[0]));
						
						expect(realError0 <= cE0);
						expect(realError0Dd <= cE0Dd);
					}
				}
			}
		}

		{
			// quadratic bezier curves
			for (let i=0; i<count; i++) {
				const ps = getRandomQuad(i);

				const r = getDxy(ps);
				const rDd = getDxyDd(ps);
				const rExact = getDxyExact(ps);
				const rE = getDxyErrorCounters(ps);

				// for both coordinates
				for (let coord=0; coord<=1; coord++) {
					{
						const cE = rE[coord];

						// double precision
						const c = r[coord];
						const cE0 = (D+1)*γ1*cE[0];
						const cE1 = D*γ1*cE[1];
						const realError0 = eEstimate(eDiff(rExact[coord][0], [c[0]]));
						const realError1 = eEstimate(eDiff(rExact[coord][1], [c[1]]));

						// double-double precision
						const cDd = rDd[coord];
						const cE0Dd = (DD+1)*γγ3*cE[0];
						const cE1Dd = DD*γγ3*cE[1];
						const realError0Dd = eEstimate(eDiff(rExact[coord][0], cDd[0]));
						const realError1Dd = eEstimate(eDiff(rExact[coord][1], cDd[1]));
						
						expect(realError0 <= cE0);
						expect(realError1 <= cE1);
						expect(realError0Dd <= cE0Dd);
						expect(realError1Dd <= cE1Dd);
					}
				}
			}
		}

		{
			// cubic bezier curves
			for (let i=0; i<count; i++) {
				const ps = getRandomCubic(i);

				const r = getDxy(ps);
				const rDd = getDxyDd(ps);
				const rExact = getDxyExact(ps);
				const rE = getDxyErrorCounters(ps);

				// for both coordinates
				for (let coord=0; coord<=1; coord++) {
					{
						const cE = rE[coord];

						// double precision
						const c = r[coord];
						const cE0 = (D+3)*γ1*cE[0];
						const cE1 = (D+2)*γ1*cE[1];
						const cE2 = (D+3)*γ1*cE[2];
						const realError0 = eEstimate(eDiff(rExact[coord][0], [c[0]]));
						const realError1 = eEstimate(eDiff(rExact[coord][1], [c[1]]));
						const realError2 = eEstimate(eDiff(rExact[coord][2], [c[2]]));

						// double-double precision
						const cDd = rDd[coord];
						const cE0Dd = (DD+3)*γγ3*cE[0];
						const cE1Dd = (DD+2)*γγ3*cE[1];
						const cE2Dd = (DD+3)*γγ3*cE[2];
						const realError0Dd = eEstimate(eDiff(rExact[coord][0], cDd[0]));
						const realError1Dd = eEstimate(eDiff(rExact[coord][1], cDd[1]));
						const realError2Dd = eEstimate(eDiff(rExact[coord][2], cDd[2]));
						
						expect(realError0 <= cE0);
						expect(realError1 <= cE1);
						expect(realError2 <= cE2);
						expect(realError0Dd <= cE0Dd);
						expect(realError1Dd <= cE1Dd);
						expect(realError2Dd <= cE2Dd);
					}
				}
			}
		}

		// edge cases
		{
			const p = [1,1];
			const ps = [p];
			expect(getDxyErrorCounters(ps)).to.eql([[0], [0]]);

			expect(() => getDxyErrorCounters([p,p,p,p,p])).to.throw();
		}
	});
});
