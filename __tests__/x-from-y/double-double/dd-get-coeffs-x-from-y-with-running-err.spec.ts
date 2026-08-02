import { describe, expect, it } from '@jest/globals';
import { getRandomBezier } from '../../helpers/get-random-bezier.js';
import { randomOnGrid } from '../../helpers/random-on-grid.js';
import { allTrue, mapDouble, mapShewchukToAbsDouble, subtractShewchuk } from '../../helpers/map.js';
import { γγ3 } from '../../../src/error-analysis/error-analysis.js';
import { eGetCoeffsYFromX } from '../../../src/y-from-x/expansion/get-coeffs-y-from-x.js';
import { ddGetCoeffsXFromY_WithRunningErr } from '../../../src/x-from-y/double-double/dd-get-coeffs-x-from-y-with-running-err.js';

const { abs } = Math;

const compareErrors = mapDouble((eActual, eBound) => abs(eActual) <= eBound!);
const getRandomBezier_ = getRandomBezier(128, 53);
const randomY = randomOnGrid(128, 53);


describe('ddGetCoeffsXFromY_WithRunningErr', function() {
    it('it should get the polynomial coefficients (and a running error bound) whose roots are the `x` coordinates given a `y` coordinate of some bezier curves (in double-double precision) - and the actual errors should be within their bounds when compared to the exact (expansion) version',
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
                    const y = randomY(k++);

                    const { coeffs: rDd, errorBound: _errorBound } =
                        ddGetCoeffsXFromY_WithRunningErr(ps, y)!;

                    // the returned running error needs to be multiplied by 3γ²
                    const errorBound = _errorBound.map(e => γγ3*e);

                    // the exact x-from-y is the exact y-from-x of the curve
                    // reflected in the line y = x (x and y coordinates swapped)
                    const psₛ = ps.map(p => [p[1], p[0]]);

                    // a double-double is a valid 2-term Shewchuk expansion
                    const rE = eGetCoeffsYFromX(psₛ, y) as number[][];

                    const errorActual = mapShewchukToAbsDouble(subtractShewchuk(rDd, rE)) as number[];
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

            console.log(`ddGetCoeffsXFromY_WithRunningErr: average error/bound: ${sumRatio/count}, max error/bound: ${maxRatio}, average absolute error: ${sumAbsError/count}`);
        }

        // a point (order 0) has no x-from-y polynomial
        {
            const p = [1,1];
            const ps = [p];
            expect(ddGetCoeffsXFromY_WithRunningErr(ps, 0)).toBeUndefined();
        }
    });
});
