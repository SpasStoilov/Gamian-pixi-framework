/**
 * Updates linearly position of asset within some bounds.
 * @param {number} vIn - lower bound
 * @param {number} up  - update value
 * @param {number} to  - upper bound
 * @param {number} s   - sign
 */
function linearValueRangeModel(vIn, up, to, s){
    if ((s == "-" && vIn > to) || (s == "+" && vIn < to)){
        vIn = vIn + up
    }
    else {
        vIn = to
    }
    return vIn
}

export const positionModels = {
    LVR : linearValueRangeModel,
}