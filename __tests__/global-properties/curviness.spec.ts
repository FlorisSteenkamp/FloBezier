import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { curviness } from '../../src/index.js';
import { nearly } from '../helpers/chai-extend-nearly.js';


// TOD -> Afffected (and possibly more dependents):
// curviness
// splitByCurvatureAndLength
// splitByMaxCurvature
// totalLength
// length

use(nearly);


describe('curviness', function() {
    it('it should give reasonable curviness values for some bezier curves', 
	function() {
		// cubics
		{
			const ps = [[0,0],[1,1],[2,2],[3,3]];
			expect(curviness(ps)).to.be.eql(0);
		}

		{
			const ps = [[0,0],[1.0001,1.001],[2.00001,2.00001],[3,3]];
			const curviness_ = curviness(ps);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(curviness_).to.be.nearly(2**8, 0.0013502388074583282);
		}

		{
			const ps = [[0,0],[2,1],[-2,25],[3,3]];
			const curviness_ = curviness(ps);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(curviness_).to.be.nearly(2**4, 4.355562125072504);
		}

		{
			const ps = [[0,0],[1,1],[0,0],[1,1]];
			const curviness_ = curviness(ps);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(curviness_).to.be.nearly(2**4, 6.283185307179586);
		}

		{
			const ps = [[0,0],[1,0],[0,0],[1,1]];
			const curviness_ = curviness(ps);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(curviness_).to.be.nearly(2**4, 5.497787143782138);
		}

		{
			const ps = [[0,0],[1,0],[0,0],[-1,0]];
			const curviness_ = curviness(ps);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(curviness_).to.be.nearly(2**4, 3.141592653589793);
		}

		// quadratics
		{
			const ps = [[0,0],[1,0],[0,0]];
			const curviness_ = curviness(ps);
			// @ts-ignore - otherwise TypeScript gives an error on nearly
			expect(curviness_).to.be.nearly(2**4, 3.141592653589793);
		}

		// lines
		{
			const ps = [[0,0],[1,1]];
			const curviness_ = curviness(ps);
			expect(curviness_).to.eql(0);
		}

		// some edge cases
		{
			const ps1 = [[0,0],[1,1],[1,1],[2,3]];
			const ps2 = [[0,0],[1,1],[2,3]];
			const curviness_ = curviness(ps1);
			expect(curviness_).to.eql(0.3217505543966422);

			expect(curviness(ps1)).to.eql(curviness(ps2));
		}

		{
			const ps = [[0,0],[0,0],[0,0],[0,0]];
			expect(curviness(ps)).to.eql(0);
		}
	});
});
