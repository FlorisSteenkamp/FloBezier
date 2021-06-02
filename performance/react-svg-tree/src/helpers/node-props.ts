import { TreeGraph } from "./tree-graph";


interface NodeProps<T> {
    node: T;
    x: number;
    y: number;
    /** radius */
    r: number;
    graph: TreeGraph<T>;
}


export { NodeProps }
