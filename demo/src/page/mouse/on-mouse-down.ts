import { StateControl } from "../../state-control/state-control.js";
import { getViewboxXY } from "../viewbox/get-viewbox-xy.js";
import { tryStartBezierDrag } from "../events/drag-bezier.js";


function onMouseDown(
        stateControl: StateControl,
        ref: React.RefObject<SVGSVGElement | null>) {

    return (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        const svg$ = ref.current;
        if (!svg$) { return; }

        const viewbox = stateControl.state.appState.pageState.viewbox;
        const ox = event.nativeEvent.offsetX;
        const oy = event.nativeEvent.offsetY;
        const viewboxXY = getViewboxXY(svg$, viewbox, ox, oy);

        const { transientState } = stateControl;

        // Shift+drag: zoom to a rectangle (legacy behavior).
        if (event.shiftKey) {
            if (event.ctrlKey || event.altKey) { return; }

            const { zoomState } = transientState;
            // Just make sure previous rect is removed
            if (zoomState.zoomRect) { zoomState.zoomRect.remove(); }

            transientState.zoomState = {
                mouseIsDown: true,
                prevViewboxXY: viewboxXY,
                zoomRect: undefined
            };
            return;
        }

        if (event.ctrlKey || event.altKey) { return; }

        // If a bezier is under the pointer, drag it instead of panning.
        if (tryStartBezierDrag(stateControl, ref, event)) { return; }

        // Otherwise, drag to pan the viewbox.
        transientState.panState = { mouseIsDown: true, anchor: viewboxXY };
    }
}


export { onMouseDown }
