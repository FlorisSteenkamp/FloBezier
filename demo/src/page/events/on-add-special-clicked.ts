import { StateControl } from "../../state-control/state-control";
import { drawElements } from "../draw/draw-elements.js";
import { generateCuspAtHalf3 } from "../../../../src/create/generate-cusp-at-half-t.js";
import { generateArcFromQuads } from "../../../../src/create/generate-arc-from-quads.js";
import { generateArcFromCubics } from "../../../../src/create/generate-arc-from-cubics.js";


/**
 * Starts an "add special" flow. A cusp cubic is added immediately; an arc
 * selection arms a 3-click flow (center, then the two points) that is resolved
 * by `onAddSpecialClick` as the user clicks on the canvas.
 */
function onAddSpecialClicked(
        stateControl: StateControl,
        refSvg: React.RefObject<SVGSVGElement | null>,
        kind: 'cusp' | 'arcFromQuads' | 'arcFromCubics'): void {

    const { upd, state } = stateControl;
    const { pageState } = state.appState;

    if (kind === 'cusp') {
        addCusp(stateControl, refSvg);
        return;
    }

    upd(pageState, { addSpecial: { kind, clicks: [] } });
}


function addCusp(
        stateControl: StateControl,
        refSvg: React.RefObject<SVGSVGElement | null>): void {

    const { upd, state } = stateControl;
    const { pageState } = state.appState;

    const [[minX, minY], [maxX, maxY]] = pageState.viewbox;
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const r = Math.min(maxX - minX, maxY - minY) * 0.25;
    const rnd = () => (Math.random() - 0.5) * 2 * r;

    const p0 = [cx + rnd(), cy + rnd()];
    const pz = [cx + rnd(), cy + rnd()];
    const pE = [cx + rnd(), cy + rnd()];

    const bezier = generateCuspAtHalf3(p0, pz, pE);

    upd(pageState, { beziers: [...pageState.beziers, bezier] });
    drawElements(stateControl, refSvg, state.appState.pageState.toDraw);
}


export { onAddSpecialClicked }
