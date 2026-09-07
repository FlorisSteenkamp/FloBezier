/**
 * Returns `true` if the given bezier piece has zero length, i.e. if the start
 * and end parameter are the same or if all control points are the same;
 * otherwise returns `false`.
 *
 * @param piece the bezier piece to check
 */
function isBezierPieceZeroLength(piece) {
    const { ps, ts: [tS, tE] } = piece;
    if (tS === tE || ps.length <= 1) {
        return true;
    }
    const [[x0, y0], [x1, y1]] = ps;
    const same0 = (x0 === x1 && y0 === y1);
    if (ps.length === 2) {
        return same0;
    }
    const [x2, y2] = ps[2];
    const same1 = same0 && (x1 === x2 && y1 === y2);
    if (ps.length === 3) {
        return same1;
    }
    const [x3, y3] = ps[3];
    const same2 = same1 && (x2 === x3 && y2 === y3);
    if (ps.length === 4) {
        return same2;
    }
    return false;
}
export { isBezierPieceZeroLength };
//# sourceMappingURL=is-bezier-piece-zero-length.js.map