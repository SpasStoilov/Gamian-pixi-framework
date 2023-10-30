import {GenericEmitter} from "../main/GenericEmitter.js"

export class LoadingEmitter extends GenericEmitter{
    /**
     * Position x for component
     */
    x = 6

    constructor(){
        super()
    }
    
    async render(){
        console.log("LoadingEmitter >>> render");
        return ()=>{}
    }
    async update(){
        console.log("LoadingEmitter >>> update");
        await new Promise((resolve)=>{
            setTimeout(() => {
                resolve()
            }, 10000)
        })
        return ()=>{}
    }
    async destroy(){
        console.log("LoadingEmitter >>> destroy");
        return ()=>{}
    }
    async afterDestroy(){
        console.log("LoadingEmitter >>> afterDestroy");
        this.emitter.emit("SplashEmitter")
        return ()=>{}
    }
}