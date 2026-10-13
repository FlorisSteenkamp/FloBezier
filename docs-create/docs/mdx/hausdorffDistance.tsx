import * as React from 'react';
import { evaluate, hausdorffDistance } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = hausdorffDistance;


// params
const psA = [[2.5,6.5], [10.3,8.6], [15.3,0.9], [5.3,1.7]];
const psB = [[1,1], [5.125,8], [15.375,0.875], [4.375,5.125]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const dot_1 = (p: number[]) => drawCircle(ctx, 'transparent', '#00f')(p,5);

    const params = [psA,psB] as [number[][], number[][]];

    const drawBezier1 = drawBezier(ctx, '#0f0', 'transparent');
    const drawBezier2 = drawBezier(ctx, '#f00', 'transparent');

    const r = f(...params);
    
    drawBezier1(psA.map(tc));
    drawBezier2(psB.map(tc));

    return [{ result: r, params: [params] }];
}



function HausdorffDistance() {
    return (<>
        <BezierCanvas
            functionName='hausdorffDistance'
            draw={draw}
            draggables={[...psA, ...psB]}
        />
    </>)
}



export { HausdorffDistance }
