import { eDiff, eEstimate } from "big-float-ts";
const abs = Math.abs;
/**
 * Map a Shewchuck object or array.
 */
function map(check) {
    return (f) => {
        return (obj1, obj2) => {
            if (check(obj1)) {
                if (obj2 === undefined) {
                    return f(obj1);
                }
                if (!check(obj2)) {
                    throw new Error('Object structures must be the same');
                }
                return f(obj1, obj2);
            }
            if (Array.isArray(obj1)) {
                if (obj2 === undefined) {
                    return mapArr(v1 => map(check)(f)(v1), obj1);
                }
                return mapArr((v1, v2) => map(check)(f)(v1, v2), obj1, obj2);
            }
            throw new Error('Must be an object or array (or either recursively');
        };
    };
}
function allTrue(obj) {
    if (obj === true || obj === false) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.every(allTrue);
    }
    if (typeof obj === 'object') {
        for (let k in obj) {
            const v = obj[k];
            if (allTrue(v) === false) {
                return false;
            }
            ;
        }
        return true;
    }
    throw new Error('Must be an object or array of booleans (or either recursively');
}
function isNumber(obj) {
    return typeof obj === 'number';
}
function isNumberArray(obj) {
    if (!Array.isArray(obj)) {
        return false;
    }
    for (let v of obj) {
        if (typeof v !== 'number') {
            return false;
        }
    }
    return true;
}
function mapArr(f, obj1, obj2) {
    const a = [];
    for (let i = 0; i < obj1.length; i++) {
        const v1 = obj1[i];
        const v2 = obj2 ? obj2[i] : undefined;
        a.push(f(v1, v2));
    }
    return a;
}
/*
function mapObj<T,U>(
        f: (t1: T, t2?: T) => U,
        obj1: { [key:string]: T },
        obj2?: { [key:string]: T }): { [k in keyof typeof obj1]: U } {

    const o = {};
    for (let k in obj1) {
        const v1 = obj1[k];
        const v2 = obj2 ? obj2[k] : undefined;
        o[k] = f(v1,v2);
    }

    return o;
}
*/
const mapShewchuk = map(isNumberArray);
const mapDouble = map(isNumber);
const mapShewchukToDouble = mapShewchuk(eEstimate);
const mapShewchukToAbsDouble = mapShewchuk(v => abs(eEstimate(v)));
// @ts-ignore
const subtractShewchuk = mapShewchuk(eDiff);
const mapDoubleToShewchuk = mapDouble(v => [v]);
export { mapShewchuk, mapShewchukToDouble, mapShewchukToAbsDouble, subtractShewchuk, mapDouble, mapDoubleToShewchuk, allTrue, map };
//# sourceMappingURL=map.js.map