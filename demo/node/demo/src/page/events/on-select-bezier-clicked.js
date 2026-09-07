import { getViewboxXY } from "../viewbox/get-viewbox-xy.js";
import { drawElements, controlPointRadius } from "../draw/draw-elements.js";
import { findControlPointAt } from "./drag-bezier.js";
import { closestPointOnBezier } from "../../../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/closest-point-on-bezier.js";
/**
 * Selects the bezier closest to the clicked point (within a small threshold),
 * or deselects if the click is not near any bezier.
 */
function onSelectBezierClicked(stateControl, refSvg, event) {
    const svg$ = refSvg.current;
    if (!svg$) {
        return;
    }
    const { upd, state } = stateControl;
    const { pageState } = state.appState;
    const { beziers, viewbox } = pageState;
    const p = getViewboxXY(svg$, viewbox, event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    // Clicking a control point selects it for editing (takes precedence).
    if (pageState.toDraw.controlPoints) {
        const cp = findControlPointAt(beziers, p, controlPointRadius(viewbox) * 1.5);
        if (cp !== undefined) {
            upd(pageState, { selectedBezierIdx: cp[0], selectedControlPointIdx: cp[1] });
            drawElements(stateControl, refSvg, state.appState.pageState.toDraw);
            return;
        }
    }
    const w = viewbox[1][0] - viewbox[0][0];
    const h = viewbox[1][1] - viewbox[0][1];
    const threshold = Math.min(w, h) * 0.02;
    let selectedBezierIdx = undefined;
    let minD = Infinity;
    beziers.forEach((ps, i) => {
        const { d } = closestPointOnBezier(ps, p);
        if (d < minD) {
            minD = d;
            selectedBezierIdx = i;
        }
    });
    // Keep the current selection when clicking empty space (only deselect when
    // there are no beziers at all).
    if (minD > threshold) {
        selectedBezierIdx = beziers.length === 0 ? undefined : pageState.selectedBezierIdx;
    }
    upd(pageState, { selectedBezierIdx, selectedControlPointIdx: undefined });
    drawElements(stateControl, refSvg, state.appState.pageState.toDraw);
}
export { onSelectBezierClicked };
//# sourceMappingURL=on-select-bezier-clicked.js.map