import { operators as bigFloatOperators } from "big-float-ts";


const { eAdd, eSign } = bigFloatOperators;

function test() {
    const a = [1];
    const b = [2];
    const c = eAdd(a,b);

    return eSign(c);
}


export { test }
