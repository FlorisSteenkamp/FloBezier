import { describe, expect, it } from '@jest/globals';
import { classification, classifications, classify, cubicToQuadratic, fromPowerBasis, toPowerBasis, toCubic } from '../../../src/index.js';

// The classifications form an equivalence class, in other words *all* 
// possible planar polynomial bezier curves (of order <= 3) are represented and 
// all options are mutually exclusive.


describe('classify', function() {
    it('it should correctly classify some beziers curves', 
    function() {
        {
            const ps = [[1,1]];

            expect(classification.isPoint(ps)).toEqual(true);
            expect(classify(ps)).toEqual(classifications.point);
            expect(classify(ps)).toEqual({ order: 0, realOrder: 0, collinear: true, nodeType: 'n/a' });
        }

        {
            const ps = [[1,1],[2,2]];

            expect(classification.isLineGeneral(ps)).toEqual(true);
            expect(classify(ps)).toEqual(classifications.lineGeneral);
            expect(classify(ps)).toEqual({ order: 1, realOrder: 1, collinear: true, nodeType: 'n/a' });
        }

        {
            const ps = [[1,1],[1,1]];

            expect(classification.isLineDegenPoint(ps)).toEqual(true);
            expect(classify(ps)).toEqual(classifications.lineDegenPoint);
            expect(classify(ps)).toEqual({ order: 1, realOrder: 0, collinear: true, nodeType: 'n/a' });
        }

        {
            const ps = [[1,1],[2,2],[3,4]];

            expect(classification.isQuadGeneral(ps)).toEqual(true);
            expect(classify(ps)).toEqual(classifications.quadGeneral);
            expect(classify(ps)).toEqual({ order: 2, realOrder: 2, collinear: false, nodeType: 'n/a' });
        }

        {
            const ps = [[1,1],[2,2],[4,4]];

            expect(classification.isQuadDegenCollinear(ps)).toEqual(true);
            expect(classify(ps)).toEqual(classifications.quadDegenCollinear);
            expect(classify(ps)).toEqual({ order: 2, realOrder: 2, collinear: true, nodeType: 'n/a' });
        }

        {
            const ps = [[1,1],[2,2],[3,3]];

            expect(classification.isQuadDegenLine(ps)).toEqual(true);
            expect(classify(ps)).toEqual(classifications.quadDegenLine);
            expect(classify(ps)).toEqual({ order: 2, realOrder: 1, collinear: true, nodeType: 'n/a' });
        }

        {
            const ps = [[1,1],[1,1],[1,1]];

            expect(classification.isQuadDegenPoint(ps)).toEqual(true);
            expect(classify(ps)).toEqual(classifications.quadDegenPoint);
            expect(classify(ps)).toEqual({ order: 2, realOrder: 0, collinear: true, nodeType: 'n/a' });
        }

        {
            // Crunode but not intersecting for `t in [0,1]`
            const ps1 = [[0,0],[3,3],[-3,3],[0,1]];

            expect(classification.isCubicGeneralCrunode(ps1)).toEqual(true);
            expect(classify(ps1)).toEqual(classifications.cubicGeneralCrunode);
            expect(classify(ps1)).toEqual({ order: 3, realOrder: 3, collinear: false, nodeType: 'crunode' });

            // Crunode and intersecting for `t in [0,1]`
            const ps2 = [[0,0],[3,3],[-3,3],[1,0]];
            expect(classification.isCubicGeneralCrunode(ps2)).toEqual(true);
        }

        {
            const ps1 = [[0,0],[5,3],[2,3],[4,0]];

            expect(classification.isCubicGeneralAcnode(ps1)).toEqual(true);
            expect(classify(ps1)).toEqual(classifications.cubicGeneralAcnode);
            expect(classify(ps1)).toEqual({ order: 3, realOrder: 3, collinear: false, nodeType: 'acnode' });

            const ps2 = [[1,3],[5,-3],[-2,3],[4,-2]];
            expect(classification.isCubicGeneralAcnode(ps2)).toEqual(true);
        }

        {
            const ps = [[0,0],[6,4],[-0,4],[6,0]];

            expect(classification.isCubicGeneralCusp(ps)).toEqual(true);
            expect(classify(ps)).toEqual(classifications.cubicGeneralCusp);
            expect(classify(ps)).toEqual({ order: 3, realOrder: 3, collinear: false, nodeType: 'cusp' });
        }

        {
            const ps = fromPowerBasis([[0,0,3,0],[6,-9,3,-6]]).map(p => [p[0],p[1] + 6]); 
            //=> [[0,0],[1,1],[2,-1],[3,0]]

            expect(classification.isCubicGeneralExplicit(ps)).toEqual(true);
            expect(classify(ps)).toEqual(classifications.cubicGeneralExplicit);
            expect(classify(ps)).toEqual({ order: 3, realOrder: 3, collinear: false, nodeType: 'explicit' });
        }

        {
            const ps = [[1,1],[2,2],[3,3],[5,5]];

            expect(classification.isCubicDegenCollinearCubic(ps)).toEqual(true);
            expect(classify(ps)).toEqual(classifications.cubicDegenCollinearCubic);
            expect(classify(ps)).toEqual({ order: 3, realOrder: 3, collinear: true, nodeType: 'n/a' });
        }

        {
            // const ps = cubicToQuadratic([[0,0],[1,1],[2,1],[3,0]]);
            //=> [[0,0],[1.5,1.5],[3,0]]
            const ps = [[0,0],[1,1],[2,1],[3,0]];

            expect(classification.isCubicDegenQuad(ps)).toEqual(true);
            expect(classify(ps)).toEqual(classifications.cubicDegenQuad);
            expect(classify(ps)).toEqual({ order: 3, realOrder: 2, collinear: false, nodeType: 'n/a' });
        }

        {
            const ps = toCubic([[0,0],[3,3],[18,18]]);
            //=> [[0,0],[2,2],[8,8],[18,18]]

            expect(classification.isCubicDegenCollinearQuad(ps)).toEqual(true);
            expect(classify(ps)).toEqual(classifications.cubicDegenCollinearQuad);
            expect(classify(ps)).toEqual({ order: 3, realOrder: 2, collinear: true, nodeType: 'n/a' });
        }

        {
            const ps = [[1,1],[2,2],[3,3],[4,4]];

            expect(classification.isCubicDegenLine(ps)).toEqual(true);
            expect(classify(ps)).toEqual(classifications.cubicDegenLine);
            expect(classify(ps)).toEqual({ order: 3, realOrder: 1, collinear: true, nodeType: 'n/a' });
        }

        {
            const ps = [[1,1],[1,1],[1,1],[1,1]];

            expect(classification.isCubicDegenPoint(ps)).toEqual(true);
            expect(classify(ps)).toEqual(classifications.cubicDegenPoint);
            expect(classify(ps)).toEqual({ order: 3, realOrder: 0, collinear: true, nodeType: 'n/a' });
        }

        {
            const ps = [[1,1],[1,1],[1,1],[1,1],[3,3]];

            expect(() => classify(ps)).toThrow();
        }
    });
});
