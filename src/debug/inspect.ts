
import { log } from "./log";


/**
 * Debug inspection function returning the same value it is fed.
 * @param v any value
 * @param f a function called with the given value
 */
function inspect<T>(v: T, f?: (v: T) => void) {
    if (f) { 
        f(v); 
    } else {
        log(v);
    }

    return v;
}


export { inspect }
