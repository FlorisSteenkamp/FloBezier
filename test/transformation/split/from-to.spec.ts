import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { nearly } from '../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../helpers/get-random-bezier.js';
import { fromTo } from '../../../src/index.js';

use(nearly);

describe('fromTo', function() {
	it('it should return new bezier curves (including error bound) by limiting the `t` domain of some bezier curves',
	function() {
		{
			const tS = 0.31;
			const tE = 0.77;
			const ps = getRandomCubic(0);
			// ps = randomRotateAndTranslate(0)(ps);
			const r = fromTo(ps, tS, tE);
			expect(r).to.be.nearly(2**8, {
				ps: [ 
						[17.806034934622037, -42.21106739069197],
				  		[-6.786894225334898, -8.130929380468366],
				  		[-10.943235160532133, 27.526885728944915],
				  		[27.328211684333453, 55.042335301544774] 
					],
			   	_ps: [
					   	[228.0296834800296, 334.22692382226063],
				  		[327.3635854807663, 497.26021983896703],
				  		[477.1226511376937, 745.4061281842003],
				  		[701.0449398272265, 1126.3421199004133] 
					] 
			});
		}
		{
			const tS = 0.31;
			const tE = 0.77;
			const ps = getRandomQuad(0);
			// ps = randomRotateAndTranslate(0)(ps);
			const r = fromTo(ps, tS, tE);
			expect(r).to.be.nearly(2**8, { 
				ps: [ 
						[34.379530672853875, -65.17811691932094],
				  		[-3.985881855962882, -32.161196084638185],
				  		[-36.734862382071945, 8.98386536480151] 
					],
			   _ps: [ 
				   		[161.08727126214188, 224.35665911534986],
				  		[226.4389977554457, 279.4329191259643],
				  		[326.2185000643129, 488.6883946363174] 
					] 
			});
		}
		{
			const tS = 0.31;
			const tE = 0.77;
			const ps = getRandomLine(0);
			const r = fromTo(ps, tS, tE);
			expect(r).to.be.nearly(2**8, { 
				ps: [
						[60.23448259444777, -87.42865052530279],
				  		[18.08408328119758, -59.88938967013017] 
					],
			   	_ps: [ 
					   	[117.04589036448064, 153.1410354517822],
				  		[159.19628967773082, 223.11047481009516]
					]
			});
		}
		{
			const tS = 0.31;
			const tE = 0.77;
			const ps = getRandomPoint(0);
			const r = fromTo(ps, tS, tE);
			expect(r).to.be.eql({ ps, _ps: [[0]] });
		}
	});
});
