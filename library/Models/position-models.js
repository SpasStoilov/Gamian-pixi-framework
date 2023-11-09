/** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                         INFORMATION
 * 
 * - Animations stop only if current value of the prop that we 
 *   animating is the same as new one!
 *  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                        
 *                           TEST
 * - TEST you models here:
 *  ---------------------------------------------------------
 * @param {number} vIn - current value
 * @param {number} from - start value
 */
export function test(vIn, from){
    /**
    * Simple model function.
    */
    const newY = vIn + 0.001
    const newX = newY**3 + from
    return [newX, newY]
} 
 /* ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                          MODELS
 * ---------------------------------------------------------
 *//** 
 *
 * LR:
 * Updates linearly position of asset within some bounds.
 * @param {number} vIn - lower bound
 * @param {number} up  - update value
 * @param {number} to  - upper bound
 * @param {number} s   - sign
 */
export function linearRangeModel(vIn, from, up, to, s){
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
export function oscillationRangeModel(vIn, from, up, to, s){
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
export function backFowardRangeModel(vIn, from, up, to, s){
    if ((s == "-" && vIn > to) || (s == "+" && vIn < to)){
        vIn = vIn + up
    }
    else {
        vIn = from
    }
    return vIn
}
/**
 * PP%:
 * @param {number} vIn - current state of position in %
 * @param {number} from - start state of position in %
 * @returns 
 */
export function positionParabulaProcent(vIn, from){
    const newY = vIn + 0.001
    const newX = newY**3 + from
    return [newX, newY]
} 
/**
 * SinCos:
 * @param {number} vIn - current value
 * @param {number} from - start value
 */
export function sinCos(vIn, from){}
