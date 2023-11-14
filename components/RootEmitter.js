import {GenericEmitter} from "../main/GenericEmitter.js"

export class RootEmitter extends GenericEmitter{
    constructor(){
        super()
    }
    async afterRender(){
        console.log("RootEmitter >>> afterRender");
        /**
         * Hook params of BackgroundEmitter && LoadingEmitter
         */
        this.emitter.emit("BackgroundEmitter")
        this.emitter.emit("LoadingEmitter")
        return ()=>{}
    }
}