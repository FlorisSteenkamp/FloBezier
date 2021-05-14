
const u = Number.EPSILON / 2;
const uu = u*u;

/** @internal */
function γ(n: number) {
    const nu = n*u;
    return nu/(1-nu);
}


/** @internal */
function γγ(n: number) {
    const nuu = n*uu;
    return nuu/(1-nuu);
}


export { γ, γγ }
