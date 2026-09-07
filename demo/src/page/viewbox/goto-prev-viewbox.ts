import type { StateControl } from "../../state-control/state-control.js";
import { getViewBoxForBeziers } from './viewbox.js';


function gotoPrevViewbox(
        stateControl: StateControl) {

    const { transientState, state, upd } = stateControl;
    const { pageState } = state.appState;
    const { beziers } = pageState;

    let viewbox = transientState.viewboxStack.pop();
    if (!viewbox) {

        viewbox = getViewBoxForBeziers(beziers);
    }

    upd(pageState, { viewbox });
}


export { gotoPrevViewbox }
