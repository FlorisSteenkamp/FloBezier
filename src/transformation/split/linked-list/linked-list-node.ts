
/** @internal */
interface LlNode<T> {
    r: T;
    prev?: LlNode<T> | undefined;
    next?: LlNode<T> | undefined;
}


export { LlNode }
