import{
    currentWindowHeight,
    currentWindowWidth,
}from "../../root.js"

/**
 * Keep assets position difrence same.
 * @param {string} axis
 * @param {object} value { bind: <number in %> }
 * @param {DisplayObject} asset 
 * @returns {number}
 * 
 */
export function use_geometry_assets_position_binding(
    axis, value, asset
){
    //console.log("use_geometry_assets_position_binding >>?", asset.name, axis, value);

    /**
     * %   = value.bind
     * S.W = currentWindowWidth
     * A.W = asset.width
     * dw  = S.W - A.W = x + x'
     * x   = % * dw
     * 
     *              S.W 
     * ^------------------------------^
     *     x                    x'
     * ^-------*          ------------^
     *             A.W 
     *         ^---------^
     * 
     * NOTE: We calculate the "y" in same way!
     */
    if (axis == "x"){
        return (value.bind*(currentWindowWidth - asset.width))
       
    }
    else if (axis == "y"){
        return (value.bind*(currentWindowHeight - asset.height))
    }
}