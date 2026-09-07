import { getBounds } from '../../../../src/global-properties/bounds/get-bounds.js';
const { min, max } = Math;
function getShapeBounds(pss) {
    const bounds = pss.map(getBounds);
    return {
        minX: min(...bounds.map(bound => bound.box[0][0])),
        maxX: max(...bounds.map(bound => bound.box[1][0])),
        minY: min(...bounds.map(bound => bound.box[0][1])),
        maxY: max(...bounds.map(bound => bound.box[1][1])),
    };
}
export { getShapeBounds };
//# sourceMappingURL=get-shape-bounds.js.map