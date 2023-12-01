import { ongoingEvent } from "./globalScopeVariables.js"
/**
 * Register event helper.
 * You may use it in components.
 * @param {string} name 
 * @param {any} value 
 */
export function setOngoingEvent(name, value){
    ongoingEvent[name] = value
}

/**
 * Remove event .
 * @param {string} name 
 */
export function removeOngoingEvent(name){
    if (name!==null && name.constructor.name == 'String'){
        delete ongoingEvent[name]
    }
}