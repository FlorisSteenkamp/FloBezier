import { 
    bezierBezierIntersection, closestPointOnBezierPrecise, evaluate, 
    getCoeffsBez1Bez1Exact, getCoeffsBez1Bez2Exact, getCoeffsBez1Bez3Exact, 
    getCoeffsBez2Bez1Exact, getCoeffsBez2Bez2Exact, getCoeffsBez2Bez3Exact, 
    getCoeffsBez3Bez1Exact, getCoeffsBez3Bez2Exact, getCoeffsBez3Bez3Exact, 
    getCoeffsBez3Bez3InclError, 
    getIntervalBox, getOtherTs, intersectBoxes, X 
} from '../src/index';
//import { performance } from 'perf_hooks';
import { toGrid } from '../test/helpers/to-grid';
//import * as paper from 'paper';

import { getCoeffsBez1Bez1 } from "../src/index";
import { getCoeffsBez1Bez2 } from "../src/index";
import { getCoeffsBez1Bez3 } from "../src/index";
import { getCoeffsBez2Bez1 } from "../src/index";
import { getCoeffsBez2Bez2 } from "../src/index";
import { getCoeffsBez2Bez3 } from "../src/index";
import { getCoeffsBez3Bez1 } from "../src/index";
import { getCoeffsBez3Bez2 } from "../src/index";
//import { getCoeffsBez3Bez3InclError } from "../src/index";
import { getCoeffsBez3Bez3 } from "../src/index";

import { getCoeffsBez1Bez1Dd } from "../src/index";
import { getCoeffsBez1Bez1DdAnyBitlength } from "../src/index";
import { getCoeffsBez1Bez2Dd } from "../src/index";
//import { getCoeffsBez1Bez2DdAnyBitlength } from "../src/index";
import { getCoeffsBez1Bez3Dd } from "../src/index";
//import { getCoeffsBez1Bez3DdAnyBitlength } from "../src/index";
import { getCoeffsBez2Bez1Dd } from "../src/index";
//import { getCoeffsBez2Bez1DdAnyBitlength } from "../src/index";
import { getCoeffsBez2Bez2Dd } from "../src/index";
//import { getCoeffsBez2Bez2DdAnyBitlength } from "../src/index";
import { getCoeffsBez2Bez3Dd } from "../src/index";
//import { getCoeffsBez2Bez3DdAnyBitlength } from "../src/index";
import { getCoeffsBez3Bez1Dd } from "../src/index";
//import { getCoeffsBez3Bez1DdAnyBitlength } from "../src/index";
import { getCoeffsBez3Bez2Dd } from "../src/index";
//import { getCoeffsBez3Bez2DdAnyBitlength } from "../src/index";
import { getCoeffsBez3Bez3Dd } from "../src/index";
import { getCoeffsBez3Bez3DdAnyBitlength } from "../src/index";

import { allRoots, allRootsCertified, mid, RootInterval } from 'flo-poly';

import { drawCircle } from './draw/draw-circle';
import { drawRect } from './draw/draw-rect';
import { drawBezier } from './draw/draw-bezier';
import { distanceBetween } from 'flo-vector2d';

import { operators as bigFloatOperators } from "big-float-ts";

const { eSign } = bigFloatOperators;


const abs = Math.abs;


declare const paper: any;

/** the number of bezier pairs (=== number of beziers - 1) */
const num = 5_000;
const maxBitLength = 47;  // 47 ???????
const transY = 0.5;
//const maxCoordinate = 128;
const maxCoordinateX = 1;
const squashFactor = 2**40;
const maxCoordinateY = 1/squashFactor;
//const expMaxX = Math.ceil(Math.log2(maxCoordinateX));
//const expMaxY = Math.ceil(Math.log2(maxCoordinateY));



const tc = transformCoordinatesBL(640, 384);


/**
 * such that width === 10x2, height = 6x2, [0,0] is at the Bottom Left
 * @param width 
 * @param height 
 */
 function transformCoordinatesBL(width: number, height: number) {
    return (c: number[]) => {
        const factor = (width/2);
        const x = c[0] * factor;
        const y = c[1] * factor;
        
        return [x, -y + height];
    }
}

