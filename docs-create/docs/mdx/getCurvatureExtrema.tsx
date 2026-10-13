import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { drawCircle } from '../components/draw/draw-circle';
import { evaluate, getCurvatureExtrema } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = getCurvatureExtrema;


// params
const ps = [[1,1], [5.78125,7.21875], [11.8125,1.3125], [5.53125,5.5]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#f00', 'transparent');
    const dot_min = (p: number[]) => drawCircle(ctx, 'transparent', '#00f')(p,5);
    const dot_max = (p: number[]) => drawCircle(ctx, 'transparent', '#0ff')(p,5);
    const dot_inf = (p: number[]) => drawCircle(ctx, 'transparent', '#ff0')(p,5);

    const params = [ps] as [number[][]];
    
    const extrema = f(...params);

    drawBezier_(ps.map(tc));

    const { minima, maxima, inflections } = extrema;
    
    minima     .map(t => dot_min(tc(evaluate(ps, t))));
    maxima     .map(t => dot_max(tc(evaluate(ps, t))));
    inflections.map(t => dot_inf(tc(evaluate(ps, t))));

    return [{ result: extrema, params: [params] }];
}


function GetCurvatureExtrema() {
    return (
        <BezierCanvas
            functionName='getCurvatureExtrema'
            draw={draw}
            draggables={ps}
        />
    )
}


export { GetCurvatureExtrema }
