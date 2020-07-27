import { RootInterval } from "./root-interval";
import { RootIntervalExp } from "./root-interval-exp";
/**
 * Converts a double precision root interval to a quad precision one (without)
 * @param ri a root interval
 */
declare function rootIntervalToExp(ri: RootInterval): RootIntervalExp;
export { rootIntervalToExp };
