import { describe, expect, it } from '@jest/globals';
import { getRandomCubic, getRandomQuad } from '../../helpers/get-random-bezier.js';
import { splitByDeviationFromStraighLine } from '../../../src/transformation/split/split-by-deviation-from-straigh-line.js';
import { splitByDeviationFromStraighLine_Quad } from '../../../src/transformation/split/split-by-deviation-from-straigh-line-quad.js';
import { splitByDeviationFromStraighLine_Cubic } from '../../../src/transformation/split/split-by-deviation-from-straight-line-cubic.js';


describe('splitByDeviationFromStraighLine', function() {
    it('should return [0,1] for points and lines', function() {
        expect(splitByDeviationFromStraighLine([[1,2]], 0.1)).toEqual([0,1]);
        expect(splitByDeviationFromStraighLine([[1,2],[3,4]], 0.1)).toEqual([0,1]);
    });

    it('should dispatch quadratics to the quad splitter', function() {
        const ps = getRandomQuad(1);
        expect(splitByDeviationFromStraighLine(ps, 0.5))
            .toEqual(splitByDeviationFromStraighLine_Quad(ps, 0.5));
    });

    it('should dispatch cubics to the cubic splitter', function() {
        const ps = getRandomCubic(1);
        expect(splitByDeviationFromStraighLine(ps, 0.5))
            .toEqual(splitByDeviationFromStraighLine_Cubic(ps, 0.5));
    });

    it('should throw for bezier order > 3', function() {
        expect(() => splitByDeviationFromStraighLine([[0,0],[1,1],[2,2],[3,3],[4,4]], 0.1))
            .toThrow();
    });
});
