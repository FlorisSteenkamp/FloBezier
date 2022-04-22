const eps = Number.EPSILON;
const u = eps/2;


/** @internal */
function add1Ulp(n: number) {
    return n + n*(u + eps**2);
}


export { add1Ulp }
