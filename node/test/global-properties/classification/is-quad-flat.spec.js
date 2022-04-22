import { expect } from 'chai';
import { describe } from 'mocha';
import { hausdorffDistance, isQuadObtuse } from '../../../src/index.js';
import { isQuadFlat } from '../../../src/global-properties/classification/is-quad-flat.js';
describe('isQuadFlat (an internally used function)', function () {
    it("it should correctly check that some quadratic bezier curves are 'flat'", function () {
        {
            const ps = [[1, 1], [2, 2], [4, 4]];
            expect(isQuadFlat(ps)).to.be.true;
        }
        {
            const ps = [[1, 1], [2, 2], [4, 5]];
            expect(isQuadFlat(ps)).to.be.false;
        }
        {
            const ps = [[1, 1], [2, 2], [4, 4.03]];
            hausdorffDistance([ps[0], ps[2]], ps); //=> 0.0035179006479803686
            expect(isQuadFlat(ps, 0.00351)).to.be.false;
            expect(isQuadFlat(ps, 0.00352)).to.be.true;
        }
        {
            const ps = [[-127, 8], [79, 91], [20, 101]];
            // isQuadObtuse(ps);  //=> true
            hausdorffDistance([ps[0], ps[2]], ps); //=> 19.99732470209273
            expect(isQuadFlat(ps, 1)).to.be.false;
            expect(isQuadFlat(ps, 20)).to.be.false; // because it's obtuse
            expect(isQuadFlat(ps, 400)).to.be.false; // because it's obtuse
        }
        {
            const ps = [[-127, 8], [79, 91], [-127, 8]];
            isQuadObtuse(ps); //=> false
            hausdorffDistance([ps[0], ps[2]], ps); //=> 111.04616157256405
            // Math.sqrt(((79 - -127)/2)**2 + ((91 - 8)/2)**2);  //=> 111.04616157256405
            expect(isQuadFlat(ps, 1)).to.be.false;
            expect(isQuadFlat(ps, 111)).to.be.false;
            expect(isQuadFlat(ps, 111.05)).to.be.true;
        }
    });
});
//# sourceMappingURL=is-quad-flat.spec.js.map