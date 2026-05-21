import { fromTo } from '../transformation/split/from-to.js';
function bezierPieceToBezier(piece) {
    const { ps, ts } = piece;
    return fromTo(ps, ts[0], ts[1]);
}
export { bezierPieceToBezier };
//# sourceMappingURL=bezier-piece-to-bezier.js.map