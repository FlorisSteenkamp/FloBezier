import { pToStr } from "./p-to-str";


function psToStr(ps: number[][]) {

    return '[' + ps.map(pToStr).join(', ')  + ']';
}


export { psToStr }