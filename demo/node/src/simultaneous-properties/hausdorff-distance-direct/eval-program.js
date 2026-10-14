/**
 * Evaluates the program for the given inputs.
 *
 * @param P the program
 * @param inputs the input values (`P.nIn` of them)
 */
function evalProgram(P, inputs) {
    const { nIn, pairs, coef, fstart, fidx, ostart } = P;
    const nPairs = pairs.length >> 1;
    const T = new Float64Array(nIn + nPairs);
    for (let i = 0; i < nIn; i++) {
        T[i] = inputs[i];
    }
    for (let k = 0; k < nPairs; k++) {
        T[nIn + k] = T[pairs[2 * k]] * T[pairs[2 * k + 1]];
    }
    const nOut = ostart.length - 1;
    const out = new Float64Array(nOut);
    for (let o = 0; o < nOut; o++) {
        let s = 0;
        for (let t = ostart[o]; t < ostart[o + 1]; t++) {
            let p = coef[t];
            for (let f = fstart[t]; f < fstart[t + 1]; f++) {
                p *= T[fidx[f]];
            }
            s += p;
        }
        out[o] = s;
    }
    return out;
}
export { evalProgram };
function evalProgram2(P, inputs) {
    const { nIn, pairs, coef, fidx, ostart, c0 } = P;
    const nPairs = pairs.length >> 1;
    const T = new Float64Array(nIn + nPairs);
    for (let i = 0; i < nIn; i++) {
        T[i] = inputs[i];
    }
    for (let k = 0, n = nIn; k < nPairs; k++, n++) {
        T[n] = T[pairs[2 * k]] * T[pairs[2 * k + 1]];
    }
    const nOut = c0.length;
    const out = new Float64Array(nOut);
    for (let o = 0; o < nOut; o++) {
        let s = c0[o];
        const e = ostart[o + 1];
        for (let t = ostart[o]; t < e; t++) {
            s += coef[t] * T[fidx[t]];
        }
        out[o] = s;
    }
    return out;
}
export { evalProgram2 };
//# sourceMappingURL=eval-program.js.map