// ignore file coverage
function areIntersectionsOrdered(xs) {
    let current = Number.NEGATIVE_INFINITY;
    const tSs = xs.map(x => x[0].ri.tS);
    for (let t of tSs) {
        if (t < current) {
            return false;
        }
        current = t;
    }
    return true;
}
export { areIntersectionsOrdered };
//# sourceMappingURL=are-intersections-ordered.js.map