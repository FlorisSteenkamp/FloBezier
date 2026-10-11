import { describe, expect, it } from '@jest/globals';
import { curvature, κ, radiusOfCurvature, curvatureND } from '../../src/local-properties-at-t/curvature/curvature.js';
import { tangent } from '../../src/local-properties-at-t/tangent/double/tangent.js';
import { normal } from '../../src/local-properties-at-t/normal/double/normal.js';
import { evaluate } from '../../src/local-properties-at-t/evaluate/double/evaluate.js';
import { evaluate1stDerivative } from '../../src/local-properties-at-t/evaluate-1st-derivative/double/evaluate-1st-derivative.js';
import { evaluate2ndDerivative } from '../../src/local-properties-at-t/evaluate-2nd-derivative/double/evaluate-2nd-derivative.js';
import { getRandomCubic, getRandomQuad, getRandomLine } from '../helpers/get-random-bezier.js';


describe('curried forms of the local property functions', function() {
    it('the curried forms should give exactly the same results as the uncurried forms',
    function() {
        const fs = [
            curvature, κ, radiusOfCurvature, curvatureND,
            tangent, normal, evaluate, evaluate1stDerivative, evaluate2ndDerivative
        ];
        const ts = [0, 0.1, 0.5, 0.7, 1, 1.25, -0.5];

        for (let i=0; i<5; i++) {
            for (const ps of [getRandomCubic(i), getRandomQuad(i), getRandomLine(i)]) {
                for (const f of fs) {
                    // @ts-ignore - `f` is a union of overloaded functions
                    const curried = f(ps);
                    expect(typeof curried).toBe('function');
                    for (const t of ts) {
                        // @ts-ignore
                        expect(curried(t)).toEqual(f(ps, t));
                    }
                }
            }
        }
    });

    it('the curried form should be usable for sampling many points',
    function() {
        const ps = [[0,0],[1,1],[2,1],[3,0]];
        const ev = evaluate(ps);
        const points = [0, 0.25, 0.5, 0.75, 1].map(ev);
        expect(points[0]).toEqual([0,0]);
        expect(points[2]).toBeNearly(2**4, [1.5, 0.75]);
        expect(points[4]).toEqual([3,0]);
    });
});
