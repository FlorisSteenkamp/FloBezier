import { assert } from 'chai';
import { describe } from 'mocha';
import { areBoxesIntersecting } from '../../src/index.js';
describe('areBoxesIntersecting', function () {
    const areBoxesIntersectingOpen = areBoxesIntersecting(false);
    const areBoxesIntersectingClosed = areBoxesIntersecting(true);
    const someBoxes = [
        [[1, 1], [5, 7]],
        [[1, 1], [2, 2]],
        [[6, 8], [10, 10]],
        [[2, 2], [1, 1]] // box 3
    ];
    const pointBox11 = [[1, 1], [1, 1]];
    const craftedBoxes = [
        [[-1, -1], [-2, -2]],
        [[+1, +1], [-1, -1]],
        [[0, 0], [1, 1]],
        [[0, 1], [-1, 2]],
        [[-0.3, 1], [-1, -2]],
        [[3, 3], [-0.3, -5]] // 5
    ];
    const boxPairs = {
        cornersTouch1: [craftedBoxes[0], craftedBoxes[1]],
        cornersTouch2: [craftedBoxes[2], craftedBoxes[3]],
        sidesTouch1: [craftedBoxes[4], craftedBoxes[5]],
    };
    it('it should correctly check that \'open\' boxes with coinciding sides / corners don\' t intersect', function () {
        assert(!areBoxesIntersectingOpen(...boxPairs.cornersTouch1));
        assert(!areBoxesIntersectingOpen(...boxPairs.cornersTouch2));
        assert(!areBoxesIntersectingOpen(...boxPairs.sidesTouch1));
    });
    it('it should correctly check that \'closed\' boxes with coinciding sides / corners do intersect', function () {
        assert(areBoxesIntersectingClosed(...boxPairs.cornersTouch1));
        assert(areBoxesIntersectingClosed(...boxPairs.cornersTouch2));
        assert(areBoxesIntersectingClosed(...boxPairs.sidesTouch1));
    });
    it('it should correctly check if some \'open\' boxes are intersecting or not', function () {
        assert(areBoxesIntersectingOpen(someBoxes[0], someBoxes[0]));
        assert(areBoxesIntersectingOpen(someBoxes[0], someBoxes[1]));
        assert(!areBoxesIntersectingOpen(someBoxes[0], someBoxes[2]));
        assert(areBoxesIntersectingOpen(someBoxes[0], someBoxes[3]));
        assert(areBoxesIntersectingOpen(someBoxes[1], someBoxes[0]));
        assert(areBoxesIntersectingOpen(someBoxes[1], someBoxes[1]));
        assert(!areBoxesIntersectingOpen(someBoxes[1], someBoxes[2]));
        assert(areBoxesIntersectingOpen(someBoxes[1], someBoxes[3]));
        assert(!areBoxesIntersectingOpen(someBoxes[2], someBoxes[0]));
        assert(!areBoxesIntersectingOpen(someBoxes[2], someBoxes[1]));
        assert(areBoxesIntersectingOpen(someBoxes[2], someBoxes[2]));
        assert(!areBoxesIntersectingOpen(someBoxes[2], someBoxes[3]));
        assert(areBoxesIntersectingOpen(someBoxes[3], someBoxes[0]));
        assert(areBoxesIntersectingOpen(someBoxes[3], someBoxes[1]));
        assert(!areBoxesIntersectingOpen(someBoxes[3], someBoxes[2]));
        assert(areBoxesIntersectingOpen(someBoxes[3], someBoxes[3]));
    });
    it('it should correctly check if some \'open\' boxes are intersecting or not', function () {
        assert(areBoxesIntersectingClosed(someBoxes[0], someBoxes[0]));
        assert(areBoxesIntersectingClosed(someBoxes[0], someBoxes[1]));
        assert(!areBoxesIntersectingClosed(someBoxes[0], someBoxes[2]));
        assert(areBoxesIntersectingClosed(someBoxes[0], someBoxes[3]));
        assert(areBoxesIntersectingClosed(someBoxes[1], someBoxes[0]));
        assert(areBoxesIntersectingClosed(someBoxes[1], someBoxes[1]));
        assert(!areBoxesIntersectingClosed(someBoxes[1], someBoxes[2]));
        assert(areBoxesIntersectingClosed(someBoxes[1], someBoxes[3]));
        assert(!areBoxesIntersectingClosed(someBoxes[2], someBoxes[0]));
        assert(!areBoxesIntersectingClosed(someBoxes[2], someBoxes[1]));
        assert(areBoxesIntersectingClosed(someBoxes[2], someBoxes[2]));
        assert(!areBoxesIntersectingClosed(someBoxes[2], someBoxes[3]));
        assert(areBoxesIntersectingClosed(someBoxes[3], someBoxes[0]));
        assert(areBoxesIntersectingClosed(someBoxes[3], someBoxes[1]));
        assert(!areBoxesIntersectingClosed(someBoxes[3], someBoxes[2]));
        assert(areBoxesIntersectingClosed(someBoxes[3], someBoxes[3]));
    });
});
//# sourceMappingURL=are-boxes-intersecting.spec.js.map