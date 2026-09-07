import { drawElements } from "../draw/draw-elements.js";
/** Deletes the currently selected bezier, if any. */
function onDeleteSelectedBezier(stateControl, refSvg) {
    const { upd, state } = stateControl;
    const { pageState } = state.appState;
    const { beziers, selectedBezierIdx } = pageState;
    if (selectedBezierIdx === undefined) {
        return;
    }
    const newBeziers = beziers.filter((_, i) => i !== selectedBezierIdx);
    upd(pageState, { beziers: newBeziers, selectedBezierIdx: undefined });
    drawElements(stateControl, refSvg, state.appState.pageState.toDraw);
}
export { onDeleteSelectedBezier };
//# sourceMappingURL=on-delete-selected-bezier.js.map