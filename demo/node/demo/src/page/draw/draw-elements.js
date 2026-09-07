import { getBoundingBoxTight } from '../../../../src/global-properties/bounds/get-bounding-box-tight.js';
import { getBoundingBox } from '../../../../src/global-properties/bounds/get-bounding-box.js';
import { getBoundingHull } from '../../../../src/global-properties/bounds/get-bounding-hull.js';
import { getInflections } from '../../../../src/global-properties/get-inflections.js';
import { getCurvatureExtrema } from '../../../../src/get-curvature-extrema/get-curvature-extrema.js';
import { splitByDeviationFromStraighLine } from '../../../../src/transformation/split/split-by-deviation-from-straigh-line.js';
import { fitQuadsToCubic } from '../../../../src/fit/fit-quads-to-cubic.js';
import { tangent } from '../../../../src/local-properties-at-t/tangent/double/tangent.js';
import { normal } from '../../../../src/local-properties-at-t/normal/double/normal.js';
import { curvature } from '../../../../src/local-properties-at-t/curvature/curvature.js';
import { closestPointOnBezier } from '../../../../src/simultaneous-properties/closest-and-furthest-point-on-bezier/closest-point-on-bezier.js';
import { hausdorffDistanceExtra } from '../../../../src/simultaneous-properties/hausdorff-distance/hausdorff-distance-extra.js';
import { evalDeCasteljau } from '../../../../src/local-properties-at-t/evaluate/double/eval-de-casteljau.js';
import { deleteSvgs } from './delete-svgs.js';
import { getIntersections } from '../../../sweep-line/get-intersections.js';
import { drawFs } from 'flo-draw';
function drawElements(stateControl, ref, toDraws) {
    const { transientState, state } = stateControl;
    const { $svgs } = transientState;
    const { pageState } = state.appState;
    const { beziers, selectedBezierIdx, selectedControlPointIdx, viewbox } = pageState;
    const svg$ = ref.current;
    const g = svg$.getElementsByTagName('g')[0];
    deleteSvgs($svgs.bezier);
    deleteSvgs($svgs.controlPoints);
    deleteSvgs($svgs.controlLines);
    deleteSvgs($svgs.quadraticToPolyline);
    deleteSvgs($svgs.polyQuads);
    deleteSvgs($svgs.inflections);
    deleteSvgs($svgs.curvatureMaxima);
    deleteSvgs($svgs.curvature);
    deleteSvgs($svgs.normal);
    deleteSvgs($svgs.tangent);
    deleteSvgs($svgs.hausdorff);
    deleteSvgs($svgs.looseBoundingBox);
    deleteSvgs($svgs.tightBoundingBox);
    deleteSvgs($svgs.boundingHull);
    deleteSvgs($svgs.intersection);
    deleteSvgs($svgs.x);
    const looseBoundingBoxes = beziers.map(getBoundingBox);
    const tightBoundingBoxes = beziers.map(getBoundingBoxTight);
    const hulls = beziers.map(ps => getBoundingHull(ps, false));
    toDraws.bezier && $svgs.bezier.push(...beziers.map((elem, i) => drawFs.bezier(g, elem, i === selectedBezierIdx ? 'red thin50 nofill' : 'red onepx nofill')));
    toDraws.controlLines && $svgs.controlLines.push(...beziers.map(ps => drawFs.polyline(g, ps, 'lightgray thin10 nofill')));
    toDraws.controlPoints && $svgs.controlPoints.push(...beziers.map((ps, i) => ps.map((c, j) => {
        const hov = transientState.hoveredControlPoint;
        const isSelected = i === selectedBezierIdx && j === selectedControlPointIdx;
        const isHovered = !!hov && hov[0] === i && hov[1] === j;
        const r = controlPointRadius(viewbox) * (isSelected ? 1.9 : isHovered ? 1.5 : 1);
        const klass = isSelected ? 'orange thin0' : isHovered ? 'green thin0' : 'blue2 thin0';
        return drawFs.circle(g, { center: c, radius: r }, klass)[0];
    })));
    toDraws.looseBoundingBox && $svgs.looseBoundingBox.push(...looseBoundingBoxes.map(box => drawFs.rect(g, box, 'lightgray thin10 nofill')));
    toDraws.tightBoundingBox && $svgs.tightBoundingBox.push(...tightBoundingBoxes.map(poly => drawFs.polygon(g, poly, 'lightgray thin10 nofill')));
    toDraws.boundingHull && $svgs.boundingHull.push(...hulls.filter((h) => !!h).map(hull => drawFs.polygon(g, hull, 'lightgray thin10 nofill')));
    toDraws.quadraticToPolyline && $svgs.quadraticToPolyline.push(...beziers.map(ps => splitByDeviationFromStraighLine(ps, controlPointRadius(viewbox))
        .map(t => drawFs.circle(g, { center: evalDeCasteljau(ps, t), radius: controlPointRadius(viewbox) * 0.5 }, 'yellow thin0')[0])));
    toDraws.polyQuads && $svgs.polyQuads.push(...beziers.filter(ps => ps.length === 4)
        .map(ps => fitQuadsToCubic(ps, controlPointRadius(viewbox) / 10)
        .map((quad, i) => drawFs.bezier(g, quad, `${i % 2 === 0 ? 'hueA' : 'hueB'} thin100 nofill fade`)[0])));
    toDraws.inflections && $svgs.inflections.push(...beziers.map(ps => getInflections(ps).map(t => drawFs.circle(g, { center: evalDeCasteljau(ps, t), radius: controlPointRadius(viewbox) * 0.5 }, 'yellow thin0')[0])));
    toDraws.curvatureMaxima && $svgs.curvatureMaxima.push(...beziers
        .map(ps => getCurvatureExtrema(ps).maxima
        .map(t => drawFs.circle(g, {
        center: evalDeCasteljau(ps, t),
        radius: controlPointRadius(viewbox) * 0.5
    }, 'cyan thin0')[0])));
    if (toDraws.curvature && beziers.length) {
        const w = viewbox[1][0] - viewbox[0][0];
        const h = viewbox[1][1] - viewbox[0][1];
        const samples = 40;
        const maxLen = Math.min(w, h) / 10;
        beziers.forEach(ps => {
            // sample point/unit-normal/signed-curvature along the curve
            const arr = [];
            for (let i = 0; i <= samples; i++) {
                const t = i / samples;
                const k = curvature(ps, t);
                if (Number.isNaN(k)) {
                    continue;
                }
                arr.push({ p: evalDeCasteljau(ps, t), n: scaleTo(normal(ps, t), 1), k });
            }
            // normalize so this bezier's own max curvature maps to `maxLen`
            const maxK = Math.max(1e-12, ...arr.map(s => Math.abs(s.k)));
            const scale = maxLen / maxK;
            $svgs.curvature.push(arr.map(s => drawFs.line(g, [s.p, [s.p[0] + s.n[0] * s.k * scale, s.p[1] + s.n[1] * s.k * scale]], 'brown thin10')[0]));
        });
    }
    if ((toDraws.normal || toDraws.tangent) && transientState.mouseXY && beziers.length) {
        const w = viewbox[1][0] - viewbox[0][0];
        const h = viewbox[1][1] - viewbox[0][1];
        const len = Math.min(w, h) * 0.15;
        const p = transientState.mouseXY;
        let best;
        let minD = Infinity;
        for (const ps of beziers) {
            const cp = closestPointOnBezier(ps, p);
            if (cp.d < minD) {
                minD = cp.d;
                best = { ps, t: cp.t, at: cp.p };
            }
        }
        if (best) {
            if (toDraws.tangent) {
                const v = scaleTo(tangent(best.ps, best.t), len);
                $svgs.tangent.push(drawArrow(g, best.at, [best.at[0] + v[0], best.at[1] + v[1]], 'green thin20'));
            }
            if (toDraws.normal) {
                const v = scaleTo(normal(best.ps, best.t), len);
                $svgs.normal.push(drawArrow(g, best.at, [best.at[0] + v[0], best.at[1] + v[1]], 'purple thin20'));
            }
        }
    }
    if (toDraws.hausdorff && selectedBezierIdx !== undefined && beziers.length > 1) {
        const sel = beziers[selectedBezierIdx];
        beziers.forEach((ps, i) => {
            if (i === selectedBezierIdx) {
                return;
            }
            const { pA, pB } = hausdorffDistanceExtra(sel, ps);
            $svgs.hausdorff.push(drawFs.line(g, [pA, pB], 'orange thin10'));
        });
    }
    if (toDraws.x) {
        const r = Math.min(viewbox[1][0] - viewbox[0][0], viewbox[1][1] - viewbox[0][1]) * 0.015;
        $svgs.x.push(...getIntersections(beziers).map(([px, py]) => [
            ...drawFs.line(g, [[px - r, py - r], [px + r, py + r]], 'darkgreen thin10'),
            ...drawFs.line(g, [[px - r, py + r], [px + r, py - r]], 'darkgreen thin10'),
        ]));
    }
}
/** Control-point circle radius as a fraction of the smaller viewbox dimension. */
function controlPointRadius(viewbox) {
    return Math.min(viewbox[1][0] - viewbox[0][0], viewbox[1][1] - viewbox[0][1]) * 0.01;
}
/** Returns `v` rescaled to the given length. */
function scaleTo(v, len) {
    const m = Math.hypot(v[0], v[1]) || 1;
    return [v[0] / m * len, v[1] / m * len];
}
/** Draws a line from `from` to `to` with an arrowhead at `to`; returns the created svgs. */
function drawArrow(g, from, to, klass) {
    const dx = to[0] - from[0];
    const dy = to[1] - from[1];
    const m = Math.hypot(dx, dy) || 1;
    const ux = dx / m, uy = dy / m;
    const headLen = m * 0.25;
    const a = 0.45; // arrowhead half-angle in radians
    const cos = Math.cos(a), sin = Math.sin(a);
    // backward direction (-u) rotated by ±a
    const b1 = [(-ux) * cos - (-uy) * sin, (-ux) * sin + (-uy) * cos];
    const b2 = [(-ux) * cos + (-uy) * sin, -(-ux) * sin + (-uy) * cos];
    const end1 = [to[0] + b1[0] * headLen, to[1] + b1[1] * headLen];
    const end2 = [to[0] + b2[0] * headLen, to[1] + b2[1] * headLen];
    return [
        ...drawFs.line(g, [from, to], klass),
        ...drawFs.line(g, [to, end1], klass),
        ...drawFs.line(g, [to, end2], klass),
    ];
}
export { drawElements, controlPointRadius };
//# sourceMappingURL=draw-elements.js.map