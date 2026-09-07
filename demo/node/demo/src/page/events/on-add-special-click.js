import { drawElements, controlPointRadius } from "../draw/draw-elements.js";
import { generateArcFromQuads } from "../../../../src/create/generate-arc-from-quads.js";
import { generateArcFromCubics } from "../../../../src/create/generate-arc-from-cubics.js";
import { drawFs } from 'flo-draw';
/** Removes the pending arc click markers. */
function clearMarkers(stateControl) {
    const markers = stateControl.transientState.arcClickMarkers;
    if (markers) {
        for (const m of markers) {
            m.remove();
        }
        markers.length = 0;
    }
}
/** Accumulates the center/start/end clicks for a pending arc flow and, once all
 * three are picked, appends the generated arc beziers and clears the flow. */
function onAddSpecialClick(stateControl, refSvg, addSpecial, p) {
    const { upd, transientState, state } = stateControl;
    const { pageState } = state.appState;
    const clicks = [...addSpecial.clicks, p];
    if (clicks.length < 3) {
        upd(pageState, { addSpecial: { kind: addSpecial.kind, clicks } });
        const g = refSvg.current?.getElementsByTagName('g')[0];
        if (g) {
            const radius = controlPointRadius(pageState.viewbox) * 0.7;
            const $marker = drawFs.circle(g, { center: p, radius }, 'purple thin0');
            (transientState.arcClickMarkers ??= []).push(...$marker);
        }
        return;
    }
    const [c, p1, p2] = clicks;
    const generated = addSpecial.kind === 'arcFromQuads'
        ? generateArcFromQuads(c, p1, p2)
        : generateArcFromCubics(c, p1, p2);
    upd(pageState, {
        beziers: [...pageState.beziers, ...generated],
        addSpecial: undefined
    });
    clearMarkers(stateControl);
    drawElements(stateControl, refSvg, state.appState.pageState.toDraw);
}
export { onAddSpecialClick };
//# sourceMappingURL=on-add-special-click.js.map