import { toString } from "../../../src";
import { Fatline, IterationExtras } from "../../../src/intersection/bezier3-intersection/debug";
import { Iteration } from "../../../src/intersection/bezier3-intersection/iteration";
import { draw } from '../draw-stuff';
import { tcFatline } from './tc-fatline';
import { tcGeo } from './tc-geo';
import { tcPs } from './tc-ps';
import { log } from '../log';


function drawIterClipsToCanvas(
        canvas: HTMLCanvasElement,
        iter: Iteration & IterationExtras) {

    if (!canvas) { return; }

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 1280, 768);
    const { fatline_, geo_, beziers_ } = draw(ctx);
    
    if (!iter.F_ || !iter.G_) { return; }

    //console.log(toString(iter.F_.ps))
    //console.log(toString(iter.G_.ps))

    const { F_: F, G_: G, fatline, fatlinePerp, hq } = iter;

    const { minX, maxX, minY, maxY } = getExtents([
        ...F.ps, 
        ...G.ps, 
        ...getFatlinePs(fatline),
        ...(fatlinePerp ? getFatlinePs(fatlinePerp) : []),
        ...(hq as number[][])
    ]);

    //console.log(minX,maxX,minY,maxY);
    // Theorem 11: If `y/2 <= x <= 2y`, then `x - y` (and `y - x`) is computed exactly.
    // Read: If `minX/2 <= maxX <= 2minX`, then `maxX - minX` (and `minX - maxX`) is computed exactly.

    // Also if `minX/2 <= maxX <= 2*minX`, then all xs will have:
    // `x/2 <= maxX` and `maxX <= 2*x` (and we can thus safely perform `maxX - x` and `x - maxX` without error)
    // (Also similarly `minX/2 <= x` and `x <= 2*minX`)
    // (and we can thus safely perform `minX - x` and `x - minX` without error)

    // Proof: if `sgn(minX,maxX) === -1` then the if statement is false so either
    // `minX` and `maxX` are both positive or both negative.
    // First consider the case both are positive, then since `x <= minX` this
    // implies `x/2 <= maxX` also. Since `maxX <= 2*minX` also it will be
    // true that `maxX <= 2*x`. This concludes the 'both positive case'. The
    // 'both negative' case is similar.

    let transX: number;
    if (minX/2 <= maxX && maxX <= 2*minX) {
        transX = minX;  // we will always get here if `sgn(minX,maxX) === -1`
    } else { 
        transX = 0; // no translation
    }

    let transY: number;
    if (minY/2 <= maxY && maxY <= 2*minY) {
        transY = minY;  // we will always get here if `sgn(minY,maxY) === -1`
    } else {
        transY = 0;  // no translation
    }
    

    const X = maxX - minX;
    const Y = maxY - minY;
    const scaleX = 2**-(Math.trunc(Math.log2(X)));
    const scaleY = 2**-(Math.trunc(Math.log2(Y)) + 0);
       
    // translate for clarity
    function trans(p: number[]) {
        return [scaleX*(p[0] - transX), scaleY*(p[1] - transY)];
    }

    const transformFatline_ = transformFatline(trans);
    const transformGeo_ = transformGeo(trans);
    const transformPs_ = transformPs(trans);

    //////////////////
    beziers_(
        tcPs(transformPs_(F.ps)), 
        tcPs(transformPs_(G.ps))
    );
    fatline_(tcFatline(transformFatline_(fatline)));
    //console.log(scaleX, scaleY, minX, minY);
    //console.log(fatline);
    //console.log(transformFatline_(fatline));
    //console.log(tcFatline(transformFatline_(fatline)));
    //console.log(fatline.psMin);
    //console.log(toString(F));
    
    if (fatlinePerp) { fatline_(tcFatline(transformFatline_(fatlinePerp))); }
    geo_(tcGeo(transformGeo_(hq)));
    //////////////////
}


function drawIterHybridPolyToCanvas(
        canvas: HTMLCanvasElement,
        iter: Iteration & IterationExtras) {

    if (!canvas) { return; }

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 1280, 768);
    const { fatline_, geo_, beziers_, hybridPoly_ } = draw(ctx);

    if (!iter.F_ || !iter.G_) { return; }

    const { geo, geoPerp } = iter;

    hybridPoly_(geo);
}



function transformPs(f: (p: number[]) => number[]) {
    return (ps: number[][]) => {
        return ps.map(p => f(p));
    }
}

function transformFatline(f: (p: number[]) => number[]) {
    return (fatline: Fatline): Fatline => {
        return {
            psBase: transformPs(f)(fatline.psBase),
            psMin: transformPs(f)(fatline.psMin),
            psMax: transformPs(f)(fatline.psMax),
        };
    }
}

function transformGeo(f: (p: number[]) => number[]) {
    return (geo: number[][]): number[][] => {
        return [
            f(geo[0]),
            f(geo[1]),
            f(geo[2]),
            f(geo[3])
        ]
    }
}


function getFatlinePs(fatline: Fatline): number[][] {
    return [
        ...fatline.psBase,
        ...fatline.psMin,
        ...fatline.psMax
    ];
}


function getExtents(ps: number[][]) {
    //console.log(ps)
    let minX = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;

    for (const p of ps) {
        const [x,y] = p;

        if (x < minX) { minX = x; }
        if (x > maxX) { maxX = x; }
        if (y < minY) { minY = y; }
        if (y > maxY) { maxY = y; }
    }

    return { minX, maxX, minY, maxY };
}


export { drawIterClipsToCanvas, drawIterHybridPolyToCanvas }
