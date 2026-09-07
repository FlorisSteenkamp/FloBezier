import { drawElements } from "./draw-elements.js";
import { getViewBoxForBeziers } from "./viewbox.js";
function loadDeduced(stateControl, ref, changeViewbox) {
    const { upd, state } = stateControl;
    const { toDraw } = state.appState.pageState;
    const { pageState } = state.appState;
    const { beziers } = pageState;
    const viewbox = getViewBoxForBeziers(beziers);
    // let loopss = [];
    // stateControl.transientState.bezierLoopss = loopss;
    drawElements(stateControl, ref, toDraw);
    upd(state.appState.pageState, {
        ...(changeViewbox ? { viewbox } : {})
    });
}
export { loadDeduced };
//# sourceMappingURL=lazy-load-deduced.js.map