import { eDiff, eEstimate } from "big-float-ts";
import { ObjOrArray } from './obj-or-array.js';

const abs = Math.abs;


/**
 * Map a Shewchuck object or array.
 */
// TODO - this code can be improved especially by improving the typings
function map<V>(check: (v: any) => v is V) {
    return <T>(f: (v1: V, v2?: V) => ObjOrArray<T>) => {

        return (obj1: ObjOrArray<V>, obj2?: ObjOrArray<V>): ObjOrArray<T> => {
            if (check(obj1)) {
                if (obj2 === undefined) {
                    return f(obj1);
                }

                if (!check(obj2)) { throw new Error('Object structures must be the same'); }

                return f(obj1, obj2);
            }

            if (Array.isArray(obj1)) {
                if (obj2 === undefined) {
                    return mapArr(v1 => map(check)(f)(v1), obj1);
                }

                if (!Array.isArray(obj2)) { throw new Error('Object structures must be the same'); }

                return mapArr((v1,v2) => map(check)(f)(v1,v2), obj1, obj2);
            }
            
            if (typeof obj1 === 'object') {
                if (obj2 === undefined) {
                    return mapObj(v1 => map(check)(f)(v1), obj1);
                }

                if (typeof obj2 !== 'object') { throw new Error('Object structures must be the same'); }

                return mapObj((v1,v2) => map(check)(f)(v1,v2), obj1, obj2 as { [key: string]: ObjOrArray<V>; });
            }

            throw new Error('Must be an object or array (or either recursively');
        }
    }
}



function allTrue(obj: ObjOrArray<boolean>): boolean {
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
            };
        }

        return true;
    }

    throw new Error('Must be an object or array of booleans (or either recursively');
}


function isNumber(obj: any): obj is number {
    return typeof obj === 'number';
}


function isNumberArray(obj: any[]): obj is number[] {
    if (!Array.isArray(obj)) { return false; }

    for (let v of obj) {
        if (typeof v !== 'number') {
            return false;
        }
    }

    return true;
}


function mapArr<T,U>(
        f: (t1: T, t2?: T) => U,
        obj1: T[],
        obj2?: T[]): U[] {

    const a = [];
    for (let i=0; i<obj1.length; i++) {
        const v1 = obj1[i];
        const v2 = obj2 ? obj2[i] : undefined;
        a.push(f(v1,v2));
    }

    return a;
}


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


const mapShewchuk = map<number[]>(isNumberArray);
const mapDouble = map<number>(isNumber);

const mapShewchukToDouble = mapShewchuk(eEstimate);
const mapShewchukToAbsDouble = mapShewchuk(v => abs(eEstimate(v)));
const subtractShewchuk = mapShewchuk<number[]>(eDiff);
const mapDoubleToShewchuk = mapDouble<number>(v => [v]);


export { 
    mapShewchuk, 
    mapShewchukToDouble, 
    mapShewchukToAbsDouble, 
    subtractShewchuk, 
    mapDouble,
    mapDoubleToShewchuk,
    allTrue
}
