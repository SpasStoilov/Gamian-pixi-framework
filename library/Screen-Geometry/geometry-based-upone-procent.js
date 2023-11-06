import { 
    howMuchWindowWidthChange, 
    howMuchWindowHeightChange,
    Model
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
    //console.log(asset.name, axis, value);
    /**
     * If animation is presnet (^^x/^^y)
     */
    if (tag == "^^"){
        // Model.callAnimation(
        //     asset,
        //     axis,
        //     {duration: value.time},
        //     // animation executor (constant look):
        //     function(model, animeData){
        //         // by returning we save state
        //         return updateAssetAnimationPosition(
        //             axis == "x" ? window.innerWidth : window.innerHeight,
        //             axis, 
        //             value.amount, 
        //             asset, 
        //             assetInitPosition[axis],
        //             axis == "x" ? howMuchWindowWidthChange : howMuchWindowHeightChange,
        //             axis == "x" ? prevChangeX : prevChangeY,
        //             model, 
        //             animeData
        //         )
        //     }
        // )
        /**
        * Declair window is not resizing
        */
        if (axis == "x"){
            prevChangeX = howMuchWindowWidthChange
        }
        else {
            prevChangeY = howMuchWindowHeightChange
        }
        let newValue = updateAssetAnimationPosition(
            axis == "x" ? window.innerWidth : window.innerHeight,
            axis, 
            value, 
            asset, 
            assetInitPosition[axis],
            axis == "x" ? howMuchWindowWidthChange : howMuchWindowHeightChange,
            axis == "x" ? prevChangeX : prevChangeY,
        )
        asset[axis] = newValue
    }
    else if (axis == "x"){
        asset[axis] =  window.innerWidth*value
    }
    else if (axis == "y"){
        asset[axis] = window.innerHeight*value
    }
}