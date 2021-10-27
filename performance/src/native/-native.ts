import { bezierBezierIntersection, closestPointOnBezierCertified, X } from "../../../src/index";
import { settings } from '../settings'; 
import { distanceBetween } from "flo-vector2d";
import { showResults } from "../show-results";
import { drawIntersections } from './draw-intersections';


const { num } = settings;


const { timingOnly, showNativeXs } = settings;


function native(
        pss: number[][][]) {

    let total = 0;
    const ds: number[] = [];
    let timing: number;
    const xss: X[][][] = [];

    const timeStart = performance.now();
    for (let i=0; i<2*num; i++, i++) {
        const ps1 = pss[i];
        const ps2 = pss[i+1];

        const xs = bezierBezierIntersection(ps1, ps2);

        if (!xs) { 
            if (!timingOnly) {
                xss.push(undefined)
            }
            continue; 
        } 

        total += xs.length;

        if (showNativeXs && i < 1) {
            drawIntersections(xs);
        }
        if (!timingOnly) {
            for (const x of xs) {
                const box = x[0].box;
                const px = (box[1][0] + box[0][0])/2;
                const py = (box[1][1] + box[0][1])/2;
                const p = [px,py];
                const bp = closestPointOnBezierCertified(ps2, p)[0];
                const d = distanceBetween(p, bp.intervalBox[0]);
                ds.push(d);
            }
            xss.push(xs);
        }
    }
    timing = performance.now() - timeStart;

    showResults('native', true, timing, ds, total);

    return xss;
}


export { native }
    