
const { sqrt } = Math;


/**
 * Returns a function that returns the signed distance to the given line from
 * the given point.
 * 
 * @param pS a point on the line
 * @param pE a different point on the line; if `pS` is the same as `pE` then
 * the distance to the point `pS` (or `pE`) will be returned.
 */
function getDistanceToLineFunction(
		pS: number[],
		pE: number[]) {

	const xS = pS[0];
	const yS = pS[1];
	const xE = pE[0];
	const yE = pE[1];

	const s = yS - yE;
	const t = xE - xS;
	const v = xS*yE - xE*yS;
	
	// Calculate the length of the line for normalization
	const lineLength = sqrt(s*s + t*t);

	return function(p: number[]): number {
		const x = p[0];
		const y = p[1];

		// Calculate the perpendicular distance from point to line
		return lineLength !== 0
            ? (s*x + t*y + v) / lineLength
            : sqrt((x - xS)**2 + (y - yS)**2)
        ;
	}
}


export { getDistanceToLineFunction }


// Quokka tests
{
    const pS = [6,2];
    const pE = [6,2];
    const p = [10,1];
    const f = getDistanceToLineFunction(pS,pE);
    f(p);//?
}
// {
//     const p0 = [0,0];
//     const p1 = [6,1];
//     const p2 = [10,1];
//     const f = getDistanceToLineFunction(p0,p2);
//     f(p1);//?
// }
