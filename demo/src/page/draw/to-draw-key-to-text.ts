import { ToDraw } from "../../state/to-draw.js"


const toDrawKeyToText: { [P in keyof ToDraw]?: string } = {
    bezier: "bezier",
    controlPoints: "control points",
    controlLines: "control lines",
    quadraticToPolyline: "poly points",
    polyQuads: "poly quads",
    inflections: "inflections",
    curvatureMaxima: "curvature maxima",
    curvature: "curvature",
    normal: "normal",
    tangent: "tangent",
    hausdorff: "hausdorff distance",
    boundingHull: "hulls",
    looseBoundingBox: "loose bbs",
    tightBoundingBox: "tight bbs",
    x: "intersections"
}


export { toDrawKeyToText }
