import {GenericEmitter} from "../main/GenericEmitter.js"

export class SplashEmitter extends GenericEmitter{
    not = false;
    constructor(){
        super()
    }
    async beforeRender(){
        this.emitter.emit("LoadingEmitter-destroy")
    }
}