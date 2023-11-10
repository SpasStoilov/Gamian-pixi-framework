import { 
    currentWindowHeight,
    currentWindowWidth,
    initialWindowHeight,
    initialWindowWidth,
    worldArea
} from "../../root.js"

/**
 * Scale relative to screen.
 * @param {number} value 
 * @returns 
 */
export function relative_scaler(
    axis, value, asset
){
    // console.log("scaling_relative_to_screen >> ",
    //     asset.name,
    //     axis, value, asset.width, asset.height
    // );

    /* Options:
    *---------------------------------------------------------------
    * value ~ { x:{rs:0.005}, y:{rs:0.005} }
    * 
    * Ratios
    */
    let assetInitArea = value.x.rs * value.y.rs 
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
    let assetInitScaleValuesRation = value.x.rs / value.y.rs
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