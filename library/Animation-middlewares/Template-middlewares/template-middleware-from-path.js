/**
 * Function that build animation data.
 * @param {String} assetName 
 * @param {String} param 
 * @param {any} data - 
 *  {
            setState: function that return index of the list "chooseFromPaths",
            chooseFromData:[
                optional data that match animationMiddleware requirements
            ],
            animationMiddleware?: string,
            animatorName?: string,
    }
 * @param {string} animatorName
 */
export function templateFromPathMiddleware(
    assetName,
    paramName,
    data,
    animatorName
){
    console.log("templateFromPathMiddleware >>> ",
        assetName,
        paramName,
        data,
        animatorName
    );
    /**
     * Set default values
     */
    if(!data.animationMiddleware){
        data.animationMiddleware = "AnimeDrawingMid"
    }
    if(!data.animatorName){
        data.animatorName = "DrawingAnimator"
    }
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