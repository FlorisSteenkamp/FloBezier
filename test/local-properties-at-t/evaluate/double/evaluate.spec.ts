import { eEstimate } from 'big-float-ts';
import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { evaluate, evalDeCasteljau, evaluateExact } from '../../../../src/index.js';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';

use(nearly);


describe('evaluate / evalDeCasteljau', function() {
    it('it should evaluate some beziers correctly at some `t` values', 
	function() {
		{
			const pss = [
				[[3,-1],[2,-1],[1,1],[0,0]],
				[[0,0],[1,1],[1,2],[3,2]],
				[[3,-1],[2,-1],[1,1]],
				[[0,0],[1,1],[1.54,2]],
				[[3.33,-1.1221],[2.542234,-1]],
				[[1.1111,1.2222],[1.54,2]],
			];

			let ts = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
			
			for (let ps of pss) {
				for (let t of ts) {
					let pExact = evaluateExact(ps, t).map(eEstimate);
					let r2 = evaluate(ps, t);

					// We check that evaluation using two different methods
					// (de Casteljau and power basis evaluation) yields roughly 
					// the same result
					let rX = Math.abs(pExact[0] - r2[0]);
					let rY = Math.abs(pExact[1] - r2[1]);

					assert(rX < Number.EPSILON * 2**5);
					assert(rY < Number.EPSILON * 2**5);

					//console.log(rX, rY)
				}
			}
		}
	});
    it('it should evaluate some beziers correctly at some t values using Decasteljau\'s algorithm', 
	function() {
		{
			const pss = [
				[[3,-1],[2,-1],[1,1],[0,0]],
				[[0,0],[1,1],[1,2],[3,2]],
				[[3,-1],[2,-1],[1,1]],
				[[0,0],[1,1],[1.54,2]],
				[[3.33,-1.1221],[2.542234,-1]],
				[[1.1111,1.2222],[1.54,2]],
			];

			let ts = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
			
			for (let ps of pss) {
				for (let t of ts) {
					let r1 = evalDeCasteljau(ps, t);
					let r2 = evaluate(ps, t);

					// We check that evaluation using two different methods
					// (de Casteljau and power basis evaluation) yields roughly 
					// the same result
					let rX = Math.abs(r1[0] - r2[0]);
					let rY = Math.abs(r1[1] - r2[1]);

					assert(rX < Number.EPSILON * 2**5);
					assert(rY < Number.EPSILON * 2**5);
				}
			}
		}
	});
	it('it should correctly evaluate (x and y values) in the power basis representation of some bezier curves',
	function() {
        {
            // Cubic bezier curve
            const ps = getRandomCubic(0);
            const t = 1/3;  // some `t`
            
            const xy = evaluate(ps,t);          // evaluate in power basis
            const xy_ = evalDeCasteljau(ps,t);  // evaluate De Casteljau
			// @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xy).to.be.nearly(2**2, xy_);
        }
		{
			// Quadratic bezier curve
            const ps = getRandomQuad(10);
            const t = 1/3;  // some `t`
            
            const xy = evaluate(ps,t);          // evaluate in power basis
            const xy_ = evalDeCasteljau(ps,t);  // evaluate De Casteljau
			// @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xy).to.be.nearly(2**2, xy_);
		}
		{
			// Line
            const ps = getRandomLine(20);
            const t = 1/3;  // some `t`
            
            const xy = evaluate(ps,t);          // evaluate in power basis
            const xy_ = evalDeCasteljau(ps,t);  // evaluate De Casteljau
			// @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xy).to.be.nearly(2**2, xy_);
		}
        {
			// Point
            const ps = getRandomPoint(30);
            const t = 1/3;  // some `t`
            
            const xy = evaluate(ps,t);          // evaluate in power basis
            const xy_ = evalDeCasteljau(ps,t*2);  // evaluate De Casteljau
			// @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(xy).to.be.nearly(2**2, xy_);
		}
	});
});
