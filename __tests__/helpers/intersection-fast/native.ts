import { bezierBezierIntersection } from '../../../src/intersection/bezier-bezier-intersection/bezier-bezier-intersection.js';
import type { X } from '../../../src/intersection/bezier-bezier-intersection/x.js';


function native(pss: number[][][]): X[][] {
    const xss: X[][] = [];

    for (let i=0; i<pss.length; i++, i++) {
        xss.push(bezierBezierIntersection(pss[i], pss[i+1]));
    }

    return xss;
}


export { native }
