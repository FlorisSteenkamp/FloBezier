import { drawBezier } from '../draw/draw-bezier.js';
import { trans } from '../affine.js';
import { settings } from '../settings.js';
import { randOnGrid } from './rand-on-grid.js';
import { getCurvesFromPss } from './get-curves-from-pss.js';
import { toString, toPowerBasis } from '../../../src/index.js';
import { 
    psCCSameAlgebraicallyNonOverlapping,
    get33SameAlgebraicallyNonOverlapping,
    psEdgeCase1,
    get3A2B3EqA3B2,
    psCCSameAlgebraicallyNonOverlappingIntersecting,
    psQQBothSelfOverlappingAndOverlapping,
    getCCSameAlgebraicallyOverlapping
} from '../get-curve-pairs.js';


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


function getPss(
        orderss: [1|2|3, 1|2|3][]) {

    const rx = () => randOnGridX_();
    const ry = () => trans(randOnGridY_());

    let pss: number[][][] = [];

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
    }

    // drawBeziers(ctx)(pss[0], pss[1]);

    return { pss, curves: getCurvesFromPss(pss) };
}


export { getPss, drawBeziers }
