/**
 *  Event helper objects
 */
export let ongoingEvent = {}
export let functionalEmitterRegister = {}
export let classEmitterRegister = {}
/**
 * Function that resets global scopes varaibles
 */
export function resetMainGlobalScopeVariables(){
    ongoingEvent = {}
    functionalEmitterRegister = {}
    classEmitterRegister = {}
}