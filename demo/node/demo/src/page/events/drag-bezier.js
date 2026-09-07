import { getViewboxXY } from "../viewbox/get-viewbox-xy.js";
import { drawElements, controlPointRadius } from "../draw/draw-elements.js";
import { closestPointOnBezier } from "../../../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/closest-point-on-bezier.js";
import { squaredDistanceBetween } from "flo-vector2d";
/** Hit threshold as a fraction of the smaller viewbox dimension. */
function hitThreshold(viewbox) {
    const w = viewbox[1][0] - viewbox[0][0];
    const h = viewbox[1][1] - viewbox[0][1];
    return Math.min(w, h) * 0.02;
}
/** Returns the index of the bezier under `p`, or `undefined` if none is close. */
function findBezierAt(beziers, p, threshold) {
    let idx = undefined;
    let minD = Infinity;
    beziers.forEach((ps, i) => {
        const { d } = closestPointOnBezier(ps, p);
        if (d < minD) {
            minD = d;
            idx = i;
        }
    });
    return (idx !== undefined && minD <= threshold) ? idx : undefined;
}
/** Returns the `[bezierIdx, controlPointIdx]` under `p`, or `undefined` if none is close. */
function findControlPointAt(beziers, p, radius) {
    const maxDSquared = radius * radius;
    let hit = undefined;
    let minDSquared = Infinity;
    beziers.forEach((ps, i) => {
        ps.forEach((c, j) => {
            const dSquared = squaredDistanceBetween(c, p);
            if (dSquared < minDSquared) {
                minDSquared = dSquared;
                hit = [i, j];
            }
        });
    });
    return (hit !== undefined && minDSquared <= maxDSquared) ? hit : undefined;
}
/** Starts dragging the bezier under the pointer. Returns `true` if one was hit. */
function tryStartBezierDrag(stateControl, refSvg, event) {
    const svg$ = refSvg.current;
    if (!svg$) {
        return false;
    }
    const { upd, state, transientState } = stateControl;
    const { pageState } = state.appState;
    const { beziers, viewbox, toDraw } = pageState;
    const p = getViewboxXY(svg$, viewbox, event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    // Grabbing a control point takes precedence over dragging the whole bezier.
    if (toDraw.controlPoints) {
        const cp = findControlPointAt(beziers, p, controlPointRadius(viewbox) * 1.5);
        if (cp !== undefined) {
            const [bezierIdx, controlPointIdx] = cp;
            transientState.dragState = { bezierIdx, controlPointIdx, prevViewboxXY: p };
            upd(pageState, { selectedBezierIdx: bezierIdx, selectedControlPointIdx: controlPointIdx });
            drawElements(stateControl, refSvg, state.appState.pageState.toDraw);
            return true;
        }
    }
    const idx = findBezierAt(beziers, p, hitThreshold(viewbox));
    if (idx === undefined) {
        return false;
    }
    transientState.dragState = { bezierIdx: idx, prevViewboxXY: p };
    upd(pageState, { selectedBezierIdx: idx, selectedControlPointIdx: undefined });
    drawElements(stateControl, refSvg, state.appState.pageState.toDraw);
    return true;
}
/** Translates the dragged bezier by the pointer movement since the last event. */
function dragBezier(stateControl, refSvg, event) {
    const svg$ = refSvg.current;
    if (!svg$) {
        return;
    }
    const { upd$, state, transientState } = stateControl;
    const { dragState } = transientState;
    if (dragState.bezierIdx === undefined) {
        return;
    }
    const { pageState } = state.appState;
    const { beziers, viewbox } = pageState;
    const p = getViewboxXY(svg$, viewbox, event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    const [prevX, prevY] = dragState.prevViewboxXY;
    const dx = p[0] - prevX;
    const dy = p[1] - prevY;
    const idx = dragState.bezierIdx;
    const cpIdx = dragState.controlPointIdx;
    const newBeziers = beziers.map((ps, i) => {
        if (i !== idx) {
            return ps;
        }
        // Move a single control point, or the whole bezier if none is grabbed.
        return ps.map(([x, y], j) => (cpIdx === undefined || j === cpIdx) ? [x + dx, y + dy] : [x, y]);
    });
    dragState.prevViewboxXY = p;
    // Redraw without triggering a react render / localstorage write per move.
    upd$(pageState, { beziers: newBeziers });
    drawElements(stateControl, refSvg, state.appState.pageState.toDraw);
    // Optionally refresh the react side panel live (can be toggled off if slow).
    if (state.appState.pageState.liveUpdate) {
        stateControl.render();
    }
}
/** Ends an in-progress drag, persisting the final position. Returns `true` if dragging. */
function endBezierDrag(stateControl) {
    const { transientState, state, upd } = stateControl;
    const { dragState } = transientState;
    if (dragState.bezierIdx === undefined) {
        return false;
    }
    transientState.dragState = {};
    const { pageState } = state.appState;
    upd(pageState, { beziers: pageState.beziers });
    return true;
}
export { tryStartBezierDrag, dragBezier, endBezierDrag, findControlPointAt };
//# sourceMappingURL=drag-bezier.js.map