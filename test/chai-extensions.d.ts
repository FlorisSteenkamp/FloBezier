import { ObjOrArray } from "./helpers/obj-or-array";


declare module Chai {
    interface Assertion {
        /**  
         * @param ulps If a number then 2\*\*1 means last bit, 2\*\*2 means last 2 bits, etc...
         * else if an array containing a single number then 1 means 1 eps, 2 means 2 eps, etc...
         */
		nearly: (ulps: number | number[], value: ObjOrArray<number>) => void;
    }
}