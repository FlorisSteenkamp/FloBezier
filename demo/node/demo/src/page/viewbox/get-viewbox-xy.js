const { min } = Math;
function getViewboxXY(svg$, viewbox, pixelsX, pixelsY) {
    const boundingRect = svg$.getBoundingClientRect();
    const pixelsW = boundingRect.width;
    const pixelsH = boundingRect.height;
    const viewboxW = viewbox[1][0] - viewbox[0][0];
    const viewboxH = viewbox[1][1] - viewbox[0][1];
    // The SVG uses the default preserveAspectRatio 'xMidYMid meet': the viewBox
    // is scaled uniformly (not stretched) to fit and then centered, leaving
    // letterbox margins on the longer axis. Invert that same mapping so the
    // returned coordinate matches the actual mouse position for non-square
    // viewBoxes too.
    const scale = min(pixelsW / viewboxW, pixelsH / viewboxH);
    const offsetX = (pixelsW - viewboxW * scale) / 2;
    const offsetY = (pixelsH - viewboxH * scale) / 2;
    const viewboxX = ((pixelsX - offsetX) / scale) + viewbox[0][0];
    // Y grows upward: bottom-left of the viewBox is the origin.
    const viewboxY = viewbox[1][1] - ((pixelsY - offsetY) / scale);
    return [viewboxX, viewboxY];
}
export { getViewboxXY };
//# sourceMappingURL=get-viewbox-xy.js.map