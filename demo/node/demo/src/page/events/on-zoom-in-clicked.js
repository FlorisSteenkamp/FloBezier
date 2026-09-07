function onZoomInClicked(stateControl) {
    const { upd, state } = stateControl;
    const { appState } = state;
    const { pageState } = appState;
    const [[minX, minY], [maxX, maxY]] = pageState.viewbox;
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const w = maxX - minX;
    const h = maxY - minY;
    const viewbox = [
        [cx - w / 4, cy - h / 4],
        [cx + w / 4, cy + h / 4]
    ];
    upd(pageState, { viewbox });
}
export { onZoomInClicked };
//# sourceMappingURL=on-zoom-in-clicked.js.map