import { bezier3Intersection, evaluate, toString, X } from '../../../src/index';
import { settings } from '../settings'; 
import { draw, ctx } from '../draw-stuff';
import { unsquashp, untransp } from '../affine';
import { updDs } from '../upd-ds';
import { showResults } from '../show-results';
import { __debug__ } from '../../../src/intersection/bezier3-intersection/debug';
import { renderTree } from './render-tree';


const { tc, num, timingOnly, showGeoXs, showGeoIters } = settings;
//const { dot_, fatline_, geo_, beziers_ } = draw(ctx);

const abs = Math.abs;

/**
 * 
 * @param pss 
 * @param xss the actual accurately calculated correct intersections
 * @param timingOnly 
 * @param drawXs 
 */
function geo(
        pss: number[][][], 
        xss: X[][][]) {

    let total = 0;
    let timing: number;
    const ds: number[] = [];
    
    const timeStart = performance.now();
    for (let i=0; i<num; i++) {
        const ps1 = pss[i];
        const ps2 = pss[i+1];

        //const ts = bezier3Intersection(ps1, ps2, 1e-10);
        const tss = bezier3Intersection(ps1, ps2);

        total += tss.length;
        //console.log(tss)

        if (showGeoXs && i < 1) { drawIntersectionsGeo(tss, ps1); }

        if (!timingOnly) {
            const xs = xss[i];
            const ts_ = tss.filter(t => t[0] !== undefined);

            const res = updDs(ds, xs, ts_.map(t => t[0]));

            if (!res) {
                console.log(toString(ps1));
                console.log(toString(ps2));
                console.log('----');
            }
        }
    }
    timing = performance.now() - timeStart;

    showResults('geo', timingOnly, timing, ds, total);
    //console.log('total', total)

    if (typeof __debug__ !== 'undefined' && showGeoIters) {
        renderTree(__debug__.tree);
    } 
}


function createCanvas(pdiv: HTMLDivElement): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 384;
    //canvas.width = 6;
    //canvas.height = 4;
    canvas.className = 'some-canvas';
    pdiv.appendChild(canvas);

    return canvas;
}



function drawIntersectionsGeo(ts: number[][], ps: number[][]) {
    //if (!ris) { return; }
    //ris.map(t => dot_1(tc(evaluate(ps2, mid(t)))));
    const { dot_ } = draw(ctx);

    ts.map(t => {
        const _p = evaluate(ps, t[0]);
        const p = tc(unsquashp(untransp(_p)));

        dot_(p);
    });
}


/*
for (const t of ts) {
    //const p = evaluate(ps1, tPair[0]);
    //console.log(t)

    if (t === undefined) { continue; }

    //const p = evaluate(ps1, t);
    //const bp = closestPointOnBezierPrecise(ps2, p);
    //const d = distanceBetween(p, bp.p);
    //dsGeo.push(d);
}
*/


export { geo }
