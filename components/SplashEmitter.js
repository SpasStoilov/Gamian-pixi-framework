import {GenericEmitter} from "../main/GenericEmitter.js"

export class SplashEmitter extends GenericEmitter{
    not = false;
    constructor(){
        super()
    }
    async render(){
        console.log("SplashEmitter >>> render");
        return ()=>{}
    }
}