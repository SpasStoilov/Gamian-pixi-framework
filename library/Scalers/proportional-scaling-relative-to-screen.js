import { 
    initialWindowWidth,
    currentWindowHeight,
    currentWindowWidth,
    initialWindowHeight,
} from "../../root.js"

/**
 * Scale relative to screen.
 * @param {number} value 
 * @returns 
 */
export function scaling_relative_to_screen(
    value, axis
){
    /**
     * Set constant rations
     */
    let assetInitScaleValuesRation = value.x / value.y
    let initScreenScaleRation = 
        axis == "x" ? initialWindowWidth / value.x : initialWindowHeight / value.y
    /**
     * New values for resize
     */
    let newScaleX = null
    let newScaleY = null
    /**
     * We Calc scale on resize using Width of the screen
     * TODO: keep track of what axis change by default is "x"!!!
     */
    if (axis == "x"){
        newScaleX = currentWindowWidth / initScreenScaleRation
        // Make y proportional
        newScaleY = newScaleX / assetInitScaleValuesRation
    }
    /**
     * We Calc scale on resize using Height of the screen
     */
    else if (axis == "y"){
        newScaleY = currentWindowHeight / initScreenScaleRation
        // Make x proportional
        newScaleX = newScaleY * assetInitScaleValuesRation
    }
    
    return [newScaleX, newScaleY]

}