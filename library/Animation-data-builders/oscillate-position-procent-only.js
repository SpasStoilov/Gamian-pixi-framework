/**
 * Function that build animation data.
 * @param {String} assetName 
 * @param {String} param 
 * @param {any} data
 */
export function oscillatePositionProcentOnly(
    assetName,
    paramName,
    data,
    animatorName
){
    console.log("oscillatePositionProcentOnly >>> Builder:",
        assetName,
        paramName,
        data,
        animatorName
    );
    /**
     * Deside what to put in animation Data
     */
    let animeData = {
        assetName,
        paramName,
        data,
        animatorName
    }

    return animeData
}