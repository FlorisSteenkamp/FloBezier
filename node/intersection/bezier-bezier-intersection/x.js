function getTFromRi(ri) {
    // calculated this way for slightly improved accuracy
    return ri.tS + (ri.tE - ri.tS) / 2;
}
function getPFromBox(box) {
    const tl = box[0];
    const br = box[1];
    return [
        (tl[0] + br[0]) / 2,
        (tl[1] + br[1]) / 2,
    ];
}
export { getTFromRi, getPFromBox };
//# sourceMappingURL=x.js.map