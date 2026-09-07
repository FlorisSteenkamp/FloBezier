import type { ToDraw } from "./to-draw.js";


function createEmptyGeneratedSvgs(): { [T in keyof ToDraw]: SVGElement[][] }  {
    return {
        bezier: [],
        controlPoints: [],
        controlLines: [],
        quadraticToPolyline: [],
        polyQuads: [],
        inflections: [],
        curvatureMaxima: [],
        curvature: [],
        normal: [],
        tangent: [],
        hausdorff: [],
        looseBoundingBox: [],
        tightBoundingBox: [],
        boundingHull: [],
        intersection: [],
        x: []
    };
}


export { createEmptyGeneratedSvgs }
