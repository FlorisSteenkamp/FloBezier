import { drawBezier } from '../draw/draw-bezier.js';
import { trans } from '../affine.js';
import { settings } from '../settings.js';
import { randOnGrid } from './rand-on-grid.js';
import { getCurvesFromPss } from './get-curves-from-pss.js';
import { getXY, toString } from '../../../src/index.js';
import { 
    psCCSameAlgebraicallyNonOverlapping,
    get33SameAlgebraicallyNonOverlapping,
    psEdgeCase1,
    get3A2B3EqA3B2,
    psCCSameAlgebraicallyNonOverlappingIntersecting,
    psQQBothSelfOverlappingAndOverlapping,
    getCCSameAlgebraicallyOverlapping
} from '../../../test/intersection/bezier-bezier-intersection/get-curve-pairs.js';


const { num, maxCoordinateX, maxCoordinateY, maxBitLength } = settings;

function getRandomInt(n: number): number {
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

const psC = [
    [0,0], 
    [1,1], 
    [2,1], 
    [2,0]
];
const psD = [
    [1,0], 
    [0.5,0.5],
    [0.25,0.25], 
    [-1,-3]
];

//psss.push(psC, psD);

// THESE 2 HAS 6/9 Xs !!
const psE = [
    [0.7704295223367994,0.3797033285794189],
    [0.11133703242766413,0.40902818227645277],
    [0.5154501161345357,0.18033024920613472],
    [0.6245063776175845,0.6304863768499378]
];
const psF = [
    [0.5750085923572528,0.10720695981170625],
    [0.29108151922671266,0.3958904988476726],
    [0.9979904669473834,0.9260786134807975],
    [0.35579970920395576,0.26687025387773056]
];
//psss.push(psE, psF);


// THESE 2 are loops !!
const psG = [
    [0.7704295223367994,0.3797033285794189],
    [0.11133703242766413,0.40902818227645277],
    [0.5154501161345357,0.18033024920613472],
    //[0.6245063776175845,0.6304863768499378]
    [0.7704295223367994,0.3797033285794189]
];
const psH = [
    [0.5750085923572528,0.10720695981170625],
    [0.29108151922671266,0.3958904988476726],
    [0.9979904669473834,0.9260786134807975],
    //[0.35579970920395576,0.26687025387773056]
    [0.5750085923572528,0.10720695981170625]
];
//psss.push(psG, psH);
//psss.push(psH, psG);

const psI = [
    [0.7704295223367994,0.3797033285794189],
    [0.11133703242766413,0.40902818227645277],
    [0.5154501161345357,0.18033024920613472],
    //[0.6245063776175845,0.6304863768499378]
    [0.7704295223367994,0.3797033285794189]
];
const psJ = [
    [0.5750085923572528,0.10720695981170625],
    [0.29108151922671266,0.3958904988476726],
    [0.29108151922671266,0.3958904988476726],
    //[0.35579970920395576,0.26687025387773056]
    [0.5750085923572528,0.10720695981170625]
];


// TODO - test these
//psss.push(psI, psJ);

/*
{
    const ps1 = [[0,0],[1,1]];
    const ps2 = [[0.2,0],[0.3,1]];
    const { vₓ, vᵧ, v } = getImplicitForm1(ps1);
    const { vₓ: wₓ, vᵧ: wᵧ, v: w } = getImplicitForm1(ps2);
    const y  = (v*wₓ - vₓ*w) / (vₓ*wᵧ - vᵧ*wₓ);
    console.log(y);

    const xs = bezierBezierIntersection(ps1,ps2);
    console.log(evalDeCasteljau(ps1, xs[0][0].ri.tS));
}
*/

//let a = [1,0];
//let b = rotate(Math.sin(0.1), Math.cos(0.1), a);
//let c = scale(b,2);
//let d = scale(b,2.999999999);
//console.log(getXY2([b,c,d]));
//console.log(toString([b,c,d]));
//console.log(evalDeCasteljau([b,c,d], -1000000000000000));
//console.log(evalDeCasteljau([b,c,d], +1000000000000000));
//console.log(isQuadReallyLine([b,c,d]));


function getPss(
        orderss: [1|2|3, 1|2|3][]) {

    const rx = () => randOnGridX_();
    const ry = () => trans(randOnGridY_());

    const a = get33SameAlgebraicallyNonOverlapping(true);

    //console.log(toString(a[0]));
    //console.log();
    //console.log(toString(a[1]));

    //const b = generateSelfIntersecting([0.5,0], [1,0.25], [0,0.22], [0.0111,0.8]);
    //const b = generateSelfIntersecting([0,0], [1,1], [2,1], [0.1,0.9]);
    //console.log('bbbbbbbbb',bezierSelfIntersection(b,false))
    
    const c = [[0,0],[0.1,0.1],[0.2,0.2],[0.3,0.5]];
    //const a = [get3A2B3EqA3B2(),get3A2B3EqA3B2()];
    //const d = psCCSameAlgebraicallyNonOverlappingIntersecting.map(getHodograph);
    //const d = get33SameAlgebraicallyNonOverlapping(false).map(getHodograph);
    //const d = getCCSameAlgebraicallyOverlapping(false, true).map(getHodograph);
    //const d = getCCSameAlgebraicallyOverlapping(false).map(getHodograph);
    const d = getCCSameAlgebraicallyOverlapping(false)!;
    console.log(toString(getXY(d[0])))
    console.log(toString(getXY(d[1])))
    let pss: number[][][] = [
        //...psCCSameAlgebraicallyNonOverlapping
        //b,
        //c,
        ...d,
        //...psQQBothSelfOverlappingAndOverlapping,
        //...a
        //...psEdgeCase1
    ];

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
