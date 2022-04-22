/// <reference path="../../../test/chai-extensions.d.ts" />
import { ObjOrArray } from "./obj-or-array";
/**
 * @param ulpsOrEps If a number then 2\*\*1 means last bit, 2\*\*2 means last 2 bits, etc...
 * else if an array containing a single number then 1 means 1 eps, 2 means 2 eps, etc...
 */
declare function closeTo(ulpsOrEps: number | number[]): (expected: ObjOrArray<number>, actual: ObjOrArray<number>) => boolean;
export { closeTo };
