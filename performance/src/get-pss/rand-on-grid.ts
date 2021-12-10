import { reduceSignificand } from "double-double";


function toGrid(
        a: number, 
        expMax: number,
        significantFigures: number): number {

    let expA = Math.floor(Math.log2(Math.abs(a)));
    let expDif = expMax - expA;
    let newSig = significantFigures - expDif + 1;

    if (newSig <= 0) { return 0; }

    let res = reduceSignificand(a, newSig);

    return res;
}


function randOnGrid(max: number, maxBitLength: number) { 
    if (maxBitLength === 53) { return () => max * Math.random(); }
    const expMax = Math.ceil(Math.log2(Math.max(max)));
    return () => toGrid(max * Math.random(), expMax, maxBitLength);
}

export { randOnGrid }
