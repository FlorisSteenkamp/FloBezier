/**
 * Debug inspection function returning the same value it is fed.
 * @param v any value
 * @param f a function called with the given value
 */
declare function inspect<T>(v: T, f?: (v: T) => void): T;
export { inspect };
