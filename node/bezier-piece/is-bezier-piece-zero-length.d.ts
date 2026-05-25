import type { BezierPiece } from "./bezier-piece.js";
/**
 * Returns `true` if the given bezier piece has zero length, i.e. if the start
 * and end parameter are the same or if all control points are the same;
 * otherwise returns `false`.
 *
 * @param piece the bezier piece to check
 */
declare function isBezierPieceZeroLength(piece: BezierPiece): boolean;
export { isBezierPieceZeroLength };
