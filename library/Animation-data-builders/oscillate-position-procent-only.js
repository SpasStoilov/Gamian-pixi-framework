/**
 * Function that build animation data.
 * @param {String} assetName 
 * @param {String} param 
 * @param {object} data - {from: number | array, steps: number | array, to: number | array }
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