import{
    currentWindowHeight,
    currentWindowWidth,
}from "../../root.js"

/**
 * 
 * @param {string} axis
 * @param {object} value { bind: <number in %> }
 * @param {DisplayObject} asset 
 * @returns {number}
 * 
 */
export function use_geometry_assets_position_binding(
    axis, value, asset
){
    console.log("use_geometry_assets_position_binding >>?", asset.name, axis, value);

    if (axis == "x"){
        return (value.bind*(currentWindowWidth - asset.width))
       
    }
    else if (axis == "y"){
        return (value.bind*(currentWindowHeight - asset.height))
    }
}