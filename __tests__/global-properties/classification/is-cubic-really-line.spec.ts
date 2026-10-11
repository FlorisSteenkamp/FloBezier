import { describe, expect, it } from '@jest/globals';
import { evalDeCasteljau } from '../../../src/local-properties-at-t/evaluate/double/eval-de-casteljau.js';
import { isCollinear } from '../../../src/global-properties/classification/is-collinear.js';
import { isCubicReallyLine } from '../../../src/global-properties/classification/is-cubic-really-line.js';
import { toCubic } from '../../../src/transformation/degree-or-type/to-cubic.js';
import { getRandomBezier } from '../../helpers/get-random-bezier.js';

const eps = Number.EPSILON;
const u = eps/2;


function getLineCubic(seed: number) {
    const _ps = getRandomBezier(128, 52)(1)(seed);
    return toCubic(_ps.map(p => p.map(c => 3*c)));
}


describe('isCubicReallyLine', function() {
    it('it should correctly check that some cubic beziers really is a line in disguise or not', 
    function() {
        {
            const ps = [[1,1],[2,2],[4,4],[8.5,8.5]];
            expect(isCubicReallyLine(ps)).toEqual(false);
        }
        {
            const ps = [[1,1],[2,2],[4,4],[3,3]];
            expect(isCubicReallyLine(ps)).toEqual(false);
        }
        {
            // a point is also a line
            const ps = [[3,3],[3,3],[3,3],[3,3]];
            expect(isCubicReallyLine(ps)).toEqual(true);
        }
        {
            // collinear but not a line (even though the points at t = 0, 0.5
            // and 1 happen to lie on the line - at t = 0.25 they don't)
            const ps = [[1,1],[1,1],[3,3],[3,3]];
            expect(isCubicReallyLine(ps)).toEqual(false);
            //evalDeCasteljau(ps,0)[0]    //=> 1
            //evalDeCasteljau(ps,0.25)[0] //=> 1.3125 (a line would give 1.5)
            //evalDeCasteljau(ps,0.5)[0]  //=> 2
            //evalDeCasteljau(ps,1)[0]    //=> 3
        }
        {
            // collinear (with `x0 + x3 === x1 + x2`) but not a line
            const ps = [[0,0],[0,0],[3,0],[3,0]];
            expect(isCubicReallyLine(ps)).toEqual(false);
        }
        {
            // collinear and folds back on itself twice - not a line
            const ps = [[0,0],[3,0],[0,0],[3,0]];
            expect(isCubicReallyLine(ps)).toEqual(false);
        }
        {
            // a line with equally spaced control points
            const ps = [[0,0],[1,0],[2,0],[3,0]];
            expect(isCubicReallyLine(ps)).toEqual(true);
        }
        {
            // collinear but not a line
            const ps = [[1,1],[3,3],[3,3],[3,3]];
            expect(isCubicReallyLine(ps)).toEqual(false);
            //evalDeCasteljau(ps,0)[0]   //=> 1
            //evalDeCasteljau(ps,0.5)[0] //=> 2.75
            //evalDeCasteljau(ps,1)[0]   //=> 3
        }
        {
            const ps = getLineCubic(0);
            expect(isCollinear(ps)).toEqual(true);
            expect(isCubicReallyLine(ps)).toEqual(true);
            //evalDeCasteljau(ps,0)[0]    //=> -325.4905952033067
            //evalDeCasteljau(ps,0.5)[0]  //=> -182.24064036735228
            //evalDeCasteljau(ps,1)[0]    //=> -38.990685531397844
            //-325.4905952033067 - -182.24064036735228;  //=> -143.24995483595444
            //-182.24064036735228 - -38.990685531397844  //=> -143.24995483595444
        }
    });
});
