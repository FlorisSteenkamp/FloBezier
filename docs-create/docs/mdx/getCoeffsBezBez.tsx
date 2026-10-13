import * as React from 'react';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { getCoeffsBezBez } from '../../../node/index';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = getCoeffsBezBez;


// params
const ps11 = [[5,3],[10,4.5],[6,3],[7,5]];
const ps21 = [[2.67578125,2.2841796875],[12.01171875,5.2236328125],[4.55078125,2.2060546875],[7.63671875,5.9267578125]];
const params1 = [ps11, ps21] as [number[][], number[][]];

const ps12 = [[5+2**-40,3],[10,4.5],[6,3],[7,5]];
const ps22 = [[2.67578125,2.2841796875],[12.01171875,5.2236328125],[4.55078125,2.2060546875],[7.63671875,5.9267578125]];
const params2 = [ps12, ps22] as [number[][], number[][]];

const ps13 = [[1,1], [5.125,8], [15.375,0.875], [4.375,5.125]];
const ps23 = [[1,1], [5.875,7.25], [12.5,2], [5.53125,5.5]];
const params3 = [ps13, ps23] as [number[][], number[][]];

const ps14 = [[6.4,4.8], [15,5], [1,4], [10,4]];
const ps24 = [[9.4,0.4], [9.3,10.3], [8.1,0.1], [7.53125,5.5]];
const params4 = [ps14, ps24] as [number[][], number[][]];


function draw1(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier1 = drawBezier(ctx, '#f00', 'transparent');
    const drawBezier2 = drawBezier(ctx, '#0f0', 'transparent');

    const coeffs = f(...params1);

    drawBezier1(ps11.map(tc), true, true);
    drawBezier2(ps21.map(tc), true, true);

    return [{ result: coeffs, params: [params1] }];
}


function draw2(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier1 = drawBezier(ctx, '#f00', 'transparent');
    const drawBezier2 = drawBezier(ctx, '#0f0', 'transparent');

    const coeffs = f(...params2);

    drawBezier1(ps12.map(tc), true, true);
    drawBezier2(ps22.map(tc), true, true);

    return [{ result: coeffs, params: [params2] }];
}


function draw3(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier1 = drawBezier(ctx, '#f00', 'transparent');
    const drawBezier2 = drawBezier(ctx, '#0f0', 'transparent');

    const coeffs = f(...params3);

    drawBezier1(ps13.map(tc), true, true);
    drawBezier2(ps23.map(tc), true, true);

    return [{ result: coeffs, params: [params3] }];
}


function draw4(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier1 = drawBezier(ctx, '#f00', 'transparent');
    const drawBezier2 = drawBezier(ctx, '#0f0', 'transparent');

    const coeffs = f(...params4);

    drawBezier1(ps14.map(tc), true, true);
    drawBezier2(ps24.map(tc), true, true);

    return [{ result: coeffs, params: [params4] }];
}


function GetCoeffsBezBez() {
    return (<>
        <hr/>
        <p>
            The below example illustrates the fact that if 2 bezier curves 
            are algebraically identical then the resulting
            intersection polynomial will be identically zero...
        </p>
        <BezierCanvas
            functionName='getCoeffsBezBez'
            draw={draw1}
            draggables={[...ps11,...ps21]}
        />
        <hr/>
        <p>
            ...but if a single coordinate is perturbed slightly (2**-40 in the 
            case below) then the resulting polynomial will not be zero anymore.
        </p>
        <BezierCanvas
            functionName='getCoeffsBezBez'
            draw={draw2}
            draggables={[...ps12,...ps22]}
            dontShowDraggableNote={true}
        />
        <hr/>
        <p>
            The example below is just some arbitrary cubic bezier curves.
        </p>
        <BezierCanvas
            functionName='getCoeffsBezBez'
            draw={draw3}
            draggables={[...ps13,...ps23]}
            dontShowDraggableNote={true}
        />
        <hr/>
        <p>
            This example illustrates Bezout's Theorem: a cubic-cubic intersection 
            implies 3x3 = 9 intersections at most.
        </p>
        <BezierCanvas
            functionName='getCoeffsBezBez'
            draw={draw4}
            draggables={[...ps14,...ps24]}
            dontShowDraggableNote={true}
        />
    </>)
}



export { GetCoeffsBezBez }
