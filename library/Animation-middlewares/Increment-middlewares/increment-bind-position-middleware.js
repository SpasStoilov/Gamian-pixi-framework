/**
 * Function that build animation data.
 * @param {String} assetName 
 * @param {String} param 
 * @param {any} data -
 *       {
            x:{w:0.048, h:0, W:1500, H:800},
            y:{w:0.0005, h:0, W:1500, H:800},
            initValues:{
                x:{bind:0.503},
                y:{bind:0.705}
            }
        },
 * @param {string} animatorName
 */
export function incrementBindPositionMiddleware(
    assetName,
    paramName,
    data,
    animatorName
){
    console.log("incrementBindPosition-middleware >>> ",
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