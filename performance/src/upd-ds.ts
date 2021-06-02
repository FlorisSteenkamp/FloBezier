import { X } from "../../src";

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
        xs: X[][],
        ts: number[]): boolean {

    if (xs.length !== ts.length) {
        //console.log('DIFFERENT!!!'); throw 'done';
        return false;
    }
        
    for (let j=0; j<ts.length; j++) {
        const tP = ts[j];
        let closest = Number.POSITIVE_INFINITY;
        for (let k=0; k<xs.length; k++) {
            const xPair = xs[k];
            const ri = xPair[0].ri;
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
