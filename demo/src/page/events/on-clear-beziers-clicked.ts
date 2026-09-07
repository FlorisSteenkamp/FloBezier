import { StateControl } from "../../state-control/state-control";
import { drawElements } from "../draw/draw-elements.js";


/** Removes all beziers. */
function onClearBeziersClicked(
        stateControl: StateControl,
        refSvg: React.RefObject<SVGSVGElement | null>): void {

    const { upd, state } = stateControl;
    const { pageState } = state.appState;

    upd(pageState, { beziers: [], selectedBezierIdx: undefined });
    drawElements(stateControl, refSvg, state.appState.pageState.toDraw);
}


export { onClearBeziersClicked }
