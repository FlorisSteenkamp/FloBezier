
const eps = Number.EPSILON;
const u = eps/2;


// TODO docs + tests
/**  */
function add1Ulp(n: number) {
    return n + n*(u + eps**2);
}


export { add1Ulp }
