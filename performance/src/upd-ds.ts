import { X } from "../../src/index.js";

const abs = Math.abs;


/**
 * Returns `false` if the number of intersections is incorrect.
 * 
 * @param ds absolute distance values - gets updated!!
 * @param xs the correct intersections
 * @param ts the calculated intersections
 */
function updDs(
        ds: number[],
        xs: X[],
        ts: number[]): boolean {

    const xslength = xs ? xs.length : 0;
    const tslength = ts ? ts.length : 0;

    if (xslength !== tslength) {
        //console.log(xs, ts)
        return false;
    }
        
    for (let j=0; j<tslength; j++) {
        const tP = ts[j];
        let closest = Number.POSITIVE_INFINITY;
        for (let k=0; k<xslength; k++) {
            const xPair = xs[k];
            const ri = xPair.ri1;
            const t = (ri.tE + ri.tS) / 2;
            let delta = abs(t - tP);
            if (delta < closest) { 
                closest = delta; 
            }
        }
        ds.push(closest);
    }
    
    return true;
}


export { updDs }
