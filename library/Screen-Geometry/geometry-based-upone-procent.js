import{
    currentWindowHeight,
    currentWindowWidth,
}from "../../root.js"
import {assetsDistanceChange} from "../Utils/globalScopeVariables.js"

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
    //console.log(axis, value, asset.name, asset);
    /**
     * axis: x
     * value ~ {"%":0.443, d:{w:0.005, h:0}, rel:{W:1500, H:800}}
     * axis: y
     * value ~ {"%":0.806, d:{w:0.0005, h:0.002}, rel:{W:1500, H:800}}
     * -----------------------------------------------------------------------------------
     * value.rel - window (width and height) at wich we adjusted asset position.
     * y.d.w - amount of change in height if screen width is changed
     * y.d.h - amount of change in height if screen height is changed
     * x.d.w - amount of change in width if screen width is changed
     * x.d.h - amount of change in width if screen height is changed
     * TODO: adjust other geometries!
     */
    if(!assetsDistanceChange[asset.name]){
        assetsDistanceChange[asset.name] = {x:0, y:0}
    }
    if(value.d && value.rel){
        const difW = Math.abs(value.rel.W - currentWindowWidth)
        const difH = Math.abs(value.rel.H - currentWindowHeight)
        const widthChangeMore = difW >= difH ? true : false
        if (widthChangeMore){
            console.log(1-currentWindowWidth/value.rel.W);
            assetsDistanceChange[asset.name][axis] = value.d.w*(1-value.rel.W/currentWindowWidth)
            console.log(assetsDistanceChange[asset.name][axis]);
        }
        else if (!widthChangeMore){
            assetsDistanceChange[asset.name][axis] = value.d.h*(1-value.rel.H/currentWindowHeight)
        }
    }
    /**
     * Convert pixel values in % values
     * value ~ {%: 1000}
     */
    if (axis == "x"){
        return  window.innerWidth*(value["%"] + assetsDistanceChange[asset.name][axis])
    }
    else if (axis == "y"){
        return window.innerHeight*(value["%"] + assetsDistanceChange[asset.name][axis])
    }
}