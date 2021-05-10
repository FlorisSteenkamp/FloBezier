
import { expect, assert } from 'chai';
//import { describe } from 'mocha';
import 'mocha';
import { bezierBezierIntersection, bezierSelfIntersection } from '../../../src/index';
// @ts-ignore
import { performance } from 'perf_hooks';
import { toGrid } from '../../helpers/to-grid'
import * as paper from 'paper';


const maxBitLength = 45;
const maxCoordinate = 128;
const expMax = Math.ceil(Math.log2(maxCoordinate));
const randOnGrid_ = randOnGrid(maxCoordinate, expMax, maxBitLength);

function rand(max: number) { 
    return 2*max * (Math.random() - 0.5); 
}

function randOnGrid(max: number, expMax: number, significantFigures: number) { 
    return () => toGrid(rand(max), expMax, significantFigures);
}

describe('intersections', function() {
    it('it should find intersections fast', test)
    it('it should find intersections fast', test)
});



function test() {
    // pre-load
    //const r = Math.random;
    const r = randOnGrid_;

    const n = 2_000;
    let curves: paper.Curve[] = [];
    let pss: number[][][] = [];
    for (let i=0; i<n; i++) {
        const ps = [[r(),r()],[r(),r()],[r(),r()],[r(),r()]];

        const curve = new paper.Curve(
            new paper.Point(ps[0][0], ps[0][1]),
            new paper.Point(ps[1][0] - ps[0][0], ps[1][1] - ps[0][1]),
            new paper.Point(ps[2][0] - ps[3][0], ps[2][1] - ps[3][1]),
            new paper.Point(ps[3][0], ps[3][1])
        );

        pss.push(ps);
        curves.push(curve);
    }
    
    let total1 = 0;
    //---- Native ----//
    {
        const timeStart = performance.now();
        for (let i=0; i<n-1; i++) {
            const ps1 = pss[i];
            const ps2 = pss[i+1];
            const ts = bezierBezierIntersection(ps1, ps2);
            //if (ts.length) { total1++ }
            total1 += ts.length;
        }
        let timing = performance.now() - timeStart;
        console.log('native: milli-seconds: ' + timing.toFixed(3));
    }
    console.log(total1)


    let total2 = 0;
    //---- Paper.js ----//
    {
        const timeStart = performance.now();
        for (let i=0; i<n-1; i++) {
            const curve1 = curves[i];
            const curve2 = curves[i+1];
            const ts = curve1.getIntersections(curve2);
            //if (ts.length) { total2++ }
            total2 += ts.length;
        }
        let timing = performance.now() - timeStart;
        console.log('paper.js: milli-seconds: ' + timing.toFixed(3));
    }
    console.log(total2)

    

    //---- Compare accuracy ----//
    /*
    {
        for (let i=0; i<50; i++) {
            const curve1 = curves[i];
            const curve2 = curves[i+1];
            const tsPaper = curve1.getIntersections(curve2);

            const ps1 = pss[i];
            const ps2 = pss[i+1];
            const tsNative = bezierBezierIntersectionImplicit(ps1, ps2);


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
}