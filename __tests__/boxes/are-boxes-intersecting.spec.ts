import { describe, expect, it } from '@jest/globals';
import { areBoxesIntersecting } from '../../src/index.js';


describe('areBoxesIntersecting', function() {

    const someBoxes = [
        [[1,1],[5,7]],   // box 0
        [[1,1],[2,2]],   // box 1
        [[6,8],[10,10]], // box 2
        [[2,2],[1,1]]    // box 3
    ];


    const pointBox11 = [[1,1],[1,1]];
    const craftedBoxes = [
        [[-1,-1],[-2,-2]],  // 0
        [[+1,+1],[-1,-1]],  // 1
        [[0,0],[1,1]],      // 2
        [[0,1],[-1,2]],     // 3
        [[-0.3,1],[-1,-2]], // 4
        [[3,3],[-0.3,-5]]   // 5
    ];

    const boxPairs = {
        cornersTouch1: [craftedBoxes[0],craftedBoxes[1]] as const,
        cornersTouch2: [craftedBoxes[2],craftedBoxes[3]] as const,
        sidesTouch1:   [craftedBoxes[4],craftedBoxes[5]] as const,
    }

    it('it should correctly check that \'open\' boxes with coinciding sides / corners don\' t intersect', 
    function() {
        expect(areBoxesIntersecting(false, ...boxPairs.cornersTouch1)).toBe(false);
        expect(areBoxesIntersecting(false, ...boxPairs.cornersTouch2)).toBe(false);
        expect(areBoxesIntersecting(false, ...boxPairs.sidesTouch1)).toBe(false);
    });

    it('it should correctly check that \'closed\' boxes with coinciding sides / corners do intersect', 
    function() {
        expect(areBoxesIntersecting(true, ...boxPairs.cornersTouch1)).toBe(true);
        expect(areBoxesIntersecting(true, ...boxPairs.cornersTouch2)).toBe(true);
        expect(areBoxesIntersecting(true, ...boxPairs.sidesTouch1)).toBe(true);
    });

    it('it should correctly check if some \'open\' boxes are intersecting or not', 
    function() {
        expect(areBoxesIntersecting(false, someBoxes[0], someBoxes[0])).toBe(true);
        expect(areBoxesIntersecting(false, someBoxes[0], someBoxes[1])).toBe(true);
        expect(areBoxesIntersecting(false, someBoxes[0], someBoxes[2])).toBe(false);
        expect(areBoxesIntersecting(false, someBoxes[0], someBoxes[3])).toBe(true);

        expect(areBoxesIntersecting(false, someBoxes[1], someBoxes[0])).toBe(true);
        expect(areBoxesIntersecting(false, someBoxes[1], someBoxes[1])).toBe(true);
        expect(areBoxesIntersecting(false, someBoxes[1], someBoxes[2])).toBe(false);
        expect(areBoxesIntersecting(false, someBoxes[1], someBoxes[3])).toBe(true);

        expect(areBoxesIntersecting(false, someBoxes[2], someBoxes[0])).toBe(false);
        expect(areBoxesIntersecting(false, someBoxes[2], someBoxes[1])).toBe(false);
        expect(areBoxesIntersecting(false, someBoxes[2], someBoxes[2])).toBe(true);
        expect(areBoxesIntersecting(false, someBoxes[2], someBoxes[3])).toBe(false);

        expect(areBoxesIntersecting(false, someBoxes[3], someBoxes[0])).toBe(true);
        expect(areBoxesIntersecting(false, someBoxes[3], someBoxes[1])).toBe(true);
        expect(areBoxesIntersecting(false, someBoxes[3], someBoxes[2])).toBe(false);
        expect(areBoxesIntersecting(false, someBoxes[3], someBoxes[3])).toBe(true);
    });

    it('it should correctly check if some \'open\' boxes are intersecting or not', 
    function() {
        expect(areBoxesIntersecting(true, someBoxes[0], someBoxes[0])).toBe(true);
        expect(areBoxesIntersecting(true, someBoxes[0], someBoxes[1])).toBe(true);
        expect(areBoxesIntersecting(true, someBoxes[0], someBoxes[2])).toBe(false);
        expect(areBoxesIntersecting(true, someBoxes[0], someBoxes[3])).toBe(true);

        expect(areBoxesIntersecting(true, someBoxes[1], someBoxes[0])).toBe(true);
        expect(areBoxesIntersecting(true, someBoxes[1], someBoxes[1])).toBe(true);
        expect(areBoxesIntersecting(true, someBoxes[1], someBoxes[2])).toBe(false);
        expect(areBoxesIntersecting(true, someBoxes[1], someBoxes[3])).toBe(true);

        expect(areBoxesIntersecting(true, someBoxes[2], someBoxes[0])).toBe(false);
        expect(areBoxesIntersecting(true, someBoxes[2], someBoxes[1])).toBe(false);
        expect(areBoxesIntersecting(true, someBoxes[2], someBoxes[2])).toBe(true);
        expect(areBoxesIntersecting(true, someBoxes[2], someBoxes[3])).toBe(false);

        expect(areBoxesIntersecting(true, someBoxes[3], someBoxes[0])).toBe(true);
        expect(areBoxesIntersecting(true, someBoxes[3], someBoxes[1])).toBe(true);
        expect(areBoxesIntersecting(true, someBoxes[3], someBoxes[2])).toBe(false);
        expect(areBoxesIntersecting(true, someBoxes[3], someBoxes[3])).toBe(true);
    });
});
