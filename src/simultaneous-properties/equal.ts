
function equal(psA: number[][], psB: number[][]) {
    if (psA.length !== psB.length) { return false; }
    
    for (let i=0; i<psA.length; i++) {
        if (psA[i] !== psB[i]) {
            return false;
        }
    }

    return true;
}


export { equal }
