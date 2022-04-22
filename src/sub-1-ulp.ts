const eps = Number.EPSILON;
const u = eps/2;


/** @internal */
function sub1Ulp(n: number) {
    return n - n*(u + eps**2);
}


export { sub1Ulp }
