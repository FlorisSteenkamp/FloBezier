import type { BezierPiece } from './bezier-piece.js';
import { fromTo } from '../transformation/split/from-to.js';


function bezierPieceToBezier(
        piece: BezierPiece) {

    const { ps, ts } = piece;

    return fromTo(ps, ts[0], ts[1]);
}


export { bezierPieceToBezier }
