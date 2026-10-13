import { scale as _scale } from 'flo-vector2d';


/** a curried version of vector scale */
const scale = (c: number) => (p: number[]) => _scale(p, c);


export { scale }
