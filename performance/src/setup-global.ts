import { __Debug__ } from "../../src/intersection/bezier3-intersection/debug";


(globalThis as any as { __debug__: Partial<__Debug__> | undefined}).__debug__ = 
    { already: false, uid: 0, maxItersCount: 0 };

const DUMMY = 1;


export { DUMMY }