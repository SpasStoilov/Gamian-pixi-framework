import * as AllEmitters from "../components/emitters.js"
import {emitter} from "../root.js"
import { fetchME } from "./Utils/fetch.js"

export let functionalEmitterRegister = {}
export let classEmitterRegister = {}
/**
 * Creates all instaces of componets emitters.
 * Register events:
 * eventName == new emitterClass().constructor.name 
 * handler == new emitterClass().init
 */
export async function emitterFactory(){
    let functionalLogic = await fetchME("js-logic")
    /**
     * Loop over all emitterClass in components dir
     */
    for (let [name , emitterClass] of Object.entries(AllEmitters)){
        /**
         * Get emitterClass instance
         */
        const instance = new emitterClass()
        /**
         * Register
         */
        classEmitterRegister[name] = instance
        /**
         *  Register Events that change the tree when you call them
         *  When you change the tree the tiker will hook new props
         *  Note: it is doing it constantly!
         */
        emitter.on(name, instance.init.bind(instance));
        /**
         * Register all logic of the instance as events
         */
        if (functionalLogic[name]){
            for (
                let [_, funcData] of Object.entries(functionalLogic[name])
            ){
                /**
                 * Define logic
                 */
                if (funcData.emitType == "once"){
                    eval(`emitter.once(funcData.name, (${funcData.logic}).bind(instance))`)
                }
                else if (funcData.emitType == "on"){
                    eval(`emitter.on(funcData.name}, (${funcData.logic}).bind(instance))`)
                }
            }
        }
    }
    return Promise.resolve()
}