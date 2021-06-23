import { drawBezier } from '../draw/draw-bezier';
import { trans } from '../affine';
import { settings } from '../settings';
import { randOnGrid } from './rand-on-grid';
import { getCurvesFromPss } from './get-curves-from-pss';
import { toString } from '../../../src';

const { num, maxCoordinateX, maxCoordinateY, maxBitLength } = settings;

function getRandInt(n: number): number {
    return Math.floor(Math.random() * n);
}


function drawBeziers(ctx: CanvasRenderingContext2D) {
    return (ps1: number[][], ps2: number[][]) => {
        const drawBezier1 = drawBezier(ctx, '#f00', undefined, 0.5);
        const drawBezier2 = drawBezier(ctx, '#0f0', undefined, 0.5);

        drawBezier1(ps1, true, false);
        drawBezier2(ps2, true, false);
    }
}


const randOnGridX_ = randOnGrid(maxCoordinateX, maxBitLength);
const randOnGridY_ = randOnGrid(maxCoordinateY, maxBitLength);

//let psss: number[][][] = getSameKPss();;
let psss: number[][][] = [];

//const psA = [
//    [0,0], 
//    [1,1], 
//    [0.25,0.25], 
//    [0.5,0.5]
//];
//const psB = [
//    [1,0], 
//    [0.75,0.25],
//    [0.5,0.5], 
//    [0,1]
//];

// test this case too!
const psA = [
    [0,0], 
    [1,1], 
    //[0.25,0.25], 
    [0.25,0.25]
];
const psB = [
    [2,2], 
    [0.5,0.5],
    [0.25,0.25], 
    [-1,-1]
];

//psss.push(psA, psB);


function getPss(
        orderss: [1|2|3, 1|2|3][]) {

    const rx = () => randOnGridX_();
    const ry = () => trans(randOnGridY_());
    
    let pss: number[][][] = psss;
    
    let i = pss.length;
    for (; i<2*num; i++) {
        const idx = Math.trunc(i/2) % orderss.length;
        const orderPair = i % 2;

        const order = orderss[idx][orderPair];

        const ps: number[][] = [];
        for (let j=0; j<order+1; j++) {
            ps.push([rx(),ry()]);
        }
        pss.push(ps);

        //console.log(toString(ps));
        //console.log(ps.length-1);
    }
    
    //console.log(pss.length)

    //console.log(toString(pss[0]));
    //console.log(toString(pss[1]));

    //drawBeziers(ctx, pss[0], pss[1]);

    return { pss, curves: getCurvesFromPss(pss) };
}


export { getPss, drawBeziers }
