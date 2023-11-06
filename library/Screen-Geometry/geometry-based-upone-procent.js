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
    axis, value, tag=null, asset=null, assetInitPosition=null
){
    //console.log(asset.name, axis, value);
    if (axis == "x"){
        return  window.innerWidth*value
    }
    else if (axis == "y"){
        return window.innerHeight*value
    }
}