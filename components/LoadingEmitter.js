import {GenericEmitter} from "../main/GenericEmitter.js"

export class LoadingEmitter extends GenericEmitter{

    constructor(){
        super()
    }
    async afterRender(){
        console.log("LoadingEmitter >>> afterRender");
        await new Promise((resolve)=>{
            /**
             * Pos new asset in container
             */
            this.emitter.emit("posAsset")
            setTimeout(() => {
                resolve()
            }, 3000)
        })
        /**
         * Play animations
         */
        this.emitter.emit("anime")
        /**
         * Hook the params of SplashEmitter
         */
        this.emitter.emit("SplashEmitter")
        return ()=>{}
    }
}