import { NodeProps } from "./node-props.js";


/** Extracts optional keys */
type OptionalPropertiesOf<T extends object> = Exclude<{
    [K in keyof T]: T extends Record<K, T[K]>
        ? never
        : K
}[keyof T], undefined>;


type OptionalTreeProps = Required<
    Pick<TreeProps<any>, OptionalPropertiesOf<TreeProps<any>>>
>;


type TreePropsAllRequired<T> = OptionalTreeProps & TreeProps<T>;


interface TreeProps<T> {
    /** The width of the viewbox that the tree is being rendered in */
    width: number;

    /** The height of the viewbox that the tree is being rendered in */
    height: number;

    /**
     * The fixed distance between adjacent levels of the tree. Used in
     * determining they-coordinate of a node being positioned.
     */
    levelSeparation?: number;

    /** The minimum distance between adjacent siblings of the tree. */
    siblingSeparation?: number;

    /**
     * The minimum distance between adjacent subtrees of a tree. For
     * proper aesthetics, this value is normally somewhat larger than
     * SiblingSeparation.
     */
    subtreeSeparation?: number;

    /** The element that you wish to display at the root of the tree */
    root: T;
    
    className?: string;

    nodeElement: (props: NodeProps<T>) => JSX.Element;

    getNodeSize: (node: T) => number;

    getChildren: (node: T) => T[];

    getNodeKey: (node: T) => string;
}


export { 
    TreeProps, OptionalTreeProps, TreePropsAllRequired
}
