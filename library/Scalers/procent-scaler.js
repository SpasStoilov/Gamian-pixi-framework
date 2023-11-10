/**
 * Scale % of screen axis
 * @param {number} value 
 * @returns 
 */
export function procent_scaler(
    axis, value
){
    /* Options:
    *---------------------------------------------------------------  
    * value ~ { x:{"%s":0.005}, y:{"%s":0.005} }
    */
    if (axis == "x"){
        return window.innerWidth * value.x["%s"]
    }
    if (axis == "y"){
        return window.innerHeight * value.y["%s"]
    }
}