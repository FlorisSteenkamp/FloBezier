interface BezierPiece {
    /** A bezier curve given by its control points */
    readonly ps: number[][];
    /** The t parameter range of the bezier curve */
    readonly ts: number[];
}
export type { BezierPiece };
