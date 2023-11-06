/**
 *  Events helpers
 */
export const ongoingEvent = {}
/**
 * Register event helper.
 * You may use it in components.
 * @param {string} name 
 * @param {any} value 
 */
export function setOngoingEvent(name, value){
    ongoingEvent[name] = value
}