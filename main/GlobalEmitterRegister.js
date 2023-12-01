import * as AllEmitters from "../components/emitters.js"
import { emitter } from "../root.js"
import { fetchME } from "./Utils/fetch.js"
import { functionalEmitterRegister , classEmitterRegister } from "./Utils/globalScopeVariables.js"

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
         * Register class emitters
         */
        classEmitterRegister[name] = instance
        /**
         * Register event object for functions of the class emitters
         */
        if (!functionalEmitterRegister[name]){
            functionalEmitterRegister[name] = {}
        }
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
                 * name = calss emitterName
                 */
                functionalEmitterRegister[name][funcData.name] = { 
                    handler: eval(`(${funcData.logic}).bind(instance)`), 
                    type: funcData.emitType
                }
                const eventName = funcData.name
                const eventType = functionalEmitterRegister[name][funcData.name].type
                const handler = functionalEmitterRegister[name][funcData.name].handler
                emitter[eventType](eventName, handler)
            }
        }
    }
    return Promise.resolve()
}