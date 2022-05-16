
/**
 * Returns a 'human readable' string representation of the given bezier curve.
 * 
 * @param ps a bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0],[1,1],[2,1],[2,0]]`
 * 
 * @doc
 */
function toString(ps: number[][]): string {
	return `[${ps.map(p => `[${p.join(',')}]`).join(',')}]`;
}


export { toString }
