/**
 * Function that build animation data.
 * @param {String} assetName 
 * @param {String} param 
 * @param {any} data -
 *      movingAlong: "x",
        from:0.2,
        to:0.7,
        step: 0.01,
        os: {
            use:"cos",
            from:0.2,
            to:0.1,
        },
        model:"SinCos"  
 */
export function SinCosProcentOnlyMiddleware(
    assetName,
    paramName,
    data,
    animatorName
){
    console.log("SinCosProcentOnlyMiddleware >>>",
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