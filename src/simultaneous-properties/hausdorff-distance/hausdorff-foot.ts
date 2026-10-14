
/**
 * A point `q` on a piecewise bezier curve, at parameter `t` of piece `k`,
 * together with its distance `d` to some other point.
 *
 * @internal
 */
interface HausdorffFoot {
    readonly d: number;
    readonly q: number[];
    readonly k: number;
    readonly t: number;
}


export type { HausdorffFoot }
