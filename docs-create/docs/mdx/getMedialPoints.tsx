import * as React from 'react';
import { getMedialPoints } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { drawCircle } from '../components/draw/draw-circle';
import { drawLine } from '../components/draw/draw-line';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);
const f = getMedialPoints;


// params
const p  = [2,2];      // base point of the ray
const vp = [6,9];      // a second point defining the ray direction (v = vp - p)
const ps = [[1,1], [5.125,8], [15.375,0.875], [4.375,5.125]];


function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const dotP = (q: number[]) => drawCircle(ctx, '#00f', '#00f')(q,5);
    const dotM = (q: number[]) => drawCircle(ctx, '#f0f', '#f0f')(q,4);
    const ray  = drawLine(ctx, '#999');

    const v = [vp[0] - p[0], vp[1] - p[1]];

    const params = [p, v, ps] as [number[], number[], number[][]];

    const drawBezier_ = drawBezier(ctx, '#0f0', 'transparent');

    const r = f(...params);

    drawBezier_(ps.map(tc));

    // draw the ray q(t) = p + t*v (extended for visualization)
    ray(tc(p), tc([p[0] + 4*v[0], p[1] + 4*v[1]]));
    dotP(tc(p));

    // draw the found medial points
    for (const q of r.qs) { dotM(tc(q)); }

    return [{ result: r, params: [params] }];
}



function GetMedialPoints() {
    return (<>
        <BezierCanvas
            functionName='getMedialPoints'
            draw={draw}
            draggables={[p, vp, ...ps]}
        />
    </>)
}



export { GetMedialPoints }
