import { describe, expect, it } from '@jest/globals';
import { eCompress, eEstimate } from 'big-float-ts';
import { evaluate2ndDerivative } from '../../../../src/local-properties-at-t/evaluate-2nd-derivative/double/evaluate-2nd-derivative.js';
import { tangent } from '../../../../src/local-properties-at-t/tangent/double/tangent.js';
import { evaluate2ndDerivativeExact } from '../../../../src/local-properties-at-t/evaluate-2nd-derivative/exact/evaluate-2nd-derivative-exact.js';
import { tangentExact } from '../../../../src/local-properties-at-t/tangent/exact/tangent-exact.js';
import { evaluate2ndDerivativeAt0Exact } from '../../../../src/local-properties-at-t/evaluate-2nd-derivative/exact/evaluate-2nd-derivative-at-0-exact.js';
import { evaluate2ndDerivativeAt1Exact } from '../../../../src/local-properties-at-t/evaluate-2nd-derivative/exact/evaluate-2nd-derivative-at-1-exact.js';
import { tangentAt0Exact } from '../../../../src/local-properties-at-t/tangent/exact/tangent-at-0-exact.js';
import { tangentAt1Exact } from '../../../../src/local-properties-at-t/tangent/exact/tangent-at-1-exact.js';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';




describe('evaluate2ndDerivativeExact', function() {
    it('it should correctly evaluate the exact first and second derivative of the power basis representation of some bezier curves',
    function() {
        {
            // Cubic bezier curve
            const ps = getRandomCubic(0);
            const t = 1/8;  // some `t`

            const dxyEst = tangent(ps,t);
            const dxy = tangentExact(ps,t).map(eCompress);
            expect(dxy.map(eEstimate)).toBeNearly(2**0, dxyEst);
            expect(dxy).toEqual([
                [3.552713678800501e-15, 221.77979874351854],
                [2.6645352591003757e-15, 45.040432234562175]
            ]);
            expect(tangentAt0Exact(ps).map(eCompress)).toEqual(tangentExact(ps,0).map(eCompress));
            expect(tangentAt1Exact(ps).map(eCompress)).toEqual(tangentExact(ps,1).map(eCompress));

            const ddxyEst = evaluate2ndDerivative(ps,t);
            const ddxy = evaluate2ndDerivativeExact(ps,t).map(eCompress);
            expect(ddxy.map(eEstimate)).toBeNearly(2**0,ddxyEst);
            expect(ddxy).toEqual([
                [-422.8495382819487], 
                [111.95015293249183]
            ]);
            expect(evaluate2ndDerivativeAt0Exact(ps).map(eCompress)).toEqual(evaluate2ndDerivativeExact(ps,0).map(eCompress));
            expect(evaluate2ndDerivativeAt1Exact(ps).map(eCompress)).toEqual(evaluate2ndDerivativeExact(ps,1).map(eCompress));
        }
        {
            // Quadratic bezier curve
            const ps = getRandomQuad(10);
            const t = 1/8;  // some `t`

            const dxyEst = tangent(ps,t);
            const dxy = tangentExact(ps,t).map(eCompress);
            expect(dxy.map(eEstimate)).toBeNearly(2**0, dxyEst);
            expect(dxy).toEqual([
                [1.4210854715202004e-14, 133.61557809124287],
                [-93.63583001544299]
            ]);
            expect(tangentAt0Exact(ps).map(eCompress)).toEqual(tangentExact(ps,0).map(eCompress));
            expect(tangentAt1Exact(ps).map(eCompress)).toEqual(tangentExact(ps,1).map(eCompress));

            const ddxyEst = evaluate2ndDerivative(ps,t);
            const ddxy = evaluate2ndDerivativeExact(ps,t).map(eCompress);
            expect(ddxy.map(eEstimate)).toBeNearly(2**0,ddxyEst);
            expect(ddxy).toEqual([
                [-589.1890567792337], 
                [-9.720819342297318]
            ]);
            expect(evaluate2ndDerivativeAt0Exact(ps).map(eCompress)).toEqual(evaluate2ndDerivativeExact(ps,0).map(eCompress));
            expect(evaluate2ndDerivativeAt1Exact(ps).map(eCompress)).toEqual(evaluate2ndDerivativeExact(ps,1).map(eCompress));
        }
        {
            // Line
            const ps = getRandomLine(20);
            const t = 1/8;  // some `t`

            const dxyEst = tangent(ps,t);
            const dxy = tangentExact(ps,t).map(eCompress);
            expect(dxy.map(eEstimate)).toBeNearly(2**0, dxyEst);
            expect(dxy).toEqual([
                [-44.982865253836025],
                [-1.4210854715202004e-14, 144.8861820630422]
            ]);
            expect(tangentAt0Exact(ps).map(eCompress)).toEqual(tangentExact(ps,0).map(eCompress));
            expect(tangentAt1Exact(ps).map(eCompress)).toEqual(tangentExact(ps,1).map(eCompress));

            const ddxy = evaluate2ndDerivativeExact(ps,t);
            expect(ddxy).toEqual([[0],[0]]);
        }
        {
            // Point
            const ps = getRandomPoint(30);
            const t = 1/8;  // some `t`

            const dxy = tangentExact(ps,t);
            expect(dxy).toEqual([[0],[0]]);
            expect(evaluate2ndDerivativeAt0Exact(ps)).toEqual([[0],[0]]);

            const ddxy = evaluate2ndDerivativeExact(ps,t);
            expect(ddxy).toEqual([[0],[0]]);
            expect(evaluate2ndDerivativeAt1Exact(ps)).toEqual([[0],[0]]);
        }
    });
});
