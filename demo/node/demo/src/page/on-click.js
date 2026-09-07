import { gotoPrevViewbox } from './goto-prev-viewbox.js';
import { getViewboxXY } from './get-viewbox-xy.js';
function onClick(stateControl, refSvg) {
    return (event) => {
        if (event.shiftKey) {
            gotoPrevViewbox(stateControl);
            return;
        }
        const { state } = stateControl;
        const { pageState } = state.appState;
        const { clickFor, showDelay } = pageState;
        const svg$ = refSvg.current;
        if (!svg$) {
            return;
        }
        const g = svg$.getElementsByTagName('g')[0];
        // Pixel coordinates
        const ox = event.nativeEvent.offsetX;
        const oy = event.nativeEvent.offsetY;
        // SVG actual coordinates
        const viewboxXY = getViewboxXY(svg$, pageState.viewbox, ox, oy);
        const [x, y] = viewboxXY;
        const fs = {
            bezier: undefined,
            boundingHull: undefined,
            intersection: undefined,
            looseBoundingBox: undefined,
            tightBoundingBox: undefined,
            x: undefined
        };
        const f = fs[clickFor];
        if (f === undefined) {
            return;
        }
        f(g, [x, y], showDelay);
    };
}
export { onClick };
//# sourceMappingURL=on-click.js.map