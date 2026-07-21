import type { BezierPiece } from "./bezier-piece.js";
import { length } from '../global-properties/length/length.js';


function getBezierPieceLength(
        bezierPiece: BezierPiece): number {

    return length(bezierPiece.ts, bezierPiece.ps);
}


export { getBezierPieceLength }
