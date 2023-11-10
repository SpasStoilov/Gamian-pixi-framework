import {GenericEmitter} from "../main/GenericEmitter.js"

export class RootEmitter extends GenericEmitter{
    constructor(){
        super()
    }
    async afterRender(){
        console.log("RootEmitter >>> afterRender");
        this.emitter.emit("RootEmitter-destroy")
        return ()=>{}
    }
    async afterDestroy(){
        console.log("RootEmitter >>> afterDestroy");
        /**
         * Hook params of LoadingEmitter
         */
        this.emitter.emit("BackgroundEmitter")
        this.emitter.emit("LoadingEmitter")
    }
}