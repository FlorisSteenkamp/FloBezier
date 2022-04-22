import { bezierBezierIntersection, X } from "../../../src/index.js";


function native(pss: number[][][]): X[][][] {
    const xss: X[][][] = [];

    for (let i=0; i<pss.length; i++, i++) {
        xss.push(bezierBezierIntersection(pss[i], pss[i+1]));
    }

    return xss;
}


export { native }