const coeffFunctionsDouble = [
    [getCoeffsBez1Bez1, getCoeffsBez1Bez2, getCoeffsBez1Bez3],
    [getCoeffsBez2Bez1, getCoeffsBez2Bez2, getCoeffsBez2Bez3],
    [getCoeffsBez3Bez1, getCoeffsBez3Bez2, getCoeffsBez3Bez3]
];

const coeffFunctionsDd = [
    [getCoeffsBez1Bez1Dd, getCoeffsBez1Bez2Dd, getCoeffsBez1Bez3Dd],
    [getCoeffsBez2Bez1Dd, getCoeffsBez2Bez2Dd, getCoeffsBez2Bez3Dd],
    [getCoeffsBez3Bez1Dd, getCoeffsBez3Bez2Dd, getCoeffsBez3Bez3Dd]
];


//const coeffFunctionsDdAnyBitlength = [
//    [getCoeffsBez1Bez1DdAnyBitlength, getCoeffsBez1Bez2DdAnyBitlength, getCoeffsBez1Bez3DdAnyBitlength],
//    [getCoeffsBez2Bez1DdAnyBitlength, getCoeffsBez2Bez2DdAnyBitlength, getCoeffsBez2Bez3DdAnyBitlength],
//    [getCoeffsBez3Bez1DdAnyBitlength, getCoeffsBez3Bez2DdAnyBitlength, getCoeffsBez3Bez3DdAnyBitlength]
//];

const coeffFunctionsDdAnyBitlength = [
    [getCoeffsBez1Bez1DdAnyBitlength, getCoeffsBez1Bez2Dd, getCoeffsBez1Bez3Dd],
    [getCoeffsBez2Bez1Dd, getCoeffsBez2Bez2Dd, getCoeffsBez2Bez3Dd],
    [getCoeffsBez3Bez1Dd, getCoeffsBez3Bez2Dd, getCoeffsBez3Bez3DdAnyBitlength]
];

const coeffFunctionsExact = [
    [getCoeffsBez1Bez1Exact, getCoeffsBez1Bez2Exact, getCoeffsBez1Bez3Exact],
    [getCoeffsBez2Bez1Exact, getCoeffsBez2Bez2Exact, getCoeffsBez2Bez3Exact],
    [getCoeffsBez3Bez1Exact, getCoeffsBez3Bez2Exact, getCoeffsBez3Bez3Exact]
];




function getCoeffs2(
    ps1: number[][], 
    ps2: number[][]): number[] {

    const coeffs = coeffFunctionsDouble[ps1.length-2][ps2.length-2](ps1, ps2);
    //const coeffs = getCoeffsBez3Bez3(ps1, ps2);

    return coeffs;
}

//const allrs = allRoots;

/*
function bbi(
        ps1: number[][], 
        ps2: number[][]) {

    let coeffs = getCoeffs2(ps1,ps2);
    const rs = allrs(coeffs, 0, 1);

    let xs = getOtherTs2(ps1, ps2, rs)

    return xs;
}
*/

/*
function getOtherTs2(
        ps1: number[][], 
        ps2: number[][],
        ts2: number[]): X[][] {

    if (ts2.length === 0) { return []; }

    let coeffs = getCoeffs2(ps2,ps1);
    const ts1 = allrs(coeffs, 0, 1);

    if (ts1.length === 0) { return []; }

    let is1 = ts1.map(ri => getIntervalBox(ps1, [ri, ri]));
    let is2 = ts2.map(ri => getIntervalBox(ps2, [ri, ri]));

    let xPairs: X[][] = [];
    for (let i=0; i<ts1.length; i++) {
        let box1 = is1[i];
        for (let j=0; j<ts2.length; j++) {
            let box2 = is2[j];
            let box = intersectBoxes(box1,box2);
            if (box !== undefined) {
                // TODO important - combine boxes to make sense, i.e. combine better
                // e.g. two odd multiplicity boxes should combine to a single even, etc. etc.
                let x1: X = { ri: { tS: ts1[i], tE: ts1[i], multiplicity: 1 }, box, kind: 1 };
                let x2: X = { ri: { tS: ts2[j], tE: ts2[j], multiplicity: 1 }, box, kind: 1 };
                xPairs.push([x1, x2]);
            }
        }
    }

    return xPairs;
}
*/


