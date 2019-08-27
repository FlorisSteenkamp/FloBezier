"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flo_vector2d_1 = require("flo-vector2d");
const flo_draw_1 = require("flo-draw");
function fatLine(g, fatLine) {
    let { l, minD, maxD } = fatLine;
    let [lp1, lp2] = l;
    const E = 1024;
    let lv = flo_vector2d_1.fromTo(lp1, lp2);
    let lvTimes10 = [+E * lv[0], +E * lv[1]];
    let reverseLvTimes10 = [-E * lv[0], -E * lv[1]];
    let normal = [-lv[1], lv[0]]; // Rotate by -90 degrees
    let normMin = flo_vector2d_1.toLength(normal, minD);
    let normMax = flo_vector2d_1.toLength(normal, maxD);
    let extLp1 = flo_vector2d_1.translate(lp1, reverseLvTimes10);
    let extLp2 = flo_vector2d_1.translate(lp2, lvTimes10);
    let nl11 = flo_vector2d_1.translate(extLp1, normMin);
    let nl12 = flo_vector2d_1.translate(extLp2, normMin);
    let nl21 = flo_vector2d_1.translate(extLp1, normMax);
    let nl22 = flo_vector2d_1.translate(extLp2, normMax);
    let nl1 = [nl11, nl12];
    let nl2 = [nl21, nl22];
    let $line1 = flo_draw_1.drawFs.line(g, nl1);
    let $line2 = flo_draw_1.drawFs.line(g, nl2);
    return [...$line1, ...$line2];
}
function beziers(g, beziers) {
    let $bezier1 = flo_draw_1.drawFs.bezier(g, beziers[0], 'blue thin5 nofill');
    let $bezier2 = flo_draw_1.drawFs.bezier(g, beziers[1], 'green thin5 nofill');
    let size = getSize([...beziers[0], ...beziers[1]]) / 400;
    let $dots = [];
    for (let i = 0; i < beziers.length; i++) {
        let bezier = beziers[i];
        for (let j = 0; j < bezier.length; j++) {
            let p = bezier[j];
            $dots.push(...flo_draw_1.drawFs.dot(g, p, size, i === 0 ? 'blue' : 'green'));
        }
    }
    /*
    let $dots = [
        ...drawFs.dot(g, beziers[0][0], size, 'blue'),
        ...drawFs.dot(g, beziers[0][1], size, 'blue'),
        ...drawFs.dot(g, beziers[0][2], size, 'blue'),
        ...drawFs.dot(g, beziers[0][3], size, 'blue'),
        ...drawFs.dot(g, beziers[1][0], size, 'green'),
        ...drawFs.dot(g, beziers[1][1], size, 'green'),
        ...drawFs.dot(g, beziers[1][2], size, 'green'),
        ...drawFs.dot(g, beziers[1][3], size, 'green'),
    ]
    */
    return [...$bezier1, ...$bezier2, ...$dots];
}
function getSize(ps) {
    let minX = Number.POSITIVE_INFINITY;
    let minY = Number.POSITIVE_INFINITY;
    let maxX = Number.NEGATIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    for (let p of ps) {
        if (p[0] < minX) {
            minX = p[0];
        }
        if (p[1] < minY) {
            minY = p[1];
        }
        if (p[0] > maxX) {
            maxX = p[0];
        }
        if (p[1] > maxY) {
            maxY = p[1];
        }
    }
    let width = maxX - minX;
    let height = maxY - minY;
    return Math.max(width, height);
}
function intersection(g, p) {
    let $elems = flo_draw_1.drawFs.crossHair(g, p, 'red thin5 nofill', 0.5);
    return $elems;
}
function extreme(g, extreme) {
    let $elems = flo_draw_1.drawFs.crossHair(g, extreme.p, 'red thin10 nofill', 0.05);
    return $elems;
}
function boundingHull(g, hull) {
    let $polygon = flo_draw_1.drawFs.polygon(g, hull, 'thin5 black nofill');
    return $polygon;
}
function looseBoundingBox(g, box) {
    let $box = flo_draw_1.drawFs.rect(g, box, 'thin5 brown nofill');
    return $box;
}
function tightBoundingBox(g, box) {
    let $box = flo_draw_1.drawFs.polygon(g, box, 'thin5 black nofill');
    return $box;
}
let drawElemFunctions = {
    beziers,
    intersection,
    extreme,
    boundingHull,
    looseBoundingBox,
    tightBoundingBox,
    fatLine
};
exports.drawElemFunctions = drawElemFunctions;
//# sourceMappingURL=draw-elem.js.map