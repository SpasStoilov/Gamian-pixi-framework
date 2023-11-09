/**
 * Scale % of screen axis
 * @param {number} value 
 * @returns 
 */
export function procent_of_screen(
    axis, value
){
    /* Options:
    *---------------------------------------------------------------  
    * value ~ { x:{"%":0.005}, y:{"%":0.005} }
    */
    if (axis == "x"){
        return window.innerWidth * value.x["%"]
    }
    if (axis == "y"){
        return window.innerHeight * value.y["%"]
    }
}