import { X } from "../../../src/index.js";

const abs = Math.abs;


/**
 * @param ds absolute distance values - gets updated!!
 * @param xPairs the correct intersections
 * @param ts the calculated intersections
 */
function updDs(
        ds: number[],
        xPairs: X[][],
        ts: number[]): void {

    for (let j=0; j<ts.length; j++) {
        const tP = ts[j];
        let closest = Number.POSITIVE_INFINITY;
        for (let k=0; k<xPairs.length; k++) {
            const xPair = xPairs[k];
            const ri = xPair[0].ri;
            const t = ri.tS === 0 && ri.tE === 1 
                ? 0 
                : (ri.tE + ri.tS) / 2;
            let delta = abs(t - tP);
            if (delta < closest) { 
                closest = delta; 
            }
        }
        ds.push(closest);
    }
}


export { updDs }
