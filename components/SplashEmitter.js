import {GenericEmitter} from "../main/GenericEmitter.js"

export class SplashEmitter extends GenericEmitter{
    not = false;
    constructor(){
        super()
    }
    async afterRender(){
        console.log("SplashEmitter >>> afterRender");
        this.emitter.emit("initDrawingAnimation")
        return ()=>{}
    }
}