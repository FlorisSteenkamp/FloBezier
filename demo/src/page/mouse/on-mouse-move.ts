import type { StateControl } from "../../state-control/state-control.js";
import { drawRect } from "../draw/draw-rect.js";
import { getViewboxXY } from "../viewbox/get-viewbox-xy.js";
import { dragBezier, findControlPointAt } from "../events/drag-bezier.js";
import { drawElements, controlPointRadius } from "../draw/draw-elements.js";


function onMouseMove(
        stateControl: StateControl,
        ref: React.RefObject<SVGSVGElement | null>,
        refX: React.RefObject<HTMLSpanElement | null>,
        refY: React.RefObject<HTMLSpanElement | null>) {

    return (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const svg$ = ref.current;
        if (!svg$) { return; }

        const { state, transientState } = stateControl;
        const { pageState } = state.appState;
        const { zoomState, panState } = transientState;

        // Pixel coordinates
        const pixelsX = event.nativeEvent.offsetX;
        const pixelsY = event.nativeEvent.offsetY;
        
        const [viewboxX,viewboxY] = 
            getViewboxXY(svg$, pageState.viewbox, pixelsX, pixelsY);

        const spanX = refX.current;
        if (spanX) { spanX.innerHTML = viewboxX.toFixed(3); }
        const spanY = refY.current;
        if (spanY) { spanY.innerHTML = viewboxY.toFixed(3); }

        transientState.mouseXY = [viewboxX, viewboxY];

        if (transientState.dragState.bezierIdx !== undefined) {
            dragBezier(stateControl, ref, event);
            return;
        }

        // Pan: shift the viewbox so the anchored world point stays under the pointer.
        if (panState.mouseIsDown) {
            const anchor = panState.anchor!;
            const shiftX = anchor[0] - viewboxX;
            const shiftY = anchor[1] - viewboxY;
            const vb = pageState.viewbox;
            const newViewbox = [
                [vb[0][0] + shiftX, vb[0][1] + shiftY],
                [vb[1][0] + shiftX, vb[1][1] + shiftY]
            ];
            stateControl.upd(pageState, { viewbox: newViewbox });
            return;
        }

        if (!zoomState.mouseIsDown) {
            const { toDraw } = pageState;

            // Highlight the control point under the pointer (if any).
            let hoverChanged = false;
            if (toDraw.controlPoints) {
                const cp = findControlPointAt(
                    pageState.beziers, [viewboxX, viewboxY],
                    controlPointRadius(pageState.viewbox) * 1.5);
                const prev = transientState.hoveredControlPoint;
                const same = (!prev && !cp) ||
                    (!!prev && !!cp && prev[0] === cp[0] && prev[1] === cp[1]);
                if (!same) {
                    transientState.hoveredControlPoint = cp;
                    hoverChanged = true;
                }
                svg$.style.cursor = cp ? 'pointer' : 'default';
            }

            if (hoverChanged || toDraw.normal || toDraw.tangent) {
                drawElements(stateControl, ref, toDraw);
            }
            return;
        }

        if (zoomState.zoomRect) { zoomState.zoomRect.remove(); }
        const prevViewboxXY = zoomState.prevViewboxXY!;

        const newZoomRect = [
            prevViewboxXY, 
            [viewboxX, viewboxY]
        ];

        const g$ = svg$.getElementsByTagName('g')[0];
        zoomState.zoomRect = drawRect(g$, newZoomRect);

        //setXY({x,y});
    }
}


export { onMouseMove }