const canvas = document.getElementById('some-canvas') as  HTMLCanvasElement;
const ctx = canvas.getContext('2d');

const dot_ = drawCircle(ctx, 5, undefined, '#00f');
const box_ = drawRect(ctx, '#00f', '#00f');
const drawBezier1 = drawBezier(ctx, '#f00', undefined);
const drawBezier2 = drawBezier(ctx, '#0f0', undefined);


//const ps1 = [[1,1], [5.125,8], [15.375,0.875], [4.375,5.125]];
//const ps2 = [[1,1], [5.125,8], [15.375,0.875], [4.375,5.125]];


function drawIntersections(xs: X[][]) {
    //if (!ris) { return; }
    //ris.map(t => dot_1(tc(evaluate(ps2, mid(t)))));

    xs.map(x => {
        const x0 = x[0];
        const tl = tc(unsquashp(untransp(x0.box[0])));
        const br = tc(unsquashp(untransp(x0.box[1])));
        //dot_(tc(unsquashp(untransp(p))));
        box_([tl,br]);
        console.log(tl,br)
        dot_(tl);
        dot_(br);
    });
}


const expMax = Math.ceil(Math.log2(Math.max(maxCoordinateX, maxCoordinateY)));

function randOnGrid(max: number, expMax: number, maxBitLength: number) { 
    return () => toGrid(max * Math.random(), expMax, maxBitLength);
}

//const randOnGridX_ = randOnGrid(maxCoordinateX, expMaxX, maxBitLength);
//const randOnGridY_ = randOnGrid(maxCoordinateY, expMaxY, maxBitLength);
const randOnGridX_ = randOnGrid(maxCoordinateX, expMax, maxBitLength);
const randOnGridY_ = randOnGrid(maxCoordinateY, expMax, maxBitLength);


function drawBeziers(
        ps1: number[][], 
        ps2: number[][]) {

    drawBezier1(ps1.map(untransp).map(unsquashp).map(tc), false, false);

    drawBezier2(ps2.map(untransp).map(unsquashp).map(tc), false, false);

    //for (const p of [...ps1, ...ps2]) { dot_(tc(p)); }
}


function unsquashp(p: number[]): number[] {
    return [p[0], p[1] * squashFactor];
}

function trans(v: number): number {
    return v + transY;
}

function untrans(v: number): number {
    return v - transY;
}

function untransp(p: number[]): number[] {
    return [p[0], untrans(p[1])];
}


function getPss(order: 1|2|3) {
    const rx = randOnGridX_;
    const ry = () => trans(randOnGridY_());

    //let curves: paper.Curve[] = [];
    let curves: any[] = [];
    let pss: number[][][] = [];
    

    for (let i=0; i<num+1; i++) {
        const ps: number[][] = [];
        for (let j=0; j<order+1; j++) {
            ps.push([rx(),ry()]);
        }
        //const ps = [[rx(),ry()],[rx(),ry()],[rx(),ry()],[rx(),ry()]];

        //let curve: paper.Curve;
        let curve: any;
        if (order === 1) {
            curve = new paper.Curve(
                new paper.Point(ps[0][0], ps[0][1]),
                new paper.Point(ps[1][0], ps[1][1])
            );
        }
        if (order === 3) {
            curve = new paper.Curve(
                new paper.Point(ps[0][0], ps[0][1]),
                new paper.Point(ps[1][0] - ps[0][0], ps[1][1] - ps[0][1]),
                new paper.Point(ps[2][0] - ps[3][0], ps[2][1] - ps[3][1]),
                new paper.Point(ps[3][0], ps[3][1])
            );
        }

        pss.push(ps);
        curves.push(curve);

        if (i === 1) {
            drawBeziers(pss[0], pss[1]);
        }
    }

    return { pss, curves };
}


