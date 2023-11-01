import {
    initialWindowWidth,
    initialWindowHeight,
    worldRation, 
    howMuchWindowWidthChange, 
    howMuchWindowHeightChange,
    totalGridPointsX,
    totalGridPointsY,
    wordlRatioScaleConstant
} from "../../root.js"

let initChangeState = "|W,H>"
let dX = 0
let dY = 0
let prevChangeX = 0
let prevChangeY = 0
/**
 * Scale
 * @param {number} value 
 * @returns 
 */
export function getScale(value){
    //TODO : keep track what change innerWidth of innerH or thogether
    return window.innerWidth*wordlRatioScaleConstant*value
}
export function getPosition3(axis, value, tag, asset=null, assetInitPosition){
    /**
     * If animation is presnet (^^x/^^y)
     */
    if (tag == "^^"){
        return updateAssetAnimationPosition(
            axis == "x" ? window.innerWidth : window.innerHeight,
            axis, 
            value, 
            asset, 
            assetInitPosition[axis],
            axis == "x" ? howMuchWindowWidthChange : howMuchWindowHeightChange,
            axis == "x" ? prevChangeX : prevChangeY
        )
    }
    else if (axis == "x"){
        return window.innerWidth*value
    }
    else if (axis == "y"){
        return window.innerHeight*value
    }
}

/**
 * Update animation position when screen is resized or not.
 * @param {*} ScreenAxis 
 * @param {string} axis 
 * @param {any} value 
 * @param {DisplayObject} asset 
 * @param {number} animationStartPosition 
 * @param {number} amountOfScreenAxisChange 
 * @param {number} prevChangeOfAxis 
 * @returns {number}
 */
function updateAssetAnimationPosition(
    ScreenAxis,
    axis,
    value, 
    asset, 
    animationStartPosition,
    amountOfScreenAxisChange,
    prevChangeOfAxis
){
    /**
     * dL - amount of window change.
     * Note: amountOfScreenAxisChange is update on resize, 
     *       so we need to know when to boost position of the asset.
     *       Variable "prevChangeOfAxis" keep track of that.
    */
    const dL = prevChangeOfAxis == amountOfScreenAxisChange 
        ? 0 : amountOfScreenAxisChange
    /**
    * Calc old prevScreenAxis
    */
    const prevScreenAxis = ScreenAxis - dL
    /**
    * Current animation coordinates relative to old ScreenAxis zero position
    * NOTE: It is just the current animation coordinates if asset was animated from axis = 0:
    *         | anime update |
    *   axis=0|------------->|axis=animationAxisUpdate
    */
    const animationAxisUpdate = 
        // Current x coordinates of asset  - Start coordinates of asset
        asset[axis] + prevScreenAxis*value - prevScreenAxis*animationStartPosition
    /**
    * Update asset init position relative to new screen
    */
    asset[axis] = ScreenAxis*animationStartPosition
    /**
    * Update asset init position with animation coordinate
    */
    asset[axis] += animationAxisUpdate
    /**
    * Declair window is not resizing
    */
    if (axis == "x"){
        prevChangeX = amountOfScreenAxisChange
    }
    else {
        prevChangeY = amountOfScreenAxisChange
    }
    //...
    return asset[axis]
}


// export function getPosition2(axis,value, tag, name="sdsdsd"){
//     let abstractW = 1
//     let abstractH = 1
//     if (name == "player_1"){
//         console.log("initChangeState >>", initChangeState);
//     }
//     /**
//      * If .innerWidth has changed more we must correct the y axis
//      * in order to be proportional to x
//      */
//     if (initChangeState == "|W,H>" && howMuchWindowWidthChange > howMuchWindowHeightChange){
//         initChangeState = "|W>"
//     }
//     /**
//      * If .innerHeight has changed more we must correct the x axis
//      * in order to be proportional to y
//      */
//     if (initChangeState == "|W,H>" && howMuchWindowHeightChange > howMuchWindowWidthChange){
//         initChangeState = "|H>"
//     }
//     /**
//      * Execute states
//      */
//     if (initChangeState == "|W>"){
//         abstractW = totalGridPointsX
//         // Make y proportional
//         abstractH = window.innerHeight * totalGridPointsX / window.innerWidth
//     }
//     else if (initChangeState == "|H>"){
//         abstractH = totalGridPointsY
//         // Make x proportional
//         abstractW = window.innerWidth * totalGridPointsY / window.innerHeight
//     }
//     else if (initChangeState == "|W,H>"){
//         // We define init grid to be with sized:   
//         abstractW = totalGridPointsX
//         abstractH = totalGridPointsY
//     }
//     if (name == "player_1"){
//         console.log("abstractW >>", abstractW);
//         console.log("abstractH >>", abstractH);
//     }
//     /**
//      * Get values
//      * Note: values depend on initChangeState
//      */
//     if (axis == "x"){
//         const dx = window.innerWidth/abstractW
//         /**
//          * if value is %
//          */
//         if (tag == "%"){
//             return dx * abstractW * value
//         }
//         if (name == "player_1"){
//             console.log("dx = window.innerWidth/abstractW >>", dx);
//             console.log("value >>", value);
//             console.log("dx*value >>", dx*value);
//         }
//         return dx*value
//     }
//     if (axis == "y"){
//         const dy = window.innerHeight / abstractH
//         /**
//          * if value is %
//          */
//         if (tag == "%"){
//             return dy * abstractH * value
//         }
//         return dy*value
//     }
// }

// /**
//  * @param {string} key - axis
//  * @param {number} value - % of the screen size
//  * @returns 
//  */
// export function getPosition(axis,value){
//     let abstractW = 1
//     let abstractH = 1
//     /**
//      * If .innerWidth has changed more we must correct the y axis
//      * in order to be proportional to x
//      */
//     if (initChangeState == "|W,H>" && howMuchWindowWidthChange > howMuchWindowHeightChange){
//         initChangeState = "|H>"
//     }
//     /**
//      * If .innerHeight has changed more we must correct the x axis
//      * in order to be proportional to y
//      */
//     if (initChangeState == "|W,H>" && howMuchWindowHeightChange > howMuchWindowWidthChange){
//         initChangeState = "|W>"
//     }
//     /**
//      * Execute states
//      */
//     if (initChangeState == "|H>"){
//         abstractW = window.innerWidth
//         // Make y proportional
//         abstractH = window.innerWidth/worldRation
//     }
//     else if (initChangeState == "|W>"){
//         abstractH = window.innerHeight
//         // Make x proportional
//         abstractW = window.innerHeight*worldRation
//     }
//     else if (initChangeState == "|W,H>"){
//         // No need if there are the same    
//         abstractW = window.innerWidth
//         abstractH = window.innerHeight
//     }
//     /**
//      * Get values
//      * Note: values depend on initChangeState
//      */
//     if (axis == "x"){
//         return abstractW*value
//     }
//     if (axis == "y"){
//         return abstractH*value
//     }
// }