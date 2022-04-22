/**
 * Returns a clone of the given cubic bezier (with a different reference).
 *
 * @param ps a bezier given by its array of control points
 *
 * @doc
 */
function clone(ps) {
    const ps_ = [];
    for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        ps_.push([p[0], p[1]]);
    }
    return ps_;
}
export { clone };
//# sourceMappingURL=clone.js.map