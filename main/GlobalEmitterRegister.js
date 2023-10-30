import * as AllEmitters from "../components/emitters.js"
import {emitter} from "../root.js"

export let classEmitterRegister = {}
/**
 * Creates all instaces of componets emitters.
 * Register events:
 * eventName == new emitterClass().constructor.name 
 * handler == new emitterClass().init
 */
export function emitterFactory(){
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
    }
}