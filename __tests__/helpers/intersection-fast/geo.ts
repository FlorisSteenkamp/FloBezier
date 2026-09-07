import { describe, expect, it } from '@jest/globals';
import type { X } from '../../../src/intersection/bezier-bezier-intersection/x.js';
import { updDs } from './upd-ds.js';
import { checkResults } from './check-results.js';
import { bezierBezierIntersectionFast } from '../../bezier-bezier-intersection-fast/bezier-bezier-intersection-fast.js';


/**
 * @param pss bezier curve pairs to check
 * @param xPairss the actual accurately calculated correct intersections
 */
function geo(
        pss: number[][][], 
        xPairss: X[][]) {

    let total = 0;
    const ds: number[] = [];
    
    for (let i=0; i<pss.length; i++, i++) {
        const psA = pss[i];
        const psB = pss[i+1];

        const tss = bezierBezierIntersectionFast(psA, psB);
        total += tss.length;
        const xPairs = xPairss[i/2];

        expect(xPairs.length).toEqual(tss.length);
        
        updDs(ds, xPairs, tss.map(ts => ts[0]));
    }

    checkResults(ds, total);
}


export { geo }
