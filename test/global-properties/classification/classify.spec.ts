import { expect, assert } from 'chai';
import { describe } from 'mocha';
import { classification, classifications, classify, cubicToQuadratic, fromPowerBasis, getXY, toCubic } from '../../../src/index.js';

// The classifications form an equivalence class, in other words *all* 
// possible planar polynomial bezier curves (of order <= 3) are represented and 
// all options are mutually exclusive.


describe('classify', function() {
    it('it should correctly classify some beziers curves', 
	function() {
        {
		    const ps = [[1,1]];

            expect(classification.isPoint(ps)).to.be.true;
            expect(classify(ps)).to.eql(classifications.point);
            expect(classify(ps)).to.eql({ order: 0, realOrder: 0, collinear: true, nodeType: 'n/a' });
        }

        {
		    const ps = [[1,1],[2,2]];

            expect(classification.isLineGeneral(ps)).to.be.true;
            expect(classify(ps)).to.eql(classifications.lineGeneral);
            expect(classify(ps)).to.eql({ order: 1, realOrder: 1, collinear: true, nodeType: 'n/a' });
        }

        {
		    const ps = [[1,1],[1,1]];

            expect(classification.isLineDegenPoint(ps)).to.be.true;
            expect(classify(ps)).to.eql(classifications.lineDegenPoint);
            expect(classify(ps)).to.eql({ order: 1, realOrder: 0, collinear: true, nodeType: 'n/a' });
        }

        {
		    const ps = [[1,1],[2,2],[3,4]];

            expect(classification.isQuadGeneral(ps)).to.be.true;
            expect(classify(ps)).to.eql(classifications.quadGeneral);
            expect(classify(ps)).to.eql({ order: 2, realOrder: 2, collinear: false, nodeType: 'n/a' });
        }

        {
		    const ps = [[1,1],[2,2],[4,4]];

            expect(classification.isQuadDegenCollinear(ps)).to.be.true;
            expect(classify(ps)).to.eql(classifications.quadDegenCollinear);
            expect(classify(ps)).to.eql({ order: 2, realOrder: 2, collinear: true, nodeType: 'n/a' });
        }

        {
		    const ps = [[1,1],[2,2],[3,3]];

            expect(classification.isQuadDegenLine(ps)).to.be.true;
            expect(classify(ps)).to.eql(classifications.quadDegenLine);
            expect(classify(ps)).to.eql({ order: 2, realOrder: 1, collinear: true, nodeType: 'n/a' });
        }

        {
		    const ps = [[1,1],[1,1],[1,1]];

            expect(classification.isQuadDegenPoint(ps)).to.be.true;
            expect(classify(ps)).to.eql(classifications.quadDegenPoint);
            expect(classify(ps)).to.eql({ order: 2, realOrder: 0, collinear: true, nodeType: 'n/a' });
        }

        {
		    // Crunode but not intersecting for `t in [0,1]`
			const ps1 = [[0,0],[3,3],[-3,3],[0,1]];

            expect(classification.isCubicGeneralCrunode(ps1)).to.be.true;
            expect(classify(ps1)).to.eql(classifications.cubicGeneralCrunode);
            expect(classify(ps1)).to.eql({ order: 3, realOrder: 3, collinear: false, nodeType: 'crunode' });

            // Crunode and intersecting for `t in [0,1]`
            const ps2 = [[0,0],[3,3],[-3,3],[1,0]];
            expect(classification.isCubicGeneralCrunode(ps2)).to.be.true;
        }

        {
		    const ps1 = [[0,0],[5,3],[2,3],[4,0]];

            expect(classification.isCubicGeneralAcnode(ps1)).to.be.true;
            expect(classify(ps1)).to.eql(classifications.cubicGeneralAcnode);
            expect(classify(ps1)).to.eql({ order: 3, realOrder: 3, collinear: false, nodeType: 'acnode' });

            const ps2 = [[1,3],[5,-3],[-2,3],[4,-2]];
            expect(classification.isCubicGeneralAcnode(ps2)).to.be.true;
        }

        {
		    const ps = [[0,0],[6,4],[-0,4],[6,0]];

            expect(classification.isCubicGeneralCusp(ps)).to.be.true;
            expect(classify(ps)).to.eql(classifications.cubicGeneralCusp);
            expect(classify(ps)).to.eql({ order: 3, realOrder: 3, collinear: false, nodeType: 'cusp' });
        }

        {
            const ps = fromPowerBasis([[0,0,3,0],[6,-9,3,-6]]).map(p => [p[0],p[1] + 6]); 
            //=> [[0,0],[1,1],[2,-1],[3,0]]

            expect(classification.isCubicGeneralExplicit(ps)).to.be.true;
            expect(classify(ps)).to.eql(classifications.cubicGeneralExplicit);
            expect(classify(ps)).to.eql({ order: 3, realOrder: 3, collinear: false, nodeType: 'explicit' });
        }

        {
		    const ps = [[1,1],[2,2],[3,3],[5,5]];

            expect(classification.isCubicDegenCollinearCubic(ps)).to.be.true;
            expect(classify(ps)).to.eql(classifications.cubicDegenCollinearCubic);
            expect(classify(ps)).to.eql({ order: 3, realOrder: 3, collinear: true, nodeType: 'n/a' });
        }

        {
		    // const ps = cubicToQuadratic([[0,0],[1,1],[2,1],[3,0]]);
            //=> [[0,0],[1.5,1.5],[3,0]]
            const ps = [[0,0],[1,1],[2,1],[3,0]];

            expect(classification.isCubicDegenQuad(ps)).to.be.true;
            expect(classify(ps)).to.eql(classifications.cubicDegenQuad);
            expect(classify(ps)).to.eql({ order: 3, realOrder: 2, collinear: false, nodeType: 'n/a' });
        }

        {
		    const ps = toCubic([[0,0],[3,3],[18,18]]);
            //=> [[0,0],[2,2],[8,8],[18,18]]

            expect(classification.isCubicDegenCollinearQuad(ps)).to.be.true;
            expect(classify(ps)).to.eql(classifications.cubicDegenCollinearQuad);
            expect(classify(ps)).to.eql({ order: 3, realOrder: 2, collinear: true, nodeType: 'n/a' });
        }

        {
		    const ps = [[1,1],[2,2],[3,3],[4,4]];

            expect(classification.isCubicDegenLine(ps)).to.be.true;
            expect(classify(ps)).to.eql(classifications.cubicDegenLine);
            expect(classify(ps)).to.eql({ order: 3, realOrder: 1, collinear: true, nodeType: 'n/a' });
        }

        {
		    const ps = [[1,1],[1,1],[1,1],[1,1]];

            expect(classification.isCubicDegenPoint(ps)).to.be.true;
            expect(classify(ps)).to.eql(classifications.cubicDegenPoint);
            expect(classify(ps)).to.eql({ order: 3, realOrder: 0, collinear: true, nodeType: 'n/a' });
        }

        {
		    const ps = [[1,1],[1,1],[1,1],[1,1],[3,3]];

            expect(() => classify(ps)).to.throw();
        }
	});
});
