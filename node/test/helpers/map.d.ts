import { ObjOrArray } from './obj-or-array.js';
/**
 * Map a Shewchuck object or array.
 */
declare function map<V>(check: (v: any) => v is V): <T>(f: (v1: V, v2?: V | undefined) => ObjOrArray<T>) => (obj1: ObjOrArray<V>, obj2?: ObjOrArray<V> | undefined) => ObjOrArray<T>;
declare function allTrue(obj: ObjOrArray<boolean>): boolean;
declare const mapShewchuk: <T>(f: (v1: number[], v2?: number[] | undefined) => ObjOrArray<T>) => (obj1: ObjOrArray<number[]>, obj2?: ObjOrArray<number[]> | undefined) => ObjOrArray<T>;
declare const mapDouble: <T>(f: (v1: number, v2?: number | undefined) => ObjOrArray<T>) => (obj1: ObjOrArray<number>, obj2?: ObjOrArray<number> | undefined) => ObjOrArray<T>;
declare const mapShewchukToDouble: (obj1: ObjOrArray<number[]>, obj2?: ObjOrArray<number[]> | undefined) => ObjOrArray<number>;
declare const mapShewchukToAbsDouble: (obj1: ObjOrArray<number[]>, obj2?: ObjOrArray<number[]> | undefined) => ObjOrArray<number>;
declare const subtractShewchuk: (obj1: ObjOrArray<number[]>, obj2?: ObjOrArray<number[]> | undefined) => ObjOrArray<number[]>;
declare const mapDoubleToShewchuk: (obj1: ObjOrArray<number>, obj2?: ObjOrArray<number> | undefined) => ObjOrArray<number>;
export { mapShewchuk, mapShewchukToDouble, mapShewchukToAbsDouble, subtractShewchuk, mapDouble, mapDoubleToShewchuk, allTrue, map };
