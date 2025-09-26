import { updDs } from './upd-ds.js';
import { checkResults } from './check-results.js';
import { bezierBezierIntersectionFast, X } from '../../../src/index.js';
import { expect } from 'chai';


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

        expect(xPairs.length).to.eql(tss.length);
        
        updDs(ds, xPairs, tss.map(ts => ts[0]));
    }

    checkResults(ds, total);
}


export { geo }
