import { Extrema } from "./extrema";
import { BoxWithTs } from "./box-with-ts";

/** types whos values are convertible to strings */
type Convertible = 
    | undefined 
    | boolean 
    | number 
    | number[] 
    | number[][]
    | number[][][]
    | Extrema
    | BoxWithTs
    | Object;


export { Convertible }
