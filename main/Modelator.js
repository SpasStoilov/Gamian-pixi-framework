import { tree } from "../root.js"
import {LibAnimationDataMiddleware} from "../library/index.js"
import { removeOngoingEvent } from "./Utils/OngoingEvent.js"
import { ongoingEvent } from "./Utils/globalScopeVariables.js";
/**
 * Manages Animations 
 */
export class Modelator{
    TIME = 0
    animations = {}
    animationsOnResize = {}
    currentAnimationsState = {}
    waitingRoomForAnimate = []
    waitingRoomForAnimateOnResize = []

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
                 * TODO: move this hooks in animators
                 * NOTE: in shift and sin-cos
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
                     * TODO: move this hooks in animators
                     * NOTE: in shift and sin-cos
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
        animatorName = "shift",
        ongoingEventName = null
    ){
        let animeData = LibAnimationDataMiddleware[animationMiddleware](
            assetName,
            param,
            data,
            animatorName
        )
        this.waitingRoomForAnimate.push({assetName, animeData, param, ongoingEventName})
    }
    /**
     * Register the animation data for animate function
     */
    registerAnimationsForAnimate(){

        const deleteFromWaitingRoom = []

        for(let anime of this.waitingRoomForAnimate){
            let {assetName, animeData, param, ongoingEventName} = anime
            const emitterName = tree.asset_emitter_mapper[assetName]
            const props = tree.getEmitter(emitterName)
            if (
                ongoingEventName == null || 
                ongoingEvent[ongoingEventName].constructor.name == 'Boolean' && ongoingEvent[ongoingEventName] || 
                ongoingEvent[ongoingEventName].constructor.name == 'Function' && ongoingEvent[ongoingEventName].call(props)
            ){
                /**
                 * Register animation with data
                 */
                if (!this.animations[assetName]){
                    this.animations[assetName] = {}
                }
                this.animations[assetName][param] = animeData
                deleteFromWaitingRoom.push(assetName)

                /**
                 * Remove the event
                 */
                removeOngoingEvent(ongoingEventName)
            }
        }
        /**
         * Refresh waiting room
         */
        this.waitingRoomForAnimate = this.waitingRoomForAnimate.filter(data => deleteFromWaitingRoom.indexOf(data.assetName) == -1)

    }
    /**
     * Execute one animation on resize
     */
    animateOnResize(assetName, paramName){
        const animations = this.animationsOnResize[assetName]
        const animeData = animations[paramName]
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
         * Update current value of animation
         */
        animeData.currentValue = newValue
    }
    /**
     * Execute all animation on resize forever
     */
    animateAllOnResize(){
        for (let [assetName, animations] of Object.entries(this.animationsOnResize)){
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
                 * Update current value of animation
                 */
                animeData.currentValue = newValue

            }
        }
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
        animatorName = "shift",
        ongoingEventName = null
    ){
        let animeData = LibAnimationDataMiddleware[animationMiddleware](
            assetName,
            param,
            data,
            animatorName
        )

        this.waitingRoomForAnimateOnResize.push({assetName, animeData, param, ongoingEventName})
    }
    /**
     * Register the animation data for resize
     */
    registerAnimationsForResize(){

        const deleteFromWaitingRoom = []

        for(let anime of this.waitingRoomForAnimateOnResize){
            let {assetName, animeData, param, ongoingEventName} = anime
            const emitterName = tree.asset_emitter_mapper[assetName]
            const props = tree.getEmitter(emitterName)
            if (
                ongoingEventName == null || 
                ongoingEvent[ongoingEventName].constructor.name == 'Boolean' && ongoingEvent[ongoingEventName] || 
                ongoingEvent[ongoingEventName].constructor.name == 'Function' && ongoingEvent[ongoingEventName].call(props)
            ){
                /**
                 * Register animation with data
                 */
                if (!this.animationsOnResize[assetName]){
                    this.animationsOnResize[assetName] = {}
                }
                this.animationsOnResize[assetName][param] = animeData
                /**
                 * Remove the event
                 */
                removeOngoingEvent(ongoingEventName)
            }
        }
        /**
         * Refresh waiting room
         */
        this.waitingRoomForAnimateOnResize = this.waitingRoomForAnimateOnResize.filter(data => deleteFromWaitingRoom.indexOf(data.assetName) == -1)

    }
}