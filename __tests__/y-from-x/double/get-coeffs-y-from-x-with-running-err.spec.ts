import { describe, expect, it } from '@jest/globals';
import { getRandomBezier } from '../../helpers/get-random-bezier.js';
import { randomOnGrid } from '../../helpers/random-on-grid.js';
import { allTrue, mapDouble, mapDoubleToShewchuk, mapShewchukToAbsDouble, subtractShewchuk } from '../../helpers/map.js';
import { γ1 } from '../../../src/error-analysis/error-analysis.js';
import { eGetCoeffsYFromX } from '../../../src/y-from-x/expansion/get-coeffs-y-from-x.js';
import { getCoeffsYFromX_WithRunningErr } from '../../../src/y-from-x/double/get-coeffs-y-from-x-with-running-err.js';

const { abs } = Math;

const compareErrors = mapDouble((eActual, eBound) => abs(eActual) <= eBound!);
const getRandomBezier_ = getRandomBezier(128, 53);
const randomX = randomOnGrid(128, 53);


describe('getCoeffsYFromX_WithRunningErr', function() {
    it('it should get the polynomial coefficients (and a running error bound) whose roots are the `y` coordinates given an `x` coordinate of some bezier curves (in double precision) - and the actual errors should be within their bounds when compared to the exact (expansion) version',
    function() {
        {
            let k = 0;
            let maxRatio = 0;
            let sumRatio = 0;
            let sumAbsError = 0;
            let count = 0;
            // orders 1,2,3 (line, quadratic, cubic) -> ps.length 2,3,4
            for (let i=1; i<=3; i++) {
                for (let j=0; j<20; j++) {
                    const ps = getRandomBezier_(i as 1|2|3)(j);
                    const x = randomX(k++);

                    const { coeffs, errorBound: _errorBound } =
                        getCoeffsYFromX_WithRunningErr(ps, x)!;

                    // the returned running error needs to be multiplied by γ(1)
                    const errorBound = _errorBound.map(e => γ1*e);

                    const rD = mapDoubleToShewchuk(coeffs) as number[][];
                    const rE = eGetCoeffsYFromX(ps, x) as number[][];

                    const errorActual = mapShewchukToAbsDouble(subtractShewchuk(rD, rE)) as number[];
                    const allWithinBounds = allTrue(compareErrors(errorActual, errorBound));

                    // track how tight the bounds are (actual error / error bound)
                    for (let m=0; m<errorActual.length; m++) {
                        const bound = errorBound[m];
                        const ratio = bound === 0 ? 0 : errorActual[m]/bound;
                        if (ratio > maxRatio) { maxRatio = ratio; }
                        sumRatio += ratio;
                        sumAbsError += errorActual[m];
                        count++;
                    }

                    if (!allWithinBounds) {
                        throw new Error('Error not within error bound');
                    }
                }
            }

            console.log(`average error/bound: ${sumRatio/count}, max error/bound: ${maxRatio}, average absolute error: ${sumAbsError/count}`);
        }

        // a point (order 0) has no y-from-x polynomial
        {
            const p = [1,1];
            const ps = [p];
            expect(getCoeffsYFromX_WithRunningErr(ps, 0)).toBeUndefined();
        }
    });
});
