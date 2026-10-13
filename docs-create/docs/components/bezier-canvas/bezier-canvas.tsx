import * as React from 'react';
// @ts-ignore
import Admonition from '@theme/Admonition';
// @ts-ignore
import CodeBlock from '@theme/CodeBlock';
import { drawCircle } from '../draw/draw-circle';
import { transformCoordinatesBL } from '../fs/transform-coordinates';
import { canvasWidth as width, canvasHeight as height } from '../consts/canvas-dimensions';
import { generateRandomString } from '../generate-random-str';
import { valToStr } from '../fs/val-to-str';
import { CurriedFunction } from '../fs/curried-function';
import { ParamsAndResult } from '../fs/params-and-result';


interface Props {
    functionName: string;
    /** everything will be scaled such that height === 2 (1+1) and width = 1.6*height */
    draw: (ctx: CanvasRenderingContext2D) => ParamsAndResult[];
    draggables?: number[][];
    scalars?: {
        min: number;
        max: number;
        step: number;
        title: string;
        val: number;
    }[];
    dontShowDraggableNote?: boolean;
}


const tc = transformCoordinatesBL(width, height);


// from https://stackoverflow.com/a/53837442/2010061
//function useForceUpdate(){
//    const [value, setValue] = React.useState(0); // integer state
//    return () => setValue(value => value + 1); // update the state to force render
//}


function BezierCanvas<T>(props: Props) {
    const { 
        functionName,
        draw,
        draggables: _draggables,
        dontShowDraggableNote
    } = props;

    const draggables = _draggables || [];

    const [randomStr] = React.useState(generateRandomString(10));
    const $canvas = React.useRef<HTMLCanvasElement>();
    const [scalars] = React.useState(props.scalars);

    const [paramsAndResults,setCodeBlock] = React.useState<ParamsAndResult[]>([]);

    //const forceUpdate = useForceUpdate();

    function hitTest(
            /** cursor position */
            cp: number[]): number[] | undefined {

        for (const p of draggables) {
            if (isPInCircle(cp, { center: tc(p), r: 10 })) {
                return p;
            }
        }

        return undefined;
    }


    function draw_() {
        /** the point where the user clicked the mouse button down */
        let dp: number[] | undefined;
        /** original position */
        let op: number[];

        //console.log('called `draw_`')

        if (!$canvas.current) { return; }
        
        const canvas = $canvas.current;
        const ctx = canvas.getContext('2d')!;

        const dot_ = drawCircle(ctx, '#0f0', 'transparent');

        //ctx.clearRect(0, 0, width, height);
        setCodeBlock(draw(ctx));
        
        for (const draggable of draggables) { dot_(tc(draggable), 10); }

        let draggable: number[] | undefined;

        canvas.ontouchstart = down;
        canvas.ontouchend = up;
        canvas.ontouchmove = move;

        canvas.onmousedown = down;
        canvas.onmouseup = up;
        canvas.onmousemove = move;

        function down(ev: MouseEvent | TouchEvent) {
            if (ev.target == canvas) { ev.preventDefault(); }

            const pos = isTouchEvent(ev) ? ev.touches[0] : ev;
            dp = getCursorPosition(canvas, pos);
            draggable = hitTest(dp);
            if (draggable === undefined) { return; }
            op = [draggable[0], draggable[1]];
        }

        function up(ev: MouseEvent | TouchEvent) {
            if (ev.target == canvas) { ev.preventDefault(); }

            dp = undefined;
            draggable = undefined;
        }

        function move(ev: MouseEvent | TouchEvent) {
            if (ev.target == canvas) { ev.preventDefault(); }

            if (!dp || !draggable) { return; }

            const pos = isTouchEvent(ev) ? ev.touches[0] : ev;
            const cp = getCursorPosition(canvas, pos    );
            const factor = (width/2)/10;
            const offset = [
                +(cp[0] - dp[0])/factor,
                -(cp[1] - dp[1])/factor
            ]

            draggable[0] = op[0] + offset[0];
            draggable[1] = op[1] + offset[1];

            ctx.clearRect(0, 0, width, height);
            setCodeBlock(draw(ctx));
            // forceUpdate();

            for (const draggable of draggables) { 
                dot_(tc(draggable), 10); 
            }
            
        }
    }

    React.useEffect(draw_,[]);


    function redraw() {
        if (!$canvas.current) { return; }

        const canvas = $canvas.current;
        const ctx = canvas.getContext('2d')!;
        const dot_ = drawCircle(ctx, '#0f0', 'transparent');
        ctx.clearRect(0, 0, width, height);
        setCodeBlock(draw(ctx));
        for (const draggable of draggables) { 
            dot_(tc(draggable), 10); 
        }
    }

    function onChange(event: React.ChangeEvent<HTMLInputElement>) {
        if (!$canvas.current) { return; }

        const val = Number.parseFloat(event.target.value);
        const i = Number.parseInt(event.target.name);

        scalars![i].val = val;
        // forceUpdate();
        redraw();
    }


    return (
        <div>
            {!dontShowDraggableNote && <Admonition type="info" title="Note!">
                Green circles are draggable!
            </Admonition>}
            {paramsAndResults.length && <CodeBlock
                language="typescript"
                title="Example"
                showLineNumbers
            >
                {paramsAndResults.map(paramsAndResult => {
                    const { result, params } = paramsAndResult;
                    return (
                        functionName + '(' + 
                        params[0].map(valToStr).join(', ') + ')\n' +
                        '//=> ' + valToStr(result)
                    );
                }).join('\n')}
            </CodeBlock>}
            {(scalars && scalars.length) && scalars.map((scalar,i) => {
                const { title, val, min, max, step } = scalar;
                return (
                    <div 
                        key={i} 
                        style={{
                            overflow: 'hidden', 
                            width: width.toString() + 'px', 
                            position: 'relative',
                            background: '#999',
                            borderTop: '1px solid rgb(238, 238, 238)',
                            borderLeft: '1px solid rgb(238, 238, 238)',
                            borderRight: '1px solid rgb(238, 238, 238)',
                            boxSizing: 'content-box'
                        }}
                    >
                        <label 
                            htmlFor={randomStr + title}
                            style={{ 
                                display: 'inline-block', 
                                width: '120px', 
                                float: 'left',
                                position: 'relative',
                                top: '-2px',
                                textAlign: 'center'
                            }}
                        >
                            {title}
                        </label>
                        <input
                            key={i}
                            type="range" 
                            title={title}
                            name={i.toString()}
                            id={randomStr + title}
                            min={min} max={max} step={step}
                            value={val}
                            onChange={onChange}
                            style={{ 
                                display: 'inline-block', 
                                width: '77%', 
                                float: 'right',
                                position: 'relative',
                                top: '2px',
                            }}
                        />
                    </div>
                );
            })}
            

            <canvas 
                className='some-canvas'
                // @ts-ignore
                ref={$canvas}
                style={{border: '1px solid #eee', touchAction: 'none', background: 'black' }}
                width={width}
                height={height}
            />
        </div>
    );
}


function getCursorPosition(canvas: HTMLCanvasElement, event: { clientX: number, clientY: number }) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    return [x, y];
}


function isPInCircle(p: number[], c: { center: number[], r: number }) {
    let x = Math.abs(p[0] - c.center[0]);
    let y = Math.abs(p[1] - c.center[1]);

    let d = Math.sqrt(x*x + y*y);

    return d < c.r;
}


function isTouchEvent(ev: any): ev is TouchEvent {
    return !!ev.touches;
}


export { BezierCanvas }
