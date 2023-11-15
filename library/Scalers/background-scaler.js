
import { 
    currentWindowHeight,
    currentWindowWidth,
} from "../../root.js"

const assetScalerRecord = {}

/**
 * Test function
 * @param {number} value 
 * @returns 
 */
export function background_scaler(
    axis, value, asset
){
    
    /* Options:
    *---------------------------------------------------------------  
    * value ~ { x:{bs:0.005}, y:{bs:0.005} }
    * 
    * Register original size of the asset
    */
   if (!assetScalerRecord[asset.name]){
       assetScalerRecord[asset.name] = {w:asset.width, h:asset.height}
    }
    const initWidth = assetScalerRecord[asset.name].w
    const initHeight = assetScalerRecord[asset.name].h
    const initSizeRation = initWidth / initHeight
    /**
     * New values for resize:
     * R - initSizeRation
     * a - initWidth
     * a'- newWidth
     * b - initHeight
     * b'- newHeight
     * A - initArea
     * A'- newArea
     * H - currentWindowHeight
     * W - currentWindowWidth
     *     R = a/b
     *     R*b = a
     *     b = a/R
     *     a*b = A
     * => 
     *     b = A/a = a/R
     *     a = A/b = R*b
     * =>
     *     a^2 = A*R
     *     b^2 = A/R 
     * 
     * We want to keep asset geometry and we want it size to be >= to the screen:
     *     (b')^2 = A'/R >= H^2, 
     *     (a')^2 = A'*R >= W^2
     * => 
     *     A' >= H^2*R , A' >= W^2/R
     *     -------------------------
     *     |  2*A' > H^2*R + W^2/R |
     *     -------------------------
     */
    let newArea = 
        ((currentWindowWidth**2 / initSizeRation) + (currentWindowHeight**2 *initSizeRation))
  
    let newWidth = Math.sqrt(newArea * initSizeRation)
    let newHeight = Math.sqrt(newArea / initSizeRation)

    // console.log(
    //     "Scaler",
    //     asset.name,
    //     newArea,
    //     initSizeRation
    // );

    if (axis == "x"){
        console.log(
            "x", asset.name, (newWidth / initWidth)*value.x.bs
        );
        return (newWidth / initWidth)*value.x.bs
    }
    else if (axis == "y"){
        console.log(
            "y", asset.name, (newHeight / initHeight)*value.y.bs
        );
        return (newHeight / initHeight)*value.y.bs
    }
}