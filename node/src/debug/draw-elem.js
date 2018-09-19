"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function drawBezier(g, bezier, idx = 0, visible) {
    let visibleClass = visible ? '' : ' invisible';
    const COLORS = ['green', 'blue'];
    let $bezier = _bez_debug_.fs.draw.bezier(g, bezier, COLORS[idx] + ' thin10 nofill ' + visibleClass);
    return $bezier;
}
function drawIntersection(g, p, size, visible) {
    let visibleClass = visible ? '' : ' invisible';
    let $elems = _bez_debug_.fs.draw.crossHair(g, p, 'red thin5 nofill ' + visibleClass, size);
    return $elems;
}
function drawExtreme(g, extreme, visible = true) {
    let visibleClass = visible ? '' : ' invisible';
    let $elems = _bez_debug_.fs.draw.crossHair(g, extreme.p, 'red thin10 nofill ' + visibleClass);
    return $elems;
}
function drawBoundingHull(g, hull, visible = true, style = 'thin5 black nofill') {
    let visibleClass = visible ? '' : ' invisible';
    let $polygon = _bez_debug_.fs.draw.polygon(g, hull, style + visibleClass);
    return $polygon;
}
function drawLooseBoundingBox(g, box, visible = true) {
    let visibleClass = visible ? '' : ' invisible';
    let $box = _bez_debug_.fs.draw.rect(g, box, 'thin5 brown nofill ' + visibleClass);
    return $box;
}
function drawTightBoundingBox(g, box, visible = true) {
    let visibleClass = visible ? '' : ' invisible';
    let $box = _bez_debug_.fs.draw.polygon(g, box, 'thin5 black nofill ' + visibleClass);
    return $box;
}
let drawElemFunctions = {
    drawBezier,
    drawIntersection,
    drawExtreme,
    drawBoundingHull,
    drawLooseBoundingBox,
    drawTightBoundingBox,
};
exports.drawElemFunctions = drawElemFunctions;

//# sourceMappingURL=draw-elem.js.map
