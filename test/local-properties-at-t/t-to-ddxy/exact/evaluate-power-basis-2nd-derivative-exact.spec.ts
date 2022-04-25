import { eCompress, eEstimate } from 'big-float-ts';
import { expect, assert, use } from 'chai';
import { describe } from 'mocha';
import { 
    evaluatePowerBasis_2ndDerivative, evaluatePowerBasis_1stDerivative, evaluatePowerBasis_2ndDerivativeExact, evaluatePowerBasis_1stDerivativeExact, 
    evaluatePowerBasis_2ndDerivativeAt0Exact, evaluatePowerBasis_2ndDerivativeAt1Exact, evaluatePowerBasis_1stDerivativeAt0Exact, evaluatePowerBasis_1stDerivativeAt1Exact
} from '../../../../src/index.js';
import { nearly } from '../../../helpers/chai-extend-nearly.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';

use(nearly);


describe('evaluatePowerBasis_2ndDerivativeExact', function() {
	it('it should correctly evaluate the exact first and second derivative of the power basis representation of some bezier curves',
	function() {
        {
            // Cubic bezier curve
            const ps = getRandomCubic(0);
            const t = 1/8;  // some `t`

            const dxyEst = evaluatePowerBasis_1stDerivative(ps,t);
            const dxy = evaluatePowerBasis_1stDerivativeExact(ps,t).map(eCompress);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(dxy.map(eEstimate)).to.be.nearly(2**0, dxyEst);
            expect(dxy).to.eql([
                [3.552713678800501e-15, 221.77979874351854],
                [2.6645352591003757e-15, 45.040432234562175]
            ]);
            expect(evaluatePowerBasis_1stDerivativeAt0Exact(ps).map(eCompress)).to.eql(evaluatePowerBasis_1stDerivativeExact(ps,0).map(eCompress));
            expect(evaluatePowerBasis_1stDerivativeAt1Exact(ps).map(eCompress)).to.eql(evaluatePowerBasis_1stDerivativeExact(ps,1).map(eCompress));

            const ddxyEst = evaluatePowerBasis_2ndDerivative(ps,t);
            const ddxy = evaluatePowerBasis_2ndDerivativeExact(ps,t).map(eCompress);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(ddxy.map(eEstimate)).to.be.nearly(2**0,ddxyEst);
            expect(ddxy).to.eql([
                [-422.8495382819487], 
                [111.95015293249183]
            ]);
            expect(evaluatePowerBasis_2ndDerivativeAt0Exact(ps).map(eCompress)).to.eql(evaluatePowerBasis_2ndDerivativeExact(ps,0).map(eCompress));
            expect(evaluatePowerBasis_2ndDerivativeAt1Exact(ps).map(eCompress)).to.eql(evaluatePowerBasis_2ndDerivativeExact(ps,1).map(eCompress));
        }
		{
			// Quadratic bezier curve
            const ps = getRandomQuad(10);
            const t = 1/8;  // some `t`

            const dxyEst = evaluatePowerBasis_1stDerivative(ps,t);
            const dxy = evaluatePowerBasis_1stDerivativeExact(ps,t).map(eCompress);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(dxy.map(eEstimate)).to.be.nearly(2**0, dxyEst);
            expect(dxy).to.eql([
                [1.4210854715202004e-14, 133.61557809124287],
                [-93.63583001544299]
            ]);
            expect(evaluatePowerBasis_1stDerivativeAt0Exact(ps).map(eCompress)).to.eql(evaluatePowerBasis_1stDerivativeExact(ps,0).map(eCompress));
            expect(evaluatePowerBasis_1stDerivativeAt1Exact(ps).map(eCompress)).to.eql(evaluatePowerBasis_1stDerivativeExact(ps,1).map(eCompress));

            const ddxyEst = evaluatePowerBasis_2ndDerivative(ps,t);
            const ddxy = evaluatePowerBasis_2ndDerivativeExact(ps,t).map(eCompress);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(ddxy.map(eEstimate)).to.be.nearly(2**0,ddxyEst);
            expect(ddxy).to.eql([
                [-589.1890567792337], 
                [-9.720819342297318]
            ]);
            expect(evaluatePowerBasis_2ndDerivativeAt0Exact(ps).map(eCompress)).to.eql(evaluatePowerBasis_2ndDerivativeExact(ps,0).map(eCompress));
            expect(evaluatePowerBasis_2ndDerivativeAt1Exact(ps).map(eCompress)).to.eql(evaluatePowerBasis_2ndDerivativeExact(ps,1).map(eCompress));
		}
		{
			// Line
            const ps = getRandomLine(20);
            const t = 1/8;  // some `t`

            const dxyEst = evaluatePowerBasis_1stDerivative(ps,t);
            const dxy = evaluatePowerBasis_1stDerivativeExact(ps,t).map(eCompress);
            // @ts-ignore - otherwise TypeScript gives an error on nearly
            expect(dxy.map(eEstimate)).to.be.nearly(2**0, dxyEst);
            expect(dxy).to.eql([
                [-44.982865253836025],
                [-1.4210854715202004e-14, 144.8861820630422]
            ]);
            expect(evaluatePowerBasis_1stDerivativeAt0Exact(ps).map(eCompress)).to.eql(evaluatePowerBasis_1stDerivativeExact(ps,0).map(eCompress));
            expect(evaluatePowerBasis_1stDerivativeAt1Exact(ps).map(eCompress)).to.eql(evaluatePowerBasis_1stDerivativeExact(ps,1).map(eCompress));

            const ddxy = evaluatePowerBasis_2ndDerivativeExact(ps,t);
            expect(ddxy).to.eql([[0],[0]]);
		}
        {
			// Point
            const ps = getRandomPoint(30);
            const t = 1/8;  // some `t`

            const dxy = evaluatePowerBasis_1stDerivativeExact(ps,t);
            expect(dxy).to.eql([[0],[0]]);
            expect(evaluatePowerBasis_2ndDerivativeAt0Exact(ps)).to.eql([[0],[0]]);

            const ddxy = evaluatePowerBasis_2ndDerivativeExact(ps,t);
            expect(ddxy).to.eql([[0],[0]]);
            expect(evaluatePowerBasis_2ndDerivativeAt1Exact(ps)).to.eql([[0],[0]]);
		}
	});
});
