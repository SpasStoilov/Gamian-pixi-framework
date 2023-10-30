import {GenericEmitter} from "../main/GenericEmitter.js"

export class RootEmitter extends GenericEmitter{
    constructor(){
        super()
    }
    async render(){
        console.log("RootEmitter >>> render");
        return ()=>{}
    }
    async update(){
        console.log("RootEmitter >>> update");
        await new Promise((resolve)=>{
            setTimeout(() => {
                resolve()
            }, 500)
        })
        return ()=>{}
    }
    async afterDestroy(){
        console.log("RootEmitter >>> afterDestroy");
        this.emitter.emit("LoadingEmitter")
        return ()=>{}
    }
}