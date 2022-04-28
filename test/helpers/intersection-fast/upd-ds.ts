import { X } from "../../../src/index.js";

const abs = Math.abs;


/**
 * @param ds absolute distance values - gets updated!!
 * @param xs the correct intersections
 * @param ts the calculated intersections
 */
function updDs(
        ds: number[],
        xs: X[],
        ts: number[]): void {

    for (let j=0; j<ts.length; j++) {
        const tP = ts[j];
        let closest = Number.POSITIVE_INFINITY;
        for (let k=0; k<xs.length; k++) {
            const x = xs[k];
            const ri = x.ri1;
            const t = (ri.tE + ri.tS) / 2;
            let delta = abs(t - tP);
            if (delta < closest) { 
                closest = delta; 
            }
        }
        ds.push(closest);
    }
}


export { updDs }
