import { LibModels } from '../index.js'

/**
 * Animator.
 * @param {number} vIn - current value of the prop
 * @param {any} to 
 * @param {any} up 
 * @param {any} s 
 * @param {number} i 
 * @returns {number}
 */
export function shift(asset, vIn, animationData, i=0){
    let paramName = animationData.paramName
    let from = animationData.from
    let upV = animationData.upV
    let toV = animationData.toV
    let sign = animationData.sign
    let model = animationData.model
    //console.log("comming >>", paramName, vIn, from, upV, toV, sign, model);

    if (vIn.constructor.name == "Object") {
       /** 
        * vIn  = {grd:10000, n:10}
        * from = [10000, 10]
        * toV = [1,2]
        * upV = [1,2]
        * sign  = [+,-]
        * ---------------------------------------------------
        * vIn  = { x: {grd:10000, n:10}, y: {grd:10000, n:10} }
        * from = [ [10000, 10], [10000, 10] ]
        * toV = [ [1,2], [1,2] ] 
        * upV = [ [1,2], [1,2] ]
        * sign  = [ [+,+], [+,-] ]
        */
        for (let [key, value] of Object.entries(vIn)){
            let reducedAnimationData = {
                paramName, 
                from: from[i], 
                upV: upV[i], 
                toV: toV[i], 
                sign: sign[i], 
                model: model[i]
            }
            let newV = shift.call(
                this, asset, value, reducedAnimationData
            )
            vIn[key] = newV
            i+=1
        }
    }
    else {
        //console.log(paramName, m, LibModels[paramName]);
        /**
         * Execute a modelator function
         * this - classEmitter
         */
        vIn = LibModels[paramName][model].call(this, vIn, from, upV, toV, sign)
    }
    //console.log("out >>", vIn);
    return vIn
}