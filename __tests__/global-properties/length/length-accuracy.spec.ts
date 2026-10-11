import { describe, expect, it } from '@jest/globals';
import { length } from '../../../src/global-properties/length/length.js';
import { totalLength } from '../../../src/global-properties/length/total-length.js';
import { getTAtLength } from '../../../src/local-properties-to-t/get-t-at-length.js';
import { generateCuspAtHalf3 } from '../../../src/create/generate-cusp-at-half-t.js';
import { getRandomCubic, getRandomQuad, getRandomLine } from '../../helpers/get-random-bezier.js';
import { referenceLength, relativeError, ddToNumber } from '../../helpers/reference-length.js';


/**
 * The maximum allowed relative error (about 1.4e-14) - in practice the error
 * is typically below 1e-15 (see `performance/length/benchmark.mjs`).
 */
const maxRelError = 2**-46;


describe('length (accuracy against a double-double reference)', function() {
    it('should be accurate for some random cubic, quadratic and linear bezier curves',
    function() {
        for (let i=0; i<5; i++) {
            for (const ps of [getRandomCubic(i), getRandomQuad(i), getRandomLine(i)]) {
                for (const interval of [[0,1], [0.1,0.7], [0.3,0.3 + 1e-9], [1,0]]) {
                    const ref = referenceLength(interval, ps);
                    expect(relativeError(length(interval, ps), ref)).toBeLessThan(maxRelError);
                }
                expect(relativeError(totalLength(ps), referenceLength([0,1], ps))).toBeLessThan(maxRelError);
            }
        }
    });

    it('should be accurate for cubic bezier curves with a cusp or near cusp',
    function() {
        for (let i=0; i<5; i++) {
            const [p0, p1, p2] = [getRandomCubic(i)[0], getRandomCubic(i)[1], getRandomCubic(i)[2]];
            const cusp = generateCuspAtHalf3(p0, p1, p2);
            const nearCusp = cusp.map(p => p.slice());
            nearCusp[1] = [nearCusp[1][0] + 1e-8, nearCusp[1][1] - 1e-8];
            for (const ps of [cusp, nearCusp]) {
                for (const interval of [[0,1], [0.2,0.5], [0.5,0.9]]) {
                    const ref = referenceLength(interval, ps);
                    expect(relativeError(length(interval, ps), ref)).toBeLessThan(maxRelError);
                }

                // For a tiny interval straddling the cusp the length is tiny
                // (about 1e-7 of the total length here) and the *relative* 
                // error is limited (to about 1e-12) by the cancellation in 
                // evaluating the derivative (in double precision) near the 
                // cusp - the *absolute* error is still tiny relative to the
                // total length though.
                {
                    const interval = [0.4999, 0.5001];
                    const ref = ddToNumber(referenceLength(interval, ps));
                    const total = ddToNumber(referenceLength([0,1], ps));
                    expect(Math.abs(length(interval, ps) - ref)/total).toBeLessThan(2**-60);
                }
            }
        }
    });

    it('should be accurate for degenerate curves (collinear / folded / lower order in disguise)',
    function() {
        const curves = [
            [[0,0],[3,1],[1,1/3]],                 // collinear folded quadratic
            [[0,0],[1,0],[0,0]],                   // quadratic that goes there and back
            [[1,2],[3,4],[5,6]],                   // quadratic that is really a line
            [[0,0],[3,0],[-1,0],[2,0]],            // collinear folded cubic
            [[0,0],[1,2],[2,2],[3,0]],             // cubic that is really a quadratic
            [[0,0],[1,1],[2,2],[3,3]],             // cubic that is really a line
            [[-50.5,20.25],[100,-33],[100,-33],[-50.5,20.25]],  // closed cubic
        ];
        for (const ps of curves) {
            for (const interval of [[0,1], [0.25,0.75], [0,1e-6]]) {
                const ref = referenceLength(interval, ps);
                expect(relativeError(length(interval, ps), ref)).toBeLessThan(maxRelError);
            }
        }
    });

    it('should give consistent results with `getTAtLength`',
    function() {
        for (let i=0; i<3; i++) {
            for (const ps of [getRandomCubic(i), getRandomQuad(i), getRandomLine(i)]) {
                const L = ddToNumber(referenceLength([0,1], ps));
                for (const frac of [0.001, 0.37, 0.5, 0.999]) {
                    const s = frac*L;
                    const t = getTAtLength(ps, s);
                    expect(relativeError(s, referenceLength([0,t], ps))).toBeLessThan(2**-40);
                }
            }
        }
    });
});
