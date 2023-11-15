import { tree } from "../root.js"
import { evalProp } from "./Utils/EvalProps.js"
import {LibAnimationDataMiddleware} from "../library/index.js"
/**
 * Manages Animations
 */
export class Modelator{
    TIME = 0
    animations = {}
    animationsOnResize = {}
    currentAnimationsState = {}

    constructor(){}

    /**
     * Execute all animation
     */
    animate(){
        const animationsToDelete = []
        for (let [assetName, animations] of Object.entries(this.animations)){
            for (let [paramName, animeData] of Object.entries(animations)){
                /**
                 * Update the state of the param value
                 */
                tree.updateAssetParam(
                    assetName, 
                    paramName, 
                    tree.assets_params[assetName][paramName], 
                    animeData
                )
                const newValue = tree.assets_params[assetName][paramName]
                /**
                 * Call Anime Hook onUpdate
                 */
                if(animeData.onUpdate){
                    animeData.onUpdate.call(tree.props)
                }
                /**
                 * We stop animation if current value is the same as new one!
                 */
                if (
                    animeData.currentValue == newValue
                ){
                    /**
                     * Call Anime Hook onComplate
                     */
                    if(animeData.onComplate){
                        animeData.onComplate.call(tree.props)
                    }
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
     * Function register animation data.
     * @param {String} assetName 
     * @param {String} param 
     * @param {any} data
     * @param {string} animationDataBuilder - default -> "shift"
     * @param {string} animatorName - default -> "shift"
     */
    shift(
        assetName,
        param,
        data,
        animationMiddleware = "shift",
        animatorName = "shift"
    ){
        let animeData = LibAnimationDataMiddleware[animationMiddleware](
            assetName,
            param,
            data,
            animatorName
        )
        /**
         * Register animation with data
         */
        if (!this.animations[assetName]){
            this.animations[assetName] = {}
        }
        this.animations[assetName][param] = animeData
    }
    /**
     * Execute all animation
     */
    animateOnResize(assetName, paramName){
        const animations = this.animationsOnResize[assetName]
        const animeData = animations[paramName]
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
            animeData // animation data
        )
        const newValue = tree.assets_params[assetName][paramName]
        /**
         * Call Anime Hook onUpdate
         */
        if(animeData.onUpdate){
            animeData.onUpdate.call(tree.props)
        }
        /**
         * Update current value of animation
         */
        animeData.currentValue = newValue
    }
    /**
     * Function register animation data OnResize.
     * @param {String} assetName 
     * @param {String} param 
     * @param {any} data
     * @param {string} animationDataBuilder
     * @param {string} animatorName
     */
    shiftOnResize(
        assetName,
        param,
        data,
        animationMiddleware = "shift",
        animatorName = "shift"
    ){
        let animeData = LibAnimationDataMiddleware[animationMiddleware](
            assetName,
            param,
            data,
            animatorName
        )
        /**
         * Register animation with data
         */
        if (!this.animationsOnResize[assetName]){
            this.animationsOnResize[assetName] = {}
        }
        this.animationsOnResize[assetName][param] = animeData
    }
}