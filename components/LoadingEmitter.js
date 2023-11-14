import {GenericEmitter} from "../main/GenericEmitter.js"

export class LoadingEmitter extends GenericEmitter{

    constructor(){
        super()
    }
    async afterRender(){
        console.log("LoadingEmitter >>> afterRender");
        this.emitter.emit("loadLoadingAssets")
        /**
         * Play animations
         */
        this.emitter.emit("loadingAnimation")
        return ()=>{}
    }
    async destroy(){
        console.log("LoadingEmitter >>> destroy");
        //await this.tree.del("loading_container")
    }
    async afterDestroy(){
        console.log("LoadingEmitter >>> afterDestroy");
        /**
         * Hook the params of SplashEmitter
         */
        this.emitter.emit("SplashEmitter")
    }
}