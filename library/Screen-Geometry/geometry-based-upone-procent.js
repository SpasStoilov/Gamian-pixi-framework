import { 
    howMuchWindowWidthChange, 
    howMuchWindowHeightChange,
} from "../../root.js"
import {updateAssetAnimationPosition} from "../Utils/update-asset-animation-position.js"

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
        const newValue = updateAssetAnimationPosition(
            axis == "x" ? window.innerWidth : window.innerHeight,
            axis, 
            value, 
            asset, 
            assetInitPosition[axis],
            axis == "x" ? howMuchWindowWidthChange : howMuchWindowHeightChange,
            axis == "x" ? prevChangeX : prevChangeY
        )
        /**
        * Declair window is not resizing
        */
        if (axis == "x"){
            prevChangeX = howMuchWindowWidthChange
        }
        else {
            prevChangeY = howMuchWindowHeightChange
        }
        return newValue
    }
    else if (axis == "x"){
        return window.innerWidth*value
    }
    else if (axis == "y"){
        return window.innerHeight*value
    }
}