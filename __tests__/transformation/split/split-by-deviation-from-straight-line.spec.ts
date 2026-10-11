import { describe, expect, it } from '@jest/globals';
import { getRandomCubic, getRandomQuad } from '../../helpers/get-random-bezier.js';
import { splitByDeviationFromStraightLine } from '../../../src/transformation/split/split-by-deviation-from-straight-line.js';
import { splitByDeviationFromStraightLine_Quad } from '../../../src/transformation/split/split-by-deviation-from-straight-line-quad.js';
import { splitByDeviationFromStraightLine_Cubic } from '../../../src/transformation/split/split-by-deviation-from-straight-line-cubic.js';
import * as index from '../../../src/index.js';


describe('splitByDeviationFromStraightLine', function() {
    it('should be exported from the package index (with the correct spelling)', function() {
        expect(index.splitByDeviationFromStraightLine).toBe(splitByDeviationFromStraightLine);
        expect(index.splitByDeviationFromStraightLine_Quad).toBe(splitByDeviationFromStraightLine_Quad);
        expect(index.splitByDeviationFromStraightLine_Cubic).toBe(splitByDeviationFromStraightLine_Cubic);
    });

    it('should return [0,1] for points and lines', function() {
        expect(splitByDeviationFromStraightLine([[1,2]], 0.1)).toEqual([0,1]);
        expect(splitByDeviationFromStraightLine([[1,2],[3,4]], 0.1)).toEqual([0,1]);
    });

    it('should dispatch quadratics to the quad splitter', function() {
        const ps = getRandomQuad(1);
        expect(splitByDeviationFromStraightLine(ps, 0.5))
            .toEqual(splitByDeviationFromStraightLine_Quad(ps, 0.5));
    });

    it('should dispatch cubics to the cubic splitter', function() {
        const ps = getRandomCubic(1);
        expect(splitByDeviationFromStraightLine(ps, 0.5))
            .toEqual(splitByDeviationFromStraightLine_Cubic(ps, 0.5));
    });

    it('should throw for bezier order > 3', function() {
        expect(() => splitByDeviationFromStraightLine([[0,0],[1,1],[2,2],[3,3],[4,4]], 0.1))
            .toThrow();
    });
});
