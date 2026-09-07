import { StateControl } from "../../state-control/state-control";
import { drawElements } from "../draw/draw-elements.js";


/** Deletes the currently selected bezier, if any. */
function onDeleteSelectedBezier(
        stateControl: StateControl,
        refSvg: React.RefObject<SVGSVGElement | null>): void {

    const { upd, state } = stateControl;
    const { pageState } = state.appState;
    const { beziers, selectedBezierIdx } = pageState;

    if (selectedBezierIdx === undefined) { return; }

    const newBeziers = beziers.filter((_, i) => i !== selectedBezierIdx);

    upd(pageState, { beziers: newBeziers, selectedBezierIdx: undefined });
    drawElements(stateControl, refSvg, state.appState.pageState.toDraw);
}


export { onDeleteSelectedBezier }
