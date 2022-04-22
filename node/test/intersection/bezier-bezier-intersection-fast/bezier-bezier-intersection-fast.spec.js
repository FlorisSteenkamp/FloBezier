import { getPss } from '../../helpers/intersection/get-pss.js';
import { native } from '../../helpers/intersection-fast/native.js';
import { geo } from '../../helpers/intersection-fast/geo.js';
globalThis.__debug__ = { already: false, uid: 0, maxItersCount: 0 };
describe('bezier3Intersection', function () {
    it('it should accurately find intersections between pairs of bezier curves using fast geo clipping', function () {
        const pss = getPss();
        const xss = native(pss);
        geo(pss, xss);
    });
});
//# sourceMappingURL=bezier-bezier-intersection-fast.spec.js.map