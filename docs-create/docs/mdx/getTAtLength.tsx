import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { evalDeCasteljau, fromTo, getTAtLength, totalLength } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = getTAtLength;


// params
const ps = [[1,1], [7,7], [4,2], [8,1.5]];
const scalars = [
    { 
        title: 'length', val: 7,
        min: 0, max: 20, step: 0.125
    }
];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#f00', 'transparent');
    const drawBezier2 = drawBezier(ctx, '#ff0', 'transparent');
    const dot_ = (p: number[]) => drawCircle(ctx, 'transparent', '#00f')(p,5);

    const s = scalars[0].val;
    const params = [ps, s] as [number[][], number];

    const t = f(...params);
    const p = evalDeCasteljau(ps, t);

    drawBezier_(ps.map(tc));
    drawBezier2(fromTo(ps,0,t).map(tc));
    dot_(tc(p));

    return [{ result: t, params: [params] }];
}


function GetTAtLength() {
    return (
        <BezierCanvas
            functionName='getTAtLength'
            draw={draw}
            draggables={ps}
            scalars={scalars}
        />
    )
}


export { GetTAtLength }
