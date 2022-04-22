function reverseXBoundTs(xBounds) {
    return {
        minX: { ts: xBounds.minX.ts.map(t => 1 - t), box: xBounds.minX.box },
        maxX: { ts: xBounds.maxX.ts.map(t => 1 - t), box: xBounds.maxX.box }
    };
}
function reverseYBoundTs(yBounds) {
    return {
        minY: { ts: yBounds.minY.ts.map(t => 1 - t), box: yBounds.minY.box },
        maxY: { ts: yBounds.maxY.ts.map(t => 1 - t), box: yBounds.maxY.box }
    };
}
export { reverseXBoundTs, reverseYBoundTs };
//# sourceMappingURL=reverse-bound-ts.js.map