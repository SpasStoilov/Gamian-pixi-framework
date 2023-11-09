/**
 * ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                        
 *                  TEST Animator Middlewar here
 *  --------------------------------------------------------------
 * 
 * Function that build animation data.
 * @param {String} assetName 
 * @param {String} param 
 * @param {any} data
 * @param {string} animatorName
 */
export function testAnimationDataMiddleware(
    assetName,
    paramName,
    data,
    animatorName
){
    console.log("testAnimationDataMiddleware >>> ",
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