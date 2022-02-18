import { eCompress, eEstimate } from 'big-float-ts';
import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { evaluate, evalDeCasteljau, evaluateExact } from '../../../../src/index.js';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';

use(nearly);


describe('evaluateExact', function() {
	it('it should exactly evaluate (x and y values) of some bezier curves',
	function() {
        {
            // Cubic bezier curve
            const ps = getRandomCubic(0);
            const t = 1/3;  // some `t`
            
            const xy = evaluateExact(ps,t);
            const xy_ = evalDeCasteljau(ps,t);
            expect(xy.map(eEstimate)).to.be.nearly(2**1, xy_);
            expect(xy.map(eCompress)).to.eql([
                [-7.925443855678304e-49, 1.8292903554788057e-32, -4.518469353648868e-16, -37.660281243971426],
                [4.098825000353635e-51, 3.7373488423803894e-34, -9.228881787791561e-18, 0.5098459174323547]
            ]);
        }
		{
			// Quadratic bezier curve
            const ps = getRandomQuad(10);
            const t = 1/3;  // some `t`
            
            const xy = evaluateExact(ps,t);
            const xy_ = evalDeCasteljau(ps,t);
            expect(xy.map(eEstimate)).to.be.nearly(2**1, xy_);
            expect(xy.map(eCompress)).to.eql([
                [-5.703989169717913e-32, -9.90587696972711e-16, 20.369879913265528], 
                [1.2031358088503985e-32, 1.9110023523656314e-16, 3.3163878102898963]
            ]);
		}
		{
			// Line
            const ps = getRandomLine(20);
            const t = 1/3;  // some `t`
            
            const xy = evaluateExact(ps,t);
            const xy_ = evalDeCasteljau(ps,t);
            expect(xy.map(eEstimate)).to.be.nearly(2**1, xy_);
            expect(xy.map(eCompress)).to.eql([
                [8.323502119736615e-16, 9.46397942066524],
                [-1.4966950283401966e-15, -19.091128362217585]
            ]);
		}
        {
			// Point
            const ps = getRandomPoint(30);
            const t = 1/3;  // some `t`
            
            const xy = evaluateExact(ps,t);
            const xy_ = evalDeCasteljau(ps,t*2);
            expect(xy.map(eEstimate)).to.eql(xy_);
            expect(xy.map(eEstimate)).to.eql(ps[0]);
		}
	});
});
