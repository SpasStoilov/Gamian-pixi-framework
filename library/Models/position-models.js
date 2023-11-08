/** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                         INFORMATION
 * 
 * - Animations stop only if current value of the prop that we 
 *   animating is the same as new one!
 *  ---------------------------------------------------------
 */


/** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ 
 *                           MODELS
 * LR:
 * Updates linearly position of asset within some bounds.
 * @param {number} vIn - lower bound
 * @param {number} up  - update value
 * @param {number} to  - upper bound
 * @param {number} s   - sign
 * ---------------------------------------------------------
 */
function linearRangeModel(vIn, from, up, to, s){
    if ((s == "-" && vIn > to) || (s == "+" && vIn < to)){
        vIn = vIn + up
    }
    else {
        vIn = to
    }
    return vIn
}
/**
 * OR:
 * Updates linearly position of asset within some bounds.
 * @param {number} vIn - lower bound
 * @param {number} up  - update value
 * @param {number} to  - upper bound
 * @param {number} s   - sign
 */
function oscillationRangeModel(vIn, from, up, to, s){
    if ((s == "-" && vIn > to) || (s == "+" && vIn < to)){
        vIn = vIn + up
    }
    else {
        vIn = from
    }
    return vIn
}
/**
 * BFR:
 * Updates linearly position of asset within some bounds.
 * @param {number} vIn - lower bound
 * @param {number} up  - update value
 * @param {number} to  - upper bound
 * @param {number} s   - sign
 */
function backFowardRangeModel(vIn, from, up, to, s){
    if ((s == "-" && vIn > to) || (s == "+" && vIn < to)){
        vIn = vIn + up
    }
    else {
        vIn = from
    }
    return vIn
}

export const positionModels = {
    LR : linearRangeModel,
    OR : oscillationRangeModel,
    BFR: backFowardRangeModel
}