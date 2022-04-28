const { EPSILON: eps } = Number;

const u = eps/2;
const es = (eps**2)/2;
const ups = u + es;


/** 
 * Add one unit in the last place (ulp) to the given number
 * 
 * * subnormal numbers (and 0) are returned unaltered
 * @internal 
 */
function add1Ulp(n: number) {
    return n > 0 ? n + n*ups : n - n*ups;
}


export { add1Ulp }
