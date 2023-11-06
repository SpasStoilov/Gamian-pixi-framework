
let finalState = null

/**
 * Update animation position when screen is resized or not.
 * @param {*} ScreenAxis - Current Screen axis
 * @param {string} axis - coordinate label
 * @param {any} value - %
 * @param {DisplayObject} asset 
 * @param {number} animationStartPosition - %
 * @param {number} amountOfScreenAxisChange 
 * @param {number} prevChangeOfAxis 
 * @returns {number}
 */
export function updateAssetAnimationPosition(
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
     * Note: amountOfScreenAxisChange is update on resize.
    */
    const dL = prevChangeOfAxis == amountOfScreenAxisChange 
        ? 0 : amountOfScreenAxisChange
    /**
    * Calc old screen axis
    */
    const prevScreenAxis = ScreenAxis - dL
    /**
    * Current animation coordinates relative to prevScreenAxis origin point.
    * NOTE: It is just the current animation coordinates if asset was animated from 
    * origin point:
    *         | anime update |
    *      x=0|------------->|x = animationAxisUpdate
    */
    const animationAxisUpdate = 
    //  NOTE: All is relative to prevScreenAxis!
    //  asset[axis] = current axis coordinate of asset;
    //  prevScreenAxis*value = updete of animation value;
    //  prevScreenAxis*animationStartPosition = rest position of asset before animation;
        asset[axis] + prevScreenAxis*value - prevScreenAxis*animationStartPosition
    /**
    * Update asset init animation position relative to new screen
    */
    asset[axis] = ScreenAxis*animationStartPosition
    /**
    * Update asset init position with animation coordinate
    */
    asset[axis] += animationAxisUpdate
    finalState = {axis, value:asset[axis]}
    //...
    return saveFinalState
    //return asset[axis]
}
//-------------------------------------------------------------------------------

function saveFinalState(asset){
    asset[finalState.axis] = finalState.value
}