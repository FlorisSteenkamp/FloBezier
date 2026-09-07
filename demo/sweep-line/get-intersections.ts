import { sweepLine } from "./sweep-line.js";
import { getBoundingBox } from "../../src/global-properties/bounds/get-bounding-box.js";
import { areBoxesIntersecting } from "../../src/boxes/are-boxes-intersecting.js";
import { bezierBezierIntersection } from "../../src/intersection/bezier-bezier-intersection/bezier-bezier-intersection.js";
import { bezierSelfIntersection } from "../../src/intersection/self-intersection/bezier-self-intersection.js";
import { evalDeCasteljau } from "../../src/local-properties-at-t/evaluate/double/eval-de-casteljau.js";


interface BoxedBezier {
    /** Loose (axis-aligned) bounding box as `[[minX,minY],[maxX,maxY]]`. */
    readonly box: number[][];
    readonly ps: number[][];
}


/**
 * Returns all intersection points between the given beziers.
 *
 * Candidate pairs are first found via a sweep line over the beziers' loose
 * bounding boxes; only those candidates are then tested for exact
 * bezier-bezier intersections.
 */
function getIntersections(beziers: number[][][]): number[][] {

    const items: BoxedBezier[] = beziers.map(ps => ({ box: getBoundingBox(ps), ps }));

    const candidatePairs = sweepLine(
        items,
        item => item.box[0][0],
        item => item.box[1][0],
        (a, b) => areBoxesIntersecting(true, a.box, b.box)
    );

    const points: number[][] = [];
    for (const { a, b } of candidatePairs) {
        for (const x of bezierBezierIntersection(a.ps, b.ps)) {
            points.push(x.p);
        }
    }

    // Self-intersections (only cubics and higher can have them).
    for (const ps of beziers) {
        const ts = bezierSelfIntersection(ps);
        if (ts.length > 0) { points.push(evalDeCasteljau(ps, ts[0])); }
    }

    return points;
}


export { getIntersections }
