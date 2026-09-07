import { drawElements } from "../draw/draw-elements.js";
import { getViewBoxForBeziers } from "./viewbox.js";
function fitViewbox(stateControl, ref, changeViewbox) {
    const { upd, state } = stateControl;
    const { toDraw } = state.appState.pageState;
    const { pageState } = state.appState;
    const { beziers } = pageState;
    const viewbox = getViewBoxForBeziers(beziers);
    drawElements(stateControl, ref, toDraw);
    upd(state.appState.pageState, {
        ...(changeViewbox ? { viewbox } : {})
    });
}
export { fitViewbox };
//# sourceMappingURL=fit-viewbox.js.map