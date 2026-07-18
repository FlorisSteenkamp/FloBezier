import { describe, expect, it } from '@jest/globals';
import { getRandomBezier } from '../../helpers/get-random-bezier.js';
import { allTrue, mapDouble, mapDoubleToShewchuk, mapShewchukToAbsDouble, subtractShewchuk } from '../../helpers/map.js';
import { squares4 } from 'squares-rng';
import { γ1 } from '../../../src/error-analysis/error-analysis.js';
import { toPowerBasisExact } from '../../../src/to-power-basis/to-power-basis/exact/to-power-basis-exact.js';
import { toPowerBasisErrorCounters } from '../../../src/to-power-basis/to-power-basis/to-power-basis-error-counters.js';
import { toPowerBasis } from '../../../src/to-power-basis/to-power-basis/double/to-power-basis.js';

const { abs } = Math;

const compareErrors = mapDouble((eActual, eBound) => abs(eActual) <= eBound!);
const getRandomBezier_ = getRandomBezier(128, 53);


describe('toPowerBasisWithRunningError', function() {
    it('it should get the the power basis representation error bound counters of some bezier curves (in double precision)',
    function() {
        {
            let k = 0;
            for (let i=0; i<=3; i++) {
                for (let j=0; j<25; j++) {
                    const _ps = getRandomBezier_(i as 0|1|2|3)(j);
                    // shift bits to ensure better testing range
                    const ps = _ps.map(p => p.map(c => c**((squares4(k++) % 200) - 100)));
                    const errorCounters = toPowerBasisErrorCounters(ps);
                    let errorBound: number[][];
                    switch (i) {
                        case 3: errorBound = [
                            [
                                3*γ1*errorCounters[0][0],
                                3*γ1*errorCounters[0][1],
                                2*γ1*errorCounters[0][2],
                                0
                            ],
                            [
                                3*γ1*errorCounters[1][0],
                                3*γ1*errorCounters[1][1],
                                2*γ1*errorCounters[1][2],
                                0
                            ]
                        ]; break;
                        case 2: errorBound = [
                            [
                                2*γ1*errorCounters[0][0],
                                1*γ1*errorCounters[0][1],
                                0
                            ],
                            [
                                2*γ1*errorCounters[1][0],
                                1*γ1*errorCounters[1][1],
                                0
                            ]
                        ]; break;
                        case 1: errorBound = [
                            [γ1*errorCounters[0][0], 0],
                            [γ1*errorCounters[1][0], 0]
                        ]; break;
                        case 0: errorBound = [[0],[0]]; break;
                    }

                    //--- Compare with running error bound (that is usually slightly better)
                    // const { errorBound: _errorBound } = toPowerBasisWithRunningError(ps);
                    // const errorBoundRunning = _errorBound.map((err: number[]) => err.map(e => γ1*e));
                    //----------------------------------------------------------------------

                    const xy = toPowerBasis(ps);
                    const rD = mapDoubleToShewchuk(xy) as number[][][];
                    const rE = toPowerBasisExact(ps);

                    const errorActual = mapShewchukToAbsDouble(subtractShewchuk(rD, rE)) as number[][];
                    const allWithinBounds = allTrue(compareErrors(errorActual, errorBound!));

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
            expect(() => toPowerBasisErrorCounters(ps)).toThrow();
        }
    });
});
