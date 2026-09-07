import { StateControl } from "../../state-control/state-control.js";
import { drawElements } from "../draw/draw-elements.js";
import { getViewBoxForBeziers } from "./viewbox.js";


function fitViewbox(
        stateControl: StateControl,
        ref: React.RefObject<SVGSVGElement | null>,
        changeViewbox: boolean) {

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


export { fitViewbox }
