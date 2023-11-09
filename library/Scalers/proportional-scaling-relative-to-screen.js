import { 
    initialWindowWidth,
    currentWindowHeight,
    currentWindowWidth,
    initialWindowHeight,
    totalWindowHeightChange,
    totalWindowWidthChange,
    worldRation,
    worldArea
} from "../../root.js"

let initChangeState = undefined

/**
 * Scale relative to screen.
 * @param {number} value 
 * @returns 
 */
export function scaling_relative_to_screen(
    axis, value
){
    // console.log("scaling_relative_to_screen >> ",axis, value);

    /* Options:
    *---------------------------------------------------------------                           
    * value ~ { x:{srts:0.005}, y:{srts:0.005} }
    * 
    * Ratios
    */
    let assetInitArea = value.x.srts * value.y.srts 
    let initWorldAssetAreaRation = worldArea / assetInitArea
    let currentWorldArea = currentWindowWidth * currentWindowHeight
    let newAssetArea = currentWorldArea / initWorldAssetAreaRation
    /**
     * New values for resize:
     * R = a/b
     * R*b = a
     * b = a/R
     * a*b = A
     * => 
     * b = A/a = a/R
     * a = A/b = R*b
     * =>
     * a^2 = A*R
     * b^2 = A/R 
     */
    let assetInitScaleValuesRation = value.x.srts / value.y.srts
    let newScaleX = Math.sqrt(newAssetArea * assetInitScaleValuesRation)
    let newScaleY = Math.sqrt(newAssetArea / assetInitScaleValuesRation)
    /**
     * Return new values
     */
    if (axis == "x"){
        return newScaleX
    }
    if (axis == "y"){
        return newScaleY
    }
}