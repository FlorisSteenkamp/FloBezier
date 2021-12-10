import * as Paper from 'paper' ;
import { settings } from './settings.js'; 
import { draw, ctx } from './draw-stuff.js';
import { X } from "../../src/index.js";
import { showResults } from './show-results.js';
import { updDs } from './upd-ds.js';


const { num, timingOnly } = settings;


function doPaper(
        curves: any, 
        xss: (X[][] | undefined)[]) {

    let total = 0;
    const ds: number[] = [];
    let timing: number;

    const timeStart = performance.now();
    for (let i=0; i<2*num; i++, i++) {
        const curve1 = curves[i];
        const curve2 = curves[i+1];
        const _ts = curve1.getIntersections(curve2);
        total += _ts.length;

        if (!timingOnly) {
            const ts = _ts.map((t: any) => t.time) as number[];
            const xs = xss[i/2];

            updDs(ds, xs!, ts);
        }
    }
    timing = performance.now() - timeStart;

    showResults('paper', timingOnly, timing, ds, total);
}



function closestD() {
    //for (const t of ts) {
    //    const p = [t.point.x, t.point.y];
    //    const bp = closestPointOnBezierPrecise(pss[i+1], p);
    //    const d = distanceBetween(p, bp.p);
    //    dsPaper.push(d);
    //}
}


export { doPaper }
