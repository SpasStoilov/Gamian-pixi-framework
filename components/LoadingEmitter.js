import {GenericEmitter} from "../main/GenericEmitter.js"

export class LoadingEmitter extends GenericEmitter{
    /**
     * Position x for component
     */
    x = 6

    constructor(){
        super()
    }
    async afterRender(){
        console.log("LoadingEmitter >>> afterRender");
        await new Promise((resolve)=>{
            this.emitter.emit("posAsset")
            setTimeout(() => {
                resolve()
            }, 3000)
        })
        /**
         * Hook the params of SplashEmitter
         */
        this.emitter.emit("anime")
        this.emitter.emit("SplashEmitter")
        return ()=>{}
    }
}