function test() {
    const showNaiveXs = false;
    const showNativeXs = true;
    const showPaperXs = false;

    //const accu

    ctx.clearRect(0, 0, 640, 384);

    // pre-load
    //const { pss, curves } = getPss(1);  // linear
    //const { pss, curves } = getPss(2);  // quadratic
    const { pss, curves } = getPss(3);  // cubic

    //console.log(pss)

    /*
    const rx = randOnGridX_;
    const ry = () => trans(randOnGridY_());

    //let curves: paper.Curve[] = [];
    let curves: any[] = [];
    let pss: number[][][] = [];
    //let pss = [];
    for (let i=0; i<num+1; i++) {
        const ps = [[rx(),ry()],[rx(),ry()],[rx(),ry()],[rx(),ry()]];

        const curve = new paper.Curve(
            new paper.Point(ps[0][0], ps[0][1]),
            new paper.Point(ps[1][0] - ps[0][0], ps[1][1] - ps[0][1]),
            new paper.Point(ps[2][0] - ps[3][0], ps[2][1] - ps[3][1]),
            new paper.Point(ps[3][0], ps[3][1])
        );

        pss.push(ps);
        curves.push(curve);

        if (i === 1) {
            drawBeziers(pss[0], pss[1]);
        }
    }
    */
    
    /*
    let total0 = 0;
    //---- Naive ----//
    {
        const timeStart = performance.now();
        for (let i=0; i<n-1; i++) {
            const ps1 = pss[i];
            const ps2 = pss[i+1];
            //const ts = bezierBezierIntersection(ps1, ps2);
            const xs = bbi(ps1, ps2);
            //if (ts.length) { total1++ }
            total0 += xs.length;

            if (showNaiveXs && i < 1) {
                //const ps = ts.map(t => evaluate(ps2, t));
                drawIntersections(xs);
            }
        }
        let timing = performance.now() - timeStart;
        console.log('naive: milli-seconds: ' + timing.toFixed(3));
    }
    console.log(total0)
    */


    //---- Native ----//
    let totalNative = 0;
    const dsNative: number[] = [];
    let timingNative: number;
    {
        const timeStart = performance.now();
        for (let i=0; i<num; i++) {
            const ps1 = pss[i];
            const ps2 = pss[i+1];
            const rs = bezierBezierIntersection2(ps1, ps2);

            const xs = getOtherTs(ps1, ps2, rs);
            if (!xs) { continue; }

            //if (ts.length) { total1++ }
            totalNative += xs.length;

            if (showNativeXs && i < 1) {
                //console.log()
                drawIntersections(xs);
            }
            for (const x of xs) {
                const box = x[0].box;
                const px = (box[1][0] + box[0][0])/2;
                const py = (box[1][1] + box[0][1])/2;
                const p = [px,py];
                const bp = closestPointOnBezierPrecise(ps2, p);
                const d = distanceBetween(p, bp.p);
                dsNative.push(d);
            }
        }
        timingNative = performance.now() - timeStart;
    }


    //---- Paper.js ----//
    let totalPaper = 0;
    const dsPaper: number[] = [];
    let timingPaper: number;
    {
        const timeStart = performance.now();
        for (let i=0; i<num; i++) {
            const curve1 = curves[i];
            const curve2 = curves[i+1];
            const ts = curve1.getIntersections(curve2);
            //if (ts.length) { total2++ }
            totalPaper += ts.length;

            //if (i < 1) {
                for (const t of ts) {
                    const p = [t.point.x, t.point.y];
                    const bp = closestPointOnBezierPrecise(pss[i+1], p);
                    const d = distanceBetween(p, bp.p);
                    //console.log(d);
                    dsPaper.push(d);
                }                
            //}
        }
        timingPaper = performance.now() - timeStart;
    }
    

    ///////////////////////////////
    let sumNative = 0;
    for (const d of dsNative) {
        sumNative += d;
    }
    const meanNative = sumNative / totalNative;
    let sumSquaredDiffsNative = 0;
    for (let i=0; i<totalNative; i++) {
        sumSquaredDiffsNative += (meanNative - dsNative[i])**2;
    }
    const stdDevNative = Math.sqrt(sumSquaredDiffsNative / totalNative);

    console.log('-------------------------');
    console.log('native');
    console.log('-------------------------');
    console.log('millis: ' + timingNative.toFixed(3));
    console.log('xs: ' + totalNative)
    console.log('mean: ' + meanNative);
    console.log('stdDev: ' + stdDevNative);


    ///////////////////////////////
    let sumPaper = 0;
    for (const d of dsPaper) {
        sumPaper += d;
    }
    const meanPaper = sumPaper / totalPaper;
    let sumSquaredDiffsPaper = 0;
    for (let i=0; i<totalPaper; i++) {
        sumSquaredDiffsPaper += (meanPaper - dsPaper[i])**2;
    }
    const stdDevPaper = Math.sqrt(sumSquaredDiffsPaper / totalPaper);
    //console.log(dsPaper);
    console.log('');
    console.log('-------------------------');
    console.log('paper');
    console.log('-------------------------');
    console.log('millis: ' + timingPaper.toFixed(3));
    console.log('xs: ' + totalPaper)
    console.log('mean: ' + meanPaper);
    console.log('stdDev: ' + stdDevPaper);
}



