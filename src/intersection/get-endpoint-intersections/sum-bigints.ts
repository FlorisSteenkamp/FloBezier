
function sumBigints(vs: bigint[]) {
    let total = 0n;
    for (let i=0; i<vs.length; i++) {
        total += vs[i];
    }

    return total;
}


export { sumBigints }
