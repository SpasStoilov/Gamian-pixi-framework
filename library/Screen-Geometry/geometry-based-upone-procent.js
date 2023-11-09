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
    /**
     * Convert pixel values in % values
     * value ~ {%: 1000}
     */
    if (axis == "x"){
        return  window.innerWidth*value["%"]
    }
    else if (axis == "y"){
        return window.innerHeight*value["%"]
    }
}