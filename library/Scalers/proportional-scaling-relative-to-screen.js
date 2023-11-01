import { 
    wordlRatioScaleConstant
} from "../../root.js"

/**
 * Scale
 * @param {number} value 
 * @returns 
 */
export function scaling_relative_to_screen(value){
    //TODO : keep track what change innerWidth of innerH or thogether
    return window.innerWidth*wordlRatioScaleConstant*value
}