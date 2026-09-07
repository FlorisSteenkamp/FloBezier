import { getShapeBounds } from "./get-shape-bounds";
const { max } = Math;
function getViewBoxForBeziers(beziers) {
    const { minX, maxX, minY, maxY } = getShapeBounds(beziers);
    const width = maxX - minX;
    const height = maxY - minY;
    // The margin around the shape
    const c = max(width, height) * 0.05;
    return [[minX - c, minY - c], [maxX + c, maxY + c]];
}
function toViewBoxStr(viewbox) {
    const [x, y] = viewbox[0];
    const w = viewbox[1][0] - x;
    const h = viewbox[1][1] - y;
    return '' +
        x.toFixed(5) + ' ' +
        y.toFixed(5) + ' ' +
        w.toFixed(5) + ' ' +
        h.toFixed(5);
}
export { getViewBoxForBeziers, toViewBoxStr };
//# sourceMappingURL=viewbox.js.map