/** this for testing new any bitlength way */
function getCoeffs(
    ps1: number[][], 
    ps2: number[][]): {
        coeffs: number[][];
        errBound: number[];
        getPExact: () => number[][];
    } {

    const { coeffs, errBound } = coeffFunctionsDdAnyBitlength[ps1.length-2][ps2.length-2](ps1, ps2);
    

    const getPExact = () => coeffFunctionsExact[ps1.length-2][ps2.length-2](ps1, ps2);

    // check if all coefficients are zero, 
    // i.e. the two curves are possibly in the same k-family
    let possiblySameKFamily = true;
    for (let i=0; i<coeffs.length; i++) {
        if (abs(coeffs[i][1]) - errBound[i] > 0) {
            possiblySameKFamily = false; break;
        }
    }
    let sameKFamily = false;
    if (possiblySameKFamily) {
        sameKFamily = true;
        const poly = getPExact();
        for (let i=0; i<poly.length; i++) {
            if (eSign(poly[i]) !== 0) {
                sameKFamily = false; break;
            }
        }        
    }
    
    if (sameKFamily) {
        return undefined;
    }

    return { coeffs, errBound, getPExact };
}



function bezierBezierIntersection2(
        ps1: number[][], 
        ps2: number[][]): RootInterval[] {

    let _coeffs = getCoeffs(ps1,ps2);
    if (_coeffs === undefined) { return undefined; }

    let { coeffs, errBound, getPExact } = _coeffs;

    return allRootsCertified(coeffs, 0, 1, errBound, getPExact);
}



