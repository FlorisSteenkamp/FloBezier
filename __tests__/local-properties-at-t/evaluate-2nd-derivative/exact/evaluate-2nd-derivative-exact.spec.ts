import { eCompress, eEstimate } from 'big-float-ts';
import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { 
    evaluate2ndDerivative, tangent, evaluate2ndDerivativeExact, tangentExact, 
    evaluate2ndDerivativeAt0Exact, evaluate2ndDerivativeAt1Exact, tangentAt0Exact, tangentAt1Exact
} from '../../../../src/index.js';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';

use(nearly);


describe('evaluate2ndDerivativeExact', function() {
	it('it should correctly evaluate the exact first and second derivative of the power basis representation of some bezier curves',
	function() {
        {
            // Cubic bezier curve
            const ps = getRandomCubic(0);
            const t = 1/8;  // some `t`

            const dxyEst = tangent(ps,t);
            const dxy = tangentExact(ps,t).map(eCompress);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(dxy.map(eEstimate)).to.be.nearly(2**0, dxyEst);
            expect(dxy).to.eql([
                [3.552713678800501e-15, 221.77979874351854],
                [2.6645352591003757e-15, 45.040432234562175]
            ]);
            expect(tangentAt0Exact(ps).map(eCompress)).to.eql(tangentExact(ps,0).map(eCompress));
            expect(tangentAt1Exact(ps).map(eCompress)).to.eql(tangentExact(ps,1).map(eCompress));

            const ddxyEst = evaluate2ndDerivative(ps,t);
            const ddxy = evaluate2ndDerivativeExact(ps,t).map(eCompress);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(ddxy.map(eEstimate)).to.be.nearly(2**0,ddxyEst);
            expect(ddxy).to.eql([
                [-422.8495382819487], 
                [111.95015293249183]
            ]);
            expect(evaluate2ndDerivativeAt0Exact(ps).map(eCompress)).to.eql(evaluate2ndDerivativeExact(ps,0).map(eCompress));
            expect(evaluate2ndDerivativeAt1Exact(ps).map(eCompress)).to.eql(evaluate2ndDerivativeExact(ps,1).map(eCompress));
        }
		{
			// Quadratic bezier curve
            const ps = getRandomQuad(10);
            const t = 1/8;  // some `t`

            const dxyEst = tangent(ps,t);
            const dxy = tangentExact(ps,t).map(eCompress);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(dxy.map(eEstimate)).to.be.nearly(2**0, dxyEst);
            expect(dxy).to.eql([
                [1.4210854715202004e-14, 133.61557809124287],
                [-93.63583001544299]
            ]);
            expect(tangentAt0Exact(ps).map(eCompress)).to.eql(tangentExact(ps,0).map(eCompress));
            expect(tangentAt1Exact(ps).map(eCompress)).to.eql(tangentExact(ps,1).map(eCompress));

            const ddxyEst = evaluate2ndDerivative(ps,t);
            const ddxy = evaluate2ndDerivativeExact(ps,t).map(eCompress);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(ddxy.map(eEstimate)).to.be.nearly(2**0,ddxyEst);
            expect(ddxy).to.eql([
                [-589.1890567792337], 
                [-9.720819342297318]
            ]);
            expect(evaluate2ndDerivativeAt0Exact(ps).map(eCompress)).to.eql(evaluate2ndDerivativeExact(ps,0).map(eCompress));
            expect(evaluate2ndDerivativeAt1Exact(ps).map(eCompress)).to.eql(evaluate2ndDerivativeExact(ps,1).map(eCompress));
		}
		{
			// Line
            const ps = getRandomLine(20);
            const t = 1/8;  // some `t`

            const dxyEst = tangent(ps,t);
            const dxy = tangentExact(ps,t).map(eCompress);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(dxy.map(eEstimate)).to.be.nearly(2**0, dxyEst);
            expect(dxy).to.eql([
                [-44.982865253836025],
                [-1.4210854715202004e-14, 144.8861820630422]
            ]);
            expect(tangentAt0Exact(ps).map(eCompress)).to.eql(tangentExact(ps,0).map(eCompress));
            expect(tangentAt1Exact(ps).map(eCompress)).to.eql(tangentExact(ps,1).map(eCompress));

            const ddxy = evaluate2ndDerivativeExact(ps,t);
            expect(ddxy).to.eql([[0],[0]]);
		}
        {
			// Point
            const ps = getRandomPoint(30);
            const t = 1/8;  // some `t`

            const dxy = tangentExact(ps,t);
            expect(dxy).to.eql([[0],[0]]);
            expect(evaluate2ndDerivativeAt0Exact(ps)).to.eql([[0],[0]]);

            const ddxy = evaluate2ndDerivativeExact(ps,t);
            expect(ddxy).to.eql([[0],[0]]);
            expect(evaluate2ndDerivativeAt1Exact(ps)).to.eql([[0],[0]]);
		}
	});
});
