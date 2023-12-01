import {GenericEmitter} from "../main/GenericEmitter.js"

export class SplashEmitter extends GenericEmitter{
    constructor(){
        super()
    }
    async afterRender(){
        console.log("SplashEmitter >>> afterRender");
        this.emitter.emit("emmitFirstTemplate")
        return ()=>{}
    }
}