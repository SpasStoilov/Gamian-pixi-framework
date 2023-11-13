import{
    currentWindowHeight,
    currentWindowWidth,
}from "../../root.js"

const assetsDistanceChange = {}

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
    axis, value, asset
){
    console.log(axis, value, asset.name);
    /**
     * axis: x
     * value ~ {"%":0.806, dw:{w:0.0008, h:0.002}, rel:{W:1500, H:800}}
     * axis: y
     * value ~ {"%":0.806, dh:{w:0.0008, h:0.002}, rel:{W:1500, H:800}}
     * -----------------------------------------------------------------------------------
     * value.rel - window (width and height) at wich we adjusted asset position.
     * dh.w - amount of change in height if screen width is changed
     * dh.h - amount of change in height if screen height is changed
     * dw.w - amount of change in width if screen width is changed
     * dw.h - amount of change in width if screen height is changed
     * TODO: adjust other geometries!
     */
    if(!assetsDistanceChange[asset.name]){
        assetsDistanceChange[asset.name] = {dH:0, dW:0}
    }
    if(value.dh || value.dw && value.rel){
        const tag = axis == "x" ? "dw" : "dh"
        const difW = Math.abs(value.rel.W - currentWindowWidth)
        const difH = Math.abs(value.rel.H - currentWindowHeight)
        const widthChangeMore = difW >= difH ? true : false
        // tag == dh:
        if (widthChangeMore && value[tag].w && value.rel.W && currentWindowWidth < value.rel.W){
            const numberOfTimes =  value.rel.W / currentWindowWidth
            assetsDistanceChange[asset.name].dH = -(window.innerHeight*value[tag].w)*numberOfTimes
        }
        else if (widthChangeMore && value[tag].w && value.rel.W && currentWindowWidth > value.rel.W){
            const numberOfTimes =  currentWindowWidth / value.rel.W
            assetsDistanceChange[asset.name].dH = (window.innerHeight*value[tag].w)*numberOfTimes
        }
        // tag == dw:
        else if (!widthChangeMore && value[tag].h && value.rel.H && currentWindowHeight <  value.rel.H){
            const numberOfTimes =  value.rel.H / currentWindowHeight
            assetsDistanceChange[asset.name].dH = (window.innerHeight*value[tag].h)*numberOfTimes
        }
        else if (!widthChangeMore && value[tag].h && value.rel.H && currentWindowHeight > value.rel.H){
            const numberOfTimes =  currentWindowHeight / value.rel.H
            assetsDistanceChange[asset.name].dH = -(window.innerHeight*value[tag].h)*numberOfTimes
        }
    }
    /**
     * Convert pixel values in % values
     * value ~ {%: 1000}
     */
    if (axis == "x"){
        return  window.innerWidth*value["%"]
            + assetsDistanceChange[asset.name].dW
    }
    else if (axis == "y"){
        return window.innerHeight*value["%"]
            + assetsDistanceChange[asset.name].dH
    }
}