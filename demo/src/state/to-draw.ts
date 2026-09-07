
interface ToDraw { 
    readonly bezier: boolean;
    readonly controlPoints: boolean;
    readonly controlLines: boolean;
    readonly quadraticToPolyline: boolean;
    readonly polyQuads: boolean;
    readonly inflections: boolean;
    readonly curvatureMaxima: boolean;
    readonly curvature: boolean;
    readonly normal: boolean;
    readonly tangent: boolean;
    readonly hausdorff: boolean;
    readonly intersection: boolean;
    readonly looseBoundingBox: boolean;
    readonly tightBoundingBox: boolean;
    readonly boundingHull: boolean;
    readonly x: boolean;
}


export type { ToDraw }
