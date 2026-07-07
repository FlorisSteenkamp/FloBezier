import { describe, expect, it } from '@jest/globals';
import { getRandomCubic, getRandomLine, getRandomPoint, getRandomQuad } from '../../../helpers/get-random-bezier.js';
import { toPowerBasis, toPowerBasisExact } from '../../../../src/index.js';
import { eEstimate } from 'big-float-ts';




describe('toPowerBasisExact', function() {
    it('it should get the exact power basis representation of some bezier curves',
    function() {
        {
            const ps = getRandomCubic(0);
            const r = toPowerBasisExact(ps);
            const expected = [ 
                [ 
                    [253.09693105379824],
                    [-306.3361182861487],
                    [-1.4210854715202004e-14, 286.49990967190894],
                    [-108.49686506776892] 
                ],
                [
                    [-277.14696746050817],
                    [159.90518926393648],
                    [18.05539901828938],
                    [-13.011161175008596] 
                ]
            ];
            expect(r).toEqual(expected);


            for (let i=0; i<10; i++) {
                const ps = getRandomCubic(i);
                const r = toPowerBasisExact(ps);
                const rd = toPowerBasis(ps);

                expect(r.map(v => v.map(eEstimate))).toBeNearly(2**6, rd);
            }
        }
        {
            for (let i=0; i<10; i++) {
                const ps = getRandomQuad(i);
                const r = toPowerBasisExact(ps);
                const rd = toPowerBasis(ps);

                expect(r.map(v => v.map(eEstimate))).toBeNearly(2**6, rd);
            }
        }
        {
            for (let i=0; i<10; i++) {
                const ps = getRandomLine(i);
                const r = toPowerBasisExact(ps);
                const rd = toPowerBasis(ps);

                expect(r.map(v => v.map(eEstimate))).toBeNearly(2**6, rd);
            }
        }
        {
            for (let i=0; i<10; i++) {
                const ps = getRandomPoint(i);
                const r = toPowerBasisExact(ps);
                const rd = toPowerBasis(ps);

                expect(r.map(v => v.map(eEstimate))).toBeNearly(2**6, rd);
            }
        }

        // some edge cases
        {
            const p = [1,1];
            const ps = [p,p,p,p,p];
            expect(() => toPowerBasisExact(ps)).toThrow();
        }
    });
});
