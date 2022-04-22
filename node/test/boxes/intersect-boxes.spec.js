import { expect } from 'chai';
import { describe } from 'mocha';
import { intersectBoxes } from '../../src/index.js';
describe('intersectBoxes', function () {
    const someBoxes = [
        [[1, 1], [5, 7]],
        [[1, 1], [2, 2]],
        [[6, 8], [10, 10]],
        [[2, 2], [1, 1]] // box 3
    ];
    const pointBox11 = [[1, 1], [1, 1]];
    const pointBox22 = [[2, 2], [2, 2]];
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
    it('it should correctly intersect two boxes for some boxes', function () {
        expect(intersectBoxes(pointBox11, pointBox11)).to.eql(pointBox11);
        expect(intersectBoxes(pointBox22, pointBox22)).to.eql(pointBox22);
        expect(intersectBoxes(someBoxes[0], someBoxes[1])).to.eql(someBoxes[1]);
        expect(intersectBoxes(someBoxes[0], someBoxes[2])).to.eql(undefined);
        expect(intersectBoxes(...boxPairs.cornersTouch1)).to.eql([[-1, -1], [-1, -1]]);
        expect(intersectBoxes(...boxPairs.sidesTouch1)).to.eql([[-0.3, -2], [-0.3, 1]]);
    });
});
//# sourceMappingURL=intersect-boxes.spec.js.map