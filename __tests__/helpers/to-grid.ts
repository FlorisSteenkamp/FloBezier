import { reduceSignificand } from "double-double";

const { floor, log2, abs } = Math;


function toGrid(
        a: number, 
        expMax: number,
        significantBits: number): number {

    let expA = floor(log2(abs(a)));
    let expDif = expMax - expA;
    let newSig = significantBits - expDif + 1;

    if (newSig <= 0) { return 0; }

    return reduceSignificand(a, newSig);
}


export { toGrid }
