import { describe, expect, it } from '@jest/globals';
import { intersectBoxes } from '../../src/index.js';


describe('intersectBoxes', function() {
    const someBoxes = [
        [[1,1],[5,7]],   // box 0
        [[1,1],[2,2]],   // box 1
        [[6,8],[10,10]], // box 2
        [[2,2],[1,1]]    // box 3
    ];


    const pointBox11 = [[1,1],[1,1]];
    const pointBox22 = [[2,2],[2,2]];
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

    it('it should correctly intersect two boxes for some boxes', 
    function() {
        expect(intersectBoxes(pointBox11, pointBox11)).toEqual(pointBox11);
        expect(intersectBoxes(pointBox22, pointBox22)).toEqual(pointBox22);
        expect(intersectBoxes(someBoxes[0],someBoxes[1])).toEqual(someBoxes[1]);
        expect(intersectBoxes(someBoxes[0],someBoxes[2])).toEqual(undefined);
        expect(intersectBoxes(...boxPairs.cornersTouch1)).toEqual([[-1,-1],[-1,-1]]);
        expect(intersectBoxes(...boxPairs.sidesTouch1)).toEqual([[-0.3,-2],[-0.3,1]]);
    });
});
