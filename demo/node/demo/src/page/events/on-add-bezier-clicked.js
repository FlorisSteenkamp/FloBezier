import { drawElements } from "../draw/draw-elements.js";
/** Adds a randomish bezier of the given order (1, 2 or 3) centered in the current viewbox. */
function onAddBezierClicked(stateControl, refSvg, order = 3) {
    const { upd, state } = stateControl;
    const { pageState } = state.appState;
    const [[minX, minY], [maxX, maxY]] = pageState.viewbox;
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const r = Math.min(maxX - minX, maxY - minY) * 0.2;
    const rnd = () => (Math.random() - 0.5) * 2 * r;
    const bezier = Array.from({ length: order + 1 }, () => [cx + rnd(), cy + rnd()]);
    upd(pageState, { beziers: [...pageState.beziers, bezier] });
    drawElements(stateControl, refSvg, state.appState.pageState.toDraw);
}
export { onAddBezierClicked };
//# sourceMappingURL=on-add-bezier-clicked.js.map