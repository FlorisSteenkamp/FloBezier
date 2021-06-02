import { settings } from './settings'; 
import { draw, ctx } from './draw-stuff';
import { X } from "../../src";
import * as Paper from 'paper' ;
import { showResults } from './show-results';
import { updDs } from './upd-ds';


const { num, timingOnly } = settings;


function doPaper(
        curves: any, 
        xss: X[][][]) {

    let total = 0;
    const ds: number[] = [];
    let timing: number;

    const timeStart = performance.now();
    for (let i=0; i<num; i++) {
        const curve1 = curves[i];
        const curve2 = curves[i+1];
        const _ts = curve1.getIntersections(curve2);
        total += _ts.length;

        if (!timingOnly) {
            const ts = _ts.map((t: any) => t.time) as number[];
            const xs = xss[i];

            updDs(ds, xs, ts);
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
