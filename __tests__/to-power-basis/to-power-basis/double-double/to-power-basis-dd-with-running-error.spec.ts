import { describe, expect, it } from '@jest/globals';
import { squares } from 'squares-rng';
import { getRandomBezier } from '../../../helpers/get-random-bezier.js';
import { γγ3 } from '../../../../src/error-analysis/error-analysis.js';
import { toPowerBasisExact } from '../../../../src/to-power-basis/to-power-basis/exact/to-power-basis-exact.js';
import { allTrue, mapDouble, mapShewchukToAbsDouble, subtractShewchuk } from '../../../helpers/map.js';
import { toPowerBasisDdWithRunningError } from '../../../../src/to-power-basis/to-power-basis/double-double/to-power-basis-dd-with-running-error.js';


const { abs } = Math;

const compareErrors = mapDouble((eActual, eBound) => abs(eActual) <= eBound!);
const getRandomBezier_ = getRandomBezier(128, 53);


describe('toPowerBasisDdWithRunningError', function() {
    it('it should get the the power basis representation (and a running error bound) of some bezier curves (in double-double precision)',
    function() {
        {
            let k = 0;
            for (let i=0; i<=3; i++) {
                for (let j=0; j<25; j++) {
                    const _ps = getRandomBezier_(i as 0|1|2|3)(j);
                    // shift bits to ensure better testing range
                    const ps = _ps.map(p => p.map(c => c**((squares(k++) % 200) - 100)));
                    const { coeffs: rDd, errorBound: _errorBound } = toPowerBasisDdWithRunningError(ps);
                    const errorBound = _errorBound.map((err: number[]) => err.map(e => γγ3*e));
                    const rE = toPowerBasisExact(ps);

                    const errorActual = mapShewchukToAbsDouble(subtractShewchuk(rDd, rE)) as number[][];
                    const allWithinBounds = allTrue(compareErrors(errorActual, errorBound));

                    if (!allWithinBounds) {
                        throw new Error('Error not within error bound');
                    }
                }
            }
        }
        
        // some edge cases
        {
            const p = [1,1];
            const ps = [p,p,p,p,p];
            expect(() => toPowerBasisDdWithRunningError(ps)).toThrow();
        }
    });
});
