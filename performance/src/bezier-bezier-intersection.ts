import { doPaper } from './-paper';
//import { performance } from 'perf_hooks';
//import * as paper from 'paper';


import { allRoots as _allRoots } from './roots/all-roots';
import { settings } from './settings';
import { ctx } from './draw-stuff';
import { getPss } from './get-pss/get-pss';
import { native } from './native/-native';
import { geo } from './geo/-geo';
import { naive } from './naive/-naive';
import { X } from '../../src/index';
import { twoProduct } from 'double-double';



function test(hot: boolean) {
    ctx.clearRect(0, 0, 2*640, 2*384);

    // pre-load
    //const { pss, curves } = getPss([[1,1]]);  // linear-linear only
    //const { pss, curves } = getPss([[2,2]]);  // quad-quad only
    //const { pss, curves } = getPss([[3,3]]);  // cubic-cubic only
    //const { pss, curves } = getPss([[1,1],[1,2],[1,3], [2,1],[2,2],[2,3], [3,1],[3,2],[3,3]]);  // a mix of all order (1,2 and 3) combinations
    const { pss, curves } = getPss([[3,3]]);  // cubic-cubic only
    //const { pss, curves } = getPss([[2,3],[3,2]]);  // a mix of quad-cubic and cubic-quad
    //const { pss, curves } = getPss([[1,3],[3,1]]);  // a mix
    //const { pss, curves } = getPss([[3,3],[2,3],[3,2],[2,2]]);  // a mix

    const { showNaive, showNative, showPaper, showGeo } = settings;
    
    let xss: X[][][] = [];
    if (showNative) {
        xss = native(pss);
    }

    if (showGeo) { 
        geo(pss, xss); 
    }

    if (showPaper) { 
        doPaper(curves, xss); 
    }

    if (showNaive) { 
        naive(pss, xss); 
    }
}


test(false);
//test(true);


/*
function test2() {
    const tot = 10_000_000;
    const cs: number[][] = [];
    for (let i=0; i<tot+1; i++) {
        const a = Math.random();
        const b = Math.random();
        cs.push(twoProduct(a,b));
    }

    {
        const timeStart = performance.now();
        for (let i=0; i<tot; i++) {
            const a = cs[i];
            const b = cs[i+1];;
            const c = ddMultDd(a,b);
        }
        const timing = performance.now() - timeStart;
        console.log('millis A: ' + timing.toFixed(3));
    }

    {
        const timeStart = performance.now();
        for (let i=0; i<tot; i++) {
            const a = cs[i];
            const b = cs[i+1];;
            const c = ddMultDd2(a, b);
        }
        const timing = performance.now() - timeStart;
        console.log('millis A: ' + timing.toFixed(3));
    }
}


function ddMultDd2(x: number[], y: number[]) {
    //const xl = x[0];
    const xh = x[1];
    //const yl = y[0];
    const yh = y[1];

    //const [cl1,ch] = twoProduct(xh,yh);
    const ch = xh*yh;
    const c = f * xh; const ah = c - (c - xh); const al = xh - ah;
    const d = f * yh; const bh = d - (d - yh); const bl = yh - bh;
    const cl1 = (al*bl) - ((ch - (ah*bh)) - (al*bh) - (ah*bl));

    //return fastTwoSum(ch,cl1 + (xh*yl + xl*yh));
    const b = cl1 + (xh*y[0] + x[0]*yh);
    const xx = ch + b;

    //return [b - (xx - ch), xx];
    return { h: b - (xx - ch), l: xx }
}


const f = 2**27 + 1;
function ddMultDd(x: number[], y: number[]): number[] {
    //const xl = x[0];
    const xh = x[1];
    //const yl = y[0];
    const yh = y[1];

    //const [cl1,ch] = twoProduct(xh,yh);
    const ch = xh*yh;
    const c = f * xh; const ah = c - (c - xh); const al = xh - ah;
    const d = f * yh; const bh = d - (d - yh); const bl = yh - bh;
    const cl1 = (al*bl) - ((ch - (ah*bh)) - (al*bh) - (ah*bl));

    //return fastTwoSum(ch,cl1 + (xh*yl + xl*yh));
    const b = cl1 + (xh*y[0] + x[0]*yh);
    const xx = ch + b;

    return [b - (xx - ch), xx];
}

test2();
*/