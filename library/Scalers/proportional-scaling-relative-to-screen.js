import { 
    initialWindowWidth,
    currentWindowHeight,
    currentWindowWidth,
    initialWindowHeight,
    Model
} from "../../root.js"
import {update_asset_animation_scale} from "../Utils/update-asset-animation-scale.js"

/**
 * Scale
 * @param {number} value 
 * @returns 
 */
export function scaling_relative_to_screen(
    axis, value, tag, asset, initScale
){
    let initScaleX = initScale.x == undefined ? 1 : initScale.x
    let initScaleY = initScale.y == undefined ? 1 : initScale.y
    /**
     * Set constant rations
     */
    let assetInitScaleValuesRation = initScaleX / initScaleY
    let initScreenScaleRation = 
        axis == "x" ? initialWindowWidth / initScaleX : initialWindowHeight / initScaleY
    /**
     * New values for resize
     */
    let newScaleX = null
    let newScaleY = null
    /**
     * We Calc scale on resize using Width of the screen
     */
    if (axis == "x"){
        newScaleX = currentWindowWidth / initScreenScaleRation
        asset.scale.x = newScaleX 
        // Make y proportional
        newScaleY = newScaleX / assetInitScaleValuesRation
        asset.scale.y = newScaleY
    }
    /**
     * We Calc scale on resize using Height of the screen
     */
    else if (axis == "y"){
        newScaleY = currentWindowHeight / initScreenScaleRation
        asset.scale.y = newScaleY
        // Make x proportional
        newScaleX = newScaleY * assetInitScaleValuesRation
        asset.scale.x = newScaleX
    }
    /**
     * Animate scale
     * NOTE: value is used only when we have animations
     * The proportional scaling is handle by initScales of the asset
     */
    if (tag == "^^"){
        Model.callAnimation(
            asset,
            "scale",
            {duration: value.time},
            // animation executor (constant look):
            function(model, animeData){
                // by returning we save state
                return update_asset_animation_scale(value, asset, model, animeData)
            }
        )
    }
}