import { 
    howMuchWindowWidthChange, 
    howMuchWindowHeightChange,
} from "../../root.js"

let prevChangeX = 0
let prevChangeY = 0

/**
 * Position of asset is defined in procent of the sreen
 * @param {string} axis 
 * @param {number} value 
 * @param {string} tag 
 * @param {DisplayObject} asset 
 * @param {object} assetInitPosition 
 * @returns {number}
 */
export function use_geometry_based_upone_procent(
    axis, value, tag, asset=null, assetInitPosition
){
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
//-------------------------------------------------------------------------------
