import { deleteSvgs } from './delete-svgs.js';
function drawElements(stateControl, ref, toDraws) {
    const { transientState } = stateControl;
    const { $svgs } = transientState;
    const svg$ = ref.current;
    const g = svg$.getElementsByTagName('g')[0];
    deleteSvgs($svgs.bezier);
    deleteSvgs($svgs.looseBoundingBox);
    deleteSvgs($svgs.tightBoundingBox);
    deleteSvgs($svgs.boundingHull);
    deleteSvgs($svgs.intersection);
    deleteSvgs($svgs.inflections);
    deleteSvgs($svgs.x);
    // toDraws.bezier_ && $svgs.bezier_.push(...bezier_.map(elem => drawFs.bezier(g, elem)));
}
export { drawElements };
//# sourceMappingURL=draw-elements.js.map