
import * as React from 'react';
import { evaluate } from '../../../src';
import { rotate, translate, scale } from 'flo-vector2d';


interface Props {
    width: number;
    height: number;
}


function BezierCanvas(props: Props) {
    const { width, height } = props;
    const $canvas = React.useRef<HTMLCanvasElement>();

    React.useEffect(() => {
        if ($canvas.current) { 
            //drawQuadratic($canvas.current, width, height); 
            draw($canvas.current, width, height); 
        }
    });

    return (
        <div>
            <canvas 
                ref={$canvas}
                style={{border: '1px solid #eee'}}
                width={width}
                height={height}
            />
        </div>
    );
}


function transformCoordinates(width: number, height: number) {
    return (c: number[]) => {
        return [c[0] + width/2, -c[1] + height/2];
    }
}


function dot(ctx: CanvasRenderingContext2D) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const transformCoordinates_ = transformCoordinates(width, height);

    return (p: number[]) => {
        p = transformCoordinates_(p);
        ctx.beginPath();
        ctx.arc(p[0], p[1], 5, 0, 2*Math.PI);
        ctx.stroke();
    }
}


function bezier3(ctx: CanvasRenderingContext2D) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const transformCoordinates_ = transformCoordinates(width, height);

    return (ps: number[][]) => {
        ps = ps.map(transformCoordinates_);

        const [p0,p1,p2,p3] = ps;
        const [x0,y0] = p0;
        const [x1,y1] = p1;
        const [x2,y2] = p2;
        const [x3,y3] = p3;

        ctx.beginPath();
        ctx.moveTo(x0,y0);
        ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
        //ctx.closePath();
        ctx.stroke();
    }
}


function bezier2(ctx: CanvasRenderingContext2D) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const transformCoordinates_ = transformCoordinates(width, height);

    return (ps: number[][]) => {
        ps = ps.map(transformCoordinates_);

        const [p0,p1,p2] = ps;
        const [x0,y0] = p0;
        const [x1,y1] = p1;
        const [x2,y2] = p2;

        ctx.beginPath();
        ctx.moveTo(x0,y0);
        ctx.quadraticCurveTo(x1, y1, x2, y2);
        //ctx.closePath();
        ctx.stroke();
    }
}


function drawCoordinateCross(ctx: CanvasRenderingContext2D) {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    
    ctx.strokeStyle = '#eee';
    ctx.beginPath();
    ctx.moveTo(width/2, 0);
    ctx.lineTo(width/2, height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, height/2);
    ctx.lineTo(width, height/2);
    ctx.stroke();
}


const scaleCurried = (c: number) => (p: number[]) => scale(p, c);


function drawQuadratic(
        canvas: HTMLCanvasElement,
        width: number,
        height: number) {

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    const bezier2_ = bezier2(ctx);
    const dot_ = dot(ctx);
    //ctx.fillStyle = '#a0a0a0';

    drawCoordinateCross(ctx);

    const rotate_ = rotate(Math.sin(0.1), Math.cos(0.1));
    const translate_ = translate([-10,-7]);
    const scale_ = scaleCurried(50);

    const ps = [
        [6.390987011226919, 6.420107866876444],
        [9.948376652185129, 6.023271701181824],
        [14.22622856264259, 8.462530406648602]
    ]
    .map(translate_)
    //.map(rotate_)
    .map(scale_);

    const [p0,p1,p2] = ps;

    const [x0,y0] = p0;
    const [x1,y1] = p1;
    const [x2,y2] = p2;


    ctx.strokeStyle = '#f00';
    bezier2_(ps);

    ctx.strokeStyle = '#00f';
    dot_(p0); dot_(p1); dot_(p2); 

    ctx.strokeStyle = '#0f0';
    let ts = [
        0.4160583941605839
    ];

    ts.map(t => dot_(evaluate(ps, t)))
}


function draw(
        canvas: HTMLCanvasElement,
        width: number,
        height: number) {
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    const bezier3_ = bezier3(ctx);
    const dot_ = dot(ctx);
    //ctx.fillStyle = '#a0a0a0';

    drawCoordinateCross(ctx);

    const rotate_ = rotate(Math.sin(0.1), Math.cos(0.1));
    const translate_ = translate([-54,-48]);
    const scale_ = scaleCurried(50);

    const ps = [
        [84.65573822721517, 26.049909034426545],
        [29.84641596840816, 89.15280005369262],
        [67.85273579310198, 0.48137049662502207],
        [48.29771328599395, 84.1873964808053]
    ]
    .map(translate_)
    .map(rotate_)
    .map(scale_);
    
    const [p0,p1,p2,p3] = ps;

    const [x0,y0] = p0;
    const [x1,y1] = p1;
    const [x2,y2] = p2;
    const [x3,y3] = p3;


    ctx.strokeStyle = '#f00';
    bezier3_(ps);

    ctx.strokeStyle = '#00f';
    dot_(p0); dot_(p1); dot_(p2); dot_(p3);

    ctx.strokeStyle = '#0f0';
    let ts = [
        0.3729890092838631, 
        //0.4999231476896653, 
        0.626878156038763
    ];

    ts.map(t => dot_(evaluate(ps, t)))
}


export { BezierCanvas }
