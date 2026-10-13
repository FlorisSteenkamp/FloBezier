import * as React from 'react';
import { classify, classification, fromPowerBasis, toCubic } from '../../../node/index';
import { BezierCanvas } from '../components/bezier-canvas/bezier-canvas';
import { canvasWidth as width, canvasHeight as height } from '../components/consts/canvas-dimensions';
import { drawBezier } from '../components/draw/draw-bezier';
import { transformCoordinatesBL } from '../components/fs/transform-coordinates';
import { scale, translate } from 'flo-vector2d';
import { ParamsAndResult } from '../components/fs/params-and-result';


const tc = transformCoordinatesBL(width, height);

const scale_ = (c: number) => (p: number[]) => scale(p,c);


// params
const ps = [[1,1], [5.125,8], [15.375,0.875], [4.375,5.125]];

function draw(ctx: CanvasRenderingContext2D): ParamsAndResult[] {
    const drawBezier_ = drawBezier(ctx, '#f80', 'transparent');

    const params = [ps] as [number[][]];

    const r = classify(...params);

    drawBezier_(ps.map(tc));

    return [{ result: r, params: [params] }];
}


const cases = [
    {
        ps: [[7,7]],
        f: classification.isPoint,
        name: 'isPoint'
    },
    {
        ps: [[1,1],[13,6]],
        f: classification.isLineGeneral,
        name: 'isLineGeneral'
    },
    {
        ps: [[1,1],[1,1]].map(translate([4,4])),
        f: classification.isLineDegenPoint,
        name: 'isLineDegenPoint'
    },
    {
        ps: [[1,1],[2,2],[3,4]].map(translate([4,4])),
        f: classification.isQuadGeneral,
        name: 'isQuadGeneral'
    },
    {
        ps: [[1,1],[2,2],[4,4]].map(translate([4,4])),
        f: classification.isQuadDegenCollinear,
        name: 'isQuadDegenCollinear'
    },
    {
        ps: [[1,1],[2,2],[3,3]].map(translate([4,4])),
        f: classification.isQuadDegenLine,
        name: 'isQuadDegenLine'
    },
    {
        ps: [[1,1],[1,1],[1,1]].map(translate([4,4])),
        f: classification.isQuadDegenPoint,
        name: 'isQuadDegenPoint'
    },
    {
        ps: [[0,0],[3,3],[-3,3],[0,1]].map(translate([4,4])),
        f: classification.isCubicGeneralCrunode,
        name: 'isCubicGeneralCrunode'
    },
    {
        ps: [[0,0],[3,3],[-3,3],[1,0]].map(translate([4,4])),
        f: classification.isCubicGeneralCrunode,
        name: 'isCubicGeneralCrunode'
    },
    {
        ps: [[0,0],[5,3],[2,3],[4,0]].map(translate([4,4])),
        f: classification.isCubicGeneralAcnode,
        name: 'isCubicGeneralAcnode'
    },
    {
        ps: [[1,3],[5,-3],[-2,3],[4,-2]].map(translate([4,4])),
        f: classification.isCubicGeneralAcnode,
        name: 'isCubicGeneralAcnode'
    },
    {
        ps: [[0,0],[6,4],[-0,4],[6,0]].map(translate([4,4])),
        f: classification.isCubicGeneralCusp,
        name: 'isCubicGeneralCusp'
    },
    {
        ps: fromPowerBasis([[0,0,3,0],[6,-9,3,-6]]).map(scale_(3)).map(p => [p[0] + 6,p[1] + 24]),  //=> [[0,0],[1,1],[2,-1],[3,0].map(translate([4,4])),
        f: classification.isCubicGeneralExplicit,
        name: 'isCubicGeneralExplicit'
    },
    {
        ps: [[1,1],[2,2],[3,3],[5,5]].map(translate([4,4])),
        f: classification.isCubicDegenCollinearCubic,
        name: 'isCubicDegenCollinearCubic'
    },
    {
        ps: [[0,0],[1,1],[2,1],[3,0]].map(translate([4,4])),
        f: classification.isCubicDegenQuad,
        name: 'isCubicDegenQuad'
    },
    {
        ps: toCubic([[0,0],[3,3],[18,18]]).map(scale_(0.25)).map(translate([2,2])),  //=> [[0,0],[2,2],[8,8],[18,18].map(translate([4,4])),
        f: classification.isCubicDegenCollinearQuad,
        name: 'isCubicDegenCollinearQuad'
    },
    {
        ps: [[1,1],[2,2],[3,3],[4,4]].map(translate([4,4])),
        f: classification.isCubicDegenLine,
        name: 'isCubicDegenLine'
    },
    {
        ps: [[1,1],[1,1],[1,1],[1,1]].map(translate([4,4])),
        f: classification.isCubicDegenPoint,
        name: 'isCubicDegenPoint'
    }
];


function drawCase(case_: { ps: number[][], f: (ps: number[][]) => boolean }) {
    return (ctx: CanvasRenderingContext2D): ParamsAndResult[] => {
        const { ps, f } = case_;
        const drawBezier_ = drawBezier(ctx, '#f80', 'transparent');

        const params = [ps] as [number[][]];
        const r = f(...params);
        drawBezier_(ps.map(tc));

        return [{ result: r, params: [params] }];
    }
}


function Classify() {
    return (<>
        <BezierCanvas functionName='classify' draw={draw} draggables={ps} />
        {cases.map(case_ => {
            return (
                <BezierCanvas
                    functionName={'classification' + '.' + case_.name}
                    draw={drawCase(case_)}
                    draggables={case_.ps}
                    dontShowDraggableNote={true}
                />
            );
        })}
    </>)
}


export { Classify }
