import * as React from 'react';
import { bezierBezierIntersection, fromTo, getAbsAreaBetween } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = getAbsAreaBetween;


// params
const ps1 = [[3.3125,1.3125], [5.125,8], [15.375,0.875], [18.375,9.125]];
const _ps2 = [[3.125,8], [13.375,0.875]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_1 = drawBezier(ctx, '#0f0', 'transparent');
    const drawBezier_2 = drawBezier(ctx, '#f00', 'transparent');

    const ps2 = [ps1[0],..._ps2,ps1[3]];
    const params = [ps1,ps2] as [number[][], number[][]];

    const r = f(...params);

    const xs = bezierBezierIntersection(ps1,ps2);

    const psPairs: number[][][][] = [];

    let tS1 = 0;
    let tS2 = 0;
    for (let i=0; i<xs.length+1; i++) {
        const x = xs[i];
        
        const tE1 = x === undefined ? 1 : x.t1;
        const tE2 = x === undefined ? 1 : x.t2;

        const piece1 = fromTo(ps1, tS1, tE1);
        const piece2 = fromTo(ps2, tS2, tE2);

        tS1 = tE1;
        tS2 = tE2;

        psPairs.push([piece1,piece2]);
    }

    ctx.strokeStyle = 'blue';
    ctx.fillStyle = 'blue';
    for (let psPair of psPairs) {
        const psA = psPair[0];
        const psB = psPair[1].slice().reverse();

        const [pA0,pA1,pA2,pA3] = psA.map(tc);
        const [xA0,yA0] = pA0;
        const [xA1,yA1] = pA1;
        const [xA2,yA2] = pA2;
        const [xA3,yA3] = pA3;

        const [,pB1,pB2,pB3] = psB.map(tc);;
        const [xB1,yB1] = pB1;
        const [xB2,yB2] = pB2;
        const [xB3,yB3] = pB3;

        ctx.beginPath();
        ctx.moveTo(xA0,yA0);
        ctx.bezierCurveTo(xA1, yA1, xA2, yA2, xA3, yA3);
        ctx.bezierCurveTo(xB1, yB1, xB2, yB2, xB3, yB3);
        ctx.fill();
    }
    
    drawBezier_1(ps1.map(tc));
    drawBezier_2(ps2.map(tc));

    return [{ result: r, params: [params] }];
}



function GetAbsAreaBetween() {
    return (<>
        <BezierCanvas
            functionName='getAbsAreaBetween'
            draw={draw}
            draggables={[...ps1,_ps2[0],_ps2[1]]}
        />
    </>)
}



export { GetAbsAreaBetween }
