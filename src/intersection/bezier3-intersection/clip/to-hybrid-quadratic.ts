
function toHybridQuadratic(ps: number[][]): [
		[number, number], 
		[number, number], 
		[number, number],
		[number, number]] {

	// the below is too slow
	//const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = ps; 

	const p0 = ps[0];
	const p1 = ps[1];
	const p2 = ps[2];
	const p3 = ps[3];

	const x0 = p0[0];
	const y0 = p0[1];
	const x1 = p1[0];
	const y1 = p1[1];
	const x2 = p2[0];
	const y2 = p2[1];
	const x3 = p3[0];
	const y3 = p3[1];

	return [
		[x0,y0],				  	     // evaluated at t
		[(3*x1 - x0)/2, (3*y1 - y0)/2],  // evaluated at (1-t)
		[(3*x2 - x3)/2, (3*y2 - y3)/2],  // evaluated at t
		[x3,y3] 						 // evaluated at t
	];

}


export { toHybridQuadratic }
