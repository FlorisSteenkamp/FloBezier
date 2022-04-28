
const u = Number.EPSILON / 2;
const uu = u*u;

/** @internal */
function γ(n: number): number {
    const nu = n*u;
    return nu/(1-nu);
}


/** @internal */
function γγ(n: number): number {
    const nuu = n*uu;
    return nuu/(1-nuu);
}


export { γ, γγ }


γ(1);   //=> 1.1102230246251568e-16
γγ(3);  //=> 3.697785493223493e-32
