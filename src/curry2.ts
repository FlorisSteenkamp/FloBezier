
export interface ICurriedFunction2<T, U, V> {
    (t: T): (u: U) => V;
    (t: T, u: U): V;
}


/**
 * Curry the given arity two function.
 * @param f - A function
 */
export default function curry2<T, U, V>(f: (t: T, u: U) => V): ICurriedFunction2<T, U, V> {
    function g(t: T): (u: U) => V; 
    function g(t: T, u: U): V;
    function g(t: T, u?: U) {
        return u === undefined
            ? (u: U): V => f(t, u)
            : f(t, u);
    }
    
    return g;
}
