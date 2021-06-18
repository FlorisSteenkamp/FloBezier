import { getOtherTs2 } from './get-other-ts-2';
import { bezierBezierIntersectionBoundless } from './bezier-bezier-intersection-boundless';
import { X } from '../../../src';


function bezierBezierIntersection2(
        ps1: number[][], 
        ps2: number[][]): X[][] {

    const rs = bezierBezierIntersectionBoundless(ps1, ps2);

    const xs = getOtherTs2(ps1, ps2, rs);

    return xs;
}


export { bezierBezierIntersection2 }
