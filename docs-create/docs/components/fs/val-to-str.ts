import { Convertible } from "./convertible";


function valToStr(p: Convertible): string {
    if (p === undefined) {
        return 'undefined';
    }

    if (p === false) {
        return 'false';
    }

    if (p === true) {
        return 'true';
    }

    if (Array.isArray(p)) {
        return '[' + p.map(valToStr).join(', ') + ']';    
    }


    if (typeof p === 'object') {
        const valsStr = Object.entries(p).map(([key,val]) => key + ': ' + valToStr(val));
        return '{ ' + valsStr.join(', ') + ' }';
    }

    return p.toString();
}


export { valToStr }
