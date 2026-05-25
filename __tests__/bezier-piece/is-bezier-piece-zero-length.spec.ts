import { assert, expect, use } from 'chai';
import { describe } from 'mocha';
import { isBezierPieceZeroLength } from '../../src/bezier-piece/is-bezier-piece-zero-length.js';
import { getRandomCubic, getRandomQuad, getRandomLine, getRandomPoint } from '../helpers/get-random-bezier.js';
import { nearly } from '../helpers/chai-extend-nearly.js';

use(nearly);


describe('isBezierPieceZeroLength', function() {
    it('should correctly identify zero-length bezier pieces', 
	function() {
        for (let i=0; i<10; i++) {
            const ps = getRandomPoint(i);
            const piece0 = { ps, ts: [0,0] };
            expect(isBezierPieceZeroLength(piece0)).to.be.true;
            const piece1 = { ps, ts: [0,1] };
            expect(isBezierPieceZeroLength(piece1)).to.be.true;
        }

        for (let i=0; i<10; i++) {
            const ps = getRandomLine(i);
            const piece0 = { ps, ts: [0,0] };
            expect(isBezierPieceZeroLength(piece0)).to.be.true;
            const piece1 = { ps, ts: [0,1] };
            expect(isBezierPieceZeroLength(piece1)).to.be.false;
        }

        for (let i=0; i<10; i++) {
            const ps = getRandomQuad(i);
            const piece0 = { ps, ts: [0,0] };
            expect(isBezierPieceZeroLength(piece0)).to.be.true;
            const piece1 = { ps, ts: [0,1] };
            expect(isBezierPieceZeroLength(piece1)).to.be.false;
        }

        for (let i=0; i<10; i++) {
            const ps = getRandomCubic(i);
            const piece0 = { ps, ts: [0,0] };
            expect(isBezierPieceZeroLength(piece0)).to.be.true;
            const piece1 = { ps, ts: [0,1] };
            expect(isBezierPieceZeroLength(piece1)).to.be.false;
        }

        {
            const ps = [[0,0],[0,0],[0,0],[0,0]];
            const piece = { ps, ts: [0,1] };
            expect(isBezierPieceZeroLength(piece)).to.be.true;
        }

        // Cubic bezier with different control points but same start
        // and end parameter should be zero length
        {
            const ps = [[1,2],[3,4],[5,6],[7,8]];
            const piece = { ps, ts: [0.3,0.3] };
            expect(isBezierPieceZeroLength(piece)).to.be.true;
        }

        // Cubic bezier with all control points the same but different start
        // and end parameter should be zero length
        {
            const ps = [[2,2],[2,2],[2,2],[2,2]];
            const piece = { ps, ts: [0.3,0.6] };
            expect(isBezierPieceZeroLength(piece)).to.be.true;
        }

        // Quadratic bezier with different control points but same start
        // and end parameter should be zero length
        {
            const ps = [[1,2],[3,4],[5,6]];
            const piece = { ps, ts: [0.3,0.3] };
            expect(isBezierPieceZeroLength(piece)).to.be.true;
        }

        // Quadratic bezier with all control points the same but different start
        // and end parameter should be zero length
        {
            const ps = [[2,2],[2,2],[2,2]];
            const piece = { ps, ts: [0.3,0.6] };
            expect(isBezierPieceZeroLength(piece)).to.be.true;
        }

        // Linear bezier with different control points but same start
        // and end parameter should be zero length
        {
            const ps = [[1,2],[3,4]];
            const piece = { ps, ts: [0.3,0.3] };
            expect(isBezierPieceZeroLength(piece)).to.be.true;
        }

        // Linear bezier with all control points the same but different start
        // and end parameter should be zero length
        {
            const ps = [[2,2],[2,2]];
            const piece = { ps, ts: [0.3,0.6] };
            expect(isBezierPieceZeroLength(piece)).to.be.true;
        }

        // Point bezier with same start and end parameter should be zero length
        {
            const ps = [[1,2]];
            const piece = { ps, ts: [0.3,0.3] };
            expect(isBezierPieceZeroLength(piece)).to.be.true;
        }

        // Point bezier with different start and end parameter should be zero length
        {
            const ps = [[1,2]];
            const piece = { ps, ts: [0.3,0.6] };
            expect(isBezierPieceZeroLength(piece)).to.be.true;
        }
    });
});
