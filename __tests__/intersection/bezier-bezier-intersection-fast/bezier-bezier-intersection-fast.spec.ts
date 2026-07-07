import { describe, expect, it } from '@jest/globals';
import { getPss } from '../../helpers/intersection/get-pss.js';
import { native } from '../../helpers/intersection-fast/native.js';
import { geo } from '../../helpers/intersection-fast/geo.js';

// the below is simply to increase coverage accuracy by activating debugging
(globalThis as any).__debug__ = { already: false, tree: undefined, currentIter: undefined as never, uid: 0, maxItersCount: 0 };
    

describe('bezier3Intersection', function() {
    it('it should accurately find intersections between pairs of bezier curves using fast geo clipping',
    function() {
        const pss = getPss();
        const xss = native(pss);
        
        geo(pss, xss);
    });
});
