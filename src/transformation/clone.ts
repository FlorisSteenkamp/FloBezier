
/**
 * Returns a clone of the given cubic bezier (with a different reference).
 * 
 * @param ps a bezier curve given as an ordered array of its
 * control point coordinates, e.g. `[[0,0], [1,1], [2,1], [2,0]]`
 * 
 * @doc
 */
function clone(ps: number[][]) {
	const ps_: number[][] = [];
	for (let i=0; i<ps.length; i++) {
		const p = ps[i];
		ps_.push([p[0],p[1]]);
	}

	return ps_;
}


export { clone }
