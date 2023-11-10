/**
 * Function that build animation data.
 * @param {String} assetName 
 * @param {String} param 
 * @param {object} data - 
 *  ex:
 *      {
            from: [[0.2], [0.2]], 
            steps:[[100], [20] ], 
            to:   [[0.7], [0.5]],
            model:[["OR"],["OR"]]
        }
    ex:
        {
            from:  [0.5], 
            steps: [100], 
            to:    [0.7], 
            model: ["LR"]
        }
 */
export function shift(
    assetName,
    param,
    data,
    animatorName
){
    let {from, steps, to, model} = data
    let upV = [] 
    let sign = []
    /**
     * Calculate update value
     * NOTE: By default we assume that user will pass values in desire units, 
     * so we do not bother to check what units are and that is why values 
     * are pass in array with no units.
     */
    calcUpValueAndSignsMatrix(upV, sign, to, from, steps)
    /**
     * Deside what to put in animation Data
     */
    let animeData = {
        assetName,
        paramName:param,
        from,
        upV,
        toV: to,
        sign, 
        model,
        animatorName
    }

    return animeData
}
/**
 * 
 * @param {array} upH 
 * @param {array} signH 
 * @param {array} toValues 
 * @param {array} fromValues 
 * @param {array} stepsValues 
 */
function calcUpValueAndSignsMatrix(upH, signH, toValues, fromValues, stepsValues){
    // fromValues: [[1],[1]], 
    // stepsValues:[[100], [100]], 
    // toValues:   [[1.5], [1.5]], 
    // model:[["LR"], ["LR"]]
    for(let i = 0; i < toValues.length; i++){
        let toE = toValues[i]
        let fromE = fromValues[i]
        let stepsE = stepsValues[i]
        /**
         * Deep array
         */
        if (Array.isArray(toE)){
            upH.push([])
            signH.push([])
            calcUpValueAndSignsMatrix(upH[i], signH[i], toE, fromE, stepsE)
            continue
        }
        /**
         * Calc with how much to update animation
         */
        let upValue = (toE - fromE) / stepsE || 1
        upH.push(upValue)
        /**
         * Get sign of animation
         */
        if (upValue < 0){
            signH.push("-")
        }
        else {
            signH.push("+")
        }
    }
}