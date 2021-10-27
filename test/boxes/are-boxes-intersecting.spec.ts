import { expect, assert } from 'chai';
import { describe } from 'mocha';
//import 'mocha';
import { fromPowerBasis, getXY, areBoxesIntersecting } from '../../src/index';


describe('are boxes intersecting', function() {
    it('it should correctly check if some boxes are intersecting or not', 
	function() {
        {
            const boxes = [
                [[1,1],[5,7]],   // box 0
                [[1,1],[2,2]],   // box 1
                [[6,8],[10,10]], // box 2
                [[2,2],[1,1]]    // box 3
            ];

            const areBoxesIntersectingOpen = areBoxesIntersecting(false);
            const areBoxesIntersectingClosed = areBoxesIntersecting(true);

            assert( areBoxesIntersectingOpen(boxes[0], boxes[0]));
            assert( areBoxesIntersectingOpen(boxes[0], boxes[1]));
            assert(!areBoxesIntersectingOpen(boxes[0], boxes[2]));
            assert( areBoxesIntersectingOpen(boxes[0], boxes[3]));

            assert( areBoxesIntersectingOpen(boxes[1], boxes[0]));
            assert( areBoxesIntersectingOpen(boxes[1], boxes[1]));
            assert(!areBoxesIntersectingOpen(boxes[1], boxes[2]));
            assert( areBoxesIntersectingOpen(boxes[1], boxes[3]));

            assert(!areBoxesIntersectingOpen(boxes[2], boxes[0]));
            assert(!areBoxesIntersectingOpen(boxes[2], boxes[1]));
            assert( areBoxesIntersectingOpen(boxes[2], boxes[2]));
            assert(!areBoxesIntersectingOpen(boxes[2], boxes[3]));

            assert( areBoxesIntersectingOpen(boxes[3], boxes[0]));
            assert( areBoxesIntersectingOpen(boxes[3], boxes[1]));
            assert(!areBoxesIntersectingOpen(boxes[3], boxes[2]));
            assert( areBoxesIntersectingOpen(boxes[3], boxes[3]));
        }
    });
});