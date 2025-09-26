import { type __Debug__ } from '../../../src/intersection/bezier-bezier-intersection-fast/debug.js';
import { getPss } from '../../helpers/intersection/get-pss.js';
import { native } from '../../helpers/intersection-fast/native.js';
import { geo } from '../../helpers/intersection-fast/geo.js';

// the below is simply to increase coverage accuracy by activating debugging
declare var globalThis: typeof global & { __debug__: __Debug__ };
(globalThis.__debug__ as any) = { already: false, uid: 0, maxItersCount: 0 };
    

describe('bezier3Intersection', function() {
    it('it should accurately find intersections between pairs of bezier curves using fast geo clipping',
    function() {
        const pss = getPss();
        const xss = native(pss);
        
        geo(pss, xss);
    });
});
