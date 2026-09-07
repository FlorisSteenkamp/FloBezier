import { StateControl } from "../../state-control/state-control";


function onZoomOutClicked(
        stateControl: StateControl): void {

    const { upd, state } = stateControl;
    const { appState } = state;
    const { pageState } = appState;

    const [[minX, minY], [maxX, maxY]] = pageState.viewbox;
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const w = maxX - minX;
    const h = maxY - minY;
    const viewbox = [
        [cx - w, cy - h],
        [cx + w, cy + h]
    ];

    upd(pageState, { viewbox });
}


export { onZoomOutClicked }
