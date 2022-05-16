/**
 * Returns the given points (e.g. bezier curve) in reverse order.
 *
 * Implementation details:
 * ```
 * const reverse = ps => ps.slice().reverse()
 * ```
 *
 * @param ps a bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 *
 * @doc
 */
function reverse(ps) {
    return ps.slice().reverse();
}
export { reverse };
//# sourceMappingURL=reverse.js.map