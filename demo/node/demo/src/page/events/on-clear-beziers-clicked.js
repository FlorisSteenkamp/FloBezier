import { drawElements } from "../draw/draw-elements.js";
/** Removes all beziers. */
function onClearBeziersClicked(stateControl, refSvg) {
    const { upd, state } = stateControl;
    const { pageState } = state.appState;
    upd(pageState, { beziers: [], selectedBezierIdx: undefined });
    drawElements(stateControl, refSvg, state.appState.pageState.toDraw);
}
export { onClearBeziersClicked };
//# sourceMappingURL=on-clear-beziers-clicked.js.map