/** ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 *                         INFORMATION
 * 
 * - Animations stop only if current value of the prop that we 
 *   animating is the same as new one!
 *  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^                        
 *                           TEST
 *  ---------------------------------------------------------
 * @param {number} moving - current value
 */
export function test(vInX, vInY, data){

    // TEST you models here......................
    
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
 * @param {number} vInX - current value
 * @param {number} vInY - current value
 *  @param {number} data - 
        movingAlong: "x",
        from:0.2,
        to:0.7,
        step: 0.01,
        os: {
            use:"cos",
            from:0.2,
            to:0.1,
        },
        model:"SinCos"         
 * 
 */
export function sinCos(vInX, vInY, data){
    let movingAlongAxis = vInX
    let oscillationAxis = vInY

    if(data.movingAlong == "y"){
        movingAlongAxis = vInY
        oscillationAxis = vInX
    }

    if(
       (data.to != false || data.to != undefined) && 
        movingAlongAxis > data.to    
    ){
        movingAlongAxis = data.from
        oscillationAxis = data.os.from
        if (movingAlongAxis == "x"){
            return [movingAlongAxis, oscillationAxis]
        }
        if (movingAlongAxis == "y"){
            return [oscillationAxis, movingAlongAxis]
        }
    }

    /**
     * Update the main axis
     */
    const upMovign = movingAlongAxis + data.step
    /**
     * Calc how much we change the main axis
     */
    const TotalChange  = upMovign - data.from
    /**
     * Calculation is in radians (NOTE: cos):
     * if : TotalChange/to = 0    -> Q = 0*Math.PI  -> Math.cos(Q) =  1
     * if : TotalChange/to = 1/2  -> Q = Math.PI/2  -> Math.cos(Q) =  0
     * if : TotalChange/to = 1    -> Q = 1*Math.PI  -> Math.cos(Q) = -1
     * if : TotalChange/to = 3/2  -> Q = 1*Math.PI  -> Math.cos(Q) =  0
     * if : TotalChange/to = 2    -> Q = 2*Math.PI  -> Math.cos(Q) =  1
     * -----------------------------------------------------------------------
     * Range of Math.cos(Q):
     *   -1 <= Math.cos(Q) <= 1
     * -----------------------------------------------------------------------
     * Change in aplitude
    */
    const dApl = data.os.aplitudeChange || 1
    /*
     * "to" is maximum position for OscillationAxis
    */
    const to = data.os.to
    /**
     * Calc Q
     */
    const Q = (2*Math.PI)*(TotalChange/to)
    /**
     * Calc Final position of oscillationAxis
     */
    const upOscillation = oscillationAxis + dApl * to * Math[data.os.use](Q)

    if (data.movingAlong == "x"){
        return [upMovign, upOscillation]
    }
    if (data.movingAlong == "y"){
        return [upOscillation, upMovign]
    }
}
