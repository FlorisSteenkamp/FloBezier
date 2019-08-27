
import { getX } from "../get-x";
import { getY } from "../get-y";


/**
 * PRECONDITION: Control points have max 13-bit significand aligned to grid
 * accuracy.
 * 
 * @param ps1 
 * @param ps2 
 */
function sameKFamilyCubic(ps1: number[][], ps2: number[][]) {
    // The c_2x here can use an extra 4 bits due to the 6* part in getX / getY
	// to go from 13 to 17 bits so we can multiply 3 times to go to 3*17 or
	// 51 < 53 bits.
	let [c_3x, c_2x, c_1x, c_0x] = getX(ps1);
	let [c_3y, c_2y, c_1y, c_0y] = getY(ps1);
	let [d_3x, d_2x, d_1x, d_0x] = getX(ps2); 
    let [d_3y, d_2y, d_1y, d_0y] = getY(ps2);
    

}


/**
 * PRECONDITION: Control points have max 13-bit significand aligned to grid
 * accuracy.
 * 
 * @param ps1 
 * @param ps2 
 */
function sameKFamilyQuadratic(ps1: number[][], ps2: number[][]) {
    // The c_2x here can use an extra 4 bits due to the 6* part in getX / getY
	// to go from 13 to 17 bits so we can multiply 3 times to go to 3*17 or
	// 51 < 53 bits.
	let [c_2x, c_1x, c_0x] = getX(ps1);
	let [c_2y, c_1y, c_0y] = getY(ps1);
	let [d_2x, d_1x, d_0x] = getX(ps2); 
    let [d_2y, d_1y, d_0y] = getY(ps2);
    

}


/**
 * PRECONDITION: Control points have max 13-bit significand aligned to grid
 * accuracy.
 * 
 * @param ps1 
 * @param ps2 
 */
function sameKFamilyLinear(ps1: number[][], ps2: number[][]) {
    // The c_2x here can use an extra 4 bits due to the 6* part in getX / getY
	// to go from 13 to 17 bits so we can multiply 3 times to go to 3*17 or
	// 51 < 53 bits.
	let [c_1x, c_0x] = getX(ps1);
	let [c_1y, c_0y] = getY(ps1);
	let [d_1x, d_0x] = getX(ps2); 
    let [d_1y, d_0y] = getY(ps2);
    
    
}


export { sameKFamilyCubic }