// the below was in test()

    //---- Compare accuracy ----//
    /*
    {
        for (let i=0; i<50; i++) {
            const curve1 = curves[i];
            const curve2 = curves[i+1];
            const tsPaper = curve1.getIntersections(curve2);

            const ps1 = pss[i];
            const ps2 = pss[i+1];
            const tsNative = bezierBezierIntersection(ps1, ps2);


            if (tsNative.length !== tsPaper.length) {
                console.log('----');
                console.log('ps1', ps1);
                console.log('ps2', ps2);
                //for (let i=0; i<tsNative.length; i++) {
                //    
                //}
                console.log('native:', tsNative.map(t => (t.tS + t.tE)/2));
                for (let i=0; i<tsPaper.length; i++) {
                    //console.log(tsPaper[i]);
                    //const t1 = tsPaper[i].time;
                    let tP = tsPaper[i].intersection.time;
                    console.log(tP)
                    //console.log('paper', { t1, t2 });
    
                    //let t1Diff = Math.abs(tsNative[0] - t1);
                }
            }
        }
    }
    */


    //---- Compare self intersections ----//
    /*
    {
        let maxDiff = 0;
        for (let i=0; i<10_000; i++) {
            const curve1 = curves[i];
            const tsPaper = curve1.getIntersections(curve1);

            const ps1 = pss[i];
            const tsNative = bezierSelfIntersection(ps1);

            if (tsNative && tsNative.length > 0 || tsPaper.length > 0) {
                //console.log('----');
                //console.log('native', tsNative);
                if (tsPaper.length) {
                    const t1 = tsPaper[0].time;
                    const t2 = tsPaper[0].intersection.time;
                    //console.log('paper', { t1, t2 });

                    let t1Diff = Math.abs(tsNative[0] - t1);
                    let t2Diff = Math.abs(tsNative[1] - t2);
                    let t1DiffR = Math.abs(tsNative[0] - t2);
                    let t2DiffR = Math.abs(tsNative[1] - t1);
                    if (t1Diff < t1DiffR) {
                        if (t1Diff > Number.EPSILON * 2*2) {
                            //console.log('d1', t1Diff)
                            //console.log('d2', t2Diff)
                            if (t1Diff > maxDiff) { maxDiff = t1Diff }
                        }
                    } else {
                        if (t1Diff > Number.EPSILON * 2*2) {
                            //console.log('d1', t1DiffR)
                            //console.log('d2', t2DiffR)
                            if (t1DiffR > maxDiff) { maxDiff = t1DiffR }
                        }
                    }
                }
                //if (tsNative.length > 0) {
                //    // @ts-ignore
                //    console.log('paper', tsPaper[0].points);
                //}
            }
        }
        console.log(maxDiff);
    }*/
//}




//let draggable: number[];

//canvas.ontouchstart = down;
//canvas.ontouchend = up;
//canvas.ontouchmove = move;
//canvas.onmousedown = down;
//canvas.onmouseup = up;
//canvas.onmousemove = move;

/*
function down(ev: MouseEvent | TouchEvent) {
    if (ev.target == canvas) { ev.preventDefault(); }

    const pos = isTouchEvent(ev) ? ev.touches[0] : ev;
    dp = getCursorPosition(canvas, pos);
    draggable = hitTest(dp);
    if (!draggable) { return; }
    op = [draggable[0], draggable[1]];
}

function up(ev: MouseEvent | TouchEvent) {
    if (ev.target == canvas) { ev.preventDefault(); }

    dp = undefined;
    draggable = undefined;
}

function move(ev: MouseEvent | TouchEvent) {
    if (ev.target == canvas) { ev.preventDefault(); }

    if (!dp || !draggable) { return; }

    const pos = isTouchEvent(ev) ? ev.touches[0] : ev;
    const cp = getCursorPosition(canvas, pos    );
    const factor = (width/2)/10;
    const offset = [
        +(cp[0] - dp[0])/factor,
        -(cp[1] - dp[1])/factor
    ]

    draggable[0] = op[0] + offset[0];
    draggable[1] = op[1] + offset[1];

    ctx.clearRect(0, 0, width, height);
    draw(ctx);
    for (const draggable of draggables) { 
        dot_(tc(draggable)); 
    }
}
*/



/*
function getCoeffs(
    ps1: number[][], 
    ps2: number[][]): {
        coeffs: number[];
        errBound: number[];
    } {

    const coeffs = coeffFunctionsDd[ps1.length-2][ps2.length-2](ps1, ps2);
    //const coeffs = getCoeffsBez3Bez3Dd(ps1, ps2);

    return {
        coeffs: coeffs.coeffs.map(c => {
            let r = c[0];
            for (let i=1; i<c.length; i++) {
                r += c[i];
            }
            return r;
        }),
        errBound: coeffs.errBound
    };
}
*/


test();
//test();



