import { tree } from "../root.js"
import { evalProp } from "./Utils/EvalProps.js"
/**
 * Manages Animations
 */
export class Modelator{
    TIME = 0
    animations = {}
    currentAnimationsState = {}

    constructor(){}

    /**
     * Execute all animation
     */
    animate(){
        const animationsToDelete = []
        for (let [assetName, animations] of Object.entries(this.animations)){
            for (let [paramName, animeData] of Object.entries(animations)){
                //
                tree.setContext(assetName)
                /**
                 * Eval the prop with the correct context
                 */
                evalProp.call(
                    tree.props, // emitter context
                    tree.assets_register[assetName], // asset
                    paramName,  // parameter to update
                    tree.assets_params[assetName][paramName], // current value
                    animeData.upV, // update value
                    animeData.toV, // max value to reach
                    animeData.sign, // animation direction
                    animeData.model // model
                )
                const newValue = tree.assets_params[assetName][paramName]
                /**
                 * Check when to stop animation
                 */
                if (
                    animeData.currentValue == newValue
                ){
                    animationsToDelete.push([assetName, paramName])
                    continue
                }
                /**
                 * Update current value of animation
                 */
                animeData.currentValue = newValue

            }
        }
        /**
         * Delete animation we do not need
         */
        for (let [assetName, paramName] of animationsToDelete){
            delete this.animations[assetName][paramName]
        }
    }
    /**
     * 
     * @param {String} assetName 
     * @param {String} param 
     * @param {object} data - {from: number | array, steps: number | array, to: number | array }
     */
    shift(
        assetName,
        param,
        data
    ){
        let {from, steps, to, model} = data
        let upV = [] 
        let sign = []
        /**
         * Calculate update value
         * NOTE: By default we assume that user will pass values in desire units, 
         * so we do not bother to check what units are and that is why values 
         * are pass in array with no units.
         * vIn  = {grd:10000, n:10}
         * to    = [1,2]
         * from  = [1,2]
         * steps = [1,2]
         * ---------------------------------------------------
         * vIn  = { x: {grd:10000, n:10}, y: {grd:10000, n:10} } 
         * to    = [ [1,2], [1,2] ] 
         * from  = [ [1,2], [1,2] ] 
         * steps = [ [1,2], [1,2] ]
         */
        if(from.constructor.name == "Array"){
            this.calcUpValueAndSignsMatrix(upV, sign, to, from, steps)
        }
        else {
            /**
             * Calc with how much to update animation
             */
            upV = (to - from) / steps || 1
            /**
             * Get sign of animation
             */
            if (upV < 0){
                sign = "-"
            }
            else {
                sign = "+"
            }
        }
        /**
         * Register animation
         */
        if (!this.animations[assetName]){
            this.animations[assetName] = {}
        }
        this.animations[assetName][param] = {
            upV, 
            toV: to,
            sign, 
            model
        }
    }
    /**
     * 
     * @param {array} upH 
     * @param {array} signH 
     * @param {array} toValues 
     * @param {array} fromValues 
     * @param {array} stepsValues 
     */
    calcUpValueAndSignsMatrix(upH, signH, toValues, fromValues, stepsValues){
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
                this.calcUpValueAndSigns(upH[0], signH[0], toE, fromE, stepsE)
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